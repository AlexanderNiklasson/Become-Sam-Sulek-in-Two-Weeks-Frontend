import React from 'react';
import DumbellImage from './dumbell.png';

export default function Dumbells({ workout }) {
    const dumbells = [];
    
    const numberOfDumbells = Math.ceil(parseFloat(workout.complexity) / 10);
    
    for (let i = 0; i < numberOfDumbells; i++) {
        dumbells.push(
            <img
                key={i}
                src={DumbellImage}
                alt="dumbell"
                className="h-4 w-4 mr-1 ml-1"
            />
        );
    }

    return (
        <>
          {dumbells}
        </>
    );
}