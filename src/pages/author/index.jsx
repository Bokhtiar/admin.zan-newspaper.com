import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { IoIosList } from "react-icons/io";
import { MdDelete } from "react-icons/md";

import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { networkErrorHandeller } from "../../utils/helper";
import ListSkeleton from "../../components/loading/ListSkeleton";
import DataTable, { createTheme } from "react-data-table-component";
import { PageHeader } from "../../components/pageHandle/pagehandle";
import { confirmAlert } from "react-confirm-alert";


export const AuthorList = () => {
  const [author, setAuthor] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch categories from API
  const fetchAuthor = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Author.index();
      
      if (response && response.status === 200) {
        setAuthor(response?.data?.data || []);
      }
    } catch (error) {
      console.log(error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAuthor();
  }, [fetchAuthor]);

  // Handle single category deletion
  const destroy = (id) => {
    
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this author?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const response = await NetworkServices.Author.destroy(id);
              if (response?.status === 200) {
                Toastify.Info("Author deleted successfully.");
                fetchAuthor();
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
    pageTitle: "Author List",
    pageIcon: <IoIosList />,
    buttonName: "Create New Author",
    buttonUrl: "/dashboard/create-author",
    type: "add",
  };

  const columns = [
    {
      name: "Author Image",
      cell: (row) => (
        <img
          className="w-10 h-10 rounded-full border"
          src={
            row?.author_image
              ? `${process.env.REACT_APP_API_SERVER}${row?.author_image}`
              : ""
          }
          alt="images"
        />
      ),
    },
    {
      name: "Author Name",
      cell: (row) => row?.author_name,
    },
    {
      name: "Designation",
      cell: (row) => row?.designation,
    },

    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2">
          <Link to={`/dashboard/edit-author/${row?.author_id}`}>
            <FaEdit className="text-primary text-xl" />
          </Link>
          <MdDelete
            className="text-red-500 text-xl cursor-pointer"
            onClick={() => destroy(row?.author_id)}
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
      {loading ? (
        <ListSkeleton />
      ) : (
        <>
          <PageHeader propsData={propsData} />
          <DataTable
            columns={columns}
            data={author}
            pagination
          />
        </>
      )}
    </>
  );
};
