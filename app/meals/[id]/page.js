'use client';
import { MealContainer } from '@/app/components/mealContainer';
import { useEffect, useState } from "react";
import { endpoint } from "@/utils/endpoint";

export default function MealPage({ params }) {
  const { id } = params;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      let res = await handleGetData();
      setData(res);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleGetData = async () => {
    const data = await fetch(`${endpoint}/getMealById?id=${id}`)
    if (!data.ok) {
      console.log('Failed to fetch data')
    }else{
      return data.json()
    }
  }

  return (
    <main style={{background: "white", height:"100%"}}>
      {!loading && <MealContainer meal={data}/>}
    </main>
  );
}