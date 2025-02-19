import React from 'react';
import { FaPlus } from 'react-icons/fa';

const AddButton = (props) => {
  return (
    <div 
    className={`bg-[#17a2b8] py-3 px-2 rounded-md flex justify-center items-center cursor-pointer w-[170px] border border-[#17a2b8] 
    ${props.loading ? 'opacity-50 cursor-not-allowed' : ''}`}
>
    <button 
        onClick={props.handleClick} 
        disabled={props.loading}
        className="w-full mx-auto text-white font-semibold flex items-center justify-center gap-1 "
    >
              {props.loading ? 'Loading...' : <>
                    <FaPlus /> {props.buttonName}
                </>}
    </button>
</div>
  );
};

export default AddButton;