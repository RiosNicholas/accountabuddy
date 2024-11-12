/* eslint-disable react/no-unescaped-entities */
"use client"

import { Provider} from 'react-redux';
import store from '../redux/store'


export default function HomePage() {

  return (
    <Provider store={store}>
      <main className="flex flex-col items-center justify-center bg-background h-4/5">
        <h1 className="text-4xl font-bold mb-4 text-background-foreground">Coming Soon</h1>
        <p className="text-lg text-secondary-foreground">We're working hard to bring you something amazing. Stay tuned!</p>
      </main>
    </Provider>
  );
}
