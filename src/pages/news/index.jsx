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
import { TbSeo } from "react-icons/tb";

export const NewsList = () => {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  const {
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm({
    defaultValues: {
      status: 0,
    },
  });

  const category = watch("category_id");
  // const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [text, setText] = useState("");
  const [filteredText, setFilteredText] = useState("");

  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilteredText(text); // 1 second পরে সেট হবে
      console.log("Filtered with:", text); // এখানে filter বা search call করো
    }, 500);

    return () => clearTimeout(timer); // আগের টাইমার মুছে ফেলবে
  }, [text]);

  const handlePageChange = (page) => {
    if (!loading) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
  };

  const fetchNews = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (filteredText) queryParams.append("title", filteredText);
      if (category) queryParams.append("category_id", category);
      if (startDate) queryParams.append("start_date", startDate);
      if (endDate) queryParams.append("end_date", endDate);
      queryParams.append("page", currentPage);
      queryParams.append("per_page", perPage);

      const response = await NetworkServices.News.index(queryParams.toString());

      if (response && response.status === 200) {
        setNews(response?.data?.data?.data || []);
        setTotalRows(response?.data?.data?.total || 0); // Set total row count for pagination
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, [filteredText, category, endDate, currentPage, perPage]);

  const fetchCategory = useCallback(async () => {
    try {
      const response = await NetworkServices.Category.index();
      if (response && response.status === 200) {
        const result = response.data.data.map((item) => ({
          label: item.category_name,
          value: item.category_name,
          ...item,
        }));
        setCategories(result);
      }
    } catch (error) {
      console.error("Fetch Category Error:", error);
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
        <ListSkeleton />
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
          <span className="font-semibold">{row?.title}</span>
          <span className="text-sm">
            {formatDateInBengali(row?.updated_at)}
          </span>
        </div>
      ),
    },
    {
      name: "Content Name",
      selector: (row) => row.content,
      cell: (row) => {
        const contentText = row.content.replace(/<[^>]+>/g, "");

        return (
          <div>
            <p className="line-clamp-2 mb-2">{contentText}</p>
            <Link
              to={`/dashboard/single-content/${row?.slug}`}
              className="text-green-600 dark:text-gray-700 hover:underline mt-2"
            >
              See More
            </Link>
          </div>
        );
      },
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2">
          <Link to={`/dashboard/edit-news/${row?.slug}`}>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <SingleSelect
          name="categories"
          control={control}
          options={categories}
          rules={{ required: "Category selection is required" }}
          onSelected={(selected) =>
            setValue("category_id", selected?.category_id)
          }
          placeholder="Select a category "
          error={errors.category?.message}
          label="Choose category *"
          isClearable={true}
        />
        <div>
          <label
            htmlFor="textInput"
            className="block text-sm text-gray-500 mb-1"
          >
            Text Input:
          </label>
          <input
            id="textInput"
            type="text"
            // value={title}
            onChange={handleTextChange}
            className="w-full px-4 py-3 rounded-lg focus:outline-none border bg-lightCard dark:bg-darkCard border-lightBorder  dark:border-darkBorder"
            placeholder="Enter text"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Start Date:
          </label>
          <DatePicker
            selected={startDate ? new Date(startDate) : null}
            onChange={(date) => {
              if (date) {
                const formattedDate = date.toISOString().split("T")[0];
                setStartDate(formattedDate);
              } else {
                setStartDate(""); // অথবা null, যেটা তোমার লজিকে ঠিক
              }
            }}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select start date"
            className="w-full px-4 py-3  rounded-lg focus:outline-none border bg-lightCard dark:bg-darkCard border-lightBorder  dark:border-darkBorder"
            isClearable // 👉 এটা দিলে clear button দেখাবে
          />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1 ">End Date:</label>
          <DatePicker
            selected={endDate ? new Date(endDate) : null}
            onChange={(date) => {
              if (date) {
                const formattedDate = date.toISOString().split("T")[0];
                setEndDate(formattedDate);
              } else {
                setEndDate(""); // বা null, যেটা তুমি হ্যান্ডেল করো
              }
            }}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select end date"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none  bg-lightCard dark:bg-darkCard border-lightBorder  dark:border-darkBorder"
            isClearable
          />
        </div>
      </div>

      <div className="mt-5">
        <DataTable
          columns={columns}
          data={news}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          paginationPerPage={perPage}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          paginationDefaultPage={currentPage}
          // selectableRows
        />
      </div>
    </>
  );
};
