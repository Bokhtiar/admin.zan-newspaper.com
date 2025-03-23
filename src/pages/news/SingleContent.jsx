import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { NetworkServices } from "../../network";
import { SkeletonTable } from "../../components/loading/skeleton-table";
import { formatDateInBengali } from "../../utils/helper";

const SingleContent = () => {
  const { id } = useParams();
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  console.log("newsData", newsData);

  const fetchNewsData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.News.show(id);
      if (response?.status === 200) {
        setNewsData(response?.data?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching news data:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchNewsData();
  }, [fetchNewsData]);

  if (loading) {
    return <SkeletonTable></SkeletonTable>;
  }

  if (!newsData) {
    return <div>No content found!</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 dark:text-white">
      {/* Article Image */}
      <img
        src={`${process.env.REACT_APP_API_SERVER}${newsData?.article_image}`}
        alt={newsData?.title}
        className="w-full h-64 object-cover rounded-lg shadow-md"
      />

      {/* Title */}
      <h1 className="text-3xl font-semibold ">{newsData?.title}</h1>

      {/* Subtitle */}
      <p className="text-lg ">{newsData?.subtitle}</p>

      {/* Content */}
      <div
        className="text-base"
        dangerouslySetInnerHTML={{ __html: newsData?.content }}
      />

      {/* Author & Category */}
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-2">
          {newsData.show_author?.author_image && (
            <img
              src={`${process.env.REACT_APP_API_SERVER}${newsData?.show_author?.author_image}`}
              alt={newsData?.show_author?.author_name}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <span className="text-sm ">
            By {newsData.show_author?.author_name || "Unknown Author"}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <img
            src={`${process.env.REACT_APP_API_SERVER}${newsData.show_category?.category_image}`}
            alt={newsData.show_category?.category_name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm ">
            {newsData.show_category?.category_name}
          </span>
        </div>
      </div>

      {/* Created At */}
      <div className="text-sm text-gray-500">
        {formatDateInBengali(newsData?.updated_at)}
      </div>
    </div>
  );
};

export default SingleContent;
