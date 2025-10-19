import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { prompt: input } = await req.json();

  const result = await client.responses.create({
    model: "gpt-5-nano",
    input,
    max_output_tokens: 1000,
    stream: true,
  });

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of result) {
        if (chunk.type === "response.output_text.delta" && chunk.delta) {
          controller.enqueue(new TextEncoder().encode(chunk.delta));
        }
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      Connection: "keep-alive",
      "Content-Encoding": "none",
      "Cache-Control": "no-cache, no-transform",
      "Content-Type": "text/event-stream; charset=utf-8",
    },
  });
}
