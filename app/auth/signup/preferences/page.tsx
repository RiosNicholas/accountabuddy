"use client"

import { FormEvent, useState } from 'react';
import MethodPreferences from './MethodPreferences';
import GoalPreferences from './GoalPreferences';
import AccountabilityPreferences from './AccountabilityPreferences';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';


export default function SignupProfilePreferencesPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

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
        {currentStep === 1 && <MethodPreferences />}
        {currentStep === 2 && <GoalPreferences />}
        {currentStep === 3 && <AccountabilityPreferences />}
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
