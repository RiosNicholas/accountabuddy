/* eslint-disable react/no-unescaped-entities */
"use client";

import { Provider } from 'react-redux';
import store from '../redux/store';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Provider store={store}>
      <main className="bg-background text-foreground h-full flex flex-col items-center justify-center">
        <header className="text-center py-10">
          <h1 className="font-bold text-5xl sm:text-6xl pb-4">Welcome to Accountabuddy! 👋</h1>
          <p className="text-muted-foreground text-lg">Your journey to achieving goals starts here.</p>
        </header>

        <section className="bg-primary text-primary-foreground text-center py-16 px-8 w-full">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Achieve Your Goals with the Right Partner</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Find an accountability buddy, stay productive, and accomplish your goals faster.
          </p>
          <Link
            href="/signup"
            className="bg-secondary text-secondary-foreground font-bold py-3 px-8 rounded-md shadow-lg hover:bg-accent"
          >
            Get Started
          </Link>
        </section>

        <section className="flex flex-col lg:flex-row gap-8 py-16 px-8 w-full max-w-5xl">
          <div className="lg:w-1/3 text-center lg:text-left">
            <h3 className="text-3xl font-extrabold mb-4">About Us</h3>
          </div>
          <div className="lg:w-2/3">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Accountabuddy is designed for students who want to boost productivity by partnering with peers. Whether it’s
              achieving academic goals or personal milestones, our platform makes it easy to find, connect, and grow with
              others. Connect with like-minded students who share your goals and use our built-in tools to stay on top of
              your commitments.
            </p>
          </div>
        </section>
      </main>
    </Provider>
  );
}