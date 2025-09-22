import React, { useState } from "react";

/** Amazon‑style Resume Page – Single‑file React component
 *
 * How to use:
 * 1) Edit the `profile` object with your real info.
 * 2) Add items in work, projects, skills, education, certifications.
 * 3) Use the Print button (top‑right) to save a PDF.
 *
 * Tech: Tailwind utilities only; no external deps. Mobile‑first.
 */

const profile = {
  name: "Abhyush Rajak",
  brand: "Candidate",
  rating: 4.9,
  ratingsCount: "17,482",
  answeredCount: "3,101",
  location: "California (Open for Relocation), USA",
  email: "abhyushrajak99@gmail.com",
  phone: "+1 (840) 237‑3458",
  linkedin: "https://www.linkedin.com/in/abhyush/",
  github: "https://github.com/abhyush",
  leetcode: "https://leetcode.com/abhyush27",
  leetcodeSolved: 289,
  huggingface: "https://huggingface.co/abhyush",
  kaggle: "https://www.kaggle.com/abhyushrajak/competitions",
  photo: import.meta.env.BASE_URL + "profile.jpg", // place a square image in /public as profile.jpg OR use a full URL
  website: "",
  summary:
    "Software Engineer with ~4 years' experience building scalable Python‑based backends, microservices, and API integrations. Strong in ETL pipelines, cloud‑native deployments, and automation (AWS, Docker, CI/CD). Comfortable across SDLC/STLC, data engineering, OAuth, and modern frameworks (FastAPI, Flask) with deep database + REST expertise and practical AI/LLM integration.",
  availability: "In Stock",
  actions: [
    { label: "Add to Cart", hint: "Add to interview pipeline" },
    { label: "Buy Now", hint: "Schedule an interview" }
  ],
  skills: [
    "Python","Java","JavaScript","SQL","Django","Flask","FastAPI","React.js","Node.js","Pandas","NumPy","PySpark","TensorFlow","Scikit‑learn","HTML5","CSS3","REST","GraphQL","WebSockets","Microservices","AWS","GCP","Docker","Kubernetes","Jenkins","GitHub Actions","GitLab CI/CD","Terraform","Ansible","Helm","LLM Integration","RAG","NLP","Firestore","Redis","PostgreSQL","MySQL","MongoDB","Oracle","Snowflake","Agile/Scrum","JIRA","Confluence","PyTest","Selenium","Postman","JMeter","JWT","OAuth2","HTTPS","RBAC","OWASP Top 10","Encryption","Nagios","Prometheus","Splunk","Grafana","Datadog","ELK Stack","Git/GitHub/Bitbucket/GitLab"
  ],
  education: [
    {
      school: "California State University, Long Beach",
      degree: "MS, Computer Science (GPA 3.5/4)",
      location: "Long Beach, CA",
      dates: "2023 – 2024"
    },
    {
      school: "Hitkarni College of Engineering & Technology",
      degree: "B.Tech, Computer Science & Engineering (GPA 3.5/4)",
      location: "Jabalpur, MP, India",
      dates: "—"
    }
  ],
  work: [
    {
      company: "Visa",
      title: "Software Engineer",
      location: "California, USA",
      dates: "Aug 2024 – Present",
      bullets: [
        "Partnered with API Product Owners to close OAuth 2.0 and x‑pay‑token integration gaps and streamline partner onboarding.",
        "Built a Flask‑based API adapter framework to standardize partner connections to Visa Developer Platform (e.g., Visa Direct, Token Service).",
        "Developed Python microservices for token generation, request validation, and payload encryption for secure gateway communication.",
        "Authored PyTest suites for request/response validation in sandbox, cutting manual verification and enforcing spec compliance.",
        "Integrated microservices into Jenkins CI/CD to reduce deployment errors ~20% and accelerate releases.",
        "Set up AWS CloudWatch for high‑volume traffic (10M+ calls/day), enabling proactive latency fixes and 25% fewer partner incidents."
      ]
    },
    {
      company: "Intuit",
      title: "Software Engineer",
      location: "India",
      dates: "Jul 2020 – Jun 2023",
      bullets: [
        "Co‑defined reconciliation requirements; designed Python ingestion architecture for multi‑bank transaction feeds.",
        "Shipped FastAPI microservices to normalize daily transactions into a unified schema; improved reconciliation accuracy and reduced manual work.",
        "Orchestrated ETL with Apache Airflow, shrinking E2E reconciliation from 6h to 45m and enabling near‑real‑time updates.",
        "Tuned PostgreSQL schemas/queries for high‑volume ledgers, improving performance ~40% for reporting.",
        "Containerized ETL on AWS ECS (99.95% uptime), scaling to 3× peak volumes.",
        "Built anomaly‑detection scripts for bank feeds to reduce downstream errors and allow proactive fixes."
      ]
    }
  ],
  projects: [
    {
      name: "Automatic Number Plate Recognition (ANPR) – Real‑Time Pipeline",
      date: "2024",
      tags: ["AWS Kinesis","YOLO","Lambda","OCR","DynamoDB"],
      repo: "https://github.com/abhyush/Automatic-Number-Plate-Recognition",
      bullets: [
        "Built a streaming ANPR pipeline (Kinesis → Lambda → OCR) with sub‑500 ms end‑to‑end latency.",
        "Achieved ~95% plate‑read accuracy with YOLO‑based detection and post‑processing; auto‑stores metadata in DynamoDB."
      ]
    },
    {
      name: "Amazon Book Data ETL Pipeline",
      date: "2024",
      tags: ["Python","Airflow","PostgreSQL","Docker"],
      repo: "https://github.com/abhyush/Amazon-Book-Data-ETL-Pipeline-using-Airflow-PostgreSQL-and-Docker",
      bullets: [
        "End‑to‑end ETL with scheduled DAGs, robust retries, and metadata logging."
      ]
    },
    {
      name: "LangChain AI Chatbot (Hugging Face Space)",
      date: "2024",
      tags: ["LangChain","OpenAI","Streamlit","Docker"],
      repo: "https://huggingface.co/spaces/abhyush/Labgchain_AI_Chatbot",
      bullets: ["RAG‑style QA over docs; easily extensible connectors."]
    }
  ],
  certifications: [
    "AWS Certified Cloud Practitioner",
    "Databases and SQL for Data Science with Python"
  ]
};

