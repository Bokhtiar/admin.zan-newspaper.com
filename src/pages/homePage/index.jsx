import React, { useCallback, useEffect, useState } from "react";
import { NetworkServices } from "../../network";
import { networkErrorHandeller } from "../../utils/helper";
import { confirmAlert } from "react-confirm-alert";
import { Toastify } from "../../components/toastify";
import { SkeletonTable } from "../../components/loading/skeleton-table";
import { IoIosList } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { PageHeader } from "../../components/pageHandle/pagehandle";
import DataTable from "react-data-table-component";

const HomePage = () => {
  const [homeNews, setHomeNews] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("homeNews", homeNews);

  // Fetch categories from API
  const fetchHomeNews = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.HomeNews.index();
      console.log("rr", response);
      if (response && response.status === 200) {
        setHomeNews(response?.data?.data?.categories || []);
      }
    } catch (error) {
      console.log(error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchHomeNews();
  }, [fetchHomeNews]);

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
              const response = await NetworkServices.HomeNews.destroy(id);
              if (response?.status === 200) {
                Toastify.Info("Home News deleted successfully.");
                fetchHomeNews();
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
    pageTitle: "Home page News List",
    pageIcon: <IoIosList />,
    buttonName: "Create New Home News",
    buttonUrl: "/dashboard/create-homenews",
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

  return (
    <div>
      <PageHeader propsData={propsData} />
      <DataTable
        columns={columns}    
        data={homeNews}
        pagination
      />
    </div>
  );
};

export default HomePage;
