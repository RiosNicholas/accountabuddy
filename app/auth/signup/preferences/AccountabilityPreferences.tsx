"use client"

import { useState } from 'react';

export default function AccountabilityPreferences() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionClick = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((selectedOption) => selectedOption !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const accountabilityAreas = [
    'Habit Building',
    'Setting and Reaching Goals',
    'Managing Time Effectively',
    'Boosting Productivity',
    'Focusing on Wellness',
    'Developing Skills',
    'Building Relationships',
    'Planning Finances',
    'Advancing Your Career',
  ];

  return (
    <>
      <h1 className="font-bold text-left mb-3">Where do you seek accountability?</h1>
        <ul className='space-y-3 w-2/3 lg:w-1/2'>
          {accountabilityAreas.map((bucket) => (
            // TODO: add an icon to the left of the each bucket name
            <li
              key={bucket}
              onClick={() => handleOptionClick(bucket)}
              className={`
                hover:cursor-pointer p-2 rounded outline outline-1 outline-accent transition-colors duration-200 ${ selectedOptions.includes(bucket) ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`
              }
            >
              {bucket}
            </li>
          ))}
      </ul>
    </>
  );
}