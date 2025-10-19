import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { AnalysisResult } from '@/types';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || 'AIzaSyBhZp4QBZwYqjiicc9hKhjZP2Lcu5D_vys');

export async function POST(request: NextRequest) {
  try {
    const { title, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `
You are a geopolitical analyst specializing in India's international relations and strategic affairs. Analyze the following news article and provide a comprehensive 500-word report focusing specifically on how this development impacts India.

Title: ${title}
Content: ${content}

IMPORTANT: Return ONLY valid JSON format. Do not include any markdown formatting, code blocks, or additional text.

Provide a detailed analysis in this exact JSON format:

{
  "summary": "A concise 2-3 sentence summary of the main event",
  "geopoliticalContext": "A detailed explanation of the global geopolitical context and background (100-150 words)",
  "impactForIndia": "A comprehensive 500-word analysis covering: 1) Economic implications for India (trade, investment, supply chains, currency, market access), 2) Diplomatic and foreign policy implications (bilateral relations, multilateral forums, strategic partnerships), 3) Security and defense implications (border security, regional stability, military cooperation), 4) Long-term strategic implications for India's position in the region and globally, 5) Potential opportunities and challenges for India, 6) Recommendations for India's response strategy",
  "sentiment": "positive/negative/neutral",
  "keyTakeaways": ["Key point 1", "Key point 2", "Key point 3", "Key point 4"],
  "timeline": "Expected timeline for when these impacts might materialize (immediate/short-term/medium-term/long-term)"
}

Focus specifically on:
- How this affects India's economic interests and trade relations
- Impact on India's diplomatic relationships and foreign policy
- Security implications for India's borders and regional stability
- India's strategic positioning in global affairs
- Specific sectors or regions in India that might be affected
- Potential policy responses India should consider

Make the analysis detailed, specific, and actionable for Indian policymakers and stakeholders. Return ONLY the JSON object, no other text.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('Raw AI response:', text.substring(0, 200) + '...');

    // Try to parse JSON response
    let analysis: AnalysisResult;
    try {
      // Clean the response text to extract JSON
      let cleanText = text.trim();
      
      // Remove any markdown code blocks if present
      if (cleanText.startsWith('```json')) {
        cleanText = cleanText.replace(/```json\s*/, '').replace(/```\s*$/, '');
      } else if (cleanText.startsWith('```')) {
        cleanText = cleanText.replace(/```\s*/, '').replace(/```\s*$/, '');
      }
      
      // Try to find JSON object in the text
      const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanText = jsonMatch[0];
      }
      
      analysis = JSON.parse(cleanText);
      
      console.log('Successfully parsed JSON:', analysis);
      
      // Ensure all required fields exist
      analysis = {
        summary: analysis.summary || 'Analysis completed',
        geopoliticalContext: analysis.geopoliticalContext || 'Context analysis provided',
        impactForIndia: analysis.impactForIndia || 'Impact analysis provided',
        sentiment: analysis.sentiment || 'neutral',
        keyTakeaways: Array.isArray(analysis.keyTakeaways) ? analysis.keyTakeaways : [],
        timeline: analysis.timeline || 'Medium-term'
      };
    } catch (parseError) {
      console.log('JSON parsing failed, creating structured response from text:', parseError);
      
      // If JSON parsing fails, create a structured response from the text
      const lines = text.split('\n').filter(line => line.trim());
      
      analysis = {
        summary: lines.find(line => line.includes('summary') || line.includes('Summary')) || lines[0] || 'Analysis completed',
        geopoliticalContext: lines.find(line => line.includes('context') || line.includes('Context')) || lines[1] || 'Context analysis provided',
        impactForIndia: lines.find(line => line.includes('impact') || line.includes('Impact')) || lines.slice(2).join(' ') || 'Impact analysis provided',
        sentiment: 'neutral',
        keyTakeaways: [],
        timeline: 'Medium-term'
      };
    }

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Error analyzing article:', error);
    return NextResponse.json(
      { error: 'Failed to analyze article' },
      { status: 500 }
    );
  }
}
