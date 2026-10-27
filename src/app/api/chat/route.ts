import { NextRequest, NextResponse } from "next/server";
import { site, services, about, process as workflow, faq } from "@/content/content";

const SYSTEM_PROMPT = `You are the official AI Assistant for "AI Biz Champ" (https://aibizchampion.com), a premier AI digital agency and technology consultancy led by Dr. G. Nalinipriya.

Founder & Leadership:
- Dr. G. Nalinipriya: Professor in Information Technology, AI & Machine Learning Specialist, PhD Supervisor at a world top-ranking university.
- 30+ years of distinguished experience across academia, research, and industry.
- Mastered 200+ advanced AI tools.
- 7 patents in advanced digital domains (4 granted).
- Recipient of international postdoctoral fellowships, global keynote speaker, and doctoral mentor.

Core Services Offered (15 services across 4 pillars):
1. Visual Design: Poster Design, Logo Design, Personal Branding.
2. Video and Content: Short Video Creation, Instagram Reels Creation, Vlog Creation, UGC Video Creation, Advertisement Video Production, AI Avatar Creation.
3. Web and Intelligence: Modern Website Design & Development, Chatbot Creation & Integration, Autonomous AI Agent Development & Integration.
4. Publishing, Music & Research: E-book Creation, Publishing & Selling, Personalized AI Music Creation, Academic Research Paper Writing & Assistance.

Our 4-Step Process:
1. Discover: Structured consultation to understand goals and audience.
2. Design: Translate strategy into clear deliverables and success criteria.
3. Build: High-precision execution with rigorous internal review.
4. Deliver: Production-ready assets with handover documentation and ongoing support.

Turnaround & Details:
- Most visual design projects: 5-7 business days.
- Web & AI agent projects: Structured milestone-based delivery.
- Clients: Global digital delivery. Retainers available.
- WhatsApp Direct: +91 99949 65489
- Email: aibusinesschampions@gmail.com

Communication Style:
- Warm, professional, concise, authoritative, and helpful.
- Use neat markdown bullet points and bold highlights.
- Always offer to help them book a discovery consultation or connect with Dr. Nalinipriya on WhatsApp (+91 99949 65489).`;

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

