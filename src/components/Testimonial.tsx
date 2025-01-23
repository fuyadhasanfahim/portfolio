import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { HTMLAttributes, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { usePresence, motion } from "motion/react";
import useTextRevealAnimation from "@/hooks/useTextRevealAnimation";

export default function Testimonial(
  props: {
    name: string;
    company: string;
    role: string;
    quote: string;
    image: string | StaticImport;
    imagePositionY: number;
    className?: string;
  } & HTMLAttributes<HTMLDivElement>
) {
  const {
    name,
    company,
    role,
    quote,
    image,
    imagePositionY,
    className,
    ...rest
  } = props;

  const {
    scope: quoteScope,
    entranceAnimation: quoteEntranceAnimate,
    exitAnimation: quoteExitAnimation,
  } = useTextRevealAnimation();
  const {
    scope: citeScope,
    entranceAnimation: citeEntranceAnimate,
    exitAnimation: citeExitAnimation,
  } = useTextRevealAnimation();
  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    if (isPresent) {
      quoteEntranceAnimate().then(() => {
        citeEntranceAnimate();
      });
    } else {
      Promise.all([quoteExitAnimation(), citeExitAnimation()]).then(() => {
        safeToRemove();
      });
    }
  }, [citeEntranceAnimate, citeExitAnimation, isPresent, quoteEntranceAnimate, quoteExitAnimation, safeToRemove]);

  return (
    <div
      className={twMerge(
        "grid md:grid-cols-5 md:gap-8 lg:16 md:items-center",
        className
      )}
      {...rest}
    >
      <div className="aspect-square md:aspect-[9/16] md:col-span-2 relative">
        <motion.div
          className="absolute h-full bg-slate-900"
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          exit={{ width: "100%" }}
          transition={{ duration: 0.5 }}
        ></motion.div>
        <Image
          src={image}
          alt={name}
          className="size-full object-cover"
          style={{
            objectPosition: `50% ${imagePositionY * 100}%`,
          }}
        />
      </div>
      <blockquote className="md:col-span-3">
        <div
          className="text-3xl md:text-5xl lg:text-6xl mt-8 md:mt-0"
          ref={quoteScope}
        >
          <span>&ldquo;</span>
          {quote}
          <span>&rdquo;</span>
        </div>

        <cite
          className="mt-4 md:mt-8 md:text-lg lg:text-xl not-italic block"
          ref={citeScope}
        >
          {name}, {role} at {company}
        </cite>
      </blockquote>
    </div>
  );
}
