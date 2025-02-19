import React, { useState } from 'react';
import AddButton from '../../../components/button/AddButton';
import ImportButton from '../../../components/button/ImportButton';
import CategoryButtons from './CategoryButtons';
import CategoryTable from './CategoryTable';

const Category = () => {
  const [clickData, setClickData] = useState([])

  const handleButtonClick = (btn) => {
    if (!clickData.includes(btn)) {
      setClickData([...clickData, btn]); // New value add kora hocche
    } else {
      setClickData(clickData.filter(item => item !== btn));
    }
  };
  console.log("clickData", clickData);
  return (
    <>
      <div className='md:px-1'>
        <div className='flex gap-4'>
          <AddButton buttonName="Add Sale" ></AddButton>
          <ImportButton buttonName="Import Category"></ImportButton>
        </div>
        <div >
          <div className='mt-5'>
            <CategoryButtons clickData={clickData} setClickData={setClickData} handleButtonClick={handleButtonClick}></CategoryButtons>
          </div>
         <div className='mt-5'>
         <CategoryTable clickData={clickData} ></CategoryTable>
         </div>
        </div>
      </div>
    </>

  );
};

export default Category;