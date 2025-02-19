import React, { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { HttpStatusCode } from 'axios';

const CategoryTable = ({ clickData }) => {

  const [openIndex, setOpenIndex] = useState(null);

  const toggleBox = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  console.log("openIndex", openIndex);

  const tableData = [
    {
      id: 1,
      category: 'Electronics',
      parentCategory: 'Gadgets',
      numberOfProducts: 100,
      stockQuantity: 500,
      stockWorth: 'USD 5000',
      image: 'https://img.daisyui.com/images/profile/demo/2@94.webp'
    },
    {
      id: 2,
      category: 'Clothing',
      parentCategory: 'Fashion',
      numberOfProducts: 200,
      stockQuantity: 1000,
      stockWorth: 'USD 10000',
      image: 'https://img.daisyui.com/images/profile/demo/2@94.webp'
    },
    {
      id: 3,
      category: 'Clothing',
      parentCategory: 'Fashion',
      numberOfProducts: 200,
      stockQuantity: 1000,
      stockWorth: 'USD 10000',
      image: 'https://img.daisyui.com/images/profile/demo/2@94.webp'
    }
  ];



  return (
    <>
    <div className="overflow-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            {!clickData.includes("Category") ? <th>Category</th> : <th></th> }
            {!clickData.includes("Parent Category") ? <th>Parent Category</th> : <th></th>}
            {!clickData.includes("Number Of Product") ? <th>Number Of Product</th> : <th></th>}
            {!clickData.includes("Stock Quantity") ? <th>Stock Quantity</th> :<th></th>}
            {!clickData.includes("Stock Worth") ? <th>Stock Worth</th> :<th></th>}
            {!clickData.includes("Action") ? <th>Action</th> :<th></th>}

          </tr>
        </thead>

        {
          tableData.map((singleData, index) => (

            <tbody key={singleData.id}>
              {/* row 1 */}
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="rounded-md h-12 w-12">
                        { // Check if 'Category' is NOT in clickData
                          !clickData.includes("Category") && singleData.image && (
                            <img
                              src={singleData.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          )
                        }
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{!clickData.includes("Category") && <td>{singleData.category}</td>}</div>
                    </div>
                  </div>
                </td>
                <td>


                  {!clickData.includes("Parent Category") && <td>{singleData.category}</td>}
                </td>
                <td>
                  {!clickData.includes("Number Of Product") && <td>{singleData.numberOfProducts}</td>}
                </td>

                <td>
                  {!clickData.includes("Stock Quantity") && <td>{singleData.stockQuantity}</td>}
                </td>

                <td>
                  {!clickData.includes("Stock Worth") && <td>{singleData.stockWorth}</td>}
                </td>

                <td>
                  {!clickData.includes("Action") && <>
                    <div className='relative inline-block'>
                      <button onClick={() => toggleBox(index)} className="flex items-center border border-[#7c5cc4] text-[#7c5cc4] rounded-r-m  px-2 py-1 lg:px-4 lg:py-2 z-0 ">
                        Action
                        <IoMdArrowDropdown className="w-5 h-5" />
                      </button>

                      {openIndex === index && (
                        <div className="absolute top-[30px] mt-2  right-0  p-4  border border-gray-300 shadow-lg rounded-md space-y-1 z-30 bg-white">

                          <button
                            className="bg-white text-[#7c5cc4] px-4 py-2 border w-24  rounded-md flex items-center gap-2"
                          >
                            <FaRegEdit />
                            Edit
                          </button>
                          <button
                            className="bg-white text-[#7c5cc4] px-4 py-2 border w-24  rounded-md flex items-center gap-2"
                          >
                            <MdOutlineDeleteOutline />
                            Delete
                          </button>

                        </div>
                      )}
                    </div>
                  </>}
                </td>

              </tr>

            </tbody>
          ))
        }


      </table>


    </div>
          {/* pagination */}
          <div className='flex flex-wrap items-center justify-between mt-20'>
          <div>
            <p className='mb-2'>Showing 1-10(38)</p>
          </div>
          <div>
            <span className="inline-flex border border-[#6c757d] rounded-sm overflow-hidden">
              <button className="px-4 py-2 border border-r-[#6c757d] "><FaArrowLeft /></button>
              <button className="px-4 py-2 border border-r-[#6c757d] hover:bg-[#6c757d]">1</button>
              <button className="px-4 py-2 btn-active border border-r-[#6c757d] hover:bg-[#6c757d]">2</button>
              <button className="px-4 py-2 border border-r-[#6c757d] hover:bg-[#6c757d]">3</button>
              <button className="px-4 py-2 border border-r-[#6c757d] hover:bg-[#6c757d]">4</button>
              <button className="px-4 py-2"><FaArrowRight /></button>
            </span>
  
          </div>
        </div>
        </>
  );
};

export default CategoryTable;