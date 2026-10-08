import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Package, Sparkles, Shirt, UtensilsCrossed, Armchair, Clapperboard,
  ArrowRight, ArrowUpRight, Phone, MapPin, Clock, Star, Award, ShieldCheck,
  Upload, Check, Loader2, Menu, X, MessageCircle, FileImage, MousePointer2,
  ChevronLeft, ChevronRight,
} from 'lucide-react'
import { BIZ, NAV, SERVICES, WORK, CATS, STEPS, telLink, waLink, img } from './site.js'

gsap.registerPlugin(ScrollTrigger)

const ICONS = { Package, Sparkles, Shirt, UtensilsCrossed, Armchair, Clapperboard }
const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ------------------------------------------------------------------ */
/* Hooks                                                               */
/* ------------------------------------------------------------------ */

function useReveal() {
  useLayoutEffect(() => {
    document.documentElement.classList.add('js-reveal')
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }),
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/** Nudges an element toward the cursor while hovered. */
function useMagnetic(strength = 0.25) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReduced() || !window.matchMedia('(hover: hover)').matches) return
    const move = (e) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${(e.clientX - r.left - r.width / 2) * strength}px`)
      el.style.setProperty('--my', `${(e.clientY - r.top - r.height / 2) * strength}px`)
    }
    const leave = () => {
      el.style.setProperty('--mx', '0px')
      el.style.setProperty('--my', '0px')
    }
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
    }
  }, [strength])
  return ref
}

function MagneticLink({ className = '', children, ...props }) {
  const ref = useMagnetic()
  return (
    <a ref={ref} className={`magnetic-btn ${className}`} {...props}>
      {children}
    </a>
  )
}

/* ------------------------------------------------------------------ */
/* Logo                                                                */
/* ------------------------------------------------------------------ */

export function Logo({ light = false }) {
  return (
    <span className="flex items-center gap-3">
      <span
        className={`grid h-9 w-9 place-items-center rounded-full border ${
          light ? 'border-porcelain/30' : 'border-ink/15'
        }`}
      >
        {/* aperture mark */}
        <svg viewBox="0 0 32 32" className="h-5 w-5" aria-hidden="true">
          <g fill="none" stroke={light ? '#F8F6F2' : '#161412'} strokeWidth="1.6">
            <circle cx="16" cy="16" r="12" />
            <path d="M16 4l5.5 9.5M28 16l-11 0.5M22 26.4l-5.5-9.5M10 26.4l5.5-9.5M4 16l11-0.5M10 5.6l5.5 9.5" />
          </g>
          <circle cx="16" cy="16" r="2.6" fill="#A8382B" />
        </svg>
      </span>
      <span className="leading-none">
        <b className={`block font-display text-[15px] font-semibold tracking-[-0.01em] ${light ? 'text-porcelain' : ''}`}>
          Trouvaille
        </b>
        <small
          className={`mt-1 block font-mono text-[9px] uppercase tracking-[0.3em] ${
            light ? 'text-porcelain/50' : 'text-muted'
          }`}
        >
          Studios
        </small>
      </span>
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* 1. Navbar                                                           */
/* ------------------------------------------------------------------ */

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    NAV.forEach((n) => {
      const el = document.querySelector(n.href)
      el && io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      if (window.scrollY < window.innerHeight * 0.5) setActive('')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-shell items-center justify-between rounded-full py-2.5 pl-5 pr-2.5 transition-all duration-500 ease-soft ${
          scrolled || open ? 'glass border border-line shadow-[0_12px_40px_-24px_rgba(22,20,18,0.35)]' : 'border border-transparent'
        }`}
      >
        <a href="#top" aria-label="Trouvaille Studios home" onClick={() => setOpen(false)} className="-my-1 block py-1">
          <Logo />
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                aria-current={active === n.href ? 'true' : undefined}
                className={`group relative text-[14px] transition-colors ${active === n.href ? 'text-ink' : 'text-muted hover:text-ink'}`}
              >
                {n.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-ink transition-[width] duration-300 ease-soft ${
                    active === n.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <MagneticLink href="#contact" className="btn btn-primary hidden min-h-[44px] px-5 sm:inline-flex">
            Book a shoot
          </MagneticLink>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-11 w-11 place-items-center rounded-full md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`fixed inset-0 -z-10 flex flex-col justify-between bg-porcelain px-6 pb-10 pt-32 transition-all duration-500 ease-soft md:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <ul className="space-y-2">
          {NAV.map((n, i) => (
            <li
              key={n.href}
              className={`transition-all duration-500 ease-soft ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              style={{ transitionDelay: open ? `${80 + i * 60}ms` : '0ms' }}
            >
              <a href={n.href} onClick={() => setOpen(false)} className="flourish block text-[3.2rem] leading-tight">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="space-y-4">
          <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary w-full">
            Book a shoot <ArrowRight className="h-4 w-4" />
          </a>
          <a href={telLink()} className="block text-center font-mono text-xs tracking-[0.2em] text-muted">
            {BIZ.phonePretty}
          </a>
        </div>
      </div>
    </header>
  )
}

/* ------------------------------------------------------------------ */
/* 2. Hero                                                             */
/* ------------------------------------------------------------------ */

