import { lazy, Suspense, useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle, IconButton, Typography, useMediaQuery } from "@mui/material";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Mail, X } from "lucide-react";

const Scene = lazy(() => import("./components/Scene"));

type Project = { name: string; year: string; kind: string; summary: string; stack: string[]; href: string };

// Replace with your own work.
const projects: Project[] = [
  { name: "Atlas", year: "2025", kind: "Realtime dashboard", summary: "A live logistics map that renders 50k moving points at 60fps using instanced meshes.", stack: ["React", "Three.js", "WebSockets"], href: "#" },
  { name: "Loom", year: "2024", kind: "Design system", summary: "An accessible component library shared by six product teams, with tokens synced from Figma.", stack: ["TypeScript", "MUI", "Storybook"], href: "#" },
  { name: "Drift", year: "2024", kind: "Product site", summary: "A scroll-driven 3D product tour that loads in under two seconds on mid-range phones.", stack: ["R3F", "Framer Motion", "Vite"], href: "#" },
];
const skills = ["React", "TypeScript", "Three.js", "WebGL", "Material UI", "Framer Motion", "Accessibility", "Performance"];

export default function App() {
  const reduced = !!useReducedMotion();
  const small = useMediaQuery("(max-width:720px)");
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <>
      <a href="#work" style={{ position: "absolute", left: -999 }} onFocus={(e) => (e.currentTarget.style.left = "16px")} onBlur={(e) => (e.currentTarget.style.left = "-999px")}>Skip to work</a>
      <header className="nav">
        <div className="wrap">
          <a className="brand" href="#top">Anirudh</a>
          <nav aria-label="Primary"><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-canvas">
            <Suspense fallback={null}>{!small || !reduced ? <Scene reduced={reduced} /> : null}</Suspense>
          </div>
          <div className="wrap">
            <motion.h1 initial={reduced ? false : { opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}>
              I build interfaces that move.
            </motion.h1>
            <Typography component="p">Frontend developer working at the edge of design and 3D. I make fast, accessible sites with a sense of depth.</Typography>
            <Button variant="contained" href="#work">See selected work</Button>
          </div>
        </section>

        <section id="work" className="block">
          <div className="wrap">
            <Typography variant="h2" sx={{ fontSize: "clamp(2rem,5vw,3.5rem)", mb: 5 }}>Selected work</Typography>
            {projects.map((p) => (
              <button key={p.name} className="work-row" onClick={() => setOpen(p)} aria-haspopup="dialog">
                <Typography variant="h3" component="span" sx={{ fontSize: "clamp(1.5rem,3.5vw,2.4rem)", color: "inherit !important" }}>{p.name}</Typography>
                <span>{p.year}</span>
                <span>{p.kind}</span>
              </button>
            ))}
          </div>
        </section>

        <section id="about" className="block">
          <div className="wrap cols">
            <Typography variant="h2" sx={{ fontSize: "clamp(2rem,4vw,2.8rem)" }}>About</Typography>
            <div>
              <Typography sx={{ fontSize: "1.25rem", maxWidth: "60ch" }}>
                I'm a frontend engineer who treats performance and accessibility as part of the design. I use 3D sparingly, where it explains something or makes a page memorable.
              </Typography>
              <ul className="skills" aria-label="Skills" style={{ padding: 0 }}>{skills.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
          </div>
        </section>

        <section id="contact" className="block">
          <div className="wrap">
            <Typography variant="h2" sx={{ fontSize: "clamp(2.2rem,7vw,5rem)", mb: 4, maxWidth: "14ch" }}>Have a project in mind?</Typography>
            <Button variant="contained" startIcon={<Mail size={18} />} href="mailto:you@example.com" sx={{ mr: 2 }}>Email me</Button>
            <Button variant="outlined" color="inherit" startIcon={<Github size={18} />} href="https://github.com/" target="_blank" rel="noreferrer" sx={{ borderColor: "rgba(245,245,242,.25)" }}>GitHub</Button>
          </div>
        </section>
      </main>

      <footer><div className="wrap">© {new Date().getFullYear()} Your Name</div></footer>

      <Dialog open={!!open} onClose={() => setOpen(null)} fullWidth maxWidth="sm" aria-labelledby="proj-title">
        {open && (
          <>
            <DialogTitle id="proj-title" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: 700 }}>
              {open.name}
              <IconButton onClick={() => setOpen(null)} aria-label="Close project"><X size={20} /></IconButton>
            </DialogTitle>
            <DialogContent>
              <Typography sx={{ mb: 3 }}>{open.summary}</Typography>
              <ul className="skills" style={{ padding: 0, marginTop: 0, marginBottom: 24 }}>{open.stack.map((s) => <li key={s}>{s}</li>)}</ul>
              <Button variant="contained" href={open.href}>View project</Button>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
}
