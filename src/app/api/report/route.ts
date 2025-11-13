import { NextResponse } from 'next/server';
import { z } from 'zod';

const reportSchema = z.object({
  url: z.string().min(1),
  predicted_label: z.enum(['phishing', 'legitimate']),
  correct_label: z.enum(['phishing', 'legitimate']),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = reportSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.flatten() }, { status: 400 });
    }
    
    const { url, predicted_label, correct_label } = validation.data;
    
    // Here you would typically save the report to a database like Firestore.
    // For this example, we'll just log it to the console and return success.
    console.log('Received report:', {
      url,
      predicted_label,
      correct_label,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ message: 'Report submitted successfully.' });

  } catch (error) {
    console.error('Report API Error:', error);
    return NextResponse.json(
      { error: 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}
