"use client"

import { FormEvent, useState, useEffect } from 'react';
import MethodPreferences from './MethodPreferences';
import GoalPreferences from './GoalPreferences';
import AccountabilityPreferences from './AccountabilityPreferences';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';
import { PreferencesData } from './PreferenceInterfaces';

const getGrowthAreas = async () => {

  try {
    const response = await fetch(`/api/auth/signup/preferences/getGrowthAreas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    let data = await response.json();
    console.log("Growth areas gotten successfully");
    return data.data;
  } catch (e) {
    console.error("Failed to get growth areas:", e);
  }
};

const getAccountabilityAreas = async () => {

  try {
    const response = await fetch(`/api/auth/signup/preferences/getAccountabilityAreas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    let data = await response.json();
    console.log("Accountability areas gotten successfully");
    return data.data;
  } catch (e) {
    console.error("Failed to get accountability areas:", e);
  }
};

export default function SignupProfilePreferencesPage() {

  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const [growthAreas, setGrowthAreas] = useState(null);
  const [accountabilityAreas, setAccountabilityAreas] = useState(null);

  const [preferencesData, setPreferencesData] = useState<PreferencesData>({
    meetingLocation: "",
    meetingFrequency: "",
    growthAreas: [],
    accountabilityAreas: []
  })

  useEffect(() => {
    const getData = async () => {
      const result = await getGrowthAreas();
      setGrowthAreas(result);
    }
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const result = await getAccountabilityAreas();
      setAccountabilityAreas(result);
    }
    getData();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    router.push('/dashboard');
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };
  
  return (
    <div className='w-full'>
      <main className="flex flex-col items-center">
        <div className="w-2/3 lg:w-1/2 my-6">
          <Progress value={currentStep * 33} />
        </div>
        {currentStep === 1 && <MethodPreferences preferencesData={preferencesData} setPreferencesData={setPreferencesData} />}
        {currentStep === 2 && <GoalPreferences areas={growthAreas} preferencesData={preferencesData} setPreferencesData={setPreferencesData} />}
        {currentStep === 3 && <AccountabilityPreferences areas={accountabilityAreas} preferencesData={preferencesData} setPreferencesData={setPreferencesData} />}
        <div className={`flex ${currentStep === 1 ? 'justify-end' : 'justify-between'} m-4 w-2/3 lg:w-1/2`}>
        {/* TODO: add button disabling and api configuration
          - if form contents are null at a given step, disable the next button, etc.
          - track metadata for form completion and api calls
          - form validation
        */}
        {currentStep !== 1 && <Button onClick={handlePrevious} type="button">Back</Button>}
        {currentStep !== 3 && <Button onClick={handleNext} type="button">Next</Button>}
        {currentStep === 3 && 
          <Button onClick={handleSubmit} type="submit">
            Save Preferences
          </Button>
        } 
        </div>
      </main>
    </div>
  );
};