// Intelligent fallback handler if API key is not yet set or external API is unavailable
function generateSmartFallback(message: string): string {
  const q = message.toLowerCase();

  if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("start")) {
    return `Hello! Welcome to **AI Biz Champ**. I am your AI Consultant.\n\nWe provide elite AI-powered design, video, web, agentic systems, and research services led by **Dr. G. Nalinipriya** (Professor in IT & AI Specialist).\n\nHow can I help your business or academic goals today?\n- **Explore Services** (Design, Video, Web, Agents, Research)\n- **Learn about Dr. G. Nalinipriya**\n- **Project timelines & workflow**\n- **Book a Discovery Consultation**`;
  }

  if (q.includes("nalinipriya") || q.includes("who is") || q.includes("about") || q.includes("founder") || q.includes("doctor")) {
    return `**Dr. G. Nalinipriya** is an internationally acclaimed Professor in IT, AI & Machine Learning specialist, and PhD Supervisor with:\n\n- **30+ years** of leadership across academia, research, and industry.\n- Mastery over **200+ advanced AI tools**.\n- **7 digital patents** (4 granted).\n- Keynote speaker at global tech summits and mentor to hundreds of doctoral scholars and entrepreneurs worldwide.\n\nShe personally directs and ensures the high-precision human oversight on all client projects.`;
  }

  if (q.includes("service") || q.includes("what do you do") || q.includes("offer") || q.includes("help")) {
    return `We offer **15 enterprise-grade AI services** categorized into 4 core pillars:\n\n1. **Visual Design**: Poster Design, Distinctive Logo Design, Personal Branding.\n2. **Video & Content**: Short Videos, Instagram Reels, Vlogs, UGC Content, High-converting Ads, Photorealistic AI Avatars.\n3. **Web & Intelligence**: Modern High-speed Websites, Conversational Chatbots, Autonomous AI Agents.\n4. **Publishing & Research**: Professional E-books, Global Amazon Publishing, AI-composed Music, Peer-reviewed Research Paper Writing.\n\nWhich of these would you like to explore?`;
  }

  if (q.includes("price") || q.includes("cost") || q.includes("quote") || q.includes("rate") || q.includes("charge")) {
    return `Every project at AI Biz Champ is custom-scoped to ensure the highest return on investment without paying for unnecessary bloat.\n\n- Visual design deliverables typically start with standard fixed-rate packages.\n- Custom web, AI agent development, and research projects are quoted with transparent milestones.\n\nFor an immediate tailored quote, you can reach out directly to **Dr. G. Nalinipriya** on WhatsApp at **+91 99949 65489** or email **aibusinesschampions@gmail.com**.`;
  }

  if (q.includes("contact") || q.includes("whatsapp") || q.includes("phone") || q.includes("email") || q.includes("book") || q.includes("call")) {
    return `You can connect directly with our team right away:\n\n- **WhatsApp**: [Click to chat (+91 99949 65489)](https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello Dr. Nalinipriya, I would like to discuss an AI project.")})\n- **Email**: ${site.email}\n- **Website Form**: Scroll to the [Contact Section](#contact) on this page to submit your project requirements.\n\nWe respond to all inquiries within one business day!`;
  }

  if (q.includes("agent") || q.includes("bot") || q.includes("chatbot") || q.includes("web") || q.includes("software")) {
    return `Our **Web and Intelligence** services build modern, conversion-optimized solutions:\n\n- **Website Design & Dev**: Ultra-fast Next.js architecture with bespoke animations.\n- **Custom AI Chatbots**: Embedded conversational intelligence trained on your private business knowledge.\n- **Autonomous AI Agents**: Multi-step AI agents that automate customer support, workflow orchestration, and lead generation.\n\nWould you like a demo or consultation on building a custom AI agent for your business?`;
  }

  if (q.includes("research") || q.includes("paper") || q.includes("academic") || q.includes("phd") || q.includes("journal")) {
    return `Led by a PhD supervisor at a top-ranking university, our **Research Paper Writing and Assistance** provides:\n\n- Academic paper structuring, literature review synthesis, and methodology guidance.\n- Conference submission and high-impact journal preparation.\n- Strict adherence to academic rigor, integrity, and novelty.\n\nReach out to discuss your topic with Dr. G. Nalinipriya!`;
  }

  if (q.includes("time") || q.includes("turnaround") || q.includes("how long") || q.includes("process")) {
    return `Our structured 4-step workflow ensures timely delivery:\n\n1. **Discover** (1-2 days consultation)\n2. **Design** (Clear scope & directional proof)\n3. **Build** (Precision AI execution & human review)\n4. **Deliver** (Handover & refinements)\n\nMost visual design projects are delivered in **5–7 business days**. Web and AI software projects follow agreed milestone schedules.`;
  }

  return `Thank you for your question! **AI Biz Champ** provides expert AI-driven design, video, web, agentic software, and academic research services led by Dr. G. Nalinipriya.\n\nWould you like to:\n1. Inquire about a specific service (Design, Video, Web, Agents, Research)?\n2. Schedule a free discovery call with our team?\n3. Chat directly with us on [WhatsApp (+91 99949 65489)](https://wa.me/${site.whatsapp})?`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body as { messages: ChatMessage[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required." },
        { status: 400 }
      );
    }

    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user")?.content || "";

    // Check for NVIDIA API Key in environment
    const apiKey = process.env.NVIDIA_API_KEY?.trim();
    const primaryModel = process.env.NVIDIA_MODEL || "meta/llama-3.2-11b-vision-instruct";
    const modelsToTry = [
      primaryModel,
      "meta/llama-3.2-11b-vision-instruct",
      "meta/llama-3.2-90b-vision-instruct",
      "deepseek-ai/deepseek-v4.1-flash",
      "google/gemma-3-12b-it",
    ].filter((m, i, arr) => arr.indexOf(m) === i);

    // If no valid NVIDIA key configured yet, return instant local intelligence
    if (!apiKey || !apiKey.startsWith("nvapi-") || apiKey === "your_nvidia_api_key_here") {
      const fallbackReply = generateSmartFallback(lastUserMessage);
      return NextResponse.json({
        reply: fallbackReply,
        source: "local-intelligence",
        note: "Add your NVIDIA NIM key starting with 'nvapi-' in .env.local to enable live inference.",
      });
    }

    // Call NVIDIA NIM OpenAI-compatible endpoint with model fallback
    const endpoint = "https://integrate.api.nvidia.com/v1/chat/completions";

    let lastError: string | null = null;
    for (const model of modelsToTry) {
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey.trim()}`,
          },
          body: JSON.stringify({
            model: model,
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...messages.slice(-8), // Keep last 8 context turns
            ],
            temperature: 0.6,
            top_p: 0.9,
            max_tokens: 800,
            stream: false,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({
              reply,
              source: "nvidia-nim",
              model,
            });
          }
        } else {
          lastError = await response.text();
          console.warn(`Model ${model} returned status ${response.status}, trying next fallback model...`);
        }
      } catch (err) {
        console.warn(`Fetch error for model ${model}:`, err);
      }
    }

    // If all models failed, gracefully return high-quality smart fallback
    console.error("All NVIDIA models failed. Last response:", lastError);
    const fallbackReply = generateSmartFallback(lastUserMessage);
    return NextResponse.json({
      reply: fallbackReply,
      source: "fallback-on-api-error",
    });
  } catch (error) {
    console.error("Chat API route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
