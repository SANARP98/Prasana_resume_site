"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { localAnswer, type KBDoc } from "@/lib/knowledge";
import { Icon } from "./ui";

interface Msg {
  role: "user" | "assistant";
  text: string;
  sources?: KBDoc[];
}

const starters = [
  "What AI has he shipped to production?",
  "Has he worked in regulated environments?",
  "Kubernetes and Terraform experience?",
  "How do I contact him?",
];

const greeting: Msg = {
  role: "assistant",
  text: "Hi, I'm Prasana's résumé with a chat box bolted on. Ask me about his AI work, platform work or a specific project. I only answer from what's on this site.",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([greeting]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, busy]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  async function ask(question: string) {
    const q = question.trim();
    if (!q || busy) return;
    setInput("");
    const history = [...msgs, { role: "user" as const, text: q }];
    setMsgs(history);
    setBusy(true);

    let reply: Msg | null = null;
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 12000);
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: q,
          history: history.slice(-8).map((m) => ({ role: m.role, content: m.text })),
        }),
        signal: ctrl.signal,
      });
      clearTimeout(timer);
      if (res.ok) {
        const data = await res.json();
        const text = data.reply ?? data.text ?? data.message;
        if (typeof text === "string" && text.trim()) {
          // Attach local sources so links still work with a remote answer.
          reply = { role: "assistant", text, sources: localAnswer(q).sources };
        }
      }
    } catch {
      /* backend not available: fall through to local answer */
    }

    if (!reply) {
      const a = localAnswer(q);
      reply = { role: "assistant", text: a.text, sources: a.sources };
    }
    setMsgs((m) => [...m, reply!]);
    setBusy(false);
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="chat-panel"
        aria-label={open ? "Close chat" : "Ask about Prasana"}
        className="fixed bottom-5 right-5 z-[60] flex h-12 items-center gap-2 rounded-full bg-ai px-4 text-sm font-semibold text-white shadow-glow dark:text-bg"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        {open ? Icon.close : Icon.chat}
        <span className="hidden sm:inline">{open ? "Close" : "Ask about me"}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="chat-panel"
            role="dialog"
            aria-label="Chat about Prasana"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-3 z-[60] flex h-[min(560px,75vh)] w-[calc(100vw-1.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-ai/25 bg-surface shadow-glow sm:right-5"
          >
            <div className="flex items-center gap-2 border-b border-line/10 px-5 py-3">
              <span className="h-2 w-2 rounded-full bg-ai shadow-[0_0_8px_rgb(var(--ai))]" aria-hidden />
              <p className="text-sm font-semibold">Ask Prasana&apos;s portfolio</p>
              <span className="ml-auto font-mono text-[10px] text-muted">grounded · no guesses</span>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
              {msgs.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm ${
                      m.role === "user" ? "bg-accent text-white dark:text-bg" : "bg-ai/10 text-fg"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.text}</p>
                    {m.sources && m.sources.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {m.sources.map((s) => (
                          <Link
                            key={s.id}
                            href={s.href}
                            onClick={() => setOpen(false)}
                            className="rounded-full border border-ai/30 px-2 py-0.5 font-mono text-[10px] text-ai hover:bg-ai/10"
                          >
                            {s.title.length > 34 ? s.title.slice(0, 32) + "…" : s.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {busy && (
                <div className="flex gap-1 px-2" aria-label="Thinking">
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      className="h-1.5 w-1.5 rounded-full bg-ai"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }}
                    />
                  ))}
                </div>
              )}
              {msgs.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {starters.map((s) => (
                    <button
                      key={s}
                      onClick={() => ask(s)}
                      className="rounded-full border border-line/15 px-3 py-1 text-left text-xs text-muted transition hover:border-ai/40 hover:text-ai"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="flex gap-2 border-t border-line/10 p-3"
            >
              <label htmlFor="chat-input" className="sr-only">
                Your question
              </label>
              <input
                id="chat-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g. RAG experience?"
                className="flex-1 rounded-full border border-line/15 bg-bg px-4 py-2 text-sm placeholder:text-muted focus:border-ai focus:outline-none"
                maxLength={400}
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-ai text-white transition disabled:opacity-40 dark:text-bg"
                aria-label="Send"
              >
                {Icon.arrow}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
