import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.ELEVENLABS_API_KEY;

    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;

    if (!file) {
      return NextResponse.json(
        { error: "Audio file is required." },
        { status: 400 }
      );
    }

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "ELEVENLABS_API_KEY is not configured in .env.local yet.",
          needsKey: true,
        },
        { status: 401 }
      );
    }

    // Forward to ElevenLabs Speech-to-Text (Scribe) API
    const elevenFormData = new FormData();
    elevenFormData.append("file", file, "recording.webm");
    elevenFormData.append("model_id", "scribe_v1");

    const response = await fetch("https://api.elevenlabs.io/v1/speech-to-text", {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
      },
      body: elevenFormData,
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("ElevenLabs STT error:", response.status, errText);
      return NextResponse.json(
        { error: `ElevenLabs API error: ${response.status}`, details: errText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({
      text: data.text || "",
      words: data.words || [],
    });
  } catch (error: any) {
    console.error("Speech-to-text route error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to transcribe audio." },
      { status: 500 }
    );
  }
}
