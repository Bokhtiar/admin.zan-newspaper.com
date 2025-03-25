import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { IoIosList } from "react-icons/io";
import { MdDelete } from "react-icons/md";

import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { networkErrorHandeller } from "../../utils/helper";

import { SkeletonTable } from "../../components/loading/skeleton-table";
import DataTable, { createTheme } from "react-data-table-component";
import { PageHeader } from "../../components/pageHandle/pagehandle";
import { confirmAlert } from "react-confirm-alert";
import { ThemeContext } from "../../components/ThemeContext";

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [selectedCategories, setSelectedCategories] = useState([]);

  console.log("selectedCategories", selectedCategories);

  // Fetch categories from API
  const priorityNavber = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Category.priorityNav({
        priority_id: JSON.stringify(selectedCategories),
      });
      console.log("pp", response);
      if (response && response.status === 200) {
        Toastify.Success(" Created.");
        fetchCategory()
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
  if (loading) {
    return (
      <div>
        <SkeletonTable />
      </div>
    );
  }

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
      cell: (row) => row?.category_name,
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
  ];

  createTheme("lightTheme", {
    text: { primary: "#000", secondary: "#555" },
    background: { default: "#ffffff" },
    divider: { default: "#ddd" },
  });

  createTheme("darkTheme", {
    text: { primary: "#ffffff", secondary: "#bbb" },
    background: { default: "#9CA3AF" },
    divider: { default: "#444" },
  });

  return (
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
      <DataTable
        columns={columns}
        theme={theme === "dark" ? "darkTheme" : "lightTheme"}
        data={categories}
        pagination
      />
    </>
  );
};
