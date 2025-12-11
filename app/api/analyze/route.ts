import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image, style, budget } = body;

    // Validate input
    if (!image || !style || !budget) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Call OpenAI GPT-4o with vision
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert interior designer specialized in renter-friendly, sustainable upgrades. Analyze the provided image. Suggest 3 specific DIY improvements that match the user\'s style and budget. Return ONLY valid JSON.'
        },
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${image}`
              }
            },
            {
              type: 'text',
              text: `Style: ${style}, Budget: ${budget}`
            }
          ]
        }
      ],
      response_format: { type: 'json_object' },
      max_tokens: 1000
    });

    // Parse the response
    const result = JSON.parse(completion.choices[0].message.content || '{}');

    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to analyze image' },
      { status: 500 }
    );
  }
}
