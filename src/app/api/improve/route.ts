import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text) {
      return new Response(JSON.stringify({ error: "No text provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const prompt = `Improve the grammar, clarity, and structure of the following text. Give bullet-point suggestions:\n\n${text}`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:9002", 
        "X-Title": "Document Summary Assistant Improver",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", 
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: data.error || "OpenRouter error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const improved = data.choices?.[0]?.message?.content || "";

    return new Response(JSON.stringify({ improved }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("IMPROVE API ERROR:", err);
    return new Response(JSON.stringify({ error: err.message || "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
