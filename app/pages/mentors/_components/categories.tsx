import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Categories = ({setTab }: {  setTab: (tab: string) => void }) => {
  const handleCategoryClick = (category:string) => {
    setTab(category); // Set the selected category in the parent component
  };

  return (
    <div className='mt-9 h-screen flex flex-col'>
      <div>
        <input
          type="text"
          placeholder="Type a command or search..."
          className="border border-gray-300 rounded-md px-3 py-2"
        />
      </div>
      <div className='overflow-visible'>
        <div className="text-gray-500 text-sm mb-2">Suggestions:</div>
        <div className="flex flex-col gap-2">
          <button onClick={() => handleCategoryClick('Ecommerce')} className='p-2 flex gap-2 items-center'>
            <Image src={'/ecom.png'} alt='icon' width={25} height={25} />
            Ecommerce
          </button>
          <button onClick={() => handleCategoryClick('bodybuilding')} className='p-2 flex gap-2 items-center'>
            <Image src={'/gym.png'} alt='icon' width={25} height={25} />
            Body Building
          </button>
          <button onClick={() => handleCategoryClick('trading')} className='p-2 flex gap-2 items-center'>
            <Image src={'/crypto.png'} alt='icon' width={25} height={25} />
            Trading
          </button>
          <button onClick={() => handleCategoryClick('calculator')} className='p-2'>
            Calculator
          </button>
        </div>
      </div>
    </div>
  );
}

export default Categories;