const Pill = ({ children }) => (
  <span className="inline-block rounded-full border px-2 py-1 text-xs mt-1 mr-2">
    {children}
  </span>
);

const Section = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    <div className="h-[1px] w-full bg-gray-200 dark:bg-gray-800 mb-4" />
    {children}
  </section>
);

// Avatar component: tries to load image, falls back to initials if missing/404
const Avatar = ({ src, name }) => {
  const [error, setError] = useState(false);
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("");
  if (!src || error) {
    return (
      <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800 text-3xl font-semibold">
        {initials}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={name}
      onError={() => setError(true)}
      className="mx-auto h-40 w-40 rounded-full object-cover"
    />
  );
};

// Social links row with brand logos in the left column
const SocialLinks = () => {
  const socials = [
    profile.linkedin ? { key: 'linkedin', label: 'LinkedIn', url: profile.linkedin, bg: '#0A66C2' } : null,
    profile.github ? { key: 'github', label: 'GitHub', url: profile.github, bg: '#000000' } : null,
    profile.kaggle ? { key: 'kaggle', label: 'Kaggle', url: profile.kaggle, bg: '#20BEFF' } : null,
    profile.leetcode ? { key: 'leetcode', label: 'LeetCode', url: profile.leetcode, bg: '#FFA116' } : null,
    profile.huggingface ? { key: 'huggingface', label: 'Hugging Face', url: profile.huggingface, bg: '#FFCC4D', iconColor: '000000' } : null,
  ].filter(Boolean);

  const Icon = ({ s }) => {
    if (s.key === 'linkedin') {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" focusable="false">
          <path fill="currentColor" d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.225.792 24 1.771 24h20.451C23.2 24 24 23.225 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003zM7.07 20.452H3.716V9H7.07v11.452zM5.393 7.433a2.062 2.062 0 110-4.124 2.062 2.062 0 010 4.124zM20.452 20.452h-3.353v-5.573c0-1.329-.026-3.04-1.855-3.04-1.855 0-2.14 1.45-2.14 2.946v5.667H9.75V9h3.219v1.561h.045c.449-.85 1.546-1.747 3.183-1.747 3.404 0 4.255 2.243 4.255 5.158v6.48z"/>
        </svg>
      );
    }
    return (
      <img alt={`${s.label} logo`} className="h-4 w-4" src={`https://cdn.simpleicons.org/${s.key}/${s.iconColor || 'ffffff'}`} />
    );
  };

  if (!socials.length) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-3">
      {socials.map((s) => (
        <a
          key={s.key}
          href={s.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-900"
        >
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-md"
            style={{ backgroundColor: s.bg, color: s.key === 'linkedin' ? '#ffffff' : undefined }}
          >
            <Icon s={s} />
          </span>
          <span className="text-sm font-medium">{s.label}</span>
        </a>
      ))}
    </div>
  );
};

