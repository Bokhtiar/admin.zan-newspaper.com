import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  ImageUpload,
  SingleSelect,
  TextAreaInput,
  TextCheckbox,
  TextInput,
} from "../../components/input";
import { FaRegEdit } from "react-icons/fa";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { networkErrorHandeller } from "../../utils/helper";
import { PageHeader } from "../../components/pageHandle/pagehandle";
import ReactQuill from "react-quill";
import PageHeaderSkeleton from "../../components/loading/pageHeader-skeleton";
import CategoryFormSkeleton from "../../components/loading/exam-skeleton/examForm-skeleton";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditNews = () => {
  const [categories, setCategories] = useState([]);
  const [news, setNews] = useState([]);
  const [author, setAuthor] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);
  const { newsId } = useParams(); // URL থেকে ID নেওয়া
  const navigate = useNavigate();
  const [editorValue, setEditorValue] = useState("");
  const [editorContent, setEditorContent] = useState("");

  console.log("news",news)

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
  // console.log("cate", categories);
  // console.log("news", news);

  // ক্যাটাগরি লোড করা
  const fetchCategory = useCallback(async () => {
    try {
      const response = await NetworkServices.Category.index();
      if (response?.status === 200) {
        const result = response.data.data.map((item) => ({
          label: item.category_name,
          value: item.category_id,
        }));
        setCategories(result);
      }
    } catch (error) {
      console.error("Fetch Category Error:", error);
    }
  }, []);

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

  const newsData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.News.show(newsId);
      if (response?.status === 200) {
        const newsData = response?.data?.data?.data;
        setNews(newsData);

        setValue("category_id", news?.category_id);
        setValue("author_id", news?.author_id);
        setValue("subtitle", news?.subtitle);
        setValue("title", news?.title);

        setValue("status", news?.status === 1 ? true : false);
        if (news?.content) {
          setValue("content", news?.content);
          // setEditorValue(news?.content);
        }
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
    setLoading(false);
  }, [
    newsId,
    setValue,
    news.category_id,
    news.author_id,
    news?.content,
    news?.status,
    news?.subtitle,
    news?.title,
  ]);
  // useEffect(() => {
  //   if (news?.content) {
  //     setValue("content", news?.content);
  //     setEditorValue(news?.content);
  //   }
  // }, [news?.content, setValue]);

  useEffect(() => {
    fetchCategory();
    if (newsId) {
      newsData();
    }
  }, [fetchCategory, newsData, newsId]);

  const onFormSubmit = async (data) => {
    // console.log("Data", data);
    setLoading(true);

    const formData = new FormData();

    // Append form fields to FormData
    formData.append("category_id", data?.category_id);
    formData.append("author_id", data?.author_id);
    formData.append("title", data?.title);
    formData.append("subtitle", data?.subtitle);
    formData.append("content", editorValue); // Assuming editor value holds content
    formData.append("status", data?.status ? 1 : 0);

    formData.append("article_image", data?.article_image); // Assuming it's an image file

    formData.append("_method", "PUT");
    // console.log("formData", formData);

    try {
      setBtnLoading(true);
      const response = await NetworkServices.News.update(newsId, formData);
      if (response?.status === 200) {
        Toastify.Success("News Updated Successfully.");
        navigate("/dashboard/news");
      }
    } catch (error) {
      console.error("Update Error:", error);
      networkErrorHandeller(error);
    }
    setBtnLoading(false);
  };

  const propsData = {
    pageTitle: "Update News",
    pageIcon: <FaRegEdit />,
    buttonName: "News List",
    buttonUrl: "/dashboard/news",
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
        className="mx-auto p-4 border border-gray-200 rounded-lg "
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="mt-4">
            <SingleSelect
              name="categories"
              control={control}
              options={categories}
              onSelected={(selected) =>
                setValue("category_id", selected?.category_id)
              }
              placeholder={news?.show_category?.category_name}
              error={errors.categories?.message}
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
              onSelected={(selected) =>
                setValue("author_id", selected?.author_id)
              }
              placeholder={news?.show_author?.author_name}
              error={errors.author?.message}
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
            imgUrl={news?.article_image}
            error={errors.article_imagee?.message}
          />
        </div>
        {/* multiple image Upload */}

        <div className="mt-4">
          <TextAreaInput
            name="subtitle"
            control={control}
            label="subtitle"
            type="text"
            placeholder="Enter subtitle"
            rules={{ required: "subtitle is required" }} // Validation rule
            error={errors.subtitle?.message} // Show error message
          />
        </div>

        {/* <div className="mt-4  ">
          <label htmlFor="editor" className="block text-sm  text-gray-500 mb-1">
            Content * 
          </label>
          <ReactQuill
            className="h-[200px] mb-24 md:mb-20 lg:mb-16 "
            id="editor"
            name="content" 
            value={editorValue} 
            onChange={(value) => {
              setEditorValue(value);
              setValue("content", value); 
            }}
            theme="snow" 
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
        </div> */}
        {/* 
        <div className="flex items-center gap-2 ">
          <TextInput
            type="checkbox"
            name="status"
            className="w-5 h-5 "
            control={control}
            onChange={(e) => setValue("status", e.target.checked ? 1 : 0)}
            checked={watch("status") == 1}
          />
          <label htmlFor="status" className="text-sm text-gray-700">
            Status
          </label>
        </div> */}

        {/* <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Article Content *
          </label>
          <RichEditor setEditorContent={setEditorContent} />
        </div> */}

        <div
          className="px-4"
          dangerouslySetInnerHTML={{ __html: editorContent }}
        />
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
          {btnloading ? "Loading..." : "Update Artical"}
        </button>
      </form>
    </>
  );
};

export default EditNews;

// const RichEditor = ({ editorContent, setEditorContent }) => {

//   // console.log("content",content)
//   return (
//     <>
//       <CKEditor
//         editor={ClassicEditor}
//         data={editorContent || "<p>Write something...</p>"}
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
