'use client';
import React from 'react';
import Image from "next/image";
// import "./style.css";
import { MealForm } from './mealsForm';

export default function MealsPopup() {
  return (
    <main style={{ background: "white", padding: "20px" }}>
        <MealForm/>
    </main>
  )
}