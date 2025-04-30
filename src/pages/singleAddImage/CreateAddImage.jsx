import React, { useCallback, useEffect, useState } from "react";
import {
  ImageUpload,
  SingleSelect,
  TextCheckbox,
  TextInput,
} from "../../components/input";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network";
import { PageHeader } from "../../components/pageHandle/pagehandle";
import { IoMdCreate } from "react-icons/io";
import { networkErrorHandeller } from "../../utils/helper";
import { Toastify } from "../../components/toastify";
import { Navigate, useNavigate } from "react-router-dom";
import PageHeaderSkeleton from "../../components/loading/pageHeader-skeleton";
import CategoryFormSkeleton from "../../components/loading/exam-skeleton/examForm-skeleton";

const CreateAddImage = () => {
  
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);

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
  const selectedStatus = watch("status");
  const selectedNews = watch("article_id");
  const uploadedImage = watch("article_image");
  console.log("selectedNews", selectedNews);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.News.index();
      console.log("response", response);
      if (response && response.status === 200) {
        const result = response?.data?.data?.map((item) => {
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
    console.log("Submitted Data:", data);

    try {
      setBtnLoading(true);

      // Create FormData object
      const formData = new FormData();
      if (data?.article_id) {
        formData.append("news_id", data?.article_id);
      }
      formData.append("image_type", data?.status);
      formData.append("status", data?.statuss ? "1" : "0");

      // Append category image if exists
      if (data?.article_image) {
        formData.append("image_url", data?.article_image);
      }

      console.log("FormData Entries:", [...formData.entries()]); // Debugging log

      // Send data to API
      const response = await NetworkServices.SingleItem.store(formData);
      console.log("API Response:", response);

      if (response && response.status === 200) {
        
        Toastify.Success("Created Single Item");
        navigate("/dashboard/singleaddimage");
      }
    } catch (error) {
      console.log("Error:", error);
      networkErrorHandeller(error);
    } finally {
      setBtnLoading(false);
    }
  };
  const propsData = {
    pageTitle: " Add Single Item",
    pageIcon: <IoMdCreate />,
    buttonName: "News List",
    buttonUrl: "/dashboard/singleaddimage",
    type: "list", // This indicates the page type for the button
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
        {!uploadedImage && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="mt-4">
              <SingleSelect
                name="news"
                control={control}
                options={news}
                // rules={{ required: "News selection is required" }}
                onSelected={(selected) =>
                  setValue("article_id", selected?.article_id)
                }
                placeholder="Select a News "
                error={errors.news?.message}
                label="Choose News *"
                isClearable={true}
              />
            </div>

            <div className="flex items-center mt-4 md:mt-10 gap-2">
              {/* Image Checkbox (Hide if News or Video is selected) */}
              {selectedStatus !== "news" && selectedStatus !== "video" && (
                <div className="flex items-center gap-2">
                  <TextCheckbox
                    type="checkbox"
                    name="status"
                    control={control}
                    className="w-5 h-5"
                    onChange={(e) =>
                      setValue("status", e.target.checked ? "image" : "")
                    }
                    checked={selectedStatus === "image"}
                  />
                  <label htmlFor="status" className="text-sm text-gray-700">
                    Image
                  </label>
                </div>
              )}

              {/* Video Checkbox (Hide if News or Image is selected) */}
              {selectedStatus !== "news" && selectedStatus !== "image" && (
                <div className="flex items-center gap-2">
                  <TextCheckbox
                    type="checkbox"
                    name="status"
                    control={control}
                    className="w-5 h-5"
                    onChange={(e) =>
                      setValue("status", e.target.checked ? "video" : "")
                    }
                    checked={selectedStatus === "video"}
                  />
                  <label htmlFor="status" className="text-sm text-gray-700">
                    Video
                  </label>
                </div>
              )}

              {/* News Checkbox (Hide if Video or Image is selected) */}
              {selectedStatus !== "video" && selectedStatus !== "image" && (
                <div className="flex items-center gap-2">
                  <TextCheckbox
                    type="checkbox"
                    name="status"
                    control={control}
                    className="w-5 h-5"
                    onChange={(e) =>
                      setValue("status", e.target.checked ? "news" : "")
                    }
                    checked={selectedStatus === "news"}
                  />
                  <label htmlFor="status" className="text-sm text-gray-700">
                    News
                  </label>
                </div>
              )}
            </div>
          </div>
        )}

        {/* <div className="flex items-center gap-2 mt-4">
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
        </div> */}
        {!selectedNews && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {/* Thumbnail Upload */}
            <div className="mt-4 cursor-pointer">
              <ImageUpload
                name="article_image"
                control={control}
                label="Article Image"
                file="image *"
                // required
                onUpload={(file) => setValue("article_image", file)}
                error={errors.article_image?.message}
              />
            </div>

            <div className="flex items-center gap-2 mt-4 md:mt-10 ">
              <TextCheckbox
                type="checkbox"
                name="status"
                control={control}
                className="w-5 h-5"
                onChange={(e) =>
                  setValue("status", e.target.checked ? "upload" : "")
                }
                checked={selectedStatus === "upload"}
              />
              <label htmlFor="status" className="text-sm text-gray-700">
                Upload Image
              </label>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 mt-4">
          <TextInput
            type="checkbox"
            name="statuss"
            className="w-5 h-5"
            control={control}
            onChange={(e) => setValue("statuss", e.target.checked ? 1 : 0)}
            checked={watch("statuss") === 1}
          />
          <label htmlFor="statuss" className="text-sm text-gray-700">
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
          {btnloading ? "Loading..." : "Add Single Item"}
        </button>
      </form>
    </>
  );
};

export default CreateAddImage;
