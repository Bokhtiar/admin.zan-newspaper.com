
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
import { useCallback, useEffect, useState } from "react";

const CreateSeo = () => {
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
        const result = response?.data?.data?.map((item, index) => {
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
    console.log("Submitted Data:", data);

    try {
      setBtnLoading(true);
      const formData = new FormData();

      formData.append("category_id", data.category_id);
      formData.append("description", data.description);

  
      console.log("FormData Entries:", [...formData.entries()]); // Debugging log

      // Send data to API
      const response = await NetworkServices.Category.seoPost(formData);
      console.log("API Response:", response);

   
        // navigate("/dashboard/category");
        Toastify.Success("SEO Category created successfully");
      
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
    pageTitle: " Create Seo ",
    pageIcon: <IoMdCreate />,
    buttonName: "Seo List",
    buttonUrl: "/dashboard/seoList",
    type: "list", 
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
            label="Description"
            type="text"
            placeholder="Enter subtitle"
            // rules={{ required: "subtitle is required" }}
            error={errors.description?.message} // Show error message
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
          {btnloading ? "Loading..." : "Create Seo"}
        </button>
      </form>
    </>
  );
};

export default CreateSeo;
