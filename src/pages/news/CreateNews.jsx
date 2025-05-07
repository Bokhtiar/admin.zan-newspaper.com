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
import PageHeaderSkeleton from "../../components/loading/pageHeader-skeleton";
import CategoryFormSkeleton from "../../components/loading/exam-skeleton/examForm-skeleton";
import { EditorSection } from "./RichEditor";

const CreateNews = () => {
  const [categories, setCategories] = useState([]);
  const [author, setAuthor] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);

  const [singleCategory, setSingleCategory] = useState([]);
  const [smallloading, setSmallLoading] = useState(false);
  const [value, seteditValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const navigate = useNavigate();

  console.log("categories", categories);
  console.log("selectedCategory", selectedCategory);

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

  // const selectedCategory = watch("category_id");
  const selectedCategoryNumber = Number(selectedCategory); // Convert to number
  // console.log("selectedCategory", selectedCategoryNumber);

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



  const onFormSubmit = async (data) => {
    // console.log("data", data);
    const formData = new FormData();

    // ফর্মের অন্যান্য ডাটা FormData তে অ্যাড করুন
    const categoryToSend = data.child_category_id ? data.child_category_id : data.category_id;
    formData.append("category_id", categoryToSend);
    formData.append("author_id", data.author_id);
    formData.append("title", data.title);
    formData.append("subtitle", data.subtitle);
    // formData.append("child_category_id", data.child_category_id);

    formData.append("status", data.status ? "1" : "0");
    formData.append("content", value);

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

      // console.log("response", response);
      if (response && response.status === 200) {
        navigate("/dashboard/news");
        return Toastify.Success("News Created Successfully.");
      }
    } catch (error) {
      // console.log("Error:", error);
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
        <div className="flex lg:flex-row flex-col   gap-4 ">
          <div className="mt-4 w-full">
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
          {/* <div className="mt-4 w-full">
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
          </div> */}
          {/* Main Category Selection */}
          <div className="mt-4 w-full">
            <SingleSelect
              name="category"
              control={control}
              options={categories}
              rules={{ required: "Category selection is required" }}
              onSelected={(selected) => {
                setSelectedCategory(selected); 
                setValue("category_id", selected?.category_id); 
              }}
              placeholder="Select a category"
              error={errors.category?.message}
              label="Choose category *"
              isClearable={true}
            />
          </div>

          {/* Show Child Category if exists */}
          {selectedCategory?.child_category?.length > 0 && (
            <div className="mt-4 w-full">
              <SingleSelect
                name="child_category"
                control={control}
                options={selectedCategory.child_category.map((child) => ({
                  label: child.category_name,
                  value: child.category_id,
                }))}
                rules={{ required: "Sub-category selection is required" }}
                onSelected={(selected) =>
                  setValue("child_category_id", selected?.value)
                }
                placeholder={`Select a sub-category of ${selectedCategory.category_name}`}
                error={errors.child_category?.message}
                label={`Choose sub-category *`}
                isClearable={true}
              />
            </div>
          )}

          <div className="mt-4 w-full">
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

          {/* video title*/}
          {singleCategory === "ভিডিও" ? (
            <div className="mt-4 w-full">
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
        {/* Thumbnail Upload */}
        <div className="mt-4 cursor-pointer mb-4">
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
          <label className="block text-sm font-medium text-gray-700 mb-2 ">
            Article Content *
          </label>
          <div className="">
            <EditorSection seteditValue={seteditValue} />
          </div>
        </div>

        {/* <div
          className="px-4"
          dangerouslySetInnerHTML={{ __html: value }}
        /> */}
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

// const RichEditor = ({ editorContent, setEditorContent }) => {

//   // console.log("content",content)
//   return (
//     <>
//       <CKEditor
//         editor={ClassicEditor}
//         data="<p>Write something...</p>"
//         onChange={(event, editor) => {
//           const data = editor.getData();
//           console.log(data);
//           setEditorContent(data);
//         }}
//       />
//       <h3>Output:</h3>
//       <div dangerouslySetInnerHTML={{ __html: editorContent }} />
//       {/* <p>editorContent</p> */}
//     </>
//   );
// };
