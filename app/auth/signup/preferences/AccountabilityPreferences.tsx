"use client"

import { Skeleton } from '@/components/ui/skeleton';
import { AreasProps } from './PreferenceInterfaces';

export default function AccountabilityPreferences({ areas, preferencesData, setPreferencesData }: AreasProps) {
  
  const handleOptionClick = (option: number) => {
    if (preferencesData.accountabilityAreas.includes(option)) {
      setPreferencesData({
        ...preferencesData,
        accountabilityAreas: preferencesData.accountabilityAreas.filter((area) => area !== option)
      });
    } else {
      setPreferencesData({
      ...preferencesData,
      accountabilityAreas: [...preferencesData.accountabilityAreas, option]
    });
    }
  };

  return (
    <>
      <h1 className="font-bold text-left mb-3">Where do you seek accountability?</h1>
      {areas==null ? (
        <div className='space-y-3 w-2/3 lg:w-1/2'>
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ) : (
        <ul className='space-y-3 w-2/3 lg:w-1/2'>
          {areas.map((bucket) => (
            // TODO: add an icon to the left of the each bucket name
            <li
              key={bucket.id as React.Key}
              onClick={() => handleOptionClick(bucket.id)}
              className={`
                hover:cursor-pointer p-2 rounded outline outline-1 outline-accent transition-colors duration-200 ${ preferencesData.accountabilityAreas.includes(bucket.id) ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`
              }
            >
              {bucket.area}
            </li>
          ))}
      </ul>
      )}
    </>
  );
}