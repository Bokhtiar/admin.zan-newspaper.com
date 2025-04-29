import React, { useCallback, useEffect, useState } from "react";
import { IoMdCreate } from "react-icons/io";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";

import { useNavigate } from "react-router-dom";

import { ImageUpload, MultiSelect, SingleSelect, TextInput } from "../../components/input";
import { networkErrorHandeller } from "../../utils/helper";
import { SkeletonTable } from "../../components/loading/skeleton-table";
import { PageHeader } from "../../components/pageHandle/pagehandle";

const CreateHomePage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // const onFormSubmit = async (data) => {
  //   console.log("data".data)
  //   const result = data?.status ? "1" : "0";
  //   const newObj = { ...data, status: result,parent_id:data?.singleSelect?.category_id};
  //   console.log("object", newObj);
  //   try {
  //     setLoading(true);
  //     const response = await NetworkServices.Category.store(newObj);
  //     console.log("objecttt", response);
  //     if (response && response.status === 200) {
  //       navigate("/dashboard/category");
  //       return Toastify.Success("Category Created.");
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //     networkErrorHandeller(error);
  //   }
  //   setLoading(false);
  // };
  const onFormSubmit = async (data) => {
    console.log("Submitted Data:", data);

  const array_category =data?.categories?.map((item)=>item?.category_id)

  console.log("array_category",array_category)


    try {
      setLoading(true);

      // Create FormData object
      const formData = new FormData();
      formData.append("section_category_id",JSON.stringify(array_category));
      
      formData.append("status", data?.status ? "1" : "0");
      
      // Append category image if exists
      if (data?.category_image1) {
        formData.append("section_image1", data?.category_image1);
      }
      if (data?.category_image2) {
        formData.append("section_image2", data?.category_image2);
      }
      if (data?.category_image3) {
        formData.append("section_image3", data?.category_image3);
      }
      if (data?.category_image4) {
        formData.append("section_image4", data?.category_image4);
      }
      if (data?.category_image5) {
        formData.append("section_image5", data?.category_image5);
      }

      console.log("FormData Entries:", [...formData.entries()]); 

      // Send data to API
      const response = await NetworkServices.HomeNews.store(formData);
      console.log("API Response:", response);

      if (response && response.status === 200) {
        navigate("/dashboard/home-news");
        Toastify.Success("Category Created.");
      }
    } catch (error) {
      console.log("Error:", error);
      networkErrorHandeller(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        {" "}
        <SkeletonTable />
        <br />
      </div>
    );
  }
  const propsData = {
    pageTitle: " Create Category ",
    pageIcon: <IoMdCreate />,
    buttonName: "Category List",
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
              label="Category Picture"
              file="image *"
              // required
              onUpload={(file) => setValue("section_image1", file)}
              error={errors.category_image1?.message}
            />
          </div>
          {/* Thumbnail Upload */}
          <div className="mt-4 cursor-pointer">
            <ImageUpload
              name="section_image2"
              control={control}
              label="Category Picture"
              file="image *"
              // required
              onUpload={(file) => setValue("section_image2", file)}
              error={errors.category_image2?.message}
            />
          </div>
          {/* Thumbnail Upload */}
          <div className="mt-4 cursor-pointer">
            <ImageUpload
              name="section_image3"
              control={control}
              label="Category Picture"
              file="image *"
              // required
              onUpload={(file) => setValue("section_image3", file)}
              error={errors.category_image3?.message}
            />
          </div>
          {/* Thumbnail Upload */}
          <div className="mt-4 cursor-pointer">
            <ImageUpload
              name="section_image4"
              control={control}
              label="Category Picture"
              file="image *"
              // required
              onUpload={(file) => setValue("section_image4", file)}
              error={errors.category_image4?.message}
            />
          </div>
          {/* Thumbnail Upload */}
          <div className="mt-4 cursor-pointer">
            <ImageUpload
              name="section_image5"
              control={control}
              label="Category Picture"
              file="image *"
              // required
              onUpload={(file) => setValue("section_image5", file)}
              error={errors.category_image5?.message}
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
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading} // Disable button when loading
        >
          {loading ? "Loading..." : "Create Home "}
        </button>
      </form>
    </>
  );
};

export default CreateHomePage;
