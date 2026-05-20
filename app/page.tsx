import { NavBar } from "./components/shared/nav-bar";
import { ScrollProgress } from "./components/animations/scroll-progress";
import { CursorGlow } from "./components/animations/cursor-glow";
import { SmoothScroll } from "./components/animations/smooth-scroll";
import { Hero } from "./components/sections/hero/hero";
import { Trust } from "./components/sections/trust/trust";
import { Projects } from "./components/sections/projects/projects";
import { Skills } from "./components/sections/skills/skills";
import { Timeline } from "./components/sections/timeline/timeline";
import { Contact } from "./components/sections/contact/contact";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <CursorGlow />
      <NavBar />

      <main className="relative">
        <Hero />
        <Trust />
        <Projects />
        <Skills />
        <Timeline />
        <Contact />
      </main>
    </>
  );
}
