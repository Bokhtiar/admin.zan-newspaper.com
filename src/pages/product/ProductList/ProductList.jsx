import React, { useState } from 'react';
import AddButton from '../../../components/button/AddButton';
import ImportButton from '../../../components/button/ImportButton';
import ProductButtons from './ProductButtons';
import ProductTable from './ProductTable';
import FilterProduct from './FilterProduct';

const ProductList = () => {
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
          <AddButton buttonName="Add Product" ></AddButton>
          <ImportButton buttonName="Import Product"></ImportButton>
        </div>
        <div>
          <FilterProduct></FilterProduct>
        </div>
        <div >
          <div className='mt-10'>
            <ProductButtons clickData={clickData} setClickData={setClickData} handleButtonClick={handleButtonClick}></ProductButtons>
          </div>
          <div className='mt-5'>
            <ProductTable clickData={clickData}></ProductTable>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;