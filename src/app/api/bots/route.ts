import { NextResponse } from "next/server";

const OPENMIC_API_KEY = process.env.NEXT_PUBLIC_OPENMIC_API_KEY;

// GET: list bots
export async function GET() {
  try {
    const res = await fetch("https://api.openmic.ai/v1/bots", {
      headers: {
        Authorization: `Bearer ${OPENMIC_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Openmic API error:", err);
      return NextResponse.json({ error: "Failed to fetch bots" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Error fetching bots:", err.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST: create bot
export async function POST(req: Request) {
  try {
    const { name, domain, prompt } = await req.json();

    if (!name || !prompt) {
      return NextResponse.json(
        { error: "Name and prompt required" },
        { status: 400 }
      );
    }

    // Build payload according to OpenMic API schema
    const body = {
      name,
      prompt, // system instructions
      first_message: "Hello! How can I assist you today?",
      voice_provider: "OpenAI",
      voice: "alloy",
      voice_model: "tts-1",
      voice_speed: 1,
      llm_model_name: "gpt-4",
      llm_model_temperature: 0.7,
      stt_provider: "Deepgram",
      stt_model: "nova-2",
      call_settings: {
        max_call_duration: 10,
        silence_timeout: 15,
        silence_timeout_max_retries: 3,
        silence_timeout_message:
          "I didn’t hear anything. Are you still there?",
        call_recording_enabled: true,
        voicemail_detection_enabled: true,
        hipaa_compliance_enabled: false,
        pci_compliance_enabled: false,
      },
      advanced_settings: {
        agent_personality: "friendly",
        humanize_conversation: true,
        background_noise_reduction: true,
        allow_interruptions: true,
        min_interruption_duration: 0.5,
        agent_response_length: "normal",
        short_pause: 0.3,
        long_pause: 1,
      },
      post_call_settings: {
        summary_prompt:
          "Provide a brief summary of the interaction and any action items.",
        success_evaluation_prompt:
          "Rate the success of this call on a scale of 1–10 based on satisfaction.",
        success_evaluation_rubric_type: "NUMERIC_SCALE",
      },
    };

    const res = await fetch("https://api.openmic.ai/v1/bots", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENMIC_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("OpenMic error:", data);
      return NextResponse.json(
        { error: data.error?.message || "Failed to create bot" },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { botUid } = await req.json();

    if (!botUid) {
      return NextResponse.json({ error: "botUid is required" }, { status: 400 });
    }

    const res = await fetch(`https://api.openmic.ai/v1/bots/${botUid}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENMIC_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const data = await res.json();
      console.error("OpenMic delete error:", data);
      return NextResponse.json(
        { error: data.error?.message || "Failed to delete bot" },
        { status: res.status }
      );
    }

    return NextResponse.json({ ok: true, message: "Bot deleted successfully" });
  } catch (err: any) {
    console.error("Delete API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
