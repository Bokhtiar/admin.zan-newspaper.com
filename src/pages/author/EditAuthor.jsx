
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { NetworkServices } from "../../network";
import { networkErrorHandeller } from "../../utils/helper";
import { Toastify } from "../../components/toastify";
import { ImageUpload, SingleSelect,  TextCheckbox,  TextInput } from "../../components/input";
import { FaRegEdit } from "react-icons/fa";
import { PageHeader } from "../../components/pageHandle/pagehandle";
import PageHeaderSkeleton from "../../components/loading/pageHeader-skeleton";
import CategoryFormSkeleton from "../../components/loading/exam-skeleton/examForm-skeleton";

const EditAuthor = () => {
  const { authorId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);
  const [author, setAuthor] = useState([]);


  const {
    
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    control,
  } = useForm({
    defaultValues: {
      status: 0,
    },
  });

  // Fetch the category details from the API and populate the form
  const fetchAuthor = async (authorId) => {
    setLoading(true);
    try {
      const response = await NetworkServices.Author.show(authorId);
      
      if (response && response.status === 200) {
        const author = response?.data?.data;
        setAuthor(author);

        setValue("author_name", author.author_name);
        setValue("designation", { label: author.designation, value: author.designation });
        setValue("status", author?.status=== 1 ? true : false);
      }
    } catch (error) {
      // console.error("Error fetching category:", error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (authorId) {
        fetchAuthor(authorId);
    }
  }, [authorId]);
  // edit category api
  const onFormSubmit = async (data) => {
    
    const formData = new FormData();
    console.log("object", data);

    formData.append("author_name", data?.author_name);
    formData.append("designation", data?.designation?.value);
    formData.append("status", data?.status ? "1" : "0");
 

    if (data.author_image) {
      formData.append("author_image", data.author_image); // Ensure file is uploaded
    }
    formData.append("_method", "PUT");

    try {
      setBtnLoading(true);
      const response = await NetworkServices.Author.update(
        authorId,
        formData
      );
      

      if (response && response.status === 200) {
        navigate("/dashboard/author");
        return Toastify.Success("Author Updated.");
      }
    } catch (error) {
      networkErrorHandeller(error);
    }finally{
      setBtnLoading(false);
    }
  };

  const propsData = {
    pageTitle: "Update Author",
    pageIcon: <FaRegEdit />,
    buttonName: "Author List",
    buttonUrl: "/dashboard/author",
    type: "list",
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
            rules={{ required: "Category is required" }} // Validation rule
            error={errors.author_name?.message} // Show error message
          />
        </div>

        {/* designation */}
        <div className="mt-4">
          <SingleSelect
            name="designation"
            control={control}
            options={[
                { label: "Reporter", value: "reporter" }, 
                { label: "Editor", value: "editor" },
                { label: "Moderator", value: "moderator" }, 
              ]}              
            // onSelected={(selected) =>
            //   setValue("designation", selected?.value)
            // }
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
            imgUrl={author?.author_image}
          />
        </div>

        <div className="flex items-center  mt-4 gap-2 ">
          <TextCheckbox
            type="checkbox"
            name="status"
            className=""
            control={control}
            onChange={(e) => setValue("status", e.target.checked ? 1 : 0)}
            checked={watch("status") == 1} // If status is 1, checked = true
          />
          <label htmlFor="status" className="text-sm text-gray-700 -mt-5">
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
          {btnloading ? "Loading..." : "Edit Author"}
        </button>
      </form>
    </>
  );
};

export default EditAuthor;
