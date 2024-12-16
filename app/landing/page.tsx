"use client";
import React from "react";
import Head from "next/head";

export default function landing() {
    return (
        <div>
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
              <h1 className="font-bold text-4xl pb-16">Accountabuddy</h1>
              <nav>
                  <a href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Sign Up</a>
              </nav>
            </div>

            <div className="bg-primary text-center py-20">
                <h2 className="text-4xl font-extrabold mb-4">Achieve Your Goals with the Right Partner</h2>
                <p className="text-lg mb-8">
                    Find an accountability buddy, stay productive, and accomplish your goals faster.
                </p>
                <a href="/" className="bg-white text-secondary font-bold py-3 px-6 rounded-md shadow-lg hover:bg-gray-100"> 
                    Get Started
                </a>
            </div>

            <div className="flex flex-col md:flex-row gap-10 py-10 px-6">
                <div className="px-10">
                    <p  className="text-4xl font-extrabold">About us</p>
                </div>
                <div>
                    <p className="text-lg text-gray-600 leading-relaxed">Accountabuddy is designed for students who want to boost productivity
                        by partnering with peers. Whether it’s achieving academic goals or personal
                        milestones, our platform makes it easy to find, connect, and grow with others.
                        Connect with like-minded students who share your goals.
                        Use our built-in tools to stay on top of your commitments.

                    </p>
                </div>

            </div>
     

    
          </div>
    
  );
};
