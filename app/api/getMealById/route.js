import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(req) {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('meals');

    const mealDocuments = await db.collection('foodies-app').find({}).toArray();
    
    if (!mealDocuments.length) {
        return NextResponse.json({ error: 'No data found in collection' }, { status: 404 });
    }

    const mealDocument = mealDocuments[0];
    if (!mealDocument.data) {
      return NextResponse.json({ error: 'No data found in collection' }, { status: 404 });
    }
    const meal = mealDocument.data.find(meal => meal.id === parseInt(id));
    if (meal) {
      return NextResponse.json(meal);
    } else {
      return NextResponse.json({ error: 'Meal not found' }, { status: 404 });
    }
}