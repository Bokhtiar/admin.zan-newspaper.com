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
import { DateInput, SingleSelect } from "../../components/input";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ListSkeleton from "../../components/loading/ListSkeleton";

export const NewsList = () => {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  

  console.log("news", news);
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues,
    control,
  } = useForm({
    defaultValues: {
      status: 0,
    },
  });
  const category = watch("category_id");
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // console.log("first", startDate);
  // console.log("first", endDate);

  const handleTextChange = (e) => {
    const name = e.target.value;
    // console.log(name);
    setTimeout(() => {
      setTitle(name);
    }, 500);
    // setTitle(e.target.value);
  };

  const fetchNews = async () => {
    setLoading(true);
    try {
      // Construct the query parameters
      const queryParams = new URLSearchParams();
      if (title) queryParams.append("title", title);
      if (category) queryParams.append("category_id", category);

      if (startDate) queryParams.append("start_date", startDate);
      if (endDate) queryParams.append("end_date", endDate);

      const response = await NetworkServices.News.index(queryParams.toString());
      // console.log(response);

      if (response && response.status === 200) {
        setNews(response?.data?.data?.data || []);
      }
    } catch (error) {
      // console.log(error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchNews();
  }, [title, category, endDate]);

  const fetchCategory = useCallback(async () => {
    // setLoading(true);
    try {
      const response = await NetworkServices.Category.index();
      if (response && response.status === 200) {
        const result = response.data.data.map((item, index) => {
          return {
            label: item.category_name,
            value: item.category_name,
            ...item,
          };
        });
        setCategories(result);
      }
    } catch (error) {
      console.error("Fetch Category Error:", error);
    }
    setLoading(false); // End loading (handled in both success and error)
  }, []);

  // category api fetch
  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

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
            <p className="line-clamp-2 mb-2">{contentText}</p>{" "}
            {/* Limit the content to 2 lines */}
            <Link
              to={`/dashboard/single-content/${row?.slug}`}
              className=" text-green-600 dark:text-gray-700 hover:underline mt-2"
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
          // error={errors} // Pass an error message if validation fails
        />
        <div className="">
          <label
            htmlFor="textInput"
            className="block text-sm  text-gray-500 mb-1"
          >
            Text Input:
          </label>
          <input
            id="textInput"
            type="text"
            // value={title}
            onChange={handleTextChange}
            className="w-full px-4 py-3 border rounded-lg   focus:outline-none"
            placeholder="Enter text"
          />
        </div>

        <div className="">
          <label className="block text-sm text-gray-500 mb-1">
            Start Date:
          </label>
          <DatePicker
            selected={startDate ? new Date(startDate) : null}
            onChange={(date) => {
              const formattedDate = date.toISOString().split("T")[0];
              setStartDate(formattedDate);
            }}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select start date"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none"
          />
        </div>

        <div className="">
          <label className="block text-sm text-gray-500 mb-1">End Date:</label>
          <DatePicker
            selected={endDate ? new Date(endDate) : null}
            onChange={(date) => {
              const formattedDate = date.toISOString().split("T")[0];
              setEndDate(formattedDate);
            }}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select end date"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-5">
        <DataTable    columns={columns} data={news} pagination />
      </div>
    </>
  );
};
