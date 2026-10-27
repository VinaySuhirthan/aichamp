import { NextRequest, NextResponse } from "next/server";
import { site, services } from "@/content/content";

const SYSTEM_PROMPT = `You are the official AI Assistant for "AI Biz Champ" (https://aibizchampion.com), an elite AI digital agency and technology consultancy led by Dr. G. Nalinipriya.

Founder & Leadership:
- Dr. G. Nalinipriya: Professor in Information Technology, AI & Machine Learning Specialist, PhD Supervisor at a world top-ranking university.
- 30+ years of distinguished experience across academia, research, and industry.
- Mastered 200+ advanced AI tools.
- 7 patents in advanced digital domains (4 granted).
- Recipient of international postdoctoral fellowships, global keynote speaker, and doctoral mentor.

Core Services Offered (15 services across 4 pillars):
1. Visual Design: Poster Design, Distinctive Logo Design, Personal Branding.
2. Video & Content: Short Video Creation, Instagram Reels Creation, Vlog Creation, UGC Video Creation, Advertisement Video Production, Photorealistic AI Avatar Creation.
3. Web & Intelligence: Modern High-Speed Website Design & Development, Conversational Chatbot Creation & Integration, Autonomous AI Agent Development & Integration.
4. Publishing, Music & Research: E-book Creation, Publishing & Global Selling, Personalized AI Music Creation, Academic Research Paper Writing & Assistance.

Our 4-Step Process:
1. Discover: In-depth consultation to understand business goals and requirements.
2. Design: Translate vision into clear deliverables and directional proofs.
3. Build: High-precision AI-assisted execution with rigorous human expert oversight.
4. Deliver: Production-ready assets with handover documentation and ongoing support.

Turnaround & Details:
- Visual design projects: 5–7 business days.
- Web & AI agent projects: Milestone-based delivery.
- Email: aibusinesschampions@gmail.com
- Contact: Scroll to the Contact Section on the website to book a free discovery consultation.

Communication Style:
- Warm, knowledgeable, authoritative, concise, and helpful.
- Use clean markdown bullet points and bold highlights.`;

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

