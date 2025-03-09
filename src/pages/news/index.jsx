import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { IoIosList } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { networkErrorHandeller } from "../../utils/helper";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { SkeletonTable } from "../../components/loading/skeleton-table";
import DataTable from "react-data-table-component";
import { PageHeader } from "../../components/pageHandle/pagehandle";

export const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);
  const handleExpandClick = (rowId) => {
    // Toggle the row expansion
    setExpandedRows((prev) =>
      prev.includes(rowId)
        ? prev.filter((id) => id !== rowId)
        : [...prev, rowId]
    );
  };

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
          className="w-28 h-28 rounded-full border"
          src={row?.article_image ? `${row?.article_image}` : ""}
          alt="images"
        />
      ),
    },

    {
      name: "Content Name",
      selector: (row) => row.content,
      cell: (row) => {
        const contentText = row.content.replace(/<[^>]+>/g, ""); // Remove HTML tags
        const shortContent =
          contentText.length > 300
            ? contentText.substring(0, 300)
            : contentText;

        return (
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html: expandedRows.includes(row?.article_id)
                  ? contentText
                  : shortContent,
              }}
            />
            {contentText.length > 300 && (
              <button
                onClick={() => handleExpandClick(row?.article_id)}
                className="text-blue-500 hover:underline"
              >
                {expandedRows.includes(row?.article_id)
                  ? "See Less"
                  : "See More"}
              </button>
            )}
          </div>
        );
      },
    },

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

  return (
    <>
      <PageHeader propsData={propsData} />
      <DataTable columns={columns} data={news} pagination />
    </>
  );
};
