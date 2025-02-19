
import React, { useState } from 'react';
import { FaBell, FaChartBar, FaCog, FaEnvelope, FaHome, FaUser } from 'react-icons/fa';
import { FaFilePdf } from "react-icons/fa";
import { FaRegFileExcel } from "react-icons/fa";
import { BsFiletypeCsv } from "react-icons/bs";
import { IoMdPrint } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";


const ProductButtons = ({ clickData, handleButtonClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBox = () => {
    setIsOpen(!isOpen);
  };

  const buttons = ["Image", "Name", "Code", "Brand", "Category", "Quantity","Unit","Price","Cost","Stock Worth(Price/Cost)","Action"];
  return (
    <div className='flex flex-col md:flex-row md:justify-between lg:items-center gap-3'>
      {/* select option */}


      <div className='flex lg:items-center lg:justify-center gap-2'>
        <select
          defaultValue="Pick a font"
          className="border border-[#7c5cc4] text-[#7c5cc4] focus:outline-none rounded-sm transition-all duration-300 h-8 w-16 ">
          <option disabled={true}>10</option>
          <option>20</option>
          <option>30</option>
          <option>50</option>
        </select>
        <p>per page</p>
      </div>

      {/* search bar */}
      <div>
        <label className="border w-64 md:w-[200px] lg:w-60 border-[#7c5cc4] text-[#7c5cc4] flex items-center gap-2 px-2 py-1 rounded-sm">
          <input
            type="text"
            className="grow border-none focus:outline-none focus:ring-0"
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>

      {/* small button */}

      <div>
        <div className="flex gap-2 ">

          <button className="flex items-center gap-2 bg-[#ff7588] hover:bg-[#868e96] text-white px-2 py-1 lg:px-4 lg:py-2 rounded-l-md ">
            <FaFilePdf className="w-5 h-5" />
          </button>

          <button className="flex items-center gap-2 bg-[#868e96] hover:bg-[#868e96] text-white px-2 py-1 lg:px-4 lg:py-2 ">
            <FaRegFileExcel className="w-5 h-5" />

          </button>

          <button className="flex items-center gap-2 bg-[#ffc107] hover:bg-[#868e96]  text-white px-2 py-1 lg:px-4 lg:py-2 ">
            <BsFiletypeCsv className="w-5 h-5" />

          </button>

          <button className="flex items-center gap-2 bg-[#2196f3] hover:bg-[#868e96] text-white px-2 py-1 lg:px-4 lg:py-2 ">
            <IoMdPrint className="w-5 h-5" />
          </button>

          <button className="flex items-center gap-2 bg-[#eb543a] hover:bg-[#868e96] text-white px-2 py-1 lg:px-4 lg:py-2 ">
            <RxCross2 className="w-5 h-5" />
          </button>

          <div className='relative inline-block'>
            <button onClick={toggleBox} className="flex items-center  rounded-r-md bg-[#7c5cc4] hover:bg-[#868e96] text-white px-2 py-1 lg:px-4 lg:py-2 ">

              <MdOutlineRemoveRedEye className="w-5 h-5" />
              <IoMdArrowDropdown className="w-5 h-5" />
            </button>

            {isOpen && (
              <div className="absolute top-[30px] mt-2 w-60 right-0 p-4 bg-[#7c5cc4] border border-gray-300 shadow-lg rounded-md z-40">
                {
                  buttons.map((btn, index) => (
                    <button
                      key={index}
                      onClick={() => handleButtonClick(btn)}
                      className={`bg-[#7c5cc4]  px-4 py-2 rounded-md flex items-center gap-2 ${clickData.includes(btn) ? "text-[#868e96]" : "text-white"}`}
                    >
                      {btn}
                    </button>
                  ))
                }
              </div>
            )}

          </div>

        </div>
      </div>



    </div>
  );
};

export default ProductButtons;