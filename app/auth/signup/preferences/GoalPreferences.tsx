"use client"

import { useState } from 'react';

export default function GoalPreferences() {
  // NOTE: this should probably be cached later on so that a user can go back a step and not lose their selections. 
  const [selectedGoalBuckets, setSelectedGoalBuckets] = useState<string[]>([]);

  const handleOptionClick = (option: string) => {
    if (selectedGoalBuckets.includes(option)) {
      setSelectedGoalBuckets(selectedGoalBuckets.filter((selectedGoalBuckets) => selectedGoalBuckets !== option));
    } else {
      setSelectedGoalBuckets([...selectedGoalBuckets, option]);
    }
  };

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
            className={`
              hover:cursor-pointer p-2 rounded outline outline-1 outline-accent transition-colors duration-200 ${ selectedGoalBuckets.includes(bucket) ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`
            }
          >
            {bucket}
          </li>
        ))}
      </ul>
    </>
  );
};
