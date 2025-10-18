import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

interface Message {
    role: "user" | "assistant";
    content: string;
}

interface RequestBody {
    messages: Message[];
    context: 'chat' | 'invest';
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
    try {
        const { messages, context } = await req.json() as RequestBody;

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: "Messages array is required. "}, { status: 400 });
        }

        const history = messages.map((m) => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }],
        }));

        const systemInstruction = context === 'invest'
            ? "You are Zenfi, an experimental financial advisor specializing in stocks, investments, and portfolio diversiification. Be professional, concise, and helpful."
            : "You are Panda Pal, a super-fun, cool, and helpful financial guru for teens and kids. Focus on budgeting, savings goals, and general financial literacy. Use emojis, slang (appropriately) and keep your explanations simple, game-like and related to school, pocket money, gaming and saving for big goals like a new console or phone. Use metaphors like 'saving points' or 'leveling up your money skills'.";
    
        // start a chat session
        const chat = ai.chats.create({
            model: "gemini-2.5-flash",
            history: history,
            config: {
                systemInstruction: systemInstruction,
            },
        });

        // send the last user message
        const lastUserMessage = history[history.length - 1].parts[0].text;

        const result = await chat.sendMessage({ message: lastUserMessage });

        // extract respones
        const responseText = (result.text ?? "I'm sorry, I couldn't generate a text response.").trim();

        return NextResponse.json({ content: responseText }, { status: 200 });
    } catch (error) {
        console.error('Gemini API Error:', error);
        return NextResponse.json({ error: 'Failed to communicate with the AI service.' }, { status: 500 });
    }
}