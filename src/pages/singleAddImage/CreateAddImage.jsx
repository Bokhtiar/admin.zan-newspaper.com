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

const CreateAddImage = () => {
  const [categories, setCategories] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

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
  const selectedNews = watch("news_id"); // News Dropdown থেকে সিলেক্ট হওয়া মান
const uploadedImage = watch("article_image"); // Image Upload ট্র্যাক করা

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
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const onFormSubmit = async (data) => {};
  const propsData = {
    pageTitle: " Add Single Item",
    pageIcon: <IoMdCreate />,
    buttonName: "News List",
    buttonUrl: "/dashboard/news",
    type: "list", // This indicates the page type for the button
  };
  return (
    <>
      <PageHeader propsData={propsData} />

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="mx-auto p-4 border border-gray-200 rounded-lg "
      >
        <div className="mt-4">
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
        </div>
        {!uploadedImage && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="mt-4">
            <SingleSelect
              name="newss"
              control={control}
              options={news}
              rules={{ required: "News selection is required" }}
              onSelected={(selected) => setValue("news_id", selected?.news_id)}
              placeholder="Select a News "
              error={errors.news?.message}
              label="Choose News *"
              isClearable={true}
              // error={errors} // Pass an error message if validation fails
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
              name="article_imagee"
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
                setValue("status", e.target.checked ? "upload_image" : "")
              }
              checked={selectedStatus === "upload_image"}
            />
            <label htmlFor="status" className="text-sm text-gray-700">
              Upload Image
            </label>
          </div>
        </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className={`px-4 py-2 text-white rounded-md transition mt-4 ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading} // Disable button when loading
        >
          {loading ? "Loading..." : "Add Single Item"}
        </button>
      </form>
    </>
  );
};

export default CreateAddImage;
