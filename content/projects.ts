// ─── Single source of truth for all projects ─────────────────────────────────
// To add a project: add one object to the array below and drop the image into
// /public/images/. Nothing else needs to change.

export type Project = {
  slug: string; // URL segment, e.g. "habit-ledger" → /work/habit-ledger
  name: string;
  tagline: string; // One line shown on the card and as the page subtitle
  kind: "product" | "system";
  // "in-development" surfaces a "Coming soon" badge on the card and detail page;
  // the others render no badge.
  status: "live" | "built" | "concept" | "in-development";
  stack: string[]; // e.g. ["Flutter", "Firebase", "Algolia"]

  // Visuals — product cards show cardImage; system cards show a typographic layout.
  cardImage?: string; // Path relative to /public, e.g. "/images/habit-ledger.png"
  video?: string; // Path relative to /public, e.g. "/video/habit-ledger.mp4"
  gallery?: string[]; // Ordered list of image paths

  // Shape of the gallery shots. "portrait" (default) lays phone screenshots out
  // three-up at 9:20; "landscape" stacks wide desktop/web shots at 16:9.
  // Set this to match the images or they get cropped to the wrong ratio.
  galleryAspect?: "portrait" | "landscape";

  // Written content — shown on the detail page
  overview: string; // What the project is
  problem: string; // What problem it solves
  solution: string; // What you specifically built

  // Optional — present on anything with backend or infrastructure substance
  architecture?: {
    summary: string;
    diagram?: string; // Path to an SVG in /public
    decisions: { title: string; body: string }[];
  };

  liveUrl?: string;
  repoUrl?: string;
};

