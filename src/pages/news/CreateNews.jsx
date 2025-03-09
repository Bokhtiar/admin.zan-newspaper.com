import React, { useCallback, useEffect, useState } from "react";

import { IoMdCreate } from "react-icons/io";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";

import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill"; // React Quill import
import "react-quill/dist/quill.snow.css";

import {
  ImageUpload,
  SingleSelect,
  TextAreaInput,
  TextInput,
} from "../../components/input";
import { networkErrorHandeller } from "../../utils/helper";
import { SkeletonTable } from "../../components/loading/skeleton-table";
import { PageHeader } from "../../components/pageHandle/pagehandle";

const CreateNews = () => {
  const [categories, setCategories] = useState([]);
  const [author, setAuthor] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editorValue, setEditorValue] = useState("");


  console.log("author",author)
  console.log("editorValue",editorValue)

  const navigate = useNavigate();

  // কার্সারের সমস্যা ফিক্স করা
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        const quill = document.querySelector(".ql-editor");
        if (quill) {
          quill.focus(); // কার্সার ঠিকমতো ফোকাস করবে
        }
      }, 0);
    }
  }, [editorValue]); // যখনই value আপডেট হবে, তখন এটি চলবে

  const handleChange = (value) => {
    setEditorValue(value);
  };

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

    console.log("data",data)
    const formData = new FormData();
  
    // ফর্মের অন্যান্য ডাটা FormData তে অ্যাড করুন
    formData.append("category_id", data.category_id);
    formData.append("author_id", data.author_id); // যদি থাকে
    formData.append("title", data.title);
    formData.append("subtitle", data.subtitle);
    
    formData.append("status", data.status ? "1" : "0");
    formData.append("content", editorValue);
  
    // ফাইল আপলোডের জন্য
    if (data.article_image) {
      formData.append("article_image", data.article_image);
    }
    
  
    try {
      setLoading(true);
      const response = await NetworkServices.News.store(formData);

      console.log("response",response)
      if (response && response.status === 200) {
        navigate("/dashboard/news");
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
              error={errors.category?.message}
              label="Choose Author*"
              isClearable={true}
              // error={errors} // Pass an error message if validation fails
            />
          </div>

          {/* Total Questions */}
          <div className="mt-4">
            <TextInput
              name="title"
              control={control}
              label="Title Name *"
              type="text"
              placeholder="Create Title"
              rules={{ required: "Title is required" }} // Validation rule
              error={errors.title?.message} // Show error message
            />
          </div>
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
            rules={{ required: "subtitle is required" }} // Validation rule
            error={errors.subtitle?.message} // Show error message
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="editor"
            className="block text-sm  text-gray-500 mb-1"
          >
            Content * {/* This is your label */}
          </label>
          <ReactQuill
            id="editor"
            name="content" // Optional, to link the label with the editor
            className="h-[200px] mb-24 md:mb-20 lg:mb-16"
            value={editorValue} // Value bound to state
            onChange={handleChange} // Handle change events
            theme="snow" // Theme for the editor
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["bold", "italic", "underline", "strike"],
                [{ align: [] }],
                ["link", "image"],
                [{ color: [] }, { background: [] }],
                [{ script: "sub" }, { script: "super" }],
                ["blockquote", "code-block"],
              ],
            }}
            formats={[
              "header",
              "font",
              "list",
              "bold",
              "italic",
              "underline",
              "strike",
              "align",
              "link",
              "image",
              "color",
              "background",
              "script",
              "blockquote",
              "code-block",
            ]}
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
          {loading ? "Loading..." : "Create Artical"}
        </button>
      </form>
    </>
  );
};

export default CreateNews;
