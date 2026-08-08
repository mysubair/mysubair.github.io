'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Atom, Award, Beaker, ChevronDown, Github, Globe2, Linkedin, Mail, MapPin, Menu, Moon, MoveUpRight, Orbit, Send, Sun, X } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const research = [
  ['01', 'Aerosols', 'Mapping the particles that shape climate, visibility, and human health.', 'cyan'],
  ['02', 'Black Carbon', 'Following high-impact carbonaceous aerosols from source to atmosphere.', 'violet'],
  ['03', 'Organic Aerosols', 'Resolving the chemical complexity of atmospheric organic matter.', 'gold'],
  ['04', 'PM₂.₅', 'Turning fine-particle measurements into actionable public insight.', 'pink'],
  ['05', 'Atmospheric Chemistry', 'Tracing how emissions evolve in the sky.', 'cyan'],
  ['06', 'Air Pollution', 'Building evidence for cleaner, more breathable cities.', 'violet'],
  ['07', 'Source Apportionment', 'Finding the fingerprints behind ambient pollution.', 'gold'],
  ['08', 'Instrumentation', 'Designing better ways to listen to the atmosphere.', 'pink']
];

const publications = [
  { year: '2025', type: 'In review', title: 'Chemical signatures and sources of urban fine particulate matter in the Indo-Gangetic Plain', journal: 'Atmospheric Environment', tags: ['PM₂.₅', 'Source apportionment'] },
  { year: '2024', type: 'Conference', title: 'Seasonal dynamics of carbonaceous aerosols over Delhi', journal: 'AAAR Annual Conference', tags: ['Aerosols', 'Black carbon'] },
  { year: '2023', type: 'Journal', title: 'A multi-season observation of aerosol optical properties at a megacity receptor site', journal: 'Environmental Research', tags: ['Optics', 'Climate'] }
];

function Orb() { const ref = useRef<THREE.Mesh>(null); useFrame((_, delta) => { if (ref.current) { ref.current.rotation.x += delta * .15; ref.current.rotation.y += delta * .2; } }); return <Float speed={1.8} rotationIntensity={.65} floatIntensity={1.3}><mesh ref={ref}><icosahedronGeometry args={[1.35, 3]} /><meshStandardMaterial color="#8dfcf3" wireframe emissive="#1d9d99" emissiveIntensity={1.5} /></mesh></Float>; }
function AmbientCanvas() { return <div className="orb-canvas" aria-hidden="true"><Canvas camera={{ position: [0, 0, 4.7], fov: 48 }} dpr={[1, 1.5]}><ambientLight intensity={.45} /><pointLight position={[3, 2, 4]} color="#9d81ff" intensity={13} /><pointLight position={[-4, -2, 2]} color="#69fff1" intensity={8} /><Sparkles
  count={120}
  scale={[4.5, 4.5, 2]}
  size={2.5}
  speed={0.12}
  color="#8dfcf3"
/>
<Sparkles
  count={65}
  scale={[3.5, 3.5, 1.5]}
  size={4}
  speed={0.08}
  color="#a18aff"
/>
<Sparkles
  count={35}
  scale={[2.4, 2.4, 1]}
  size={5}
  speed={0.05}
  color="#f5d083"
/><Sparkles count={90} scale={7} size={1.5} speed={.25} color="#d9ffff" /></Canvas></div> }
function Reveal({ children, className = '' }: { children: React.ReactNode, className?: string }) { return <motion.div initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true, margin: '-8%' }} transition={{ duration: .7, ease: [.2,.8,.2,1] }} className={className}>{children}</motion.div> }
function SectionHeading({ eyebrow, title, copy }: { eyebrow: string, title: React.ReactNode, copy?: string }) { return <Reveal className="section-heading"><div className="eyebrow"><span />{eyebrow}</div><h2>{title}</h2>{copy && <p>{copy}</p>}</Reveal> }
function MagneticButton({ children, href = '#contact', dark = false, target }: { children: React.ReactNode, href?: string, dark?: boolean, target?: '_blank' }) { const x = useMotionValue(0), y = useMotionValue(0); const sx = useSpring(x, { stiffness: 220, damping: 16 }), sy = useSpring(y, { stiffness: 220, damping: 16 }); function move(e: React.MouseEvent<HTMLAnchorElement>) { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * .18); y.set((e.clientY - r.top - r.height / 2) * .18); } return <motion.a href={href} target={target} rel={target ? 'noopener noreferrer' : undefined} onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ x: sx, y: sy }} className={`button ${dark ? 'button-dark' : ''}`}>{children}<ArrowUpRight size={16} /></motion.a> }

