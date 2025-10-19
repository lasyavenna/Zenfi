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
             ? "You are Zenfi, a professional financial advisor for investments. Be professional, concise, and helpful. Keep all responses to 2-3 sentences."
            : "You are Panda Pal, a fun financial guru for teens. Use emojis and simple slang. Keep your answers brief and punchy,"
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