import React, { useCallback, useEffect, useState } from "react";
import { IoMdCreate } from "react-icons/io";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";

import { useNavigate } from "react-router-dom";

import {
  ImageUpload,
  MultiSelect,
  TextInput,
} from "../../components/input";
import { networkErrorHandeller } from "../../utils/helper";
import { PageHeader } from "../../components/pageHandle/pagehandle";
import PageHeaderSkeleton from "../../components/loading/pageHeader-skeleton";
import CategoryFormSkeleton from "../../components/loading/exam-skeleton/examForm-skeleton";

const CreateHomePage = () => {
  const [categories, setCategories] = useState([]);
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

  const image1 = watch("section_image1");
  const image2 = watch("section_image2");
  const image3 = watch("section_image3");
  const image4 = watch("section_image4");
  const image5 = watch("section_image5");

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

  const onFormSubmit = async (data) => { 

    const array_category = data?.categories?.map((item) => item?.category_id);
 

    try {
      setBtnLoading(true);

      // Create FormData object
      const formData = new FormData();
      formData.append("section_category_id", JSON.stringify(array_category));

      formData.append("status", data?.status ? "1" : "0");
      formData.append("link1", data?.link_1);
      formData.append("link2", data?.link_2);
      formData.append("link3", data?.link_3);
      formData.append("link4", data?.link_4);
      formData.append("link5", data?.link_5);

      // Append category image if exists
      if (data?.section_image1) {
        formData.append("section_image1", data?.section_image1);
      }
      if (data?.section_image2) {
        formData.append("section_image2", data?.section_image2);
      }
      if (data?.section_image3) {
        formData.append("section_image3", data?.section_image3);
      }
      if (data?.section_image4) {
        formData.append("section_image4", data?.section_image4);
      }
      if (data?.section_image5) {
        formData.append("section_image5", data?.section_image5);
      }

 

      // Send data to API
      const response = await NetworkServices.HomeNews.store(formData);
      

      if (response && response.status === 200) {
        navigate("/dashboard/home-news");
        Toastify.Success(" Create Home Layout");
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
    pageTitle: " Create Home Layout ",
    pageIcon: <IoMdCreate />,
    buttonName: "Home Layout List",
    buttonUrl: "/dashboard/home-news",
    type: "list", // This indicates the page type for the button
  };
  return (
    <>
      <PageHeader propsData={propsData} />

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="mx-auto p-4 border border-gray-200 rounded-lg"
      >
        <div className="mb-4">
          <MultiSelect
            name="categories"
            control={control}
            options={categories}
            placeholder="Select a category "
            error={errors.categories?.message}
            rules={{ required: "Categories selection is required" }}
            label="Choose Parent category *"
            isClearable={true}
            // error={errors} // Pass an error message if validation fails
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
          {/* Thumbnail Upload */}
          <div className="mt-4 cursor-pointer">
            <ImageUpload
              name="section_image1"
              control={control}
              label="Ads 1"
              file="image *"
              // required
              onUpload={(file) => setValue("section_image1", file)}
              error={errors.category_image1?.message}
            />
          </div>

          {image1 && (
            <div className="mt-4">
              <TextInput
                name="link_1"
                control={control}
                label="Link 1"
                type="text"
                placeholder="Enter link"
                // rules={{ required: "Category is required" }}
                error={errors.link_1?.message}
              />
            </div>
          )}
          {/* Thumbnail Upload */}
          <div className="mt-4 cursor-pointer">
            <ImageUpload
              name="section_image2"
              control={control}
              label="Ads 2"
              file="image *"
              // required
              onUpload={(file) => setValue("section_image2", file)}
              error={errors.category_image2?.message}
            />
          </div>
          {image2 && (
            <div className="mt-4">
              <TextInput
                name="link_2"
                control={control}
                label="Link 2"
                type="text"
                placeholder="Enter link"
                // rules={{ required: "Category is required" }}
                error={errors.link_2?.message}
              />
            </div>
          )}
          {/* Thumbnail Upload */}
          <div className="mt-4 cursor-pointer">
            <ImageUpload
              name="section_image3"
              control={control}
              label="Ads 3"
              file="image *"
              // required
              onUpload={(file) => setValue("section_image3", file)}
              error={errors.category_image3?.message}
            />
          </div>
          {image3 && (
            <div className="mt-4">
              <TextInput
                name="link_3"
                control={control}
                label="Link 3"
                type="text"
                placeholder="Enter link"
                // rules={{ required: "Category is required" }}
                error={errors.link_3?.message}
              />
            </div>
          )}
          {/* Thumbnail Upload */}
          <div className="mt-4 cursor-pointer">
            <ImageUpload
              name="section_image4"
              control={control}
              label="Ads 4"
              file="image *"
              // required
              onUpload={(file) => setValue("section_image4", file)}
              error={errors.category_image4?.message}
            />
          </div>
          {image4 && (
            <div className="mt-4">
              <TextInput
                name="link_4"
                control={control}
                label="Link 4"
                type="text"
                placeholder="Enter link"
                // rules={{ required: "Category is required" }}
                error={errors.link_4?.message}
              />
            </div>
          )}
          {/* Thumbnail Upload */}
          <div className="mt-4 cursor-pointer">
            <ImageUpload
              name="section_image5"
              control={control}
              label="Ads 5"
              file="image *"
              // required
              onUpload={(file) => setValue("section_image5", file)}
              error={errors.category_image5?.message}
            />
          </div>
          {image5 && (
            <div className="mt-4">
              <TextInput
                name="link_5"
                control={control}
                label="Link 5"
                type="text"
                placeholder="Enter link"
                // rules={{ required: "Category is required" }}
                error={errors.link_5?.message}
              />
            </div>
          )}
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
          {btnloading ? "Loading..." : "Create Home "}
        </button>
      </form>
    </>
  );
};

export default CreateHomePage;
