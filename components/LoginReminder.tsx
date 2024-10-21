import React from 'react';
import Link from 'next/link';

const LoginReminder: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
      <h2 className="text-xl font-bold text-primary mb-2">
        Don't miss out!
      </h2>
      <p className="text-secondary-foreground text-lg font-medium">
        Please <Link href="/auth/login" className="text-accent hover:underline">sign in</Link> to access all the features on this page.
      </p>
    </div>
  );
};

export default LoginReminder;