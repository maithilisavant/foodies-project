import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req) {
    const client = await clientPromise;
    const db = client.db('meals');

    let body;
    try {
        body = await req.json();
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    console.log('Received body:', body);

    try {
        const newRecipe = {
            id: Math.floor(Math.random() * 10000),
            name: body.name,
            cooking_time: body.cooking_time,
            prep_time: body.prep_time,
            image: body.image || '',
            steps: body.steps,
            city: body.city,
        };


        const result = await db.collection('foodies-app').insertOne(newRecipe);

        return NextResponse.json({ message: 'Recipe added successfully', recipe: { ...newRecipe, id: result.insertedId } }, { status: 201 });
    } catch (error) {
        console.error('Error adding recipe:', error);
        return NextResponse.json({ error: 'Failed to add recipe' }, { status: 500 });
    }
}