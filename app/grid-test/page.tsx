import React from 'react';
import Image from 'next/image';

const GridTest: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Content Area</h1>
        <p>This is the content area. It will be displayed in the first column on medium to large screens, and on top on smaller screens.</p>
      </div>
      <div className="relative">
        <Image 
          src="/pexels-minan1398-853168.jpg" 
          alt="Background Image" 
          layout="fill" 
          objectFit="cover" 
          className="opacity-50"
        />
      </div>
    </div>
  );
};

export default GridTest;