import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { IoIosList } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { formatDateInBengali, networkErrorHandeller } from "../../utils/helper";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import DataTable from "react-data-table-component";
import { PageHeader } from "../../components/pageHandle/pagehandle";
import { SingleSelect } from "../../components/input";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ListSkeleton from "../../components/loading/ListSkeleton";
import debounce from "lodash/debounce";

export const NewsList = () => {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [filters, setFilters] = useState({
    title: "",
    category: null,
    startDate: null,
    endDate: null,
  });

  const {
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm({ defaultValues: { category_id: null } });
  const category = watch("category_id");
  console.log("ffff", category);

  const fetchNews = useCallback(
    async (page = 1, limit = perPage) => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (filters.title) queryParams.append("title", filters.title);
        if (filters.category)
          queryParams.append("category_id", filters.category);
        if (filters.startDate)
          queryParams.append(
            "start_date",
            filters.startDate.toISOString().split("T")[0]
          );
        if (filters.endDate)
          queryParams.append(
            "end_date",
            filters.endDate.toISOString().split("T")[0]
          );
        queryParams.append("page", page);
        queryParams.append("limit", limit);

        const response = await NetworkServices.News.index(
          queryParams.toString()
        );
        if (response?.status === 200) {
          setNews(response?.data?.data?.data || []);
          setTotalRows(response?.data?.data?.total || 0);
        }
      } catch (error) {
        networkErrorHandeller(error);
      } finally {
        setLoading(false);
      }
    },
    [filters, perPage]
  );

  useEffect(() => {
    fetchNews(currentPage, perPage);
  }, [fetchNews, currentPage, perPage]);

  const handleTextChange = debounce((e) => {
    setFilters((prev) => ({ ...prev, title: e.target.value }));
    setCurrentPage(1);
  }, 500);

  // const handleCategoryChange = (selected) => {
  //   setValue("category_id", selected?.value);
  //   console.log("selected",selected)
  //   setFilters((prev) => ({ ...prev, category: selected?.value }));
  //   setCurrentPage(1);
  // };

  const handleStartDateChange = (date) => {
    setFilters((prev) => ({ ...prev, startDate: date }));
    setCurrentPage(1);
  };

  const handleEndDateChange = (date) => {
    setFilters((prev) => ({ ...prev, endDate: date }));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
  };
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: category,
    }));
    setCurrentPage(1); // Reset page when filter changes
  }, [category]);

  const fetchCategory = useCallback(async () => {
    try {
      const response = await NetworkServices.Category.index();
      if (response?.status === 200) {
        const result = response.data.data.map((item) => ({
          label: item.category_name,
          value: item.category_name,
          ...item,
        }));
        setCategories(result);
      }
    } catch (error) {
      console.error("Category Fetch Error", error);
    }
  }, []);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

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
                fetchNews(currentPage, perPage);
              }
            } catch (error) {
              networkErrorHandeller(error);
            }
          },
        },
        { label: "No" },
      ],
    });
  };

  const propsData = {
    pageTitle: "News List",
    pageIcon: <IoIosList />,
    buttonName: "Create New News",
    buttonUrl: "/dashboard/create-news",
    type: "add",
  };

  const columns = [
    {
      name: "Article Image",
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
          <span className="font-semibold">{row?.title}</span>
          <span className="text-sm">
            {formatDateInBengali(row?.updated_at)}
          </span>
        </div>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <Link to={`/dashboard/edit-news/${row?.slug}`}>
            <FaEdit className="text-primary text-xl" />
          </Link>
          <MdDelete
            className="text-red-500 text-xl cursor-pointer"
            onClick={() => destroy(row.article_id)}
          />
        </div>
      ),
    },
  ];

  return (
    <section className="space-y-4">
      <PageHeader propsData={propsData} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          onChange={handleTextChange}
          type="text"
          placeholder="Search title"
          className="border p-2 rounded-md"
        />
        <SingleSelect
          name="category_id"
          control={control}
          error={errors.category_id?.message}
          options={categories}
          
          
          isClearable
          onSelected={(selected) =>
            setValue("category_id", selected?.category_id)
          }
          placeholder="Select Category"
          // onChange={handleCategoryChange}
        />
        <DatePicker
          selected={filters.startDate}
          onChange={handleStartDateChange}
          placeholderText="Start Date"
          className="border p-2 rounded-md w-full"
        />
        <DatePicker
          selected={filters.endDate}
          onChange={handleEndDateChange}
          placeholderText="End Date"
          className="border p-2 rounded-md w-full"
        />
      </div>



      {loading ? (
        <ListSkeleton />
      ) : (
        <DataTable
        columns={columns}
        data={news}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        // progressComponent={<ListSkeleton />}
      />
      )}
    </section>
  );
};
