'use client';
import { useRouter } from "next/navigation";
// import { meals } from "./constants";
import Image from "next/image";
import { useEffect, useState } from "react";
import { endpoint } from "@/utils/endpoint";
import { MealsPopup } from "./components/mealsPopup";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      let res = await handleGetData();
      // console.log({res})
      setData(res?.meals);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleGetData = async () => {
    const data = await fetch(`${endpoint}/getMeals`)
    if (!data.ok) {
      console.log('Failed to fetch data')
    }else{
      return data.json()
    }
  }

  const handleRedirection = (item) => {
    let id = item?.id;

    // DYNAMIC ROUTE WITH SINGLE PARAM
    router.push(`/meals/${id}`)
    
    // DYNAMIC ROUTE WITH MULTIPLE PARAMS
    // router.push(`/meals/${slug}/${item?.id}/${item?.city}`);
  }


  return (
    <main style={{ background: "white", padding: "20px" }}>
      <header style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1>Recipe Collection</h1>
      </header>
      <div style={{display: "flex", width: "80%", margin: "auto", justifyContent:"end", marginBottom: "20px"}}>
        <button style={{borderRadius: "10px", padding:"15px", background:"white", cursor: "pointer"}}
          onClick={() => router.push(`/add-meal`)}
          >
          Add New Meal
        </button>
      </div>
      {!loading && <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
          width: "80%",
          margin: "auto",
        }}
      >
        {data?.length > 0 && data?.map((recipe, i) => (
          <div
            key={recipe.id}
            style={{
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              width: "100%",
              borderRadius: "8px",
              overflow: "hidden",
              cursor:"pointer"
            }}
            onClick={() => handleRedirection(recipe)}
          >
            <Image
              width={100}
              height={200}
              src={recipe.image}
              alt={recipe.name}
              layout="responsive"
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <div style={{ padding: "10px" }}>
              <h2 style={{ margin: "0 0 10px 0" }}>{recipe.name}</h2>
              <p style={{ margin: "5px 0" }}>
                <strong>Cooking Time:</strong> {recipe.cooking_time}
              </p>
              <p style={{ margin: "5px 0" }}>
                <strong>Prep Time:</strong> {recipe.prep_time}
              </p>
            </div>
          </div>
        ))}
      </div>}
    </main>
  );
}
