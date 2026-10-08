import Legal from './Legal.jsx'
import { BIZ } from './site.js'

export default function Privacy() {
  return (
    <Legal title="Privacy Policy" updated="October 2026">
      <section>
        <h2>What this page covers</h2>
        <p>
          This policy explains what happens to the information you give {BIZ.name} through this website. It applies to
          this site only — not to WhatsApp, Google or any other platform, each of which has its own privacy policy.
        </p>
      </section>
      <section>
        <h2>Information we collect</h2>
        <p>
          If you fill in the brief form, we collect what you type into it: your name, phone number, and optionally your
          email, brand name and project details. Reference files you add are only listed in your browser; they are not
          uploaded by this site. You choose whether to share them with us over WhatsApp or email.
        </p>
      </section>
      <section>
        <h2>How we use it</h2>
        <ul>
          <li>To reply to your enquiry with a shot list, timing and a quote.</li>
          <li>To plan and deliver a shoot you have booked with us.</li>
        </ul>
        <p>We do not sell your details or add you to a marketing list without asking.</p>
      </section>
      <section>
        <h2>Cookies and analytics</h2>
        <p>
          This site sets no tracking cookies and runs no third-party analytics. Web fonts are loaded from Google Fonts
          and the map is embedded from Google Maps, so Google receives your IP address when serving those.
        </p>
      </section>
      <section>
        <h2>Keeping and deleting your data</h2>
        <p>
          Enquiry details are kept only as long as needed to respond and to keep a record of the project. Ask us at any
          time and we will delete them.
        </p>
      </section>
    </Legal>
  )
}
