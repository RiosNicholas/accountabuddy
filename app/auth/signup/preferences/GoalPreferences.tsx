"use client"

import { AreasProps } from './PreferenceInterfaces';

export default function GoalPreferences({ areas, preferencesData, setPreferencesData }: AreasProps) {
  
  const handleOptionClick = (option: number) => {
    if (preferencesData.growthAreas.includes(option)) {
      setPreferencesData({
        ...preferencesData,
        growthAreas: preferencesData.growthAreas.filter((area) => area !== option)
      });
    } else {
      setPreferencesData({
      ...preferencesData,
      growthAreas: [...preferencesData.growthAreas, option]
    });
    }
  };

  return (
    <>
      <h1 className="font-bold text-left mb-3">Which areas of your life do you seek growth in?</h1>
      {areas==null ? (
        <p>Loading...</p>
      ) : (
      <ul className='space-y-3 w-2/3 lg:w-1/2'>
        {areas.map((bucket) => (
          // TODO: add an icon to the left of the each bucket name
          
          <li
            key={bucket.id as React.Key}
            onClick={() => handleOptionClick(bucket.id)}
            className={`
              hover:cursor-pointer p-2 rounded outline outline-1 outline-accent transition-colors duration-200 ${ preferencesData.growthAreas.includes(bucket.id) ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`
            }
          >
            {bucket.area}
          </li>
        ))}
      </ul>
      )}
    </>
  );
};
