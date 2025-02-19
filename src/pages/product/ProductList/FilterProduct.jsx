import React from 'react';
import { SearchableSelect } from '../../../components/input';


const FilterProduct = () => {
  return (
    <div className='bg-white w-full border border-[#7c5cc4] h-56 rounded-md mt-5'>
      <p className='text-center text-3xl mt-2'>Filter Products</p>

      <div className='flex items-center justify-center gap-5 mt-4 px-4'>
        {/* Dropdown Section */}
        <label className="flex flex-col w-full max-w-xs">
          <span className="text-2xl text-[#7c5cc4] mb-2">Warehouse</span>
          <select className=" select border border-[#7c5cc4] px-4 py-3 focus:outline-none rounded-md">
            <option disabled selected>Pick one</option>
            <option>Star Wars</option>
            <option>Harry Potter</option>
            <option>Lord of the Rings</option>
            <option>Planet of the Apes</option>
            <option>Star Trek</option>
          </select>

        </label>

        {/* Button Section */}
        <div className="bg-[#7c5cc4] py-2 px-3 rounded-md w-36 h-12 flex items-center justify-center">
          <button className='text-white'>Submit</button>
        </div>
      </div>


    </div>
  );
};

export default FilterProduct;