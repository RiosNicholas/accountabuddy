"use client"

import React, { useState } from 'react';

export default function Goals() {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleOptionClick = (option: string) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((selectedOption) => selectedOption !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    const goalBuckets = ['Fitness', 'Finance', 'Education', 'Travel', 'Career'];

    return (
        <div>
            <h1>Select Goal Buckets</h1>
            <ul>
                {goalBuckets.map((bucket) => (
                    <li
                        key={bucket}
                        onClick={() => handleOptionClick(bucket)}
                    >
                        {bucket}
                    </li>
                ))}
            </ul>
        </div>
    );
};
