'use client';
import React from 'react';
import Image from "next/image";

export const MealContainer = (props) => {
  return (
    <div>
      <img
        src={props?.meal?.image}
        alt={props?.meal?.name}
        style={{ 
          width: "100%", 
          height: "350px", 
          objectFit: "cover", 
          marginBottom: "20px" 
        }}
      />
      <div style={{ textAlign: "start", marginLeft: "40px" }}>
        <div style={{ marginLeft: "10px" }}> 
          <h1>
            {props?.meal?.name}
          </h1> 
        </div>
        <div style={{ padding: "10px" }}>
          <p style={{ display:"flex", gap:5 }}>
            <strong>Cooking Time:</strong> 
            {props?.meal?.cooking_time}
          </p>
          <p style={{ display:"flex", gap:5 }}>
            <strong>Prep Time:</strong> 
            {props?.meal?.prep_time}
          </p>
          <p style={{ display:"flex", gap:5 }}>
            <strong>City:</strong> 
            {props?.meal?.city}
          </p>
          
          <h2>Steps to Cook</h2>
          <ol 
            style={{ 
              margin: "10px 0", 
              padding: "0 20px", 
              listStyle: "decimal" 
            }}
          >
            {props?.meal?.steps.map((step, index) => (
              <li key={index} style={{ margin: "20px 10px" }}>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};