const ResumeAmazon = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <header className="sticky top-0 z-10 border-b bg-neutral-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="inline-flex items-center gap-2 bg-amber-400 text-black font-bold px-3 h-8 rounded-md shadow-sm hover:bg-amber-300" aria-label="Brand">
              <span className="uppercase tracking-wide">ABHYUSH</span>
              <span className="hidden sm:inline text-xs font-medium">Portfolio</span>
            </a>
            <input
              className="hidden md:block w-72 rounded px-3 py-1 text-black"
              placeholder="what does a good employee look like?"
            />
          </div>
          <div className="text-sm">Account & Lists • Returns • Cart</div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Main content */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-semibold">{profile.name}</h1>
          <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            {profile.location} • <a className="underline" href={"mailto:" + profile.email}>{profile.email}</a> • {profile.phone}
          </div>

          <SocialLinks />

          <Section title="Description">
            <p className="leading-relaxed">{profile.summary}</p>
          </Section>

          <Section title="Work Experience">
            <ul className="space-y-6">
              {profile.work.map((w, idx) => (
                <li key={idx}>
                  <div className="font-medium">{w.company} – {w.title}</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">{w.location} • {w.dates}</div>
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    {w.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Projects">
            <div className="grid md:grid-cols-2 gap-4">
              {profile.projects.map((p, i) => (
                <div key={i} className="rounded-2xl border p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{p.repo ? <a href={p.repo} target="_blank" rel="noreferrer">{p.name}</a> : p.name}</h3>
                    <span className="text-xs text-neutral-500">{p.date}</span>
                  </div>
                  <div className="mt-2">
                    {p.tags.map((t, j) => (
                      <Pill key={j}>{t}</Pill>
                    ))}
                  </div>
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noreferrer" className="inline-block mt-2 rounded-full border px-3 py-1 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-900">
                      View Project ↗
                    </a>
                  )}
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    {p.bullets.map((b, k) => (
                      <li key={k}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* RIGHT: Sidebar */}
        
        <aside className="space-y-6">
          {/* 1) Profile Photo Card */}
          <div className="rounded-2xl border p-4 text-center">
            <Avatar src={profile.photo} name={profile.name} />
            <div className="mt-3 font-semibold">{profile.name}</div>
            <div className="text-xs text-neutral-500">{profile.location}</div>
          </div>

          {/* 2) LeetCode (Coding Profiles) — moved here */}
          <div className="rounded-2xl border p-4">
            <h3 className="font-semibold">Coding Profiles</h3>
            <div className="mt-2 space-y-2">
              <a href={profile.leetcode || '#'} target="_blank" rel="noreferrer" className="block">
                <img
                  alt={`LeetCode ${profile.leetcodeSolved}+ solved`}
                  className="h-8"
                  src={`https://img.shields.io/badge/LeetCode-${encodeURIComponent(String(profile.leetcodeSolved) + '+ solved')}-FFA116?logo=leetcode&logoColor=white`}
                />
              </a>
              <div className="space-y-1 text-sm">
                {profile.github && (
                  <a href={profile.github} target="_blank" rel="noreferrer" className="underline block">
                    GitHub Profile
                  </a>
                )}
                {profile.huggingface && (
                  <a href={profile.huggingface} target="_blank" rel="noreferrer" className="underline block">
                    Hugging Face Profile
                  </a>
                )}
                {profile.kaggle && (
                  <a href={profile.kaggle} target="_blank" rel="noreferrer" className="underline block">
                    Kaggle Competitions
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* 3) Availability / Actions */}
          <div className="rounded-2xl border p-4">
            <div className="text-green-600 font-semibold">{profile.availability}</div>
            <div className="mt-3 space-y-2">
              {profile.actions.map((a, i) => (
                <button
                  key={i}
                  className="w-full rounded-full bg-amber-400 hover:bg-amber-500 text-black font-semibold py-2"
                >
                  {a.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-neutral-500">
              Customers who viewed this also viewed: academic projects, achievements, and skills.
            </p>
          </div>

          {/* 4) Education */}
          <div className="rounded-2xl border p-4">
            <h3 className="font-semibold mb-2">Education</h3>
            {profile.education.map((e, i) => (
              <div key={i} className="mb-3">
                <div>{e.school}</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">{e.degree}</div>
                <div className="text-xs text-neutral-500">
                  {e.location} • {e.dates}
                </div>
              </div>
            ))}
          </div>

          {/* 5) Skills */}
          <div className="rounded-2xl border p-4">
            <h3 className="font-semibold">Skills</h3>
            <div className="mt-2 flex flex-wrap">
              {profile.skills.map((s, i) => (
                <Pill key={i}>{s}</Pill>
              ))}
            </div>
          </div>

          {/* 6) Certifications */}
          <div className="rounded-2xl border p-4">
            <h3 className="font-semibold">Certifications</h3>
            <ul className="list-disc ml-5 mt-2 space-y-1 text-sm">
              {profile.certifications.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>

          {/* 7) Print */}
          <button onClick={() => window.print()} className="w-full rounded-2xl border py-2 font-semibold">
            Print / Save PDF
          </button>
        </aside>

      </main>

      <footer className="border-t py-6 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </footer>
    </div>
  );
};

export default ResumeAmazon;
