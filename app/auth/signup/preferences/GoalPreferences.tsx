"use client"

import { Progress } from '@/components/ui/progress';
import { useState } from 'react';

export default function GoalPreferences() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionClick = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((selectedOption) => selectedOption !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  // FIXME: turn this into a list of objects with a name and a value for the icon (library tbd)
  const goalBuckets = ['Education', 'Health & Fitness', 'Finance', 'Career', 'Self Development', 'Social'];

  return (
    <>
      <h1 className="font-bold text-left mb-3">Which areas of your life do you seek growth in?</h1>
      <ul className='space-y-3 w-2/3 lg:w-1/2'>
        {goalBuckets.map((bucket) => (
          // TODO: add an icon to the left of the each bucket name
          <li
          key={bucket}
          onClick={() => handleOptionClick(bucket)}
          className='hover:cursor-pointer hover:bg-muted p-2 rounded outline outline-1 outline-accent'
          >
            {bucket}
          </li>
        ))}
      </ul>
    </>
  );
};
