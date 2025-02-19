import React from 'react';
import { FaCopy } from "react-icons/fa";

const ImportButton = (props) => {
  return (
    <div 
    className={`bg-[#7c5cc4] py-3 px-2 rounded-md flex justify-center items-center cursor-pointer w-[170px] border border-[#7c5cc4] 
    ${props.loading ? 'opacity-50 cursor-not-allowed' : ''}`}
>
    <button 
        onClick={props.handleClick} 
        disabled={props.loading}
        className="w-full mx-auto text-white font-semibold flex items-center justify-center gap-1 "
    >
              {props.loading ? 'Loading...' : <>
                <FaCopy /> {props.buttonName}
                </>}
    </button>
</div>
  );
};

export default ImportButton;