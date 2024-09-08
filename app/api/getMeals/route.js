import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
    const client = await clientPromise;
    const db = client.db('meals');
    const meals = await db.collection('foodies-app').find({}).toArray();
    
    return NextResponse.json({ meals });
}