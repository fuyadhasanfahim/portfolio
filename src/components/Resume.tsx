"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import { IconBrandFacebookFilled, IconBrandGithubFilled, IconBrandInstagram,
  IconBrandLinkedinFilled, IconBrandUpwork, IconBrandWhatsapp, IconBrandX,
  IconMail, IconPlus } from "@tabler/icons-react";

const github = "https://github.com/fuyadhasanfahim";
const email = "buildwithfuyad@gmail.com";
const socials = [
  { name: "GitHub", url: github, Icon: IconBrandGithubFilled },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/fuyadhasanf/", Icon: IconBrandLinkedinFilled },
  { name: "WhatsApp", url: "https://wa.me/8801969489525", Icon: IconBrandWhatsapp },
  { name: "Instagram", url: "https://www.instagram.com/fuyadhasanf/", Icon: IconBrandInstagram },
  { name: "Facebook", url: "https://www.facebook.com/fuyadhasanf/", Icon: IconBrandFacebookFilled },
  { name: "X", url: "https://x.com/fuyadhasanf", Icon: IconBrandX }
];
const markets = [
  { name: "Fiverr", url: "https://www.fiverr.com/fuyadcode", asset: "fiverr.ico" },
  { name: "Upwork", url: "https://www.upwork.com/freelancers/~01fa62a62798dbb893", asset: "" },
  { name: "Contra", url: "https://contra.com/fuyadhasanfahim", asset: "contra.png" },
  { name: "Himalayas", url: "https://himalayas.app/@fuyadhasanfahim", asset: "himalayas.ico" }
];

const work = [
  { name: "HR Management System", field: "Business software", summary: "From attendance and payroll to invoicing and payments.",
    problem: "Operations staff need to trace a payroll total back to attendance and leave, and finance needs a record of what was paid.",
    solution: "I connected employee records, payroll approvals and invoices, with Stripe and PayPal in the payment app.",
    result: "Staff can review the inputs before approving a run and check payment status against the invoice." },
  { name: "Client Portal", field: "Client operations", summary: "One workspace for quotes, payments, revisions and delivery.",
    problem: "A service order can span several conversations, payment records and versions of the same file.",
    solution: "I tied each quote, Stripe or PayPal payment, revision request and file delivery to its order.",
    result: "Clients can follow the order from the original quote through to the delivered files." },
  { name: "Lead Portal", field: "Sales tools", summary: "Spreadsheet imports, lead ownership and follow-up tasks.",
    problem: "An imported contact list does not show who should make the next call.",
    solution: "I built spreadsheet import, assignment and call tracking into a shared sales pipeline.",
    result: "A team member can see the lead owner and its follow-up history in one record." },
  { name: "Linesform Studio", field: "Client project", summary: "A portfolio website for an architecture and interiors studio.",
    problem: "The studio needed a place to introduce its practice and present its work.",
    solution: "I built the frontend around the studio’s houses, interiors and public spaces.",
    result: "Visitors can explore the studio’s work and design approach in one place.",
    url: "https://linesformstudio.vercel.app/" },
  { name: "Knowledge-based Support", field: "AI integration", summary: "Customer support grounded in a business’s own material.",
    problem: "A support answer depends on the business’s policies and the customer’s question.",
    solution: "I used retrieval-augmented generation to bring relevant knowledge into the conversation and track gaps in coverage.",
    result: "The support workflow can draw on stored material and surface questions the knowledge base still needs to cover." },
  { name: "WhatsApp Automation", field: "Messaging", summary: "First-contact replies across multiple business numbers.",
    problem: "Each new enquiry needs a welcome message, but returning customers should not receive it again.",
    solution: "I used Meta’s Cloud API with per-number reply history and a retryable message sequence.",
    result: "Each number can handle its own welcome flow and remember which senders have already received it." }
];

const sections = ["About", "Experience", "Projects", "Contact"];
const ease = [0.22, 1, 0.36, 1] as const;

