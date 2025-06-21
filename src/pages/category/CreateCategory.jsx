import React, { useCallback, useEffect, useState } from "react";
import { IoMdCreate } from "react-icons/io";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { useNavigate } from "react-router-dom";
import { ImageUpload, SingleSelect, TextAreaInput, TextInput } from "../../components/input";
import { networkErrorHandeller } from "../../utils/helper";
import { PageHeader } from "../../components/pageHandle/pagehandle";
import CategoryFormSkeleton from "../../components/loading/exam-skeleton/examForm-skeleton";
import PageHeaderSkeleton from "../../components/loading/pageHeader-skeleton";

const CreateCategory = () => {
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
    // console.log("Submitted Data:", data);

    try {
      setBtnLoading(true);
      const formData = new FormData();
      formData.append("category_name", data.category_name);
      formData.append("status", data?.status ? "1" : "0");
      formData.append("isNavbar", data?.isNavber ? "1" : "0");

      // Append parent_id if exists
      if (data?.singleSelect?.category_id) {
        formData.append("parent_id", data?.singleSelect?.category_id);
      }

      // Append category image if exists
      if (data?.category_image) {
        formData.append("category_image", data?.category_image);
      }

      console.log("FormData Entries:", [...formData.entries()]); // Debugging log

      // Send data to API
      const response = await NetworkServices.Category.store(formData);
      console.log("API Response:", response);

      if (response && response.status === 200) {
        navigate("/dashboard/category");
        Toastify.Success("Category Created.");
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
    pageTitle: " Create Category ",
    pageIcon: <IoMdCreate />,
    buttonName: "Category List",
    buttonUrl: "/dashboard/category",
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
          <SingleSelect
            name="seoSelect"
            control={control}
            options={categories}
            onSelected={(selected) =>
              setValue("seoCategory_id", selected?.category_id)
            }
            placeholder="Select a seo  category "
            error={errors.singleSelect?.message}
            label="Choose Seo Category "
            isClearable={true}
            // error={errors} // Pass an error message if validation fails
          />
        </div>

        {/* Total Questions */}
        <div>
          <TextInput
            name="category_name"
            control={control}
            label="Category *"
            type="text"
            placeholder="Create Category"
            rules={{ required: "Category is required" }} // Validation rule
            error={errors.category_name?.message} // Show error message
          />
        </div>

        {/* Thumbnail Upload */}
        {/* <div className="mt-4 cursor-pointer">
          <ImageUpload
            name="category_image"
            control={control}
            label="Category Picture"
            file="image *"
            // required
            onUpload={(file) => setValue("category_image", file)}
            error={errors.category_image?.message}
          />
        </div> */}

        <div className="flex items-center gap-2 mt-4">
          <TextInput
            type="checkbox"
            name="isNavber"
            className="w-5 h-5"
            control={control}
            onChange={(e) => setValue("isNavber", e.target.checked ? 1 : 0)}
            checked={watch("isNavber") === 1}
          />
          <label htmlFor="status" className="text-sm text-gray-700">
            Is Navber
          </label>
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

        <div className="mb-4">
          <SingleSelect
            name="singleSelect"
            control={control}
            options={categories}
            onSelected={(selected) =>
              setValue("category_id", selected?.category_id)
            }
            placeholder="Select a category "
            error={errors.singleSelect?.message}
            label="Choose Parent category *"
            isClearable={true}
            // error={errors} // Pass an error message if validation fails
          />
        </div>

        <div className="mt-4">
          <TextAreaInput
            name="description"
            control={control}
            label=" "
            type="text"
            placeholder="Enter subtitle"
            // rules={{ required: "subtitle is required" }}
            error={errors.subtitle?.message} // Show error message
          />
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
          {btnloading ? "Loading..." : "Create Category"}
        </button>
      </form>
    </>
  );
};

export default CreateCategory;