// Comprehensive, high-precision domain knowledge engine
function generateDomainResponse(message: string, history: ChatMessage[] = []): string {
  const q = message.toLowerCase().trim();

  // Greetings
  if (
    q === "hi" ||
    q === "hello" ||
    q === "hey" ||
    q === "start" ||
    q.startsWith("hi ") ||
    q.startsWith("hello ")
  ) {
    return `Hello! Welcome to **AI Biz Champ**.\n\nI am your AI Consultant guided by **Dr. G. Nalinipriya** (Professor in IT & AI Specialist with 30+ years experience and 200+ AI tools).\n\nHow can I assist your business or project today?\n- **Explore 15 AI Services** (Design, Video, Web, AI Agents, Research)\n- **Learn about Dr. G. Nalinipriya**\n- **Project Timelines & Pricing**\n- **Book a Discovery Consultation**`;
  }

  // Founder / Leadership
  if (
    q.includes("nalinipriya") ||
    q.includes("founder") ||
    q.includes("who is") ||
    q.includes("doctor") ||
    q.includes("leader") ||
    q.includes("experience") ||
    q.includes("patent")
  ) {
    return `**Dr. G. Nalinipriya** is the distinguished founder of **AI Biz Champ**:\n\n- **Professor in Information Technology** and Senior AI & Machine Learning Specialist.\n- **30+ years** of leadership across academia, research, and enterprise digital solutions.\n- Mastery over **200+ cutting-edge AI tools** across multimodal design, generative video, and autonomous workflows.\n- Holder of **7 digital domain patents** (4 granted).\n- PhD Supervisor at a world top-ranking university, having guided hundreds of doctoral scholars and entrepreneurs.\n\nUnder her leadership, every client project combines state-of-the-art AI automation with rigorous academic precision and human oversight.`;
  }

  // Services - General Overview
  if (
    q.includes("service") ||
    q.includes("what do you do") ||
    q.includes("offer") ||
    q.includes("help me with") ||
    q.includes("list")
  ) {
    return `We deliver **15 specialized AI services** organized across 4 strategic pillars:\n\n1. **Visual Design**:\n   - High-Impact Poster Design\n   - Distinctive Vector Logo Design\n   - Executive Personal Branding\n\n2. **Video & Content Creation**:\n   - Viral Short Videos & Reels\n   - YouTube & Social Vlogs\n   - Authentic UGC Videos & High-Converting Ads\n   - Photorealistic Custom AI Avatars\n\n3. **Web & Autonomous Intelligence**:\n   - Ultra-Fast Responsive Websites (Next.js / Modern Stack)\n   - Custom Conversational Chatbots with RAG\n   - Autonomous Multi-Step AI Agent Systems\n\n4. **Publishing, Music & Academic Research**:\n   - Comprehensive E-Book Creation & Global Amazon Publishing\n   - Studio-Grade AI Music Composition\n   - Peer-Reviewed Academic Research Paper Writing & Assistance\n\nWhich service pillar would you like to explore in detail?`;
  }

  // Web & AI Agents / Chatbots
  if (
    q.includes("agent") ||
    q.includes("chatbot") ||
    q.includes("bot") ||
    q.includes("website") ||
    q.includes("web") ||
    q.includes("software") ||
    q.includes("automation")
  ) {
    return `Our **Web and Intelligence Solutions** empower modern businesses with automated scale:\n\n- **Modern Websites**: Ultra-fast Next.js architecture, fluid GSAP micro-animations, mobile optimization, and SEO excellence.\n- **Custom AI Chatbots**: Domain-specific conversational assistants trained directly on your business knowledge with zero hallucinations.\n- **Autonomous AI Agents**: Multi-agent orchestration to automate CRM lead qualification, scheduling, customer queries, and multi-step workflows.\n\nWould you like to book a free discovery call to discuss scoping an AI agent or website for your project?`;
  }

  // Video, Reels, Avatars
  if (
    q.includes("video") ||
    q.includes("reel") ||
    q.includes("avatar") ||
    q.includes("vlog") ||
    q.includes("ugc") ||
    q.includes("ad") ||
    q.includes("instagram")
  ) {
    return `Our **Video & Content Studio** utilizes state-of-the-art generative video models to create captivating media:\n\n- **Short Videos & Instagram Reels**: High-retention visual hooks, dynamic pacing, auto-captions, and trending soundscapes.\n- **Photorealistic AI Avatars**: Professional digital twins for founder announcements, multilingual tutorials, and training videos without studio cameras.\n- **UGC & Conversion Ads**: Authentic user-generated style creatives designed specifically to lower customer acquisition costs.\n\nTurnaround for video packages is typically **3–5 business days**.`;
  }

  // Research & Academic Paper Assistance
  if (
    q.includes("research") ||
    q.includes("paper") ||
    q.includes("academic") ||
    q.includes("phd") ||
    q.includes("journal") ||
    q.includes("scopus") ||
    q.includes("ieee") ||
    q.includes("springer")
  ) {
    return `Under the direct mentorship of **Dr. G. Nalinipriya** (Doctoral Supervisor & Senior IT Professor), our **Academic Research Assistance** includes:\n\n- Comprehensive literature review synthesis and novelty formulation.\n- Mathematical modeling, experimental design, and empirical methodology guidance.\n- Manuscript structuring conforming to IEEE, Springer, Elsevier, and Scopus standards.\n- Plagiarism check and academic rigor verification.\n\nFeel free to scroll down to our **Contact Section** to submit your research inquiry!`;
  }

  // E-books & Music
  if (
    q.includes("ebook") ||
    q.includes("e-book") ||
    q.includes("book") ||
    q.includes("publish") ||
    q.includes("amazon") ||
    q.includes("music") ||
    q.includes("song")
  ) {
    return `We provide end-to-end publishing and creative audio:\n\n- **E-Book Creation & Publishing**: Ideation, chapter drafting, formatting, cover design, and listing on Amazon KDP.\n- **Personalized AI Music**: Custom royalty-free background tracks, corporate theme music, podcasts intros, and ambient soundscapes.\n\nWould you like guidance on publishing an e-book or composing audio assets?`;
  }

  // Pricing & Timeline
  if (
    q.includes("price") ||
    q.includes("cost") ||
    q.includes("quote") ||
    q.includes("rate") ||
    q.includes("charge") ||
    q.includes("budget") ||
    q.includes("time") ||
    q.includes("timeline") ||
    q.includes("turnaround") ||
    q.includes("how long")
  ) {
    return `**Transparent Scoping & Fast Delivery**:\n\n- **Visual Design Packages**: Standard packages with deliverables completed in **5–7 business days**.\n- **Video & Short Content**: Delivered in **3–5 business days** with revision cycles.\n- **Web & AI Software**: Milestone-based scoping tailored strictly to your technical requirements.\n- **Academic Assistance**: Structured according to publication deadlines and conference schedules.\n\nFor a transparent, customized quote, simply scroll to the **Contact Section** below to request a tailored proposal.`;
  }

  // Contact & Consultation
  if (
    q.includes("contact") ||
    q.includes("book") ||
    q.includes("call") ||
    q.includes("email") ||
    q.includes("consult") ||
    q.includes("hire") ||
    q.includes("meet")
  ) {
    return `You can get in touch with **Dr. G. Nalinipriya & AI Biz Champ** directly:\n\n- **Website Form**: Scroll to the [Contact Section](#contact) on this page to submit your inquiry.\n- **Email**: ${site.email}\n- **Direct Consultation**: We offer free initial discovery sessions to scope your AI requirements.\n\nOur team typically responds within 24 hours!`;
  }

  // Thanks / Gratitude
  if (q.includes("thank") || q.includes("thanks") || q.includes("awesome") || q.includes("great")) {
    return `You're very welcome! If you have any more questions about our AI services or want to book a consultation, I'm right here. Have a great day!`;
  }

  // General Fallback
  return `Thank you for your question! **AI Biz Champ** delivers elite AI solutions directed by **Dr. G. Nalinipriya** (Professor in IT with 30+ yrs experience and 200+ AI tools).\n\nHere are popular topics you can ask me about:\n- **"What services do you offer?"** (Visual, Video, Web, AI Agents, Academic Publishing)\n- **"Tell me about Dr. G. Nalinipriya"** (Patents, research, background)\n- **"How long does a project take?"** (Timelines & delivery)\n- **"How do I book a consultation?"** (Direct contact & proposals)\n\nWhat would you like to know more about?`;
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

    // If API key is present and looks valid, attempt a fast live call with 1.8s timeout
    if (apiKey && apiKey.startsWith("nvapi-") && apiKey !== "your_nvidia_api_key_here") {
      try {
        const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: primaryModel,
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...messages.slice(-6),
            ],
            temperature: 0.6,
            max_tokens: 600,
            stream: false,
          }),
          signal: AbortSignal.timeout(1800), // Strict 1.8s timeout so user never waits
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply && reply.trim()) {
            return NextResponse.json({
              reply: reply.trim(),
              source: "nvidia-live",
            });
          }
        }
      } catch (err: any) {
        // Fall through immediately to domain intelligence engine
      }
    }

    // High-speed, guaranteed domain conversational intelligence
    const reply = generateDomainResponse(lastUserMessage, messages);
    return NextResponse.json({
      reply,
      source: "ai-biz-champ-intelligence",
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        reply:
          "Hello! I am your AI Biz Champ Consultant. Feel free to ask about our 15 AI services, Dr. G. Nalinipriya's leadership, pricing, or scroll to the Contact Section below to book a consultation!",
        source: "resilient-fallback",
      },
      { status: 200 }
    );
  }
}
