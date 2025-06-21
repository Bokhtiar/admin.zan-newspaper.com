
import React, { useCallback,  useEffect, useState } from "react";
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

export const HeroList = () => {
  const [hero, setHero] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("hero",hero)
 

 

  // Fetch categories from API
  const fetchHero = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Hero.index();
      console.log("r",response)
     
      if (response && response.status === 200) {
        setHero(response?.data?.data || []);
      }
    } catch (error) {
   
      networkErrorHandeller(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchHero();
  }, [fetchHero]);

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
              const response = await NetworkServices.Hero.destroy(id);
              if (response?.status === 200) {
                Toastify.Info("Hero deleted successfully.");
                fetchHero();
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
      name: "Type",
      cell: (row) => row?.type,
    },

    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2">
          <Link to={`/dashboard/edit-hero/${row?.homeHero_id}`}>
            <FaEdit className="text-primary text-xl" />
          </Link>
          <MdDelete
            className="text-red-500 text-xl cursor-pointer"
            onClick={() => destroy(row?.homeHero_id)}
          />
        </div>
      ),
    },
  ];



  return (
    <>
      <PageHeader propsData={propsData} />

      <DataTable
        columns={columns}
        data={hero}
        pagination
      />
    </>
  );
};
