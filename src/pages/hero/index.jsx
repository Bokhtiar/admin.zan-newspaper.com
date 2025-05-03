

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
import ListSkeleton from "../../components/loading/ListSkeleton";

export const HeroList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);

 

  // Fetch categories from API
  const fetchCategory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Category.index();
     
      if (response && response.status === 200) {
        setCategories(response?.data?.data || []);
      }
    } catch (error) {
   
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
        <ListSkeleton />
      </div>
    );
  }

  const propsData = {
    pageTitle: "Hero List",
    pageIcon: <IoIosList />,
    buttonName: "Create New Hero",
    buttonUrl: "/dashboard/create-hero",
    type: "add",
  };

  const columns = [
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

      <DataTable
        columns={columns}
        theme={theme === "dark" ? "darkTheme" : "lightTheme"}
        data={categories}
        pagination
      />
    </>
  );
};
