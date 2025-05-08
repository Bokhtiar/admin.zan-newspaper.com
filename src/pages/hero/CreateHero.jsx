import React, { useCallback, useEffect, useRef, useState } from "react";

import { IoMdCreate } from "react-icons/io";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { useNavigate } from "react-router-dom";
import {
  ImageUpload,
  MultiSelect,
  SingleSelect,
  TextInput,
} from "../../components/input";
import { networkErrorHandeller } from "../../utils/helper";
import { SkeletonTable } from "../../components/loading/skeleton-table";
import { PageHeader } from "../../components/pageHandle/pagehandle";
import "react-quill/dist/quill.snow.css"; // import styles
import PageHeaderSkeleton from "../../components/loading/pageHeader-skeleton";
import CategoryFormSkeleton from "../../components/loading/exam-skeleton/examForm-skeleton";

const CreateHero = () => {
  const [loading, setLoading] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);

  console.log("news", news);

  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm({
    defaultValues: {
      status: 0,
    },
  });
  const selectedCategoryId = watch("category_id");
  console.log("selectedCategoryId",selectedCategoryId)
  const fetchCategory = useCallback(async () => {
    setLoading(true);
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
  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.News.index();
      console.log("response", response);
      if (response && response.status === 200) {
        const result = response?.data?.data?.data?.map((item) => {
          return {
            label: item.title,
            value: item.title,
            ...item,
          };
        });
        setNews(result);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const onFormSubmit = async (data) => {
    const array_news = data?.news?.map((item) => item?.article_id);
    const newsdata=data.news
   

    const value = {
      details: [
        { news_id: 1, type: "category" },
        { news_id: 2, type: "news" },
      ],
    };
    const payload = {
      details: [
        ...newsdata.map(id => ({ news_id: id, type: "news" })),
        { news_id: selectedCategoryId, type: "category" },
      ]
    };

    try {
      setBtnLoading(true);
      const response = await NetworkServices.Hero.store(payload);

      if (response && response.status === 200) {
        // navigate("/dashboard/hero");
        return Toastify.Success("Hero Section Created Successfully.");
      }
    } catch (error) {
      networkErrorHandeller(error);
    } finally {
      setBtnLoading(false);
    }
  };
  if (loading) {
    return (
      <>
        <PageHeaderSkeleton />
        <br />
        <CategoryFormSkeleton />
      </>
    );
  }
  const propsData = {
    pageTitle: " Create Hero  ",
    pageIcon: <IoMdCreate />,
    buttonName: "Hero List",
    buttonUrl: "/dashboard/hero",
    type: "list", // This indicates the page type for the button
  };
  return (
    <>
      <PageHeader propsData={propsData} />

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="mx-auto p-4 border border-gray-200 rounded-lg "
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="mt-4">
            <SingleSelect
              name="categories"
              control={control}
              options={categories}
              // rules={{ required: "Category selection is required" }}
              onSelected={(selected) =>
                setValue("category_id", selected?.category_id)
              }
              placeholder="Select a category "
              error={errors.category?.message}
              label="Choose category *"
              isClearable={true}
              // error={errors} // Pass an error message if validation fails
            />
          </div>
          <div className="mt-4">
            <MultiSelect
              name="news"
              control={control}
              options={news}
              placeholder="Select a news "
              error={errors.news?.message}
              rules={{ required: "Categories selection is required" }}
              label="Select News *"
              isClearable={true}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <TextInput
            type="checkbox"
            name="status"
            className="w-5 h-5"
            control={control}
            onChange={(e) => setValue("status", e.target.checked ? 1 : 0)}
            checked={watch("status") === 1}
          />
          <label htmlFor="status" className="text-sm text-gray-700">
            Status
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`px-4 py-2 text-white rounded-md transition mt-4 ${
            btnloading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={btnloading} // Disable button when loading
        >
          {btnloading ? "Loading..." : "Create News"}
        </button>
      </form>
    </>
  );
};

export default CreateHero;
