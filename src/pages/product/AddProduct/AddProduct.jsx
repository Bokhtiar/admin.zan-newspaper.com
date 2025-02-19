import React, { useState } from 'react';
import { LuRefreshCw } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import Select from 'react-select';
import { FaRegQuestionCircle } from "react-icons/fa";
import { useDropzone } from 'react-dropzone';

const AddProduct = () => {
  const [randomNum, setRandomNum] = useState('')
  // const [isOpen, setIsOpen] = useState(false);
  // const [inputValue, setInputValue] = useState('');
  // const [selectedOption, setSelectedOption] = useState('Pick');
  // const options = ['Star Wars', 'Harry Potter', 'Lord of the Rings', 'Planet of the Apes', 'Star Trek'];

  // const handleOptionClick = (option) => {
  //     setSelectedOption(option);
  //     setIsOpen(false);
  // };

  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedValue(selectedOption);
  };

  const handleRandom = () => {
    setRandomNum(Math.floor(Math.random() * 10000000) + 1);
  }

  const handleInputChange = (e) => {
    setRandomNum(e.target.value);
  }

  const colourOptions = [
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
    { value: 'blue', label: 'Blue' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
    { value: 'blue', label: 'Blue' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
    { value: 'blue', label: 'Blue' },
    { value: 'yellow', label: 'Yellow' }
  ];
  const TaxOptions = [
    { value: 'No Tax', label: 'No Tax' },
    { value: '@10', label: '@10' },
    { value: '@20', label: '@20' },
    { value: '@30', label: '@30' },

  ];

  const customStyles = {
    control: (base, state) => ({
      ...base,
      width: '100%',  // Set the width of the select input
      height: '50px',  // Set the height of the select input
      padding: '0 10px',

    }),
  };

  // image

  const [image, setImage] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setImage(URL.createObjectURL(acceptedFiles[0]));
      console.log("acceptedFiles",acceptedFiles);
    },
  });

  console.log("object-------------",image);

  return (
    <div className='border border-[#7c5cc4] rounded-md py-4'>
      <p className='text-2xl font-semibold px-4 mb-4'>Add Product</p>
      <hr className='  bg-[#7c5cc4] h-[2px]  ' />
      <p className='py-5 px-4'>The field labels marked with * are required input fields</p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 gap-5'>
        {/* Product Type */}
        <div className=''>
          <label className="flex flex-col w-full ">
            <span className=" font-medium mb-2">Product Type *</span>
            <select className=" select border border-[#5e5873] focus:border-[#7c5cc4] border-opacity-40 px-4 py-3 focus:outline-none rounded-md">
              <option disabled selected>Pick one</option>
              <option>Star Wars</option>
              <option>Harry Potter</option>
              <option>Lord of the Rings</option>
              <option>Planet of the Apes</option>
              <option>Star Trek</option>
            </select>

          </label>
        </div>
        {/* product name */}
        <div className=''>
          <label className="flex flex-col w-full ">
            <span className="font-medium  mb-2">Product Name</span>
            <input className='border border-[#5e5873] focus:border-[#7c5cc4] border-opacity-40 px-4 py-3 focus:outline-none rounded-md' type="text" />

          </label>
        </div>
        {/* product code */}
        <div className=''>
          <label className="flex flex-col w-full ">
            <span className="font-medium mb-2">Product Code</span>
            <div className='flex items-center '>
              <input className='border border-[#5e5873] focus:border-[#7c5cc4] border-opacity-40 px-4 py-3 focus:outline-none flex-1 rounded-md' type="text"
                value={randomNum}
                onChange={handleInputChange}
              />
              <button onClick={handleRandom} className="py-3 text-2xl px-3 border border-[#7c5cc4] text-[#7c5cc4]"><LuRefreshCw /></button>
            </div>
          </label>
        </div>

        {/* Barcode Symbology */}
        <div className=''>
          <label className="flex flex-col w-full ">
            <span className=" font-medium mb-2">Barcode Symbology *</span>
            <select className=" select border border-[#5e5873] focus:border-[#7c5cc4] border-opacity-40 px-4 py-3 focus:outline-none rounded-md">
              <option disabled selected>Pick one</option>
              <option>Star Wars</option>
              <option>Harry Potter</option>
              <option>Lord of the Rings</option>
              <option>Planet of the Apes</option>
              <option>Star Trek</option>
            </select>

          </label>
        </div>


        {/* Brand */}
        {/* <div className='w-full'>
            <label className="w-full">
                <span className="font-medium mb-2 inline-block">Barcode Symbology *</span>
                
               
                <div className='flex w-full relative'>
                    <div 
                        onClick={() => setIsOpen(!isOpen)} 
                        className="flex items-center justify-between flex-grow basis-[90%] border border-[#5e5873] focus:border-[#7c5cc4] border-opacity-40 px-4 py-3 rounded-md cursor-pointer"
                    >
                        {selectedOption}
                       
                        <IoMdArrowDropdown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </div>

                    <button 
                        className="flex-grow basis-[10%] py-3 text-2xl px-3 border border-[#7c5cc4] text-[#7c5cc4] "
                    >
                        <FaPlus />
                    </button>
                </div>

            
                {isOpen && (
                    <div className="absolute z-10 w-[300px] border border-gray-300 mt-1 rounded-md bg-white shadow-lg ">
                        
                        
                        <div className="p-2 border-b">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Type here..."
                                className="w-full border focus:border-[#7c5cc4] px-3 py-2 rounded-md focus:outline-none"
                            />
                        </div>

                     
                        {options.map((option, index) => (
                            <div
                                key={index}
                                
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </label>
        </div>  */}

        <div className="flex flex-col ">
          <h3 className="font-medium mb-2">Brand</h3>
          <div className="flex items-center w-full ">
            <div className="flex-grow">
              <Select
                className="border-hidden border-opacity-40 focus:outline-none rounded-md"
                value={selectedValue}
                onChange={handleChange}
                options={colourOptions}
                placeholder="Pick a colour"
                isClearable
                styles={customStyles}
              />
            </div>
            <button
              onClick={handleRandom}
              className="py-3 text-2xl px-3 border border-[#7c5cc4] text-[#7c5cc4] "
            >
              <FaPlus />
            </button>
          </div>
        </div>
        {/* Category */}
        <div className=''>
          <label className="flex flex-col w-full ">
            <span className="font-medium mb-2 ">Category</span>
            <div className='flex items-center '>
              <input className='border border-[#5e5873] focus:border-[#7c5cc4] border-opacity-40 px-4 py-3 focus:outline-none flex-1 rounded-md' type="text"

              />
              <button className="py-3 text-2xl px-3 border border-[#7c5cc4] text-[#7c5cc4]"><FaPlus /></button>
            </div>
          </label>
        </div>

        {/* Product Unit   */}
        <div className=''>
          <label className="flex flex-col w-full ">
            <span className=" font-medium mb-2">Product Unit</span>
            <select className=" select border border-[#5e5873] focus:border-[#7c5cc4] border-opacity-40 px-4 py-3 focus:outline-none rounded-md">
              <option disabled selected>Pick one</option>
              <option>Star Wars</option>
              <option>Harry Potter</option>
              <option>Lord of the Rings</option>
              <option>Planet of the Apes</option>
              <option>Star Trek</option>
            </select>

          </label>
        </div>

        {/* Sale Unit   */}
        <div className=''>
          <label className="flex flex-col w-full ">
            <span className=" font-medium mb-2">Product Unit</span>
            <select className=" select border border-[#5e5873] focus:border-[#7c5cc4] border-opacity-40 px-4 py-3 focus:outline-none rounded-md">
              <option disabled selected>Pick one</option>
              <option>Star Wars</option>
              <option>Harry Potter</option>
              <option>Lord of the Rings</option>
              <option>Planet of the Apes</option>
              <option>Star Trek</option>
            </select>

          </label>
        </div>

        {/* Purchase Unit   */}
        <div className=''>
          <label className="flex flex-col w-full ">
            <span className=" font-medium mb-2">Purchase Unit</span>
            <select className=" select border border-[#5e5873] focus:border-[#7c5cc4] border-opacity-40 px-4 py-3 focus:outline-none rounded-md">
              <option disabled selected>Pick one</option>
              <option>Star Wars</option>
              <option>Harry Potter</option>
              <option>Lord of the Rings</option>
              <option>Planet of the Apes</option>
              <option>Star Trek</option>
            </select>

          </label>
        </div>

        {/* product Cost */}
        <div className=''>
          <label className="flex flex-col w-full ">
            <span className="font-medium  mb-2">product Cost</span>
            <input className='border border-[#5e5873] focus:border-[#7c5cc4] border-opacity-40 px-4 py-3 focus:outline-none rounded-md' type="number" />

          </label>
        </div>

        {/* product Price */}
        <div className=''>
          <label className="flex flex-col w-full ">
            <span className="font-medium  mb-2">Product Price</span>
            <input className='border border-[#5e5873] focus:border-[#7c5cc4] border-opacity-40 px-4 py-3 focus:outline-none rounded-md' type="number" />

          </label>
        </div>

        {/* Wholesale Price */}
        <div className=''>
          <label className="flex flex-col w-full ">
            <span className="font-medium  mb-2">Wholesale Price</span>
            <input className='border border-[#5e5873] focus:border-[#7c5cc4] border-opacity-40 px-4 py-3 focus:outline-none rounded-md' type="number" />

          </label>
        </div>

        {/* Daily Sale Objective */}
        <div className=''>
          <label className="flex flex-col w-full ">
            <div className='flex items-center gap-2'>
              <span className="font-medium flex  gap-2 mb-2">Daily Sale Objective </span>
              <FaRegQuestionCircle className='text-[#7c5cc4] text-2xl' />
            </div>
            <input className='border border-[#5e5873] focus:border-[#7c5cc4] border-opacity-40 px-4 py-3 focus:outline-none rounded-md' type="number" />

          </label>
        </div>


        {/* Alert Quantity*/}
        <div className=''>
          <label className="flex flex-col w-full ">
            <span className="font-medium  mb-2">Alert Quantity</span>
            <input className='border border-[#5e5873] focus:border-[#7c5cc4] border-opacity-40 px-4 py-3 focus:outline-none rounded-md' type="number" />

          </label>
        </div>
        {/* Product Tax */}
        <div className="flex flex-col ">
          <h3 className="font-medium mb-2">Product Tax</h3>
          <div className="flex items-center w-full ">
            <div className="flex-grow">
              <Select
                className="border-hidden border-opacity-40 focus:outline-none rounded-md"
                value={selectedValue}
                onChange={handleChange}
                options={TaxOptions}
                placeholder="Pick a colour"
                isClearable
                styles={customStyles}
              />
            </div>
            <button
              onClick={handleRandom}
              className="py-3 text-2xl px-3 border border-[#7c5cc4] text-[#7c5cc4] "
            >
              <FaPlus />
            </button>
          </div>
        </div>

        {/* Tax Method */}
        <div className=''>
          <label className="flex flex-col w-full ">
            <span className=" font-medium mb-2">Purchase Unit</span>
            <select className=" select border border-[#5e5873] focus:border-[#7c5cc4] border-opacity-40 px-4 py-3 focus:outline-none rounded-md">
              <option disabled selected>Pick one</option>
              <option>Star Wars</option>
              <option>Harry Potter</option>
              <option>Lord of the Rings</option>
              <option>Planet of the Apes</option>
              <option>Star Trek</option>
            </select>

          </label>
        </div>
        {/* Initial Stock */}
        <div className='flex flex-col justify-center '>
          <div className="flex gap-2">
            <div>
              <input
                type="checkbox"
                id="agree"
                className="w-4 h-4 cursor-pointer"
              />
            </div>
            <div>
              <label htmlFor="agree" className="font-medium cursor-pointer">Initial Stock</label>
            </div>
          </div>

          <p className="text-sm italic text-gray-500 mt-3">This feature will not work for product with variants and batches</p>

        </div>
        {/* Featured */}
        <div className='flex flex-col justify-center '>
          <div className="flex gap-2">
            <div>
              <input
                type="checkbox"
                id="agree"
                className="w-4 h-4 cursor-pointer"
              />
            </div>
            <div>
              <label htmlFor="agree" className="font-medium cursor-pointer">Featured</label>
            </div>
          </div>
          <p className="text-sm italic text-gray-500 mt-3">Featured product will be displayed in POS</p>
        </div>
        {/* Embedded Barcode */}
        <div className="flex items-center gap-2 mt-10">
          <div>
            <input
              type="checkbox"
              id="agree"
              className="w-4 h-4 cursor-pointer"
            />
          </div>
          <div>
            <label htmlFor="agree" className="font-medium cursor-pointer">Embedded Barcode</label>
          </div>
          <FaRegQuestionCircle className='text-[#7c5cc4] text-xl' />
        </div>



      </div>

      <div className='px-4'>
        <div className='flex items-center gap-2 mt-5'>
          <div>
            <label htmlFor="agree" className="font-medium cursor-pointer">Embedded Barcode</label>
          </div>
          <FaRegQuestionCircle className='text-[#7c5cc4] text-xl' />
        </div>
        <div
          {...getRootProps()}
          className=" border-2 border-gray-400 p-6 rounded-md text-center cursor-pointer mt-5 h-[200px]"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-blue-500">Drop the files here ...</p>
          ) : (
            <p className="text-gray-500">Drag & drop an image here, or click to select one</p>
          )}
          {image && (
            <img src={image} alt="Preview" className="mt-4 w-32 h-32 object-cover rounded-md" />
          )}
        </div>
      </div>
    </div>
  );
};


export default AddProduct;