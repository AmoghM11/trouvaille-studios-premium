import Legal from './Legal.jsx'
import { BIZ } from './site.js'

export default function Terms() {
  return (
    <Legal title="Terms of Use" updated="October 2026">
      <section>
        <h2>About this site</h2>
        <p>
          This website is run by {BIZ.name}, an advertising and commercial photography studio in Indiranagar,
          Bangalore. By using it you agree to these terms.
        </p>
      </section>
      <section>
        <h2>Our work and images</h2>
        <p>
          All photographs on this site are the work of {BIZ.name} and are shown as portfolio samples. Products and
          packaging pictured belong to their respective brands. Please do not copy, download or reuse any image without
          written permission.
        </p>
      </section>
      <section>
        <h2>Quotes and bookings</h2>
        <p>
          Sending a brief through this site is an enquiry, not a booking. Scope, pricing, usage rights and delivery
          timelines are confirmed separately in writing for each project.
        </p>
      </section>
      <section>
        <h2>Accuracy</h2>
        <p>
          We try to keep the information here current, including our address and hours. Please call before visiting to
          confirm the studio is open.
        </p>
      </section>
    </Legal>
  )
}
