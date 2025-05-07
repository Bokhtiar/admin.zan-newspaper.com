import React, { useCallback, useEffect, useState } from "react";
import { IoMdCreate } from "react-icons/io";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { useNavigate } from "react-router-dom";
import { ImageUpload, SingleSelect, TextInput } from "../../components/input";
import { networkErrorHandeller } from "../../utils/helper";
import CategoryFormSkeleton from "../../components/loading/exam-skeleton/examForm-skeleton";
import PageHeaderSkeleton from "../../components/loading/pageHeader-skeleton";
import { PageHeader } from "../../components/pageHandle/pagehandle";

const CreateAuthor = () => {
 
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


  const onFormSubmit = async (data) => {
    console.log("Submitted Data:", data);

    try {
      setBtnLoading(true);

      // Create FormData object
      const formData = new FormData();
      formData.append("author_name", data?.author_name);
      formData.append("designation", data?.designation);
      formData.append("status", data?.status ? "1" : "0");

      if (data?.author_image) {
        formData.append("author_image", data?.author_image);
      }

      console.log("FormData Entries:", [...formData.entries()]); // Debugging log

      // Send data to API
      const response = await NetworkServices.Author.store(formData);
      console.log("API Response:", response);

      if (response && response.status === 200) {
        navigate("/dashboard/author");
        Toastify.Success("Author Created successfully");
      }
    } catch (error) {
      console.log("Error:", error);
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
    pageTitle: " Create Author ",
    pageIcon: <IoMdCreate />,
    buttonName: "Author List",
    buttonUrl: "/dashboard/author",
    type: "list", // This indicates the page type for the button
  };
  return (
    <>
      <PageHeader propsData={propsData} />

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="mx-auto p-4 border border-gray-200 rounded-lg"
      >
        {/* Total Questions */}
        <div>
          <TextInput
            name="author_name"
            control={control}
            label="Author Name *"
            type="text"
            placeholder="Enter Author Name"
            rules={{ required: "Author name is required" }} // Validation rule
            error={errors.author_name?.message} // Show error message
          />
        </div>

        {/* designation */}
        <div className="mt-4">
          <SingleSelect
            name="designation_name"
            control={control}
            options={[
                { label: "Reporter", value: "reporter" }, 
                { label: "Editor", value: "editor" },
                { label: "Moderator", value: "moderator" }, 
              ]}              
            onSelected={(selected) =>
              setValue("designation", selected?.value)
            }
            placeholder="Select a Designation *"
            error={errors.designation_name?.message}
            label="Choose Designation *"
            isClearable={true}
          />
        </div>

        {/* Thumbnail Upload */}
        <div className="mt-4 cursor-pointer">
          <ImageUpload
            name="author_image"
            control={control}
            label="Category Picture"
            file="image *"
            // required
            onUpload={(file) => setValue("author_image", file)}
            error={errors.author_image?.message}
          />
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
          {btnloading ? "Loading..." : "Create Author"}
        </button>
      </form>
    </>
  );
};

export default CreateAuthor;
