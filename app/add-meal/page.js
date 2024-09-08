'use client';
import React, { useState } from 'react';
import "./style.css";
import { endpoint } from '@/utils/endpoint';

export default function MealForm() {
  const [formData, setFormData] = useState({
    name: '',
    cooking_time: '',
    prep_time: '',
    city: '',
    steps: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      name: formData.name,
      cooking_time: `${formData.cooking_time} minutes`,
      prep_time: `${formData.prep_time} minutes`,
      image: formData.image,
      steps: formData.steps,
      city: formData.city,
    };

    try {
      const response = await fetch(`${endpoint}/addMeal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to add recipe');
      }

      const result = await response.json();
      console.log('Recipe added successfully:', result);

      setFormData({
        name: '',
        cooking_time: '',
        prep_time: '',
        city: '',
        steps: '',
        image: '',
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="input-data">
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
            <div className="underline"></div>
            <label>Recipe Name</label>
          </div>
        </div>
        <div className="form-row">
          <div className="input-data">
            <input 
              type="text" 
              name="cooking_time" 
              value={formData.cooking_time} 
              onChange={handleChange} 
              required 
            />
            <div className="underline"></div>
            <label>Cooking Time (in minutes)</label>
          </div>
          <div className="input-data">
            <input 
              type="text" 
              name="prep_time" 
              value={formData.prep_time} 
              onChange={handleChange} 
              required 
            />
            <div className="underline"></div>
            <label>Prep Time (in minutes)</label>
          </div>
        </div>
        <div className="form-row">
          <div className="input-data">
            <input 
              type="text" 
              name="city" 
              value={formData.city} 
              onChange={handleChange} 
              required 
            />
            <div className="underline"></div>
            <label>City</label>
          </div>
          <div className="input-data">
            <input 
              type="text" 
              name="image" 
              value={formData.image} 
              onChange={handleChange} 
              required 
            />
            <div className="underline"></div>
            <label>Image URL</label>
          </div>
          
        </div>
        <div className="form-row">
          <div className="input-data textarea">
            <textarea 
              rows="20" 
              cols="80" 
              name="steps" 
              value={formData.steps} 
              onChange={handleChange} 
              required 
              placeholder='Steps to Cook' 
              style={{ paddingLeft: "10px" }} 
            ></textarea>
          </div>
        </div>
        <div className="form-row submit-btn">
          <div className="input-data">
            <div className="inner"></div>
            <input type="submit" value="Submit" />
          </div>
        </div>
      </form>
    </div>
  );
}