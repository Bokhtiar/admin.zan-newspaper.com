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
import PageHeaderSkeleton from "../../components/loading/pageHeader-skeleton";
import CategoryFormSkeleton from "../../components/loading/exam-skeleton/examForm-skeleton";

const CreateNews = () => {
  const [categories, setCategories] = useState([]);
  const [author, setAuthor] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);
  const [editValue, seteditValue] = useState("");
  const quillRef = useRef(null);
  const [singleCategory, setSingleCategory] = useState([]);
  const [smallloading, setSmallLoading] = useState(false);

  console.log("categories", categories);
  console.log("singleCategory", singleCategory);

  const handleChange = (newValue) => {
    seteditValue(newValue); // Save editor content
  };

  const handlePaste = (e) => {
    e.preventDefault(); // Prevent default paste behavior

    // Get the pasted content
    const pastedContent = e.clipboardData.getData("text/plain");

    // Sanitize the pasted content (Remove non-ASCII characters or unwanted symbols)
    const sanitizedText = pastedContent.replace(/[^\x20-\x7E]/g, ""); // Keep only ASCII characters

    // Get Quill editor and the current selection
    const quill = quillRef.current.getEditor();
    const range = quill.getSelection();

    if (range) {
      // Ensure cursor position is within valid bounds (not beyond the document length)
      const maxIndex = quill.getLength(); // Get the current length of content
      const validIndex = Math.min(range.index, maxIndex - 1); // Prevent inserting content beyond the editor's length

      // Insert sanitized content at the current cursor position
      quill.insertText(validIndex, sanitizedText);

      // Adjust the selection after inserting the text
      quill.setSelection(validIndex + sanitizedText.length);
    }
  };
const handleImageUpload = (file) => {
    const quill = quillRef.current.getEditor();
    const range = quill.getSelection();

    if (range) {
      const index = range.index;

      // Ensure cursor position is within the valid range of the document length
      const maxIndex = quill.getLength();
      const validIndex = Math.min(index, maxIndex - 1);

      // Insert image at the valid index
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result;
        quill.insertEmbed(validIndex, "image", imageUrl);

        // Adjust the selection after inserting the image
        quill.setSelection(validIndex + 1);
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
      setBtnLoading(true);
      const response = await NetworkServices.News.store(formData);

      console.log("response", response);
      if (response && response.status === 200) {
        navigate("/dashboard/news");
        return Toastify.Success("News Created Successfully.");
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

          <div className="mt-4">
            <SingleSelect
              name="author"
              control={control}
              options={author}
              rules={{ required: "Category selection is required" }}
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
              rules={{ required: "Title is required" }}
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
            label="subtitle "
            type="text"
            placeholder="Enter subtitle"
            // rules={{ required: "subtitle is required" }}
            error={errors.subtitle?.message} // Show error message
          />
        </div>

        <div className="">
          <label className="block mb-2 text-sm font-medium text-gray-700 mt-4 ">
            Content
          </label>
          <ReactQuill
            className="font-bangla  "
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

export default CreateNews;
