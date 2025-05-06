import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { IoIosList } from "react-icons/io";
import { MdDelete } from "react-icons/md";

import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { networkErrorHandeller } from "../../utils/helper";


import DataTable from "react-data-table-component";
import { PageHeader } from "../../components/pageHandle/pagehandle";
import { confirmAlert } from "react-confirm-alert";

import ListSkeleton from "../../components/loading/ListSkeleton";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [expandedRows, setExpandedRows] = useState([]); // <-- Moved inside

  const toggleRow = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const renderCategoryName = (row) => {
    const hasChild = row.child_category && row.child_category.length > 0;
    const isExpanded = expandedRows.includes(row.category_id);

    return (
      <div>
        <div className="flex items-center gap-3">
        <span className="font-medium">{row.category_name}</span>
          {hasChild && (
            <button
              onClick={() => toggleRow(row.category_id)}
              className="text-xs"
            >
              {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
            </button>
          )}
          
        </div>

        {hasChild && isExpanded && (
          <div className="ml-10 mt-1 space-y-1">
            {row.child_category.map((child) => (
              <div key={child.category_id} className="text-sm text-gray-600">
                └ {child.category_name}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };


  console.log("categories", categories);

  // Fetch categories from API
  const priorityNavber = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Category.priorityNav({
        priority_id: JSON.stringify(selectedCategories),
      });
     
      if (response && response.status === 200) {
        Toastify.Success(" Created.");
        fetchCategory();
      }
    } catch (error) {
      console.log(error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  }, [selectedCategories]);

  // Fetch categories from API
  const fetchCategory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Category.index();
      console.log(response);
      if (response && response.status === 200) {
        setCategories(response?.data?.data || []);
      }
    } catch (error) {
      console.log(error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  // Handle single category deletion
  const destroy = (id) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this category?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const response = await NetworkServices.Category.destroy(id);
              if (response?.status === 200) {
                Toastify.Info("Category deleted successfully.");
                fetchCategory();
              }
            } catch (error) {
              networkErrorHandeller(error);
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };


  const propsData = {
    pageTitle: "Category List",
    pageIcon: <IoIosList />,
    buttonName: "Create New Category",
    buttonUrl: "/dashboard/create-category",
    type: "add",
  };
  const handleCheckboxChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const columns = [
    {
      name: "priority Navber",
      cell: (row) => (
        <input
          type="checkbox"
          className="w-4 h-4"
          checked={selectedCategories.includes(row?.category_id)}
          onChange={() => handleCheckboxChange(row?.category_id)}
        />
      ),
    },
    {
      name: "Thumbnail",
      cell: (row) => (
        <img
          className="w-10 h-10 rounded-full border"
          src={
            row?.category_image
              ? `${process.env.REACT_APP_API_SERVER}${row?.category_image}`
              : ""
          }
          alt="images"
        />
      ),
    },
    {
      name: "Category Name",
      cell: (row) => renderCategoryName(row),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2">
          <Link to={`/dashboard/edit-category/${row?.category_id}`}>
            <FaEdit className="text-primary text-xl" />
          </Link>
          <MdDelete
            className="text-red-500 text-xl cursor-pointer"
            onClick={() => destroy(row?.category_id)}
          />
        </div>
      ),
    },
  ]
  return (
    <>
      {loading ? (
        <ListSkeleton />
      ) : (
        <>
          <PageHeader propsData={propsData} />
          {selectedCategories.length > 0 && (
            <button
              className="bg-blue-400 px-2 py-3 rounded-md"
              onClick={priorityNavber}
            >
              Priority Navbar
            </button>
          )}
          <DataTable columns={columns} data={categories} pagination />
        </>
      )}
    </>
  );
};


