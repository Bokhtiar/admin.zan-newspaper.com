import React, { useCallback, useEffect, useState } from "react";
import { IoMdCreate } from "react-icons/io";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { useNavigate, useParams } from "react-router-dom";

import { networkErrorHandeller } from "../../utils/helper";
import { SkeletonTable } from "../../components/loading/skeleton-table";
import { PageHeader } from "../../components/pageHandle/pagehandle";
import {
  ImageUpload,
  MultiSelect,
  TextCheckbox,
  TextInput,
} from "../../components/input";

const EditHomePage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  console.log("first", id);
  console.log("initialData", initialData);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm();

  const fetchCategory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Category.index();
      if (response && response.status === 200) {
        const result = response.data.data.map((item) => ({
          label: item.category_name,
          value: item.category_name,
          ...item,
        }));
        setCategories(result);
      }
    } catch (error) {
      console.error("Fetch Category Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchInitialData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.HomeNews.index();
      if (response && response.status === 200) {
        const data = response.data.data;
        setInitialData(data);
        setValue(
            "categories",
            data.categories.map((cat) => ({
              label: cat.category_name,
              value: cat.category_name,
              ...cat,
            }))
          );
        setValue("status", data?.home_section?.status === 1 ? true : false);
        setValue("link_1", data.home_section.link1);
        setValue("link_2", data.home_section.link2);
        setValue("link_3", data.home_section.link3);
        setValue("link_4", data.home_section.link4);
        setValue("link_5", data.home_section.link5);
      }
    } catch (error) {
      console.error("Fetch Initial Data Error:", error);
    }
    setLoading(false);
  }, [id, setValue]);

  useEffect(() => {
    fetchCategory();
    fetchInitialData();
  }, [fetchCategory, fetchInitialData]);

  const onFormSubmit = async (data) => {
    const array_category = data?.categories?.map((item) => item?.category_id);

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("section_category_id", JSON.stringify(array_category));
      formData.append("status", data?.status ? "1" : "0");
      formData.append("link1", data?.link_1);
      formData.append("link2", data?.link_2);
      formData.append("link3", data?.link_3);
      formData.append("link4", data?.link_4);
      formData.append("link5", data?.link_5);

      if (data?.section_image1)
        formData.append("section_image1", data.section_image1);
      if (data?.section_image2)
        formData.append("section_image2", data.section_image2);
      if (data?.section_image3)
        formData.append("section_image3", data.section_image3);
      if (data?.section_image4)
        formData.append("section_image4", data.section_image4);
      if (data?.section_image5)
        formData.append("section_image5", data.section_image5);

      const response = await NetworkServices.HomeNews.update(id, formData);
      if (response && response.status === 200) {
        navigate("/dashboard/home-news");
        Toastify.Success("Home Image updated successfully");
      }
    } catch (error) {
      networkErrorHandeller(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !initialData) {
    return (
      <div className="text-center">
        <SkeletonTable />
        <br />
      </div>
    );
  }

  const propsData = {
    pageTitle: "Edit Home Category",
    pageIcon: <IoMdCreate />,
    buttonName: "Back to List",
    buttonUrl: "/dashboard/home-news",
    type: "edit",
  };

  return (
    <>
      <PageHeader propsData={propsData} />
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="mx-auto p-4 border border-gray-200 rounded-lg"
      >
        <div className="mb-4">
          <MultiSelect
            name="categories"
            control={control}
            options={categories}
            placeholder="Select a category"
            error={errors.categories?.message}
            label="Choose Parent Category *"
            isClearable={true}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="mt-4">
            <ImageUpload
              name="section_image1"
              control={control}
              label="Category Picture 1"
              file="image *"
              onUpload={(file) => setValue("section_image1", file)}
              imgUrl={initialData?.home_section.section_image1}
              error={errors.section_image1?.message}
            />
          </div>

          <div className="mt-4">
            <TextInput
              name="link_1"
              control={control}
              label="Link 1"
              type="text"
              placeholder="Enter link"
              error={errors.link_1?.message}
            />
          </div>

          <div className="mt-4">
            <ImageUpload
              name="section_image2"
              control={control}
              label="Category Picture 2"
              file="image *"
              onUpload={(file) => setValue("section_image2", file)}
              imgUrl={initialData?.home_section.section_image2}
              error={errors.section_image2?.message}
            />
          </div>
          <div className="mt-4">
            <TextInput
              name="link_2"
              control={control}
              label="Link 2"
              type="text"
              placeholder="Enter link"
              error={errors.link_2?.message}
            />
          </div>

          <div className="mt-4">
            <ImageUpload
              name="section_image3"
              control={control}
              label="Category Picture 3"
              file="image *"
              onUpload={(file) => setValue("section_image3", file)}
              imgUrl={initialData?.home_section.section_image3}
              error={errors.section_image3?.message}
            />
          </div>
          <div className="mt-4">
            <TextInput
              name="link_3"
              control={control}
              label="Link 3"
              type="text"
              placeholder="Enter link"
              error={errors.link_3?.message}
            />
          </div>

          <div className="mt-4">
            <ImageUpload
              name="section_image4"
              control={control}
              label="Category Picture 4"
              file="image *"
              onUpload={(file) => setValue("section_image4", file)}
              imgUrl={initialData?.home_section.section_image4}
              error={errors.section_image4?.message}
            />
          </div>
          <div className="mt-4">
            <TextInput
              name="link_4"
              control={control}
              label="Link 4"
              type="text"
              placeholder="Enter link"
              error={errors.link_4?.message}
            />
          </div>

          <div className="mt-4">
            <ImageUpload
              name="section_image5"
              control={control}
              label="Category Picture 5"
              file="image *"
              onUpload={(file) => setValue("section_image5", file)}
              imgUrl={initialData?.home_section.section_image5}
              error={errors.section_image5?.message}
            />
          </div>
          <div className="mt-4">
            <TextInput
              name="link_5"
              control={control}
              label="Link 5"
              type="text"
              placeholder="Enter link"
              error={errors.link_5?.message}
            />
          </div>
        </div>

        <div className="flex items-center  mt-4 gap-2 ">
          <TextCheckbox
            type="checkbox"
            name="status"
            className="w-5 h-5"
            control={control}
            onChange={(e) => setValue("status", e.target.checked ? 1 : 0)}
            checked={watch("status") == 1} // If status is 1, checked = true
          />
          <label htmlFor="status" className="text-sm text-gray-700 ">
            Status
          </label>
        </div>

        <button
          type="submit"
          className={`px-4 py-2 text-white rounded-md transition mt-4 ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Home"}
        </button>
      </form>
    </>
  );
};

export default EditHomePage;
