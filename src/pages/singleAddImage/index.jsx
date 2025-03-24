import React, { useCallback, useEffect, useState } from "react";
import { IoIosList } from "react-icons/io";
import { PageHeader } from "../../components/pageHandle/pagehandle";
import { NetworkServices } from "../../network";
import { networkErrorHandeller } from "../../utils/helper";
import { confirmAlert } from "react-confirm-alert";
import { Toastify } from "../../components/toastify";
import { SkeletonTable } from "../../components/loading/skeleton-table";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DataTable from "react-data-table-component";

const SingleItemList = () => {
  const [loading, setLoading] = useState(false);
  const [imageItem, setimageItem] = useState([]);
  const navigate = useNavigate();
  const propsData = {
    pageTitle: "Single Item List",
    pageIcon: <IoIosList />,
    buttonName: "Create New SingleItem",
    buttonUrl: "/dashboard/create-singleaddimage",
    type: "add",
  };

  // Fetch categories from API
  const fetchSingleItem = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.SingleItem.index();
      console.log("uuu",response);
      if (response && response.status === 200) {
        setimageItem([response?.data?.data] || []);
      }
    } catch (error) {
      console.log(error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSingleItem();
  }, [fetchSingleItem]);

  // Handle single category deletion
  const destroy = (id) => {
    
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const response = await NetworkServices.SingleItem.destroy(id);
              if (response?.status === 200) {
               
                Toastify.Info(" deleted successfully.");
                navigate("/dashboard/create-singleaddimage");
                fetchSingleItem();
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
      const columns = [
        {
          name: "Thumbnail",
          cell: (row) => (
            <img
              className="w-10 h-10 rounded-full border"
              src={
                row?.image_url
                  ? `${process.env.REACT_APP_API_SERVER}${row?.image_url}`
                  : ""
              }
              alt="images"
            />
          ),
        },
        {
          name: "Image Type",
          cell: (row) => row?.image_type,
        },
  
        {
          name: "Action",
          cell: (row) => (
            <div className="flex gap-2">

              <MdDelete
                className="text-red-500 text-xl cursor-pointer"
                onClick={() => destroy(row?.homePageSingleImage_id)}
              />
            </div>
          ),
        },
      ];
  return (
    <>
      <PageHeader propsData={propsData} />
      <DataTable columns={columns} data={imageItem} pagination />
    </>
  );
};

export default SingleItemList;
