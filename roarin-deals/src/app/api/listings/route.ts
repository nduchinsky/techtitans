import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function GET(request: Request) {
    try {
        const headersList = await headers();
        const token = headersList.get('Authorization');

        if (!token) {
            return NextResponse.json({ error: 'No token provided' }, { status: 401 });
        }

        const response = await fetch('http://localhost:3001/api/listings', {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch listings');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error in listings route:', error);
        return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
    }
}