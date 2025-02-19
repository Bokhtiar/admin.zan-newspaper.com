
import React, { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { HttpStatusCode } from 'axios';

const ProductTable = ({ clickData }) => {

  const [openIndex, setOpenIndex] = useState(null);

  const toggleBox = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  console.log("openIndex", openIndex);

  const tableData = [
    {
      "id": 1,
      "Image": "https://img.daisyui.com/images/profile/demo/2@94.webp",
      "Name": "Product A",
      "Code": "A123",
      "Brand": "BrandX",
      "Category": "Electronics",
      "Quantity": 50,
      "Unit": "pcs",
      "Price": 100,
      "Cost": 80,
      "Stock Worth": 5000,
      "Action": "Edit/Delete"
    },
    {
      "id": 2,
      "Image": "https://img.daisyui.com/images/profile/demo/2@94.webp",
      "Name": "Product B",
      "Code": "B456",
      "Brand": "BrandY",
      "Category": "Furniture",
      "Quantity": 20,
      "Unit": "pcs",
      "Price": 200,
      "Cost": 150,
      "Stock Worth": 4000,
      "Action": "Edit/Delete"
    },
    {
      "id": 3,
      "Image": "https://img.daisyui.com/images/profile/demo/2@94.webp",
      "Name": "Product C",
      "Code": "C789",
      "Brand": "BrandZ",
      "Category": "Clothing",
      "Quantity": 100,
      "Unit": "pcs",
      "Price": 50,
      "Cost": 40,
      "Stock Worth": 5000,
      "Action": "Edit/Delete"
    },
    {
      "id": 4,
      "Image": "https://img.daisyui.com/images/profile/demo/2@94.webp",
      "Name": "Product D",
      "Code": "D101",
      "Brand": "BrandX",
      "Category": "Appliances",
      "Quantity": 30,
      "Unit": "pcs",
      "Price": 300,
      "Cost": 250,
      "Stock Worth": 9000,
      "Action": "Edit/Delete"
    },
    {
      "id": 5,
      "Image": "https://img.daisyui.com/images/profile/demo/2@94.webp",
      "Name": "Product E",
      "Code": "E202",
      "Brand": "BrandY",
      "Category": "Sports",
      "Quantity": 15,
      "Unit": "pcs",
      "Price": 150,
      "Cost": 100,
      "Stock Worth": 2250,
      "Action": "Edit/Delete"
    }
  ]




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
              {!clickData.includes("Image") ? <th>Image</th> : <th></th>}
              {!clickData.includes("Name") ? <th>Name</th> : <th></th>}
              {!clickData.includes("Code") ? <th>Code</th> : <th></th>}
              {!clickData.includes("Brand") ? <th>Brand</th> : <th></th>}
              {!clickData.includes("Category") ? <th>Category</th> : <th></th>}
              {!clickData.includes("Quantity") ? <th>Quantity</th> : <th></th>}
              {!clickData.includes("Unit") ? <th>Unit</th> : <th></th>}
              {!clickData.includes("Price") ? <th>Price</th> : <th></th>}
              {!clickData.includes("Cost") ? <th>Cost</th> : <th></th>}
              {!clickData.includes("Stock Worth(Price/Cost)") ? <th>Stock Worth(Price/Cost)</th> : <th></th>}
              {!clickData.includes("Action") ? <th>Action</th> : <th></th>}

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
                    <div className='avatar'>
                      <div className='rounded-md h-12 w-12'>
                        { // Check if 'Category' is NOT in clickData
                          !clickData.includes("Image") && singleData.Image && (
                            <img
                              src={singleData.Image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          )
                        }
                      </div>
                    </div>
                  </td>
                  <td>
                    {!clickData.includes("Name") && <td>{singleData.Name}</td>}
                  </td>
                  <td>


                    {!clickData.includes("Code") && <td>{singleData.Code}</td>}
                  </td>
                  <td>
                    {!clickData.includes("Brand") && <td>{singleData.Brand}</td>}
                  </td>

                  <td>
                    {!clickData.includes("Category") && <td>{singleData.Category}</td>}
                  </td>
                  <td>
                    {!clickData.includes("Quantity") && <td>{singleData.Quantity}</td>}
                  </td>

                  <td>
                    {!clickData.includes("Unit") && <td>{singleData.Unit}</td>}
                  </td>
                  <td>
                    {!clickData.includes("Price") && <td>{singleData.Price}</td>}
                  </td>
                  <td>
                    {!clickData.includes("Cost") && <td>{singleData.Cost}</td>}
                  </td>
                  <td>
                    {!clickData.includes("Stock Worth(Price/Cost)") && <td>{singleData["Stock Worth"]}</td>}
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
            <button className="px-4 py-2 border border-r-[#6c757d] hover:bg-[#6c757d]">5</button>
            <button className="px-4 py-2"><FaArrowRight /></button>
          </span>

        </div>
      </div>
    </>
  );
};

export default ProductTable;