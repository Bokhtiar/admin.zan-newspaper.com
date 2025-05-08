import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  ImageUpload,
  SingleSelect,
  TextAreaInput,
  TextCheckbox,
  TextInput,
} from "../../components/input";
import { FaRegEdit } from "react-icons/fa";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { networkErrorHandeller } from "../../utils/helper";
import { PageHeader } from "../../components/pageHandle/pagehandle";
import PageHeaderSkeleton from "../../components/loading/pageHeader-skeleton";
import CategoryFormSkeleton from "../../components/loading/exam-skeleton/examForm-skeleton";

const Seo = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);
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

  const isAutoSeo = watch("is_auto_seo");

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
    console.log("data", data);

    const formData = new FormData();

    if (isAutoSeo == 1) {
        formData.append("id", data?.article_id?.article_id);
        formData.append("is_auto_seo", data?.is_auto_seo ? 1 : 0);
      } else {
        formData.append("article_id", data?.article_id?.article_id);
        formData.append("title", data?.title);
        formData.append("og_title", data?.og_title);
        formData.append("description", data?.description);
        formData.append("og_description", data?.og_description);
        // formData.append("content", value);
      }
      



    try {
      setBtnLoading(true);
      const response = await NetworkServices.Seo.store(
      
        formData
      );
      console.log("responsecc",response)
      if (response?.status === 201) {
        Toastify.Success("Seo create successfully");
        navigate("/dashboard/news");
      }
    } catch (error) {
      console.error("Update Error:", error);
    //   networkErrorHandeller(error);
    }
    setBtnLoading(false);
  };

  const propsData = {
    pageTitle: "Seo ",
    pageIcon: <FaRegEdit />,
    // buttonName: "News List",
    // buttonUrl: "/dashboard/news",
    // type: "list",
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

  return (
    <>
      <PageHeader propsData={propsData} />
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="mx-auto p-4 border border-gray-200 rounded-lg "
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {isAutoSeo == 1 ? (
            <>
              <div className="mt-4 w-full">
                <SingleSelect
                  name="article_id"
                  control={control}
                  options={news}
                  rules={{ required: "Artical selection is required" }}
                  onSelected={(selected) => {
                    console.log("selected", selected);
                    setValue("artical_id", selected?.artical_id);
                  }}
                  placeholder="Select an Article"
                  error={errors.category?.message}
                  label="Choose Article"
                  isClearable={true}
                />
              </div>
            </>
          ) : (
            <>
              <div className="mt-4 w-full">
                <SingleSelect
                  name="article_id"
                  control={control}
                  options={news}
                  rules={{ required: "Artical selection is required" }}
                  onSelected={(selected) => {
                    console.log("selected", selected);
                    setValue("artical_id", selected?.artical_id);
                  }}
                  placeholder="Select an Article"
                  error={errors.category?.message}
                  label="Choose Article"
                  isClearable={true}
                />
              </div>

              <div className="mt-4">
                <TextInput
                  name="title"
                  control={control}
                  label="Title Name"
                  type="text"
                  placeholder="Create Title"
                  error={errors.title?.message}
                />
              </div>

              <div className="mt-4">
                <TextInput
                  name="description"
                  control={control}
                  label="Description"
                  type="text"
                  placeholder="Create description"
                  error={errors.description?.message}
                />
              </div>

              <div className="mt-4">
                <TextInput
                  name="og_title"
                  control={control}
                  label="Og Title"
                  type="text"
                  placeholder="Og title"
                  error={errors.og_title?.message}
                />
              </div>

              <div className="mt-4">
                <TextInput
                  name="og_description"
                  control={control}
                  label="Og Description"
                  type="text"
                  placeholder="Og description"
                  error={errors.og_description?.message}
                />
              </div>
            </>
          )}
        </div>

        <div className="flex items-center  mt-4 gap-2 ">
          <TextCheckbox
            type="checkbox"
            name="is_auto_seo"
            className=""
            control={control}
            onChange={(e) => setValue("is_auto_seo", e.target.checked ? 1 : 0)}
            checked={watch("is_auto_seo") == 1} // If is_auto_seo is 1, checked = true
          />
          <label htmlFor="is_auto_seo" className="text-sm text-gray-700 ">
            Is auto seo
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
          {btnloading ? "Loading..." : "Create seo"}
        </button>
      </form>
    </>
  );
};

export default Seo;
