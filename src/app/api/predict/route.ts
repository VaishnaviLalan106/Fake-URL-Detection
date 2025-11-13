import { NextResponse } from 'next/server';
import { z } from 'zod';
import { analyzeUrl } from '@/lib/detection';

const predictSchema = z.object({
  url: z.string().min(1, { message: 'URL cannot be empty.' }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = predictSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    
    const { url } = validation.data;
    
    // Basic validation to ensure it's not a ridiculously long string
    if (url.length > 2048) {
        return NextResponse.json({ error: 'URL is too long.' }, { status: 400 });
    }

    const result = analyzeUrl(url);

    return NextResponse.json(result);

  } catch (error) {
    console.error('Prediction API Error:', error);
    return NextResponse.json(
      { error: 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}
