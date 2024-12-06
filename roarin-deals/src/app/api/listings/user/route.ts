import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function GET() {
    try {
        const headersList = await headers();
        const token = headersList.get('Authorization');
        
        if (!token) {
            return NextResponse.json({ error: 'No token provided' }, { status: 401 });
        }

        // Make sure your Express backend is running on port 3001
        const response = await fetch('http://localhost:3001/api/listings/user', {
            method: 'GET',
            headers: {
                'Authorization': token,
            }
        });

        if (!response.ok) {
            console.error('Backend error:', response.status);
            return NextResponse.json({ error: 'Backend request failed' }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Route error:', error);
        return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
    }
}