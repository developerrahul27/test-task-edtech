import OpenAI from 'openai';
import { NextRequest } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { projectTitle, projectDescription } = await req.json();

    if (!projectTitle) {
      return new Response(JSON.stringify({ error: 'Project title is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      return new Response(JSON.stringify({ 
        error: 'OpenAI API key not configured',
        message: 'AI features are not available without an OpenAI API key'
      }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "o3-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful project management assistant. Provide practical and actionable suggestions for project planning."
        },
        {
          role: "user",
          content: `Based on the project title "${projectTitle}"${projectDescription ? ` and description "${projectDescription}"` : ''}, suggest:

1. A more detailed description (2-3 sentences)
2. Suggested status (draft, active, or completed) with reasoning
3. Suggested due date (if applicable) with reasoning
4. 3-5 actionable next steps for this project

Format your response as JSON with the following structure:
{
  "suggestedDescription": "detailed description here",
  "suggestedStatus": "draft|active|completed",
  "statusReasoning": "reasoning for status",
  "suggestedDueDate": "YYYY-MM-DD or null",
  "dueDateReasoning": "reasoning for due date or null",
  "nextSteps": ["step 1", "step 2", "step 3", "step 4", "step 5"]
}

Keep suggestions practical and actionable.`
        }
      ],
      temperature: 0.7,
    });

    const text = completion.choices[0]?.message?.content;

    if (!text) {
      return new Response(JSON.stringify({ 
        error: 'No response from AI service'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    try {
      const suggestions = JSON.parse(text);
      return new Response(JSON.stringify({ suggestions }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch {
      // Fallback if AI doesn't return valid JSON
      return new Response(JSON.stringify({ 
        error: 'Failed to parse AI response',
        rawResponse: text 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error: unknown) {
    console.error('AI suggestion error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ 
      error: 'Failed to generate suggestions',
      message: errorMessage 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
