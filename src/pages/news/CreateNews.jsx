import React, { useCallback, useEffect, useRef, useState } from "react";

import { IoMdCreate } from "react-icons/io";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { useNavigate } from "react-router-dom";
import {
  ImageUpload,
  SingleSelect,
  TextAreaInput,
  TextInput,
} from "../../components/input";
import { networkErrorHandeller } from "../../utils/helper";
import { SkeletonTable } from "../../components/loading/skeleton-table";
import { PageHeader } from "../../components/pageHandle/pagehandle";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles

const CreateNews = () => {
  const [categories, setCategories] = useState([]);
  const [author, setAuthor] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editValue, seteditValue] = useState("");
  const quillRef = useRef(null);
  const [singleCategory, setSingleCategory] = useState([]);
  const [smallloading, setSmallLoading] = useState(false);

  console.log("categories", categories);
  console.log("singleCategory", singleCategory);

  const handleChange = (newValue) => {
    seteditValue(newValue); // Save editor content
  };

  const handleImageUpload = (file) => {
    const quill = quillRef.current.getEditor();
    const range = quill.getSelection();

    if (range) {
      const index = range.index;

      // Insert the image at the current cursor position
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result;
        // Insert the image into the editor
        quill.insertEmbed(index, "image", imageUrl);

        quill.setSelection(index + 1);
      };
      reader.readAsDataURL(file);
    }
  };

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

  const selectedCategory = watch("category_id");
  const selectedCategoryNumber = Number(selectedCategory); // Convert to number
  console.log("selectedCategory", selectedCategoryNumber);

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

  const fatchSingleCategory = useCallback(async () => {
    setSmallLoading(true);
    try {
      const response = await NetworkServices.Category.show(
        selectedCategoryNumber
      );

      if (response?.status === 200) {
        const result = response?.data?.data?.category_name;
        setSingleCategory(result);
      }
    } catch (error) {
      console.error("Fetch Category Error:", error);
    }
    setSmallLoading(false);
  }, [selectedCategoryNumber]);

  useEffect(() => {
    fatchSingleCategory();
  }, [fatchSingleCategory]);

  const fetchAuthor = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Author.index();
      if (response && response.status === 200) {
        const result = response.data.data.map((item, index) => {
          return {
            label: item.author_name,
            value: item.author_name,
            ...item,
          };
        });
        setAuthor(result);
      }
    } catch (error) {
      console.error("Fetch Author Error:", error);
    }
    setLoading(false); // End loading (handled in both success and error)
  }, []);

  // category api fetch
  useEffect(() => {
    fetchAuthor();
  }, [fetchAuthor]);

  // const onFormSubmit = async (data) => {

  //   const payload = {
  //     ...data,
  //     status: data.status ? 1 : 0,
  //   };

  //   console.log("payload", payload);
  //   try {
  //     setLoading(true);
  //     const response = await NetworkServices.Food.store(payload);
  //     console.log("objecttt", response);
  //     if (response && response.status === 200) {
  //       navigate("/dashboard/food");
  //       return Toastify.Success("Category Created.");
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //     networkErrorHandeller(error);
  //   }
  //   setLoading(false);
  // };

  const onFormSubmit = async (data) => {
    console.log("data", data);
    const formData = new FormData();

    // ফর্মের অন্যান্য ডাটা FormData তে অ্যাড করুন
    formData.append("category_id", data.category_id);
    formData.append("author_id", data.author_id);
    formData.append("title", data.title);
    formData.append("subtitle", data.subtitle);

    formData.append("status", data.status ? "1" : "0");
    formData.append("content", editValue);

    // ফাইল আপলোডের জন্য
    if (data.article_image) {
      formData.append("article_image", data.article_image);
    }
    if (data.video_url) {
      formData.append("video_url", data.video_url);
    }

    try {
      setLoading(true);
      const response = await NetworkServices.News.store(formData);

      console.log("response", response);
      if (response && response.status === 200) {
        // navigate("/dashboard/news");
        return Toastify.Success("News Created Successfully.");
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
    pageTitle: " Create News ",
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
            <SingleSelect
              name="author"
              control={control}
              options={author}
              // rules={{ required: "Category selection is required" }}
              onSelected={(selected) =>
                setValue("author_id", selected?.author_id)
              }
              placeholder="Select a Author "
              error={errors.author?.message}
              label="Choose Author*"
              isClearable={true}
              // error={errors} // Pass an error message if validation fails
            />
          </div>

          {/* category */}
          <div className="mt-4">
            <TextInput
              name="title"
              control={control}
              label="Title Name *"
              type="text"
              placeholder="Create Title"
              // rules={{ required: "Title is required" }}
              error={errors.title?.message} // Show error message
            />
          </div>
          {/* video title*/}
          {singleCategory === "ভিডিও" ? (
            <div className="mt-4">
              <TextInput
                name="video_url"
                control={control}
                label="Video URL *"
                type="text"
                placeholder="Enter Video URL"
                error={errors.video_url?.message} // Show error message
              />
            </div>
          ) : smallloading ? (
            <div className="w-[300px] h-[20px]">
              <SkeletonTable />
            </div>
          ) : (
            ""
          )}
        </div>

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
        {/* multiple image Upload */}

        <div className="mt-4">
          <TextAreaInput
            name="subtitle"
            control={control}
            label="subtitle *"
            type="text"
            placeholder="Enter subtitle"
            // rules={{ required: "subtitle is required" }}
            error={errors.subtitle?.message} // Show error message
          />
        </div>

        <div>
          <ReactQuill
            value={editValue}
            onChange={handleChange}
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["bold", "italic", "underline"],
                ["link", "image"], // Image button in the toolbar
                [{ align: [] }],
              ],
            }}
            formats={[
              "header",
              "font",
              "bold",
              "italic",
              "underline",
              "list",
              "link",
              "image",
              "align",
            ]}
            ref={quillRef}
            onImageUpload={handleImageUpload} // Handle image upload
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
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading} // Disable button when loading
        >
          {loading ? "Loading..." : "Create News"}
        </button>
      </form>
    </>
  );
};

export default CreateNews;
