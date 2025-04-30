import { Link } from "react-router-dom";
import { IoAddCircleSharp, IoListCircleSharp } from "react-icons/io5";
import { MdDownloadForOffline } from "react-icons/md";
import { IoIosList } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";

export const PageHeader = ({ propsData }) => {
  const getIcon = (type) => {
    switch (type) {
      case "add":
        return <IoAddCircleSharp className="text-lg " />;
      case "list":
        return <IoIosList className="text-lg" />;
      case "edit":
        return <FaRegEdit className="text-lg" />;
      default:
        return null;
    }
  };

  // console.log("propsData", propsData);

  return (
    <section className="flex items-center justify-between shadow-md p-4 rounded-lg dark:bg-darkCard bg-lightCard  my-3">
      <div>
        <p className="flex items-center gap-2 font-semibold text-lightTitle dark:text-darkTitle text-lg capitalize">
          {propsData?.pageIcon}
          <span>{propsData?.pageTitle}</span>
        </p>
        <p className="text-sm  lowercase text-lightTitle dark:text-darkTitle">
          Here is {propsData?.pageTitle} page
        </p>
      </div>

      {propsData?.buttonName && (
        <Link
          className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white dark:text-darkTitle flex items-center gap-2 transition-all ease-in-out duration-200"
          to={propsData?.buttonUrl}
        >
          
            {getIcon(propsData?.type)}
            {propsData?.buttonName}
         
        </Link>
      )}
    </section>
  );
};