export default function Resume() {
  const [open, setOpen] = useState<string | null>(null);
  const [active, setActive] = useState("About");
  const reduced = useReducedMotion();
  return <MotionConfig reducedMotion="user"><main className="cv" id="top">
    <div className="paper">
      <header className="mast"><a href="#top">Fuyad Hasan Fahim</a></header>
      <motion.section className="identity" initial={{ y: reduced ? 0 : 10 }} animate={{ y: 0 }} transition={{ duration: .65, ease }}>
        <Image className="headshot" src="/resume/portrait.png" alt="Fuyad Hasan Fahim" width={96} height={96} priority />
        <div><h1>Fuyad Hasan Fahim</h1><p className="role">Full-Stack Developer</p><p className="place">Bangladesh</p></div>
      </motion.section>
      <div className="intro"><p>I build web applications for the people who run a business, from payroll and client portals to AI support and payment workflows.</p>
        <div className="actions"><a className="email" href={`mailto:${email}`}><IconMail size={17} /> Email me</a><a className="work-link" href={github}>View my work on GitHub</a></div>
      </div>
      <nav className="index" aria-label="Résumé sections">{sections.map(section => <a key={section} href={"#"+section.toLowerCase()} onClick={() => setActive(section)}>{section}
        {active === section && <motion.span className="indicator" layoutId="cv-index" transition={{duration: .28, ease}} />}</a>)}</nav>
      <section className="sheet-row" id="about"><h2>About</h2><div><p>I started programming in 2023 and began working professionally in 2024. I study Political Science at National University in Bangladesh. Outside of software, I enjoy photography and videography.</p><p className="stack">Next.js · Node.js · TypeScript</p></div></section>
      <section className="sheet-row" id="experience"><h2>Experience</h2><div className="entries">
        <div><small>2024 | present</small><h3>Full-Stack Developer</h3><p>Business platforms, payment integrations and customer support tools.</p></div>
        <div><small>Education · In progress</small><h3>Political Science</h3><p>National University, Bangladesh</p></div>
      </div></section>
      <section className="sheet-row" id="projects"><h2>Selected work</h2><div className="studies">{work.map((project,i) => {
        const expanded = open === project.name;
        return <article key={project.name}><h3><button aria-expanded={expanded} aria-controls={"study-"+i} onClick={() => setOpen(expanded ? null : project.name)}>
          <span><small>{project.field}</small><strong>{project.name}</strong><span className="summary">{project.summary}</span></span>
          <motion.span className="toggle" animate={{rotate: expanded ? 45 : 0}} transition={{duration:.24}}><IconPlus size={17}/></motion.span>
        </button></h3><div id={"study-"+i}><AnimatePresence initial={false}>{expanded && <motion.div className="disclosure" initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={{duration: reduced ? 0 : .32,ease}}>
          <dl>{[["Problem",project.problem],["My work",project.solution],["Result",project.result]].map(([label,detail]) => <div key={label}><dt>{label}</dt><dd>{detail}</dd></div>)}</dl>
        </motion.div>}</AnimatePresence></div>
        {project.url && <a className="studio-link" href={project.url}>Visit Linesform Studio</a>}
        </article>;
      })}</div></section>
      <section className="sheet-row" id="contact"><h2>Contact</h2><div><p>Have a project in mind? Send me a short note.</p><a className="address" href={`mailto:${email}`}>{email}</a>
        <p className="market-title">Social profiles</p><div className="contact-socials">{socials.map(({name,url,Icon}) => <a key={name} href={url}><Icon size={18}/> {name}</a>)}</div>
        <p className="market-title">Freelance profiles</p><div className="markets">{markets.map(({name,url,asset}) => <a key={name} href={url}>{asset ? <Image unoptimized src={"/resume/"+asset} alt="" width={20} height={20}/> : <IconBrandUpwork size={20}/>} {name}</a>)}</div>
      </div></section>
      <footer>© 2026 Fuyad Hasan Fahim <span>All rights reserved | Bangladesh</span></footer>
    </div>
  </main></MotionConfig>;
}