export default function ResearchSite() {
  const [menu, setMenu] = useState(false); const [filter, setFilter] = useState('All'); const [expanded, setExpanded] = useState<number | null>(null); const [sent, setSent] = useState(false); const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const glow = useRef<HTMLDivElement>(null);
  useEffect(() => { const move = (e: MouseEvent) => { if (glow.current) { glow.current.style.transform = `translate(${e.clientX - 180}px, ${e.clientY - 180}px)`; } }; window.addEventListener('pointermove', move); return () => window.removeEventListener('pointermove', move); }, []);
  useEffect(() => { const savedTheme = window.localStorage.getItem('theme'); if (savedTheme === 'light' || savedTheme === 'dark') setTheme(savedTheme); }, []);
  useEffect(() => { document.documentElement.dataset.theme = theme; window.localStorage.setItem('theme', theme); }, [theme]);
  const shownPubs = filter === 'All' ? publications : publications.filter(p => p.type === filter);
  function submit(e: FormEvent) { e.preventDefault(); setSent(true); }
  return <main className={`${theme}-theme`}><div className="cursor-glow" ref={glow} /><AmbientCanvas />
    <nav><a href="#top" className="brand">MY<span>·</span></a><div className="nav-links">{['About','Research','Work','Contact'].map(x => <a key={x} href={`#${x.toLowerCase()}`}>{x}</a>)}</div><div className="nav-actions"><button className="theme-toggle" type="button" role="switch" aria-checked={theme === 'dark'} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}><span className="theme-toggle-thumb">
  {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
</span></button><a className="nav-contact" href="mailto:	
yousufmuhammedkpm@gmail.com">Let’s connect <MoveUpRight size={14}/></a></div><button className="menu" onClick={() => setMenu(!menu)} aria-label="Open menu">{menu ? <X/> : <Menu/>}</button></nav>
    <AnimatePresence>{menu && <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{['About','Research','Work','Contact'].map(x => <a onClick={() => setMenu(false)} key={x} href={`#${x.toLowerCase()}`}>{x}</a>)}</motion.div>}</AnimatePresence>
    <section className="hero" id="top"><div className="hero-copy"><motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="availability"><span />Currently researching at IIT Delhi</motion.div><motion.h1 initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12, duration: .8 }}>Muhammed<br/><em>Yousuf Subair</em></motion.h1><motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .35 }}>PhD Research Scholar exploring the invisible architecture of our atmosphere — from aerosols to the futures they shape.</motion.p><motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .45 }} className="hero-actions"><MagneticButton href="#research">Explore research</MagneticButton><MagneticButton href="/CV_Muhammed_Yousuf_S.pdf" dark target="_blank">Download CV</MagneticButton><MagneticButton href="#contact" dark>Start a conversation</MagneticButton></motion.div></div><div className="hero-meta"><span>Environmental Engineering<br/>& Atmospheric Science</span><span>28.5455° N<br/>77.1926° E</span></div><a className="scroll" href="#about">Scroll to discover <ChevronDown size={15}/></a></section>
    <section id="about" className="about section"><SectionHeading eyebrow="01 — About" title={<>A scientist for the <em>atmosphere.</em></>} copy="Driven by the belief that the air we share deserves to be understood with exceptional clarity."/><div className="about-grid"><Reveal><p className="lead">Muhammed Yousuf is a PhD Research Scholar at the Indian Institute of Technology Delhi, working at the intersection of atmospheric measurement, aerosol chemistry, and environmental health.</p><p>His research makes the complex behaviour of airborne particles legible — connecting rigorous field observations with the decisions that can make cities healthier and more resilient.</p><a className="text-link" href="#contact">More about my approach <ArrowDownRight size={17}/></a></Reveal><Reveal className="philosophy"><span className="quote-mark">“</span><p>Good science begins with attention: to uncertainty, to place, and to the people behind every data point.</p><small>RESEARCH PHILOSOPHY</small></Reveal></div><div className="timeline"><div><small>NOW</small><b>PhD Research Scholar</b><span>IIT Delhi · Environmental Engineering</span></div><div><small>FOCUS</small><b>Atmospheric Observation</b><span>Particles, chemistry & climate</span></div><div><small>METHOD</small><b>Curious & rigorous</b><span>Evidence designed for impact</span></div></div></section>
    <section id="research" className="research section"><SectionHeading eyebrow="02 — Research" title={<>Making the <em>invisible</em> intelligible.</>} copy="A research practice spanning particles, processes, instruments and the public good."/><div className="research-grid">{research.map(([n, title, text, tone], i) => <Reveal key={title} className="research-card-wrap"><motion.article className={`research-card ${tone}`} whileHover={{ y: -10, transition: { duration: .25 } }}><span>{n}</span><Atom size={25}/><h3>{title}</h3><p>{text}</p><ArrowUpRight className="card-arrow" size={19}/></motion.article></Reveal>)}</div></section>
    <section id="work" className="publications section"><SectionHeading eyebrow="03 — Selected output" title={<>Research that travels <em>further.</em></>}/><div className="filters">{['All','Journal','Conference','In review'].map(f => <button onClick={() => setFilter(f)} className={filter === f ? 'active' : ''} key={f}>{f}</button>)}</div><div className="pub-list">{shownPubs.map((p, i) => <Reveal key={p.title}><article className="pub" onClick={() => setExpanded(expanded === i ? null : i)}><div className="pub-year">{p.year}</div><div><div className="pub-type">{p.type}</div><h3>{p.title}</h3><p>{p.journal}</p><AnimatePresence>{expanded === i && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pub-expand"><span>{p.tags.join(' · ')}</span><a href="#contact">Request paper <ArrowUpRight size={13}/></a></motion.div>}</AnimatePresence></div><button aria-label="Expand publication"><ArrowDownRight size={22}/></button></article></Reveal>)}</div></section>
    <section className="projects section"><SectionHeading eyebrow="04 — Tools & projects" title={<>Research, made <em>useful.</em></>}/><div className="project-grid"><Reveal className="project project-large"><div className="project-icon orbit"><Orbit/></div><small>OPEN RESEARCH TOOL</small><h3>Trajectory<br/>Toolkit</h3><p>Atmospheric back-trajectory analysis with a calmer, clearer interface.</p><a href="#contact">View project <ArrowUpRight size={16}/></a><div className="orbit-lines"/></Reveal><Reveal className="project"><div className="project-icon map"><MapPin/></div><small>SPATIAL INTELLIGENCE</small><h3>AQI Mapper</h3><p>Making local air quality feel immediate and understandable.</p><a href="#contact">View project <ArrowUpRight size={16}/></a></Reveal><Reveal className="project"><div className="project-icon code"><Beaker/></div><small>COMPUTATIONAL METHODS</small><h3>Research Software</h3><p>Reproducible data pipelines for atmospheric datasets.</p><a href="#contact">View project <ArrowUpRight size={16}/></a></Reveal></div></section>
    <section className="skills section"><SectionHeading eyebrow="05 — Practice" title={<>Fluent across the <em>full signal.</em></>}/><Reveal><div className="skill-orbit"><div className="center-skill">ATMO<br/><span>SCIENCE</span></div>{['Field sampling','Data analysis','Python & R','Chemical speciation','Scientific writing','Visualization'].map((s,i) => <span key={s} style={{ '--i': i } as React.CSSProperties}>{s}</span>)}</div></Reveal></section>
    <section className="credentials section"><div className="credential"><span>06 — Experience</span><h3>Translating atmospheric measurements into knowledge that moves research and policy forward.</h3><p>IIT Delhi · Environmental Engineering · 2022 — Present</p></div><div className="credential"><span>07 — Recognition</span><h3>Building a research record shaped by care, curiosity and collaboration.</h3><p>Awards & Fellowships · Conferences · Academic service</p></div></section>
    <section id="contact" className="contact section"><Reveal><div className="eyebrow"><span />08 — Contact</div><h2>Let’s make the air<br/><em>more legible.</em></h2><p>For research collaborations, speaking invitations, and thoughtful conversations.</p><div className="contact-links"><a href="mailto:	
yousufmuhammedkpm@gmail.com"><Mail/>	
yousufmuhammedkpm@gmail.com</a><a href="#top"><Linkedin/>LinkedIn</a><a href="#top"><Github/>GitHub</a></div></Reveal><Reveal><form action="https://formspree.io/f/mqpzebwq" method="POST">
  <label>
    Your name
    <input
      name="name"
      required
      placeholder="How should I address you?"
    />
  </label>

  <label>
    Email address
    <input
      name="email"
      required
      type="email"
      placeholder="you@institution.edu"
    />
  </label>

  <label>
    Message
    <textarea
      name="message"
      required
      placeholder="Tell me a little about what’s on your mind..."
    />
  </label>

  <button className="submit" type="submit">
    Send a message <Send size={16} />
  </button>
</form></Reveal></section>
    <footer><a href="#top" className="brand">MYS<span></span></a><p>© {new Date().getFullYear()} Muhammed Yousuf Subair Designed for clearer skies.</p><a href="#top">Back to top <ArrowUpRight size={15}/></a></footer>
  </main>;
}
