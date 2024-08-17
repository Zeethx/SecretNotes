import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const prompt =
        "Create a list of three open-ended and engagin questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. For example, your output should be structured like this: 'What is your favorite color?||What is your favorite food?||What is your favorite movie?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive conversational environment. ";

    const result = await streamText({
        model: openai("gpt-3.5-turbo-instruct"),
        prompt,
    });

    
}
