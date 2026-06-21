import React from "react";

/**
 * Minimal, dependency-free markdown renderer for blog post bodies.
 * Supports the subset the posts use: ## / ### headings, paragraphs, fenced
 * code blocks (```), unordered/ordered lists, inline `code` and **bold**.
 * Pure and server-rendered, so it adds no client JS and is reduced-motion safe.
 */

type Block =
  | { type: "h2" | "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "code"; lang: string; code: string };

function parse(md: string): Block[] {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // fenced code block
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        code.push(lines[i]);
        i++;
      }
      i++; // closing fence
      blocks.push({ type: "code", lang, code: code.join("\n") });
      continue;
    }

    // headings
    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: line.slice(4) });
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.slice(3) });
      i++;
      continue;
    }

    // lists
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ""));
        i++;
      }
      blocks.push({ type: "ul", items });
      continue;
    }
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ""));
        i++;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    // blank line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // paragraph: gather consecutive non-special lines
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("```") &&
      !lines[i].startsWith("#") &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i])
    ) {
      para.push(lines[i]);
      i++;
    }
    blocks.push({ type: "p", text: para.join(" ") });
  }

  return blocks;
}

/** Render inline `code` and **bold** within a line of text. */
function inline(text: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const regex = /(`[^`]+`|\*\*[^*]+\*\*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;

  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const token = m[0];
    if (token.startsWith("`")) {
      out.push(
        <code
          key={k++}
          className="rounded-md border border-line bg-white/5 px-1.5 py-0.5 font-mono text-[0.85em] text-acc/90"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else {
      out.push(
        <strong key={k++} className="font-semibold text-ink">
          {token.slice(2, -2)}
        </strong>
      );
    }
    last = m.index + token.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function Markdown({ content }: { content: string }) {
  const blocks = parse(content);

  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="font-display mt-12 text-2xl font-semibold tracking-tight text-ink"
              >
                {inline(block.text)}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                className="font-display mt-8 text-xl font-semibold tracking-tight text-ink"
              >
                {inline(block.text)}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="ml-1 space-y-2">
                {block.items.map((it, j) => (
                  <li
                    key={j}
                    className="flex gap-3 text-base leading-[1.8] text-muted"
                  >
                    <span aria-hidden className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-acc" />
                    <span>{inline(it)}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="ml-1 space-y-2">
                {block.items.map((it, j) => (
                  <li
                    key={j}
                    className="flex gap-3 text-base leading-[1.8] text-muted"
                  >
                    <span className="font-display shrink-0 text-sm text-acc/80">
                      {String(j + 1).padStart(2, "0")}
                    </span>
                    <span>{inline(it)}</span>
                  </li>
                ))}
              </ol>
            );
          case "code":
            return (
              <pre
                key={i}
                className="overflow-x-auto rounded-xl border border-line bg-bg-2 p-4 text-sm leading-relaxed"
              >
                <code className="font-mono text-ink/85">{block.code}</code>
              </pre>
            );
          default:
            return (
              <p key={i} className="text-base leading-[1.8] text-muted">
                {inline(block.text)}
              </p>
            );
        }
      })}
    </div>
  );
}
