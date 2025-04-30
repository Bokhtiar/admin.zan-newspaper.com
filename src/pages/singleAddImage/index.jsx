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
import ListSkeleton from "../../components/loading/ListSkeleton";

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

  console.log("imageItem", imageItem);

  // Fetch categories from API
  const fetchSingleItem = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.SingleItem.index();
      console.log("uuu", response);
      if (response && response.status === 200) {
        setimageItem(response?.data?.data || {});
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

  if (loading) {
    return (
      <div>
        <ListSkeleton />
      </div>
    );
  }

  return (
    <>
      <PageHeader propsData={propsData} />
      <table
  border="1"
  cellPadding="10"
  style={{ width: "100%", marginTop: "20px", textAlign: "left" }}
>
  <thead>
    <tr>
      <th>Image</th>
      <th>Image Type</th>

    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        {imageItem?.image_url ? (
          <img src={`${process.env.REACT_APP_API_SERVER}${imageItem.image_url}`} alt="Uploaded" width="100" />
        ) : (
          <span>No Image</span>
        )}
      </td>
      <td>{imageItem?.image_type}</td>
      {/* <td>{item.name}</td>
      <td>{item.age}</td>
      <td>{item.profession}</td> */}
    </tr>
  </tbody>
</table>


    </>
  );
};

export default SingleItemList;