function Sparkle({ className = '', style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
      <path d="M12 0c.7 6.6 4.8 10.9 12 12-7.2 1.1-11.3 5.4-12 12-.7-6.6-4.8-10.9-12-12C7.2 10.9 11.3 6.6 12 0z" fill="currentColor" />
    </svg>
  )
}

function Hero() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (prefersReduced()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.from('.hero-img', { scale: 1.06, opacity: 0, duration: 1.4 })
        .from('.hero-line > span', { yPercent: 110, duration: 1.0, stagger: 0.08 }, 0.15)
        .from('.hero-fade', { y: 16, opacity: 0, duration: 0.8, stagger: 0.06 }, 0.45)
        .from('.hero-spark', { scale: 0, opacity: 0, duration: 1.2, stagger: 0.08 }, 0.9)
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="top" ref={root} className="relative flex min-h-dvh flex-col overflow-hidden lg:block">
      {/* Background image — right panel on desktop, top band on mobile */}
      <div className="relative h-[58vh] w-full overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[56%]">
        <img
          src={img('beauty-portrait-red-lip')}
          alt="Beauty portrait with a bold red lip, shot by Trouvaille Studios"
          className="hero-img h-full w-full object-cover object-[50%_30%]"
          fetchPriority="high"
        />
        {/* dual gradient overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-porcelain via-porcelain/10 to-transparent lg:bg-gradient-to-r lg:from-porcelain lg:via-porcelain/0 lg:to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-porcelain/70 via-transparent to-transparent lg:bg-gradient-to-t lg:from-porcelain/60 lg:via-transparent" />

        {/* floating themed particles — top right */}
        <div className="pointer-events-none absolute right-6 top-24 h-40 w-40 lg:right-12 lg:top-28" aria-hidden="true">
          <Sparkle className="hero-spark anim-drift absolute right-2 top-0 h-6 w-6 text-champagne" />
          <Sparkle className="hero-spark anim-drift absolute right-16 top-14 h-3 w-3 text-rouge" style={{ animationDelay: '-3s' }} />
          <Sparkle className="hero-spark anim-drift absolute right-6 top-24 h-4 w-4 text-champagne/80" style={{ animationDelay: '-6s' }} />
          <Sparkle className="hero-spark anim-drift absolute right-28 top-2 h-2.5 w-2.5 text-ink/40" style={{ animationDelay: '-1.5s' }} />
        </div>

        <p className="hero-fade absolute bottom-10 right-6 hidden font-mono text-[10px] uppercase tracking-[0.28em] text-ink/60 lg:block">
          Fig. 01 — Beauty, studio
        </p>
      </div>

      {/* Copy */}
      <div className="shell relative z-10 -mt-24 flex flex-1 flex-col justify-end pb-14 lg:mt-0 lg:min-h-dvh lg:justify-center lg:pb-0 lg:pt-24">
        <div className="max-w-[760px]">
          <p className="hero-fade eyebrow">Advertising &amp; Commercial Photography · Bangalore</p>
          <h1 className="mt-7 text-[clamp(2.9rem,6.4vw,5.6rem)] font-normal leading-[0.98] tracking-[-0.045em]">
            <span className="hero-line block overflow-hidden pb-[0.06em]">
              <span className="block">Every product</span>
            </span>
            <span className="hero-line block overflow-hidden pb-[0.06em]">
              <span className="block">deserves to be</span>
            </span>
            <span className="hero-line block overflow-hidden pb-[0.1em]">
              <span className="flourish block text-rouge">found.</span>
            </span>
          </h1>
          <p className="hero-fade lead mt-7 max-w-[30rem]">
            <em className="flourish text-[1.25em] text-ink">Trouvaille</em> is French for a lucky find. Since 2018 we have
            photographed and filmed products, cosmetics, food, furniture and fashion for brands, from our studio in
            Indiranagar.
          </p>
          <div className="hero-fade mt-9 flex flex-wrap gap-3">
            <MagneticLink href="#contact" className="btn btn-primary">
              Start a brief <ArrowRight className="h-4 w-4" />
            </MagneticLink>
            <a href="#work" className="btn btn-ghost">
              View the work
            </a>
          </div>
          <dl className="hero-fade mt-12 flex gap-10 border-t border-line pt-6">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">magicpin</dt>
              <dd className="mt-1 text-2xl tracking-tight">
                5.0 <Star className="-mt-1 inline h-4 w-4 fill-rouge text-rouge" /> <span className="text-sm text-muted">23</span>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">Justdial</dt>
              <dd className="mt-1 text-2xl tracking-tight">
                4.9 <Star className="-mt-1 inline h-4 w-4 fill-rouge text-rouge" /> <span className="text-sm text-muted">21</span>
              </dd>
            </div>
            <div className="hidden sm:block">
              <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">Est.</dt>
              <dd className="mt-1 text-2xl tracking-tight">2018</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}

function Marquee() {
  const words = SERVICES.map((s) => s.title)
  const row = [...words, ...words]
  return (
    <div className="overflow-hidden border-y border-line bg-porcelain-2 py-6" aria-hidden="true">
      <div className="anim-marquee flex w-max items-center gap-10">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="flourish whitespace-nowrap text-[clamp(1.8rem,3.4vw,3rem)] text-ink">{w}</span>
            <Sparkle className="h-3.5 w-3.5 text-rouge" />
          </span>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 3. Features                                                         */
/* ------------------------------------------------------------------ */

const FORMATS = [
  { src: 'furniture-cane-chairs-trio', label: 'E-commerce', ratio: '1 : 1' },
  { src: 'cosmetics-lip-tint-red-swatch', label: 'Social feed', ratio: '4 : 5' },
  { src: 'food-millet-dosa-rustic', label: 'Campaign', ratio: '2 : 3' },
]

function Shuffler() {
  const [order, setOrder] = useState([0, 1, 2])
  useEffect(() => {
    if (prefersReduced()) return
    const t = setInterval(() => setOrder((o) => [...o.slice(1), o[0]]), 2800)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="relative mx-auto h-[250px] w-full max-w-[260px]">
      {FORMATS.map((f, i) => {
        const pos = order.indexOf(i)
        return (
          <figure
            key={f.src}
            className="absolute inset-x-0 bottom-0 m-0 overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-[0_24px_40px_-28px_rgba(22,20,18,0.5)] transition-all duration-700 ease-soft"
            style={{
              transform: `translateY(${-pos * 18}px) scale(${1 - pos * 0.06})`,
              zIndex: 30 - pos * 10,
              opacity: 1 - pos * 0.25,
            }}
          >
            <img src={img(f.src)} alt="" className="h-[180px] w-full rounded-xl object-cover" loading="lazy" />
            <figcaption className="flex items-center justify-between px-1.5 pb-0.5 pt-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              <span>{f.label}</span>
              <span className="text-ink">{f.ratio}</span>
            </figcaption>
          </figure>
        )
      })}
    </div>
  )
}

/* Signature: light motes falling onto a product plinth */
const MOTES = [
  { x: 92, fall: 128, dur: 3.4, delay: 0, s: 7 },
  { x: 128, fall: 120, dur: 3.0, delay: -1.2, s: 5 },
  { x: 160, fall: 118, dur: 3.6, delay: -2.1, s: 8 },
  { x: 196, fall: 122, dur: 3.2, delay: -0.6, s: 5 },
  { x: 228, fall: 130, dur: 3.8, delay: -2.8, s: 6 },
  { x: 112, fall: 124, dur: 4.0, delay: -3.3, s: 4 },
  { x: 212, fall: 126, dur: 3.5, delay: -1.8, s: 4 },
]

const star = (x, y, r) =>
  `M${x} ${y - r}Q${x} ${y} ${x + r} ${y}Q${x} ${y} ${x} ${y + r}Q${x} ${y} ${x - r} ${y}Q${x} ${y} ${x} ${y - r}Z`

function LightMotes() {
  return (
    <svg viewBox="0 0 320 250" className="anim-fadein h-[250px] w-full" role="img" aria-label="Specks of studio light falling onto a product on a plinth">
      <defs>
        <linearGradient id="sweep" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.7" stopColor="#F3EFE8" />
          <stop offset="1" stopColor="#E8E2D8" />
        </linearGradient>
        <radialGradient id="beam" cx="0.5" cy="0" r="1">
          <stop offset="0" stopColor="#B99A6B" stopOpacity="0.28" />
          <stop offset="1" stopColor="#B99A6B" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="tube" x1="0" x2="1">
          <stop offset="0" stopColor="#E9DFD2" />
          <stop offset="0.5" stopColor="#FBF7F1" />
          <stop offset="1" stopColor="#DCD0C0" />
        </linearGradient>
      </defs>

      {/* seamless sweep */}
      <rect width="320" height="250" rx="18" fill="url(#sweep)" />
      {/* softbox + beam */}
      <rect x="120" y="8" width="80" height="8" rx="4" fill="#161412" opacity="0.85" />
      <path d="M120 16 L60 210 L260 210 L200 16 Z" fill="url(#beam)" />

      {/* plinth */}
      <ellipse cx="160" cy="226" rx="96" ry="10" fill="#161412" opacity="0.06" />
      <rect x="84" y="170" width="152" height="54" fill="#FFFFFF" stroke="#E4DED5" />
      <ellipse cx="160" cy="170" rx="76" ry="11" fill="#FBF9F6" stroke="#E4DED5" />

      {/* product: lip tint */}
      <rect x="148" y="104" width="24" height="64" rx="5" fill="url(#tube)" stroke="#D9CDBC" />
      <rect x="150" y="128" width="20" height="38" rx="3" fill="#A8382B" opacity="0.9" />
      <rect x="152" y="86" width="16" height="22" rx="4" fill="#E9DFD2" stroke="#D9CDBC" />

      {/* ripples where motes land on the plinth top */}
      {MOTES.map((m, i) => (
        <ellipse
          key={`r${i}`}
          cx={m.x}
          cy={170}
          rx="9"
          ry="2.4"
          fill="none"
          stroke="#B99A6B"
          strokeWidth="0.9"
          className="anim-ripple"
          style={{ '--dur': `${m.dur}s`, '--delay': `${m.delay}s` }}
        />
      ))}

      {/* falling motes */}
      {MOTES.map((m, i) => (
        <path
          key={`m${i}`}
          d={star(m.x, 40, m.s)}
          fill={i % 3 === 0 ? '#A8382B' : '#B99A6B'}
          className="anim-mote"
          style={{ '--fall': `${m.fall}px`, '--dur': `${m.dur}s`, '--delay': `${m.delay}s` }}
        />
      ))}

      {/* strobe */}
      <rect width="320" height="250" rx="18" fill="#FFFFFF" className="anim-strobe" />
    </svg>
  )
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function Scheduler() {
  const wrap = useRef(null)
  const cursor = useRef(null)
  const [picked, setPicked] = useState(-1)
  const [booked, setBooked] = useState(false)

  useEffect(() => {
    if (prefersReduced()) {
      setPicked(3)
      setBooked(true)
      return
    }
    const w = wrap.current
    const c = cursor.current
    let tl
    const build = () => {
      tl && tl.kill()
      const box = w.getBoundingClientRect()
      const center = (sel) => {
        const r = w.querySelector(sel).getBoundingClientRect()
        return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 }
      }
      const day = center('[data-day="3"]')
      const btn = center('[data-book]')
      gsap.set(c, { x: box.width - 30, y: box.height - 20, opacity: 0 })
      tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 })
      tl.call(() => { setPicked(-1); setBooked(false) })
        .to(c, { opacity: 1, duration: 0.3 })
        .to(c, { x: day.x, y: day.y, duration: 1.1, ease: 'power3.inOut' })
        .to(c, { scale: 0.82, duration: 0.12, yoyo: true, repeat: 1 })
        .call(() => setPicked(3))
        .to(c, { x: btn.x + 20, y: btn.y, duration: 1, ease: 'power3.inOut' }, '+=0.4')
        .to(c, { scale: 0.82, duration: 0.12, yoyo: true, repeat: 1 })
        .call(() => setBooked(true))
        .to(c, { opacity: 0, duration: 0.4 }, '+=1.6')
    }
    build()
    window.addEventListener('resize', build)
    return () => {
      window.removeEventListener('resize', build)
      tl && tl.kill()
    }
  }, [])

  return (
    <div ref={wrap} className="relative h-[250px] w-full rounded-2xl border border-line bg-white p-4">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
        <span>Studio day</span>
        <span>From 10:00</span>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-1.5">
        {DAYS.map((d, i) => (
          <div
            key={d}
            data-day={i}
            className={`grid h-16 place-items-center rounded-xl border text-center transition-colors duration-300 ${
              picked === i ? 'border-ink bg-ink text-porcelain' : 'border-line text-ink-2'
            }`}
          >
            <span className="text-[10px] font-medium uppercase tracking-wide">{d}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-1.5">
        <div className="h-2 w-3/4 rounded-full bg-porcelain-2" />
        <div className="h-2 w-1/2 rounded-full bg-porcelain-2" />
      </div>
      <div
        data-book
        className={`absolute inset-x-4 bottom-4 flex h-11 items-center justify-center gap-2 rounded-full text-[13px] font-medium transition-colors duration-300 ${
          booked ? 'bg-rouge text-white' : 'bg-porcelain-2 text-ink'
        }`}
      >
        {booked ? (
          <>
            <Check className="h-4 w-4" /> Shoot pencilled in
          </>
        ) : (
          'Hold this date'
        )}
      </div>
      <MousePointer2 ref={cursor} className="pointer-events-none absolute left-0 top-0 h-5 w-5 fill-ink text-ink opacity-0" aria-hidden="true" />
    </div>
  )
}

function Features() {
  const cards = [
    { eyebrow: 'Deliverables', title: 'One shoot,', flourish: 'every format.', text: 'Marketplace squares, feed crops and campaign frames, all planned into the same shot list.', body: <Shuffler /> },
    { eyebrow: 'Lighting', title: 'Light, placed', flourish: 'precisely.', text: 'Every highlight on a tube, a glaze or a grain of wood is put there on purpose, then kept in colour.', body: <LightMotes /> },
    { eyebrow: 'Booking', title: 'Book a', flourish: 'studio day.', text: 'Pick a date, send the brief, and the set is prepared before you walk in.', body: <Scheduler /> },
  ]
  return (
    <section className="section">
      <div className="shell">
        <div className="max-w-2xl">
          <p className="eyebrow reveal">The studio</p>
          <h2 className="title reveal d1 mt-6">
            Quiet sets. <span className="flourish text-rouge">Loud results.</span>
          </h2>
        </div>
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {cards.map((c, i) => (
            <article key={c.eyebrow} className={`card reveal d${i + 1} flex flex-col p-6 transition-shadow duration-500 hover:shadow-[0_30px_60px_-40px_rgba(22,20,18,0.45)]`}>
              <div className="rounded-2xl bg-porcelain p-4">{c.body}</div>
              <p className="eyebrow mt-7">{c.eyebrow}</p>
              <h3 className="mt-3 text-[1.6rem] font-normal leading-tight tracking-[-0.03em]">
                {c.title} <span className="flourish text-[1.1em]">{c.flourish}</span>
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{c.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 4. Pillars                                                          */
/* ------------------------------------------------------------------ */

function CountUp({ to, decimals = 0, suffix = '', duration = 1600 }) {
  const ref = useRef(null)
  const [val, setVal] = useState(prefersReduced() ? to : 0)
  useEffect(() => {
    if (prefersReduced()) return
    const el = ref.current
    let raf
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now) => {
          const p = Math.min(1, (now - start) / duration)
          setVal(to * (1 - Math.pow(1 - p, 4)))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to, duration])
  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  )
}

function Pillars() {
  const years = new Date().getFullYear() - BIZ.since
  const stats = [
    { value: years, suffix: '+', label: 'Years shooting for brands', note: `Studio established ${BIZ.since}` },
    { value: 6, label: 'Disciplines under one roof', note: 'Product to video production' },
    { value: 5, decimals: 1, label: 'Rating on magicpin', note: '23 ratings · 4.9 on Justdial' },
  ]
  return (
    <section className="border-y border-line bg-white">
      <div className="shell grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
        {stats.map((s, i) => (
          <div key={s.label} className={`reveal d${i + 1} px-2 py-12 md:px-10 md:py-16`}>
            <p className="text-[clamp(3.6rem,7vw,6rem)] font-normal leading-none tracking-[-0.05em]">
              <CountUp to={s.value} decimals={s.decimals} suffix={s.suffix} />
              {s.decimals ? <Star className="ml-2 inline h-6 w-6 -translate-y-6 fill-rouge text-rouge" /> : null}
            </p>
            <p className="mt-5 text-[15px] font-medium">{s.label}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{s.note}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 5. Protocol — sticky stack                                          */
/* ------------------------------------------------------------------ */

function Protocol() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (prefersReduced()) return
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.proto-card')
      cards.forEach((card, i) => {
        const next = cards[i + 1]
        if (!next) return
        gsap.to(card.querySelector('.proto-inner'), {
          scale: 0.9,
          opacity: 0.35,
          filter: 'blur(6px)',
          ease: 'none',
          scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top+=110', scrub: true },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="process" ref={root} className="section bg-porcelain-2">
      <div className="shell">
        <div className="max-w-2xl">
          <p className="eyebrow reveal">Process</p>
          <h2 className="title reveal d1 mt-6">
            Brief to final file, <span className="flourish text-rouge">in three moves.</span>
          </h2>
        </div>
        <div className="mt-14">
          {STEPS.map((s) => (
            <div key={s.n} className="proto-card sticky top-[96px] pb-6 md:top-[110px]">
              <article className="proto-inner grid origin-top overflow-hidden rounded-[32px] border border-line bg-white md:min-h-[460px] md:grid-cols-[1.1fr_1fr]">
                <div className="flex flex-col justify-between gap-10 p-7 md:p-12">
                  <div>
                    <span className="flourish text-[5rem] leading-none text-rouge md:text-[7rem]">{s.n}</span>
                    <h3 className="mt-4 text-[clamp(1.8rem,3vw,2.6rem)] font-normal tracking-[-0.03em]">{s.title}</h3>
                    <p className="lead mt-4 max-w-md">{s.text}</p>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <li key={t} className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative h-64 md:h-auto">
                  <img src={img(s.img)} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 6. Services grid                                                    */
/* ------------------------------------------------------------------ */

function ServicesGrid() {
  return (
    <section id="services" className="section grid-bg-dark bg-ink text-porcelain">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p className="eyebrow reveal !text-porcelain/50">Services</p>
            <h2 className="title reveal d1 mt-6">
              Six disciplines. <span className="flourish text-rouge-lo">One studio.</span>
            </h2>
          </div>
          <p className="reveal d2 max-w-sm text-[15px] leading-relaxed text-porcelain/60">
            Stills and motion, planned together, so a launch looks the same on a shelf, a feed and a storefront.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-[28px] border border-line-dark bg-line-dark sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon]
            return (
              <article key={s.title} className="group relative min-h-[300px] overflow-hidden bg-ink p-8 md:p-10">
                <img
                  src={img(s.img)}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full scale-110 object-cover opacity-0 transition-all duration-700 ease-soft group-hover:scale-100 group-hover:opacity-25"
                />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-full border border-porcelain/15 transition-colors duration-500 group-hover:border-rouge-lo group-hover:bg-rouge-lo">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-porcelain/55">0{i + 1}</span>
                  </div>
                  <h3 className="mt-16 text-[1.75rem] font-normal tracking-[-0.03em]">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-porcelain/60">{s.text}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Portfolio                                                           */
/* ------------------------------------------------------------------ */

function Work() {
  const [filter, setFilter] = useState('all')
  const [open, setOpen] = useState(null)
  const [closing, setClosing] = useState(false)
  const [origin, setOrigin] = useState('50% 50%')
  const trigger = useRef(null)
  const items = WORK.map((w, i) => ({ ...w, i })).filter((w) => filter === 'all' || w.cat === filter)

  const openAt = (i, e) => {
    trigger.current = e.currentTarget
    const b = e.currentTarget.getBoundingClientRect()
    // grow the viewer out of the tile that was tapped (spatial continuity)
    setOrigin(`${((b.left + b.width / 2) / window.innerWidth) * 100}% ${((b.top + b.height / 2) / window.innerHeight) * 100}%`)
    setClosing(false)
    setOpen(i)
  }
  const close = useCallback(() => {
    setClosing(true)
    setTimeout(() => {
      setOpen(null)
      setClosing(false)
      trigger.current && trigger.current.focus()
    }, prefersReduced() ? 0 : 180)
  }, [])

  const step = useCallback(
    (d) =>
      setOpen((cur) => {
        const idx = items.findIndex((w) => w.i === cur)
        return items[(idx + d + items.length) % items.length].i
      }),
    [items],
  )

  useEffect(() => {
    if (open === null) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, step, close])

  const cur = open !== null ? WORK[open] : null

  return (
    <section id="work" className="section">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p className="eyebrow reveal">Selected work</p>
            <h2 className="title reveal d1 mt-6">
              From the <span className="flourish text-rouge">studio floor.</span>
            </h2>
          </div>
          <div className="reveal d2 flex flex-wrap gap-2" role="group" aria-label="Filter work">
            {[['all', 'All'], ...Object.entries(CATS)].map(([k, label]) => (
              <button
                key={k}
                aria-pressed={filter === k}
                onClick={() => setFilter(k)}
                className={`min-h-[44px] rounded-full border px-4 text-[13px] transition-[color,background-color,border-color,transform] duration-200 active:scale-[0.97] ${
                  filter === k ? 'border-ink bg-ink text-porcelain' : 'border-line text-ink-2 hover:border-ink'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 columns-2 gap-3 sm:gap-5 lg:columns-3">
          {items.map((w) => (
            <button
              key={w.src}
              onClick={(e) => openAt(w.i, e)}
              className="group relative mb-3 block w-full cursor-zoom-in overflow-hidden rounded-2xl bg-porcelain-2 sm:mb-5"
              aria-label={`View: ${w.alt}`}
            >
              <img src={img(w.src)} alt={w.alt} width={w.w} height={w.h} loading="lazy" decoding="async" className="h-auto w-full transition-transform duration-1000 ease-soft group-hover:scale-[1.04]" />
              <span className="absolute bottom-3 left-3 translate-y-2 rounded-full bg-porcelain/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {CATS[w.cat]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {cur && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className={`lb-scrim fixed inset-0 z-[60] grid place-items-center p-4 sm:p-16 ${closing ? 'is-closing' : ''}`}
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <figure className="lb-figure m-0 grid max-h-full justify-items-center gap-4" style={{ transformOrigin: origin }}>
            <img src={img(cur.src)} alt={cur.alt} className="max-h-[calc(100dvh-160px)] w-auto rounded-xl shadow-2xl" />
            <figcaption className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              {CATS[cur.cat]} — {cur.alt}
            </figcaption>
          </figure>
          <button onClick={close} aria-label="Close" autoFocus className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full border border-line bg-white">
            <X className="h-5 w-5" />
          </button>
          <button onClick={() => step(-1)} aria-label="Previous image" className="absolute bottom-4 left-4 grid h-12 w-12 place-items-center rounded-full border border-line bg-white sm:bottom-auto sm:top-1/2">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={() => step(1)} aria-label="Next image" className="absolute bottom-4 right-4 grid h-12 w-12 place-items-center rounded-full border border-line bg-white sm:bottom-auto sm:top-1/2">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 7. Trust signals                                                    */
/* ------------------------------------------------------------------ */

function TrustSignals() {
  const items = [
    { Icon: Star, big: '5.0', label: 'on magicpin', note: '23 ratings', href: BIZ.magicpin },
    { Icon: Award, big: '4.9', label: 'on Justdial', note: '21 ratings', href: BIZ.justdial },
    { Icon: ShieldCheck, big: 'Verified', label: 'listing', note: `Est. ${BIZ.since} · Indiranagar`, href: BIZ.magicpin },
  ]
  return (
    <section className="border-t border-line pb-[clamp(80px,10vw,150px)] pt-16">
      <div className="shell">
        <p className="eyebrow reveal justify-center !flex text-center">What clients say, in numbers</p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map(({ Icon, big, label, note, href }, i) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener"
              className={`card reveal d${i + 1} group flex items-center gap-5 p-7 transition-colors duration-300 hover:border-ink/30`}
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-porcelain-2">
                <Icon className="h-6 w-6 text-rouge" strokeWidth={1.5} />
              </span>
              <span className="flex-1">
                <span className="block text-[1.7rem] leading-none tracking-[-0.03em]">
                  {big} <span className="flourish text-[0.8em] text-muted">{label}</span>
                </span>
                <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{note}</span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 8. Contact                                                          */
/* ------------------------------------------------------------------ */

function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const [files, setFiles] = useState([])
  const [drag, setDrag] = useState(false)
  const [errors, setErrors] = useState({})
  const [summary, setSummary] = useState('')
  const fileInput = useRef(null)

  const addFiles = (list) => {
    const next = [...list].filter((f) => /^image\/|application\/pdf/.test(f.type))
    setFiles((cur) => [...cur, ...next].slice(0, 6))
  }

  const submit = (e) => {
    e.preventDefault()
    const d = new FormData(e.currentTarget)
    const name = (d.get('name') || '').trim()
    const phone = (d.get('phone') || '').trim()
    const found = validate(d)
    setErrors(found)
    const first = ['name', 'email', 'phone'].find((k) => found[k])
    if (first) {
      e.currentTarget.elements[first].focus()
      return
    }
    const lines = [
      'Hi Trouvaille Studios, I would like to discuss a shoot.',
      `Name: ${name}`,
      d.get('brand') ? `Brand: ${d.get('brand').trim()}` : '',
      d.get('email') ? `Email: ${d.get('email').trim()}` : '',
      `Phone: ${phone}`,
      d.get('message') ? `Brief: ${d.get('message').trim()}` : '',
      files.length ? `References: ${files.length} file(s) to share` : '',
    ].filter(Boolean)
    setSummary(lines.join('\n'))
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1400)
  }

  const onBlur = (e) => {
    const field = e.target.name
    if (!(field in errors) && !e.target.value) return
    const v = validate(new FormData(e.target.form))
    setErrors((cur) => {
      const next = { ...cur }
      if (v[field]) next[field] = v[field]
      else delete next[field]
      return next
    })
  }

  return (
    <section id="contact" className="section bg-porcelain-2">
      <div className="shell grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <p className="eyebrow reveal">Book a shoot</p>
          <h2 className="title reveal d1 mt-6">
            Got a product that deserves <span className="flourish text-rouge">a second look?</span>
          </h2>
          <p className="lead reveal d2 mt-6 max-w-md">
            Send a short brief with a few references. We will reply with a shot list, timing and a quote.
          </p>

          <ul className="reveal d3 mt-10 divide-y divide-line border-y border-line">
            <li className="flex gap-4 py-5">
              <Phone className="mt-0.5 h-5 w-5 text-rouge" strokeWidth={1.5} />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Call / WhatsApp</p>
                <a href={telLink()} className="mt-1 flex min-h-[44px] items-center text-lg hover:text-rouge">{BIZ.phonePretty}</a>
              </div>
            </li>
            <li className="flex gap-4 py-5">
              <MapPin className="mt-0.5 h-5 w-5 text-rouge" strokeWidth={1.5} />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Studio</p>
                <a href={BIZ.map} target="_blank" rel="noopener" className="mt-1 block leading-relaxed hover:text-rouge">
                  {BIZ.addressLines.map((l) => (
                    <span key={l} className="block">{l}</span>
                  ))}
                </a>
              </div>
            </li>
            <li className="flex gap-4 py-5">
              <Clock className="mt-0.5 h-5 w-5 text-rouge" strokeWidth={1.5} />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Hours</p>
                <p className="mt-1">{BIZ.hours}</p>
              </div>
            </li>
          </ul>

          <div className="reveal mt-8 h-56 overflow-hidden rounded-2xl border border-line grayscale">
            <iframe title="Trouvaille Studios on Google Maps" src={BIZ.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full border-0" />
          </div>
        </div>

        <div className="card reveal d1 relative self-start p-6 sm:p-10">
          {status === 'sent' ? (
            <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-rouge text-white">
                <Check className="h-7 w-7" />
              </span>
              <h3 className="mt-6 text-3xl font-normal tracking-[-0.03em]">
                Brief <span className="flourish">received.</span>
              </h3>
              <p className="mt-3 max-w-sm text-muted">
                To reach the studio straight away, send the same brief on WhatsApp{files.length ? ' and attach your references there' : ''}.
              </p>
              <a href={waLink(summary)} target="_blank" rel="noopener" className="btn btn-primary mt-8">
                <MessageCircle className="h-4 w-4" /> Continue on WhatsApp
              </a>
              <button
                onClick={() => {
                  setStatus('idle')
                  setFiles([])
                }}
                className="mt-4 text-sm text-muted underline underline-offset-4"
              >
                Send another brief
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" autoComplete="name" required error={errors.name} onBlur={onBlur} />
                <Field label="Brand / company" name="brand" autoComplete="organization" />
                <Field label="Email" name="email" type="email" autoComplete="email" error={errors.email} onBlur={onBlur} />
                <Field label="Phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required error={errors.phone} onBlur={onBlur} />
              </div>
              <label className="grid gap-2 text-[13px] font-medium">
                The brief
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Product, number of SKUs, where the images will run, deadline…"
                  className="rounded-xl border border-line bg-porcelain px-4 py-3 text-[16px] font-normal outline-none transition-colors placeholder:text-muted focus:border-ink"
                />
              </label>

              <div
                onDragOver={(e) => {
                  e.preventDefault()
                  setDrag(true)
                }}
                onDragLeave={() => setDrag(false)}
                onDrop={(e) => {
                  e.preventDefault()
                  setDrag(false)
                  addFiles(e.dataTransfer.files)
                }}
                onClick={() => fileInput.current.click()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && fileInput.current.click()}
                role="button"
                tabIndex={0}
                className={`grid cursor-pointer place-items-center rounded-xl border border-dashed px-4 py-7 text-center transition-colors ${
                  drag ? 'border-rouge bg-rouge/5' : 'border-line bg-porcelain hover:border-ink/40'
                }`}
              >
                <Upload className="h-5 w-5 text-muted" strokeWidth={1.5} />
                <p className="mt-2 text-[14px]">
                  Drop moodboards or references, or <span className="underline underline-offset-4">browse</span>
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Images or PDF · up to 6</p>
                <input ref={fileInput} type="file" multiple accept="image/*,application/pdf" className="hidden" onChange={(e) => addFiles(e.target.files)} />
              </div>
              {files.length > 0 && (
                <ul className="grid gap-2">
                  {files.map((f, i) => (
                    <li key={f.name + i} className="flex items-center gap-3 rounded-lg border border-line px-3 py-2 text-[13px]">
                      <FileImage className="h-4 w-4 text-rouge" strokeWidth={1.5} />
                      <span className="flex-1 truncate">{f.name}</span>
                      <span className="text-muted">{(f.size / 1024 / 1024).toFixed(1)} MB</span>
                      <button
                        type="button"
                        aria-label={`Remove ${f.name}`}
                        onClick={() => setFiles((cur) => cur.filter((_, j) => j !== i))}
                        className="-my-1 grid h-10 w-10 place-items-center rounded-full hover:bg-porcelain-2"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <button type="submit" disabled={status === 'sending'} className="btn btn-primary w-full disabled:opacity-70">
                {status === 'sending' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending brief…
                  </>
                ) : (
                  <>
                    Send brief <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function validate(d) {
  const e = {}
  if (!(d.get('name') || '').trim()) e.name = 'Add your name so we know who to reply to.'
  const email = (d.get('email') || '').trim()
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'That email looks incomplete. Check the part after @.'
  const digits = (d.get('phone') || '').replace(/\D/g, '')
  if (digits.length < 10) e.phone = 'Add a 10-digit phone number so we can call or WhatsApp you.'
  return e
}

function Field({ label, required, error, name, ...props }) {
  const errId = `${name}-error`
  return (
    <label className="grid gap-2 text-[13px] font-medium">
      <span>
        {label} {required && <span className="text-rouge" aria-hidden="true">*</span>}
      </span>
      <input
        {...props}
        name={name}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errId : undefined}
        className={`h-12 rounded-xl border bg-porcelain px-4 text-[16px] font-normal outline-none transition-colors focus:border-ink ${
          error ? 'border-rouge' : 'border-line'
        }`}
      />
      {error && (
        <span id={errId} role="alert" className="text-[13px] font-normal text-rouge">
          {error}
        </span>
      )}
    </label>
  )
}

/* ------------------------------------------------------------------ */
/* 9. Footer                                                           */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="bg-ink text-porcelain">
      <div className="shell grid gap-12 py-20 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-porcelain/60">
            Advertising and commercial photography and video production in Indiranagar, Bangalore. Since {BIZ.since}.
          </p>
          <p className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-porcelain/15 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-porcelain/70">
            <span className="anim-dot h-2 w-2 rounded-full bg-[#5BBF7A]" />
            Taking bookings · opens 10:00 am
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-porcelain/55">Studio</p>
          <a href={BIZ.map} target="_blank" rel="noopener" className="mt-4 block text-[15px] leading-relaxed text-porcelain/80 hover:text-porcelain">
            {BIZ.addressLines.map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
          </a>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-porcelain/55">Contact</p>
          <ul className="mt-4 space-y-2 text-[15px] text-porcelain/80">
            <li><a href={telLink()} className="hover:text-porcelain">{BIZ.phonePretty}</a></li>
            <li><a href={waLink()} target="_blank" rel="noopener" className="hover:text-porcelain">WhatsApp</a></li>
            <li><a href={BIZ.magicpin} target="_blank" rel="noopener" className="hover:text-porcelain">magicpin</a></li>
            <li><a href={BIZ.justdial} target="_blank" rel="noopener" className="hover:text-porcelain">Justdial</a></li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-porcelain/55">Explore</p>
          <ul className="mt-4 space-y-2 text-[15px] text-porcelain/80">
            {NAV.map((n) => (
              <li key={n.href}><a href={n.href} className="hover:text-porcelain">{n.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="shell overflow-hidden">
        <div className="footer-mark flourish select-none whitespace-nowrap text-[clamp(4rem,15vw,15rem)] leading-[0.8] text-porcelain/[0.08]" aria-hidden="true" />
      </div>
      <div className="border-t border-line-dark">
        <div className="shell flex flex-wrap items-center justify-between gap-4 py-6 text-[13px] text-porcelain/50">
          <p>© {new Date().getFullYear()} {BIZ.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-porcelain">Privacy</Link>
            <Link to="/terms" className="hover:text-porcelain">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function WhatsAppFloat() {
  return (
    <aside aria-label="Quick contact">
    <a
      href={waLink()}
      target="_blank"
      rel="noopener"
      aria-label="Chat with Trouvaille Studios on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-ink text-porcelain ring-1 ring-porcelain/25 shadow-[0_16px_30px_-12px_rgba(22,20,18,0.6)] transition-transform duration-300 hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" strokeWidth={1.6} />
    </a>
    </aside>
  )
}

/* ------------------------------------------------------------------ */

export default function App() {
  useReveal()
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 600)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-porcelain">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Marquee />
        <Features />
        <Pillars />
        <Protocol />
        <ServicesGrid />
        <Work />
        <TrustSignals />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
