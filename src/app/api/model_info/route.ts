import { NextResponse } from 'next/server';
import { modelInfo } from '@/lib/detection';

export async function GET() {
  try {
    return NextResponse.json(modelInfo);
  } catch (error) {
    console.error('Model Info API Error:', error);
    return NextResponse.json(
      { error: 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}
