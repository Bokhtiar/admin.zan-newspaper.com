import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { IoIosList } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { formatDateInBengali, networkErrorHandeller } from "../../utils/helper";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { SkeletonTable } from "../../components/loading/skeleton-table";
import DataTable, { createTheme } from "react-data-table-component";
import { PageHeader } from "../../components/pageHandle/pagehandle";
import { ThemeContext } from "../../components/ThemeContext";

export const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
   const { theme } = useContext(ThemeContext);

   console.log("news",news)
  // const [expandedRows, setExpandedRows] = useState([]);
  // const handleExpandClick = (rowId) => {
  //   // Toggle the row expansion
  //   setExpandedRows((prev) =>
  //     prev.includes(rowId)
  //       ? prev.filter((id) => id !== rowId)
  //       : [...prev, rowId]
  //   );
  // };

  // Fetch categories from API
  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.News.index();
      console.log(response);
      if (response && response.status === 200) {
        setNews(response?.data?.data || []);
      }
    } catch (error) {
      console.log(error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // Handle single category deletion
  const destroy = (id) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this News?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const response = await NetworkServices.News.destroy(id);
              if (response?.status === 200) {
                Toastify.Info("News deleted successfully.");
                fetchNews();
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
    pageTitle: "News List",
    pageIcon: <IoIosList />,
    buttonName: "Create New News",
    buttonUrl: "/dashboard/create-news",
    type: "add",
  };

  const columns = [
    {
      name: "Artical Image",
      cell: (row) => (
        <img
          className="w-20 h-20 rounded-full border"
          src={
            row?.article_image
              ? `${process.env.REACT_APP_API_SERVER}${row?.article_image}`
              : ""
          }
          alt="images"
        />
      ),
    },
    {
      name: "Title & Date",
      cell: (row) => (
        <div className="flex flex-col space-y-1">
          {" "}
          {/* 🆕 এটি লাইন স্পেস ঠিক করবে */}
          <span className="font-semibold">{row?.title}</span>
          <span className=" text-sm">
            {formatDateInBengali(row?.updated_at)}
          </span>
        </div>
      ),
    },

    {
      name: "Content Name",
      selector: (row) => row.content,
      cell: (row) => {
        const contentText = row.content.replace(/<[^>]+>/g, ""); // Remove HTML tags
    
        return (
          <div className="">
            <p className="line-clamp-2 mb-2">{contentText}</p> {/* Limit the content to 2 lines */}
           
              <Link
                to={`/dashboard/single-content/${row?.article_id}`}
                className=" text-green-600 dark:text-gray-700 hover:underline mt-2"
              >
                See More
              </Link>
            
          </div>
        );
      },
    }
,    

    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2">
          <Link to={`/dashboard/edit-news/${row?.article_id}`}>
            <FaEdit className="text-primary text-xl" />
          </Link>
          <MdDelete
            className="text-red-500 text-xl cursor-pointer"
            onClick={() => destroy(row?.article_id)}
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
      <DataTable columns={columns}  theme={theme === "dark" ? "darkTheme" : "lightTheme"} data={news} pagination />
    </>
  );
};
