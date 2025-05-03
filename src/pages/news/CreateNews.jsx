import React, { useCallback, useEffect, useRef, useState } from "react";
import { useEditor, EditorContent, mergeAttributes, Mark } from "@tiptap/react";
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
import Select from "react-select";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import PageHeaderSkeleton from "../../components/loading/pageHeader-skeleton";
import CategoryFormSkeleton from "../../components/loading/exam-skeleton/examForm-skeleton";
import {
  FaBold,
  FaCloudUploadAlt,
  FaImage,
  FaItalic,
  FaLink,
  FaListOl,
  FaListUl,
  FaUnderline,
} from "react-icons/fa";
import Heading from "@tiptap/extension-heading";

const CreateNews = () => {
  const [categories, setCategories] = useState([]);
  const [author, setAuthor] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);
  const [editValue, seteditValue] = useState("");
  const quillRef = useRef(null);
  const [singleCategory, setSingleCategory] = useState([]);
  const [smallloading, setSmallLoading] = useState(false);

  // console.log("categories", categories);
  // console.log("singleCategory", singleCategory);

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
  // console.log("selectedCategory", selectedCategoryNumber);

  const fetchCategory = useCallback(async () => {
    // setLoading(true);
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
    // setSmallLoading(true);
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
    // setLoading(true);
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
    // console.log("data", data);
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
      // setLoading(true);
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
          <div className="mt-4 w-full">
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

        
        <EditorSection seteditValue={seteditValue} />
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

const EditorSection = ({ seteditValue }) => {
  const [value, setValue] = useState("");
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Image,
      Table.configure({
        resizable: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["paragraph", "heading"], // Optional: Define which types you want to apply alignment to
      }),
      TableRow,
      TableHeader,
      TableCell,
      FontSize,
      CustomHeading
    ],
    content: "<p>এখানে লিখুন...</p>",

    editorProps: {
      handlePaste(view, event) {
        const clipboardData = event.clipboardData || window.clipboardData;
        const pastedContent = clipboardData.getData("text/html");

        // Log the pasted HTML content
        // console.log('Pasted content:', pastedContent)
        seteditValue(pastedContent);
        setValue(pastedContent);
        // If you want to handle the paste in a custom way, you can modify this content
        // For now, let's allow the default behavior (return false to not prevent paste)
        return false;
      },
    },
    onUpdate({ editor }) {
      const editorContent = editor.getHTML();

      console.log("Editor content updated:", editorContent);

      // Update state to reflect real-time changes while typing
      seteditValue(editorContent);
      setValue(editorContent);
    },
  });
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file && editor) {
      const reader = new FileReader();
      reader.onload = () => {
        editor.chain().focus().setImage({ src: reader.result }).run();
      };
      reader.readAsDataURL(file); // For local preview; use server upload if needed
    }
  };
  const insertImageFromUrl = () => {
    const url = prompt("Enter image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { value: "left", label: "left" },
    { value: "center", label: "center" },
    { value: "right", label: "right" },
  ];
  const handleChange = (selected) => {
    editor.chain().focus().setTextAlign(selected?.value).run();
    setSelectedOption(selected);
  };
  return (
    <div>
      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </button>
        <button
          onClick={insertImageFromUrl}
          className="text-blue-500   px-3 py-1 rounded"
          title="Insert Image from URL"
        >
          <FaImage />
        </button>
        <div className=" ">
          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
            className="hidden"
          />

          {/* Upload Button */}
          <button
            type="button"
            onClick={handleButtonClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold  rounded-lg shadow transition-all duration-200"
          >
            <FaCloudUploadAlt />
          </button>
        </div>

        <Select
          options={options}
          value={selectedOption}
          onChange={handleChange}
          placeholder="left"
        />

        <button
          onClick={() => {
            const url = window.prompt("Enter URL");
            if (url) {
              editor
                ?.chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: url })
                .run();
            }
          }}
        >
          <FaLink />
        </button>

        {/* {value} */}
        <button
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          <FaListUl />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          <FaListOl />
        </button>
        <input
          type="color"
          onChange={(e) =>
            editor.chain().focus().setColor(e.target.value).run()
          }
        />
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          <FaBold />
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          <FaItalic />
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <FaUnderline />
        </button>
      </div>

      <EditorContent editor={editor} className=" " />
      <div dangerouslySetInnerHTML={{ __html: value }}></div>
    </div>
  );
};

const CustomHeading = Heading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const level = node.attrs.level;
    let style = '';
    let className = '';

    // Set styles based on heading level
    switch (level) {
      case 1:
        className = 'text-3xl font-bold';
        style = 'font-size: 32px; font-weight: bold;';
        break;
      case 2:
        className = 'text-2xl font-semibold';
        style = 'font-size: 24px; font-weight: 600;';
        break;
      case 3:
        className = 'text-xl font-medium';
        style = 'font-size: 20px; font-weight: 500;';
        break;
      default:
        break;
    }

    return [
      `h${level}`,
      mergeAttributes(HTMLAttributes, {
        class: className,
        style,
      }),
      0,
    ];
  },
});

// extensions/FontSize.js
 
// extensions/FontSize.js
 
const FontSize = Mark.create({
  name: 'fontSize',

  addAttributes() {
    return {
      size: {
        default: null,
        parseHTML: element => {
          const style = element.style.fontSize;
          if (!style) return null;

          const match = style.match(/^(\d+(?:\.\d+)?)px$/);
          return match ? match[1] : null;
        },
        renderHTML: attributes => {
          if (!attributes.size) return {};
          return {
            style: `font-size: ${attributes.size}px`,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        style: 'font-size',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0];
  },
});

 