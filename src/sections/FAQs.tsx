"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const faqs = [
  {
    question: "How long does it take to build a website?",
    answer:
      "It depends on the complexity of the website and the scope of the project.",
  },
  {
    question: "What is your development process like?",
    answer:
      "I follow a hands-on approach starting with project planning, building out the core features, and regular check-ins to make sure everything matches your needs.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes, I work with clients globally and can accommodate different time zones for meetings and communication.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "I have experience across various industries including technology, retail, hospitality, and professional services, bringing fresh perspectives to each project.",
  },
];

export default function FAQs() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <section className="section" id="faqs">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-7xl lg:text-8xl">FAQs</h2>

        <div className="mt-10 md:mt-16 lg:mt-20">
          {faqs.map(({ question, answer }, index) => (
            <div
              key={index}
              className="border-t border-stone-400 border-dotted last:border-b py-6 md:py-8 lg:py-10 relative isolate group/faq"
              onClick={() => {
                setSelectedIndex(selectedIndex === index ? null : index);
              }}
            >
              <div
                className={twMerge(
                  "absolute h-0 w-full bottom-0 left-0 bg-stone-300 -z-10 group-hover/faq:h-full transition-all duration-700",
                  index === selectedIndex && "h-full"
                )}
              ></div>
              <div
                className={twMerge(
                  "flex items-center justify-between gap-4 transition-all duration-700 group-hover/faq:lg:hover:px-8",
                  index === selectedIndex && "px-8"
                )}
              >
                <div className="text-2xl md:text-3xl lg:text-4xl">
                  {question}
                </div>
                <div
                  className={twMerge(
                    "inline-flex items-center justify-center size-11 border border-stone-400 rounded-full transition-all duration-300 bg-stone-200 shrink-0",
                    index === selectedIndex ? "rotate-45" : ""
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </div>
              </div>
              <AnimatePresence>
                {index === selectedIndex && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="overflow-hidden lg:px-8"
                  >
                    <p className="text-xl mt-4">{answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
