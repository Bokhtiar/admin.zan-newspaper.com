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

export const SeoList = () => {
  const [seo, setSeo] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Fetch categories from API
  const fetchSeo = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Category.seoPost({
        method:"get"
      });
        const result = response?.data?.data
        setSeo(result || []);
      
    } catch (error) {
      console.log(error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSeo();
  }, [fetchSeo]);

  
  const destroy = (id) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this seo?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const response = await NetworkServices.Categoryd.destroy(id);
              if (response?.status === 200) {
                Toastify.Info("Category deleted successfully.");
                fetchSeo();
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
    pageTitle: "Seo List",
    pageIcon: <IoIosList />,
    buttonName: "Create New Seo",
    buttonUrl: "/dashboard/seo",
    type: "add",
  };

  const columns = [

    {
      name: "Description",
      cell: (row) => row?.description,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2">

          <MdDelete
            className="text-red-500 text-xl cursor-pointer"
            onClick={() => destroy(row?.category_seo_id)}
          />
        </div>
      ),
    },
  ];
  return (
    <>
    <PageHeader propsData={propsData} />
      {loading ? (
        <ListSkeleton />
      ) : (
        <>
          <DataTable
            columns={columns}
            data={seo}
            pagination
          />
        </>
      )}
    </>
  );
};
