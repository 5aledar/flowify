import { SignUp } from '@clerk/nextjs';
import React from 'react';

const page = () => {
  return (
    <main className="flex justify-center items-center p-16">
      <SignUp />
    </main>
  );
};

export default page;