export const projects: Project[] = [
  // ── PRODUCT: mobile / UI apps ────────────────────────────────────────────

  {
    slug: "habita-ai",
    name: "HabitaAi",
    tagline: "Find your next home, just by chatting. AI-powered property search across Kenya.",
    kind: "product",
    status: "live",
    stack: ["Flutter", "FlutterFlow", "Firebase", "Python", "Railway"],
    cardImage: "/images/habita-ai-banner.png",
    video: undefined,
    gallery: [
      "/images/habita-ai-screen-1.jpg",
      "/images/habita-ai-screen-2.jpg",
      "/images/habita-ai-screen-3.jpg",
    ],
    overview:
      "HabitaAi is a property search app for the Kenyan market that lets people look " +
      "for a home the way they'd actually describe it out loud. Instead of filling in " +
      "dropdowns for bedrooms, price bands and location, a house hunter types something " +
      "like “two bedroom in Kilimani under 80k with parking and backup water” and gets " +
      "back real listings that match. It serves both sides of the market, giving property " +
      "managers a place to list and house hunters a way to search, though the app is built " +
      "primarily around the person doing the looking.",
    problem:
      "Property search interfaces make people query like a database. You arrive knowing " +
      "roughly what you want, then spend the next ten minutes translating that into " +
      "checkboxes and sliders, and the things you actually care about, backup water, a " +
      "landlord who allows pets, somewhere quiet but close to the matatu route, either " +
      "aren't filterable or get buried in the description text where no filter can reach " +
      "them. Kenyan listings are also inconsistently structured, so the same estate might " +
      "be written five different ways across five agents. HabitaAi removes the translation " +
      "step. The search handles the language people already use, and the retrieval layer " +
      "does the work of matching it against messy real-world listing data.",
    solution:
      "I was the sole developer on HabitaAi, building it end to end. The Flutter app runs " +
      "on Firebase, with Firestore holding the listings and Firebase Auth handling accounts. " +
      "Retrieval runs on a separate service I deployed to Railway, where ChromaDB stores the " +
      "listing embeddings and handles semantic search over them. Keeping those two in sync is " +
      "the part that matters: a Cloud Function fires on listing writes in Firestore and calls " +
      "a sync endpoint on the Railway service, so a newly posted property is searchable " +
      "without a manual reindex. Queries hit that service, come back with the listings that " +
      "actually match, and get passed to Claude to compose the answer. A good deal of the work " +
      "went into the system prompt, getting the model to answer only from the retrieved " +
      "listings and to handle the shorthand Kenyan renters actually use.",
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.mycompany.habitaai&hl=en",
    repoUrl: undefined,
  },

  {
    slug: "cosecha",
    name: "Cosecha",
    tagline:
      "Program management for nonprofits — participants, sessions, attendance and reporting in one place.",
    kind: "product",
    status: "live",
    stack: ["Flutter", "FlutterFlow", "Firebase"],
    cardImage: "/images/cosecha_main.png",
    video: undefined,
    gallery: [
      "/images/cosecha_dashboard.png",
      "/images/cosecha_events.png",
      "/images/cosecha_programs.png",
    ],
    galleryAspect: "landscape",
    overview:
      "Cosecha is a program management platform for nonprofits that run participant-based " +
      "programs. Organizations use it to register participants, schedule and run sessions or " +
      "recurring activities, track attendance across staff and programs, collect feedback " +
      "through surveys, and produce reports on participation, demographics, and impact. The " +
      "core idea is that a participant's information is captured once and reused across every " +
      "program they take part in, rather than being re-collected each time. It's built for the " +
      "small operations team at a nonprofit, the people currently doing all of this across a " +
      "stack of spreadsheets and disconnected tools.",
    problem:
      "Nonprofits carry a real reporting burden. Funders want participation numbers, " +
      "demographic breakdowns, and evidence of impact, and the data to answer that is usually " +
      "scattered across sign-in sheets, spreadsheets, and whatever each staff member keeps " +
      "their own notes in. Attendance is recorded inconsistently because every program does it " +
      "differently. The same participant fills in the same intake form for the third time " +
      "because nothing connects one program to the next. It's not that the information doesn't " +
      "exist, it's that assembling it into a report costs days that the team would rather spend " +
      "running programs. Cosecha puts participants, sessions, attendance, and feedback in one " +
      "place so the reporting falls out of the day-to-day work instead of being reconstructed " +
      "afterwards.",
    solution:
      "I was the front-end developer on Cosecha, working alongside a designer and a backend " +
      "developer who handled the Firebase side. I built the app in Flutter and FlutterFlow, " +
      "implementing the interfaces for participant registration and profiles, session " +
      "scheduling, attendance capture, and survey collection, working from the designer's " +
      "specs. Much of the work was in handling a multi-role product, where staff, program " +
      "administrators, and participants each see a different slice of the same system, and " +
      "getting data-dense screens like attendance and reporting to stay usable on a phone.",
    liveUrl: "https://cosechasoftware.com/",
    repoUrl: undefined,
  },

  {
    slug: "roots-ai",
    name: "Roots AI",
    tagline:
      "An AI assistant for real estate agents — conversational listing search, marketing ideas, and grounded answers.",
    kind: "product",
    status: "live",
    stack: ["Flutter", "Firebase", "OpenAI"],
    cardImage: "/images/roots-ai-banner.png",
    video: undefined,
    gallery: [
      "/images/roots-ai-splash.png",
      "/images/roots-ai-signup.png",
      "/images/roots-ai-dashboard.png",
      "/images/roots-ai-profile.png",
    ],
    overview:
      "Roots AI is an assistant built for agents at Grassroots Realty, a Canadian brokerage. " +
      "Agents use it to search listings conversationally, work through marketing ideas, and get " +
      "grounded answers on real estate situations they're handling. It's a professional tool " +
      "rather than a consumer app: the audience is the brokerage's own agents, and it's available " +
      "to them around the clock, which matters in a business where questions come up on a showing " +
      "or late in an evening rather than during office hours.",
    problem:
      "An agent's working day generates a constant stream of small questions. What's comparable " +
      "to this listing, how should I position a property that has been sitting, what's the right " +
      "approach to a situation I haven't encountered before. Each one individually is minor, and " +
      "collectively they eat the day. The usual answers are to search a listings portal with " +
      "filters, dig through brokerage documentation, or ask a colleague who may not be free. " +
      "Roots AI collapses all of that into one place an agent can just ask, in the language " +
      "they'd use with a colleague, and get an answer that's specific to how the brokerage " +
      "actually operates.",
    solution:
      "I was the front-end developer on Roots AI, building the app in Flutter on Firebase, with " +
      "OpenAI's models powering the conversational search and advice. My work covered the chat " +
      "interface, the listing search experience, and the surrounding app: authentication " +
      "restricted to brokerage agents, session and conversation state, and the screens that turn " +
      "a model response into something an agent can act on rather than just read.",
    liveUrl:
      "https://play.google.com/store/apps/details?id=ca.grassrootsrealtygroup.rootsai&hl=en",
    repoUrl: undefined,
  },

  {
    slug: "webshopr",
    name: "WebshopR",
    tagline:
      "Social shopping — vote on products head-to-head, share finds, and search by describing what you want.",
    kind: "product",
    status: "in-development",
    stack: ["FlutterFlow", "Firebase", "Algolia", "Node.js", "n8n"],
    cardImage: "/images/webshopr.png",
    video: undefined,
    gallery: [
      "/images/webshopr1.png",
      "/images/webshopr2.png",
      "/images/webshopr3.png",
    ],
    overview:
      "WebshopR is a social shopping app where discovery is driven by other people rather " +
      "than by search. Shoppers browse products, vote on them in head-to-head “This or That” " +
      "comparisons, share finds with friends through deep links, and use an AI shopping agent " +
      "to find things by describing them rather than filtering. Products are synced from " +
      "Shopify stores, so the catalogue is real merchandise from real merchants. It's built " +
      "for people who shop the way they browse social feeds: opinion-led, sociable, and driven " +
      "by what other people are picking.",
    problem:
      "Online shopping is built around knowing what you want. Search boxes, filter panels, " +
      "category trees, all of which work well when you're replacing a kettle and badly when " +
      "you're browsing. The way people actually discover things is social: someone shows you " +
      "something, you ask a friend which one, you see what others picked. That happens on " +
      "Instagram and in group chats, entirely disconnected from the stores selling the " +
      "products, so the moment of interest and the moment of purchase live in different " +
      "places. WebshopR pulls the social layer into the store itself. Voting turns browsing " +
      "into a game, sharing works as a real link back into the product, and the AI agent lets " +
      "someone describe what they're after instead of translating it into filters.",
    solution:
      "WebshopR is Nicolas D'Offay's concept. I was the sole developer, building it in " +
      "FlutterFlow on Firestore with Algolia for search and Cloud Functions in Node.js for the " +
      "backend. The pieces I'm most pleased with are the Shopify sync pipeline, where a " +
      "Firestore-backed category mapping table replaced hardcoded logic so merchants can be " +
      "onboarded without a code change, and the “This or That” voting and stories system, " +
      "which needed custom FlutterFlow widgets and Dart actions to get the interaction feeling " +
      "right. I also built the AI shopping agent as a three-webhook architecture across n8n, " +
      "and the share and deep linking infrastructure that makes a shared product open to the " +
      "right place in the app.",
    liveUrl: undefined,
    repoUrl: undefined,
  },

  {
    slug: "liftmindr",
    name: "LiftMindr",
    tagline:
      "Strength training as a ranked game — workouts earn XP, XP moves you up divisions, standings reset weekly.",
    kind: "product",
    status: "in-development",
    stack: ["Flutter", "Firebase", "Cloud Functions", "FCM", "Fastlane"],
    cardImage: "/images/liftmindr.png",
    video: undefined,
    gallery: [
      "/images/liftmindr1.png",
      "/images/liftmindr2.png",
      "/images/liftmindr4.png",
    ],
    overview:
      "LiftMindr is a strength training app that turns consistency into a game. Users log " +
      "their lifts, follow a program, and track progressive overload over time, but the part " +
      "that keeps them coming back is the ranking system: every workout earns XP, XP moves you " +
      "up through levels and divisions, and the standings reset each week so there's always a " +
      "fresh run to make. It's built for people who already train regularly and would rather " +
      "their sessions counted toward something than sat in a chart.",
    problem:
      "Most training apps are spreadsheets with better typography. They record what you lifted " +
      "and plot it over time, which is useful and completely inert. The real failure mode in " +
      "strength training isn't poor record keeping, it's the weeks you don't show up, and no " +
      "line graph has ever got anyone to the gym on a wet Tuesday evening. Competitive games " +
      "solved this a long time ago: ranks, divisions, and a season that ends, so this week is " +
      "scored and playing this week matters. LiftMindr applies that structure to training. " +
      "Workouts earn XP, XP moves you through the ranks, and the weekly reset means a bad week " +
      "is survivable while a good one counts for something. That's a better motivational shape " +
      "than a chart that only goes up and to the right.",
    solution:
      "I was the sole developer on LiftMindr, building it in Flutter on Firebase for client " +
      "Matthew Meagley and shipping to both the App Store and Play Store. The XP, rank and " +
      "division system was the core of the work: because standings reset weekly, resets had to " +
      "run per user in their own timezone rather than on a single global schedule, which meant " +
      "Cloud Functions driven by IANA timezone strings captured on the device. Around that I " +
      "built FCM push notifications tied to the reset cycle, Sign In with Apple, and Fastlane " +
      "deployment for both stores.",
    liveUrl: undefined,
    repoUrl: undefined,
  },

];
