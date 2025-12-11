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
          // UPDATED PROMPT: We now ask for "steps" instead of "transformations" to match your UI
          content: `You are an expert interior designer specialized in renter-friendly, sustainable upgrades. Analyze the provided image. Suggest 3 specific DIY improvements that match the user's style and budget. 

Return ONLY valid JSON with this exact structure:
{
  "title": "A catchy title for the transformation plan",
  "steps": [
    {
      "instruction": "Detailed description of what to do (e.g. Paint the legs gold)",
      "cost": "$XX"
    }
  ],
  "total_cost": "$XXX",
  "difficulty": "Easy" | "Medium" | "Hard"
}

Ensure all steps are:
- Renter-friendly (no permanent changes)
- Within the specified budget
- Matching the chosen style`
        },
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: {
                // FIXED: Send the image string directly (it already has the data:image prefix)
                url: image 
              }
            },
            {
              type: 'text',
              text: `Style: ${style}, Budget: $${budget}`
            }
          ]
        }
      ],
      response_format: { type: 'json_object' },
      max_tokens: 1500
    });

    // Parse the response
    const content = completion.choices[0].message.content;
    const result = JSON.parse(content || '{}');

    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to analyze image' },
      { status: 500 }
    );
  }
}