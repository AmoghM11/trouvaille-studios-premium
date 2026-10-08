import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { BIZ, telLink } from './site.js'
import { Logo } from './App.jsx'

/** Shared shell for the /privacy and /terms routes. */
export default function Legal({ title, updated, children }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-dvh bg-porcelain">
      <header className="border-b border-line">
        <div className="shell flex items-center justify-between py-5">
          <Link to="/" aria-label="Back to Trouvaille Studios home">
            <Logo />
          </Link>
          <Link to="/" className="btn btn-ghost min-h-[44px] px-5">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to site
          </Link>
        </div>
      </header>

      <main className="shell max-w-3xl py-16">
        <h1 className="title">{title}</h1>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Last updated {updated}</p>

        <div className="mt-10 space-y-8 leading-relaxed text-muted [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-ink [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          {children}
        </div>

        <div className="mt-14 rounded-2xl border border-line bg-white p-6">
          <p className="font-display font-medium text-ink">Questions about this page?</p>
          <p className="mt-2 text-sm text-muted">
            Contact {BIZ.name} on{' '}
            <a href={telLink()} className="font-medium text-rouge underline underline-offset-4">
              {BIZ.phonePretty}
            </a>
            , or visit the studio at {BIZ.addressLines.join(', ')}.
          </p>
        </div>
      </main>

      <footer className="border-t border-line">
        <div className="shell py-6 text-xs text-muted">
          © {new Date().getFullYear()} {BIZ.name}. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
