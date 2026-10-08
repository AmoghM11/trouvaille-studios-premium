// Trouvaille Studios — all business content. Sources: Justdial + magicpin
// (see ../trouvaille-studios/content-brief.md). Nothing here is invented
// except the process copy, which describes a standard commercial workflow.

export const BIZ = {
  name: 'Trouvaille Studios',
  since: 2018,
  phone: '+919620244855',
  phonePretty: '+91 96202 44855',
  wa: '919620244855',
  addressLines: ['08, 2nd Floor, No. 8, 18th A Cross Rd', 'Lakshmipuram, Indiranagar', 'Bengaluru 560008'],
  hours: 'Opens 10:00 am · shoots by appointment',
  map: 'https://www.google.com/maps?q=12.9784433,77.6313929',
  mapEmbed: 'https://maps.google.com/maps?q=12.9784433,77.6313929&z=16&output=embed',
  justdial: 'https://www.justdial.com/Bangalore/Trouvaille-Studios-Lbs-Layout/080PXX80-XX80-231201153409-A5J1_BZDET',
  magicpin: 'https://magicpin.in/Lakshmipuram/Lakshmipuram/Photo-Studio/Trouvaille-Studios/store/3236919',
}

export const telLink = () => `tel:${BIZ.phone}`
export const waLink = (text = 'Hi Trouvaille Studios, I would like to discuss a shoot.') =>
  `https://wa.me/${BIZ.wa}?text=${encodeURIComponent(text)}`
export const img = (n) => `/img/${n}.webp`

export const NAV = [
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
]

// icon keys are resolved to lucide components in App.jsx
export const SERVICES = [
  { icon: 'Package', title: 'Product', text: 'Packshots, hero angles and styled flat-lays that read instantly on a marketplace tile or a billboard.', img: 'furniture-walnut-dining-set' },
  { icon: 'Sparkles', title: 'Cosmetics', text: 'Colour-true swatches, textures and shade lineups. The red on screen is the red in the tube.', img: 'cosmetics-lip-tint-shade-lineup' },
  { icon: 'Shirt', title: 'Beauty & Fashion', text: 'Model-led beauty and fashion portraits, lit for skin, product and attitude in one frame.', img: 'beauty-model-lip-applicator' },
  { icon: 'UtensilsCrossed', title: 'Food', text: 'Colour-blocked sets and warm rustic tabletops, styled to look exactly as good as it tastes.', img: 'food-pancake-mix-red-set' },
  { icon: 'Armchair', title: 'Furniture', text: 'Seamless-sweep furniture work and lived-in room sets that show scale, grain and finish.', img: 'furniture-cane-chairs-trio' },
  { icon: 'Clapperboard', title: 'Video Production', text: 'Videography and video production for campaigns, reels and launches, shot alongside your stills.', img: 'lifestyle-family-living-room' },
]

export const CATS = { beauty: 'Beauty', food: 'Food & Drink', furniture: 'Furniture', lifestyle: 'Lifestyle & Retail' }

export const WORK = [
  { src: 'beauty-model-lip-applicator', cat: 'beauty', alt: 'Model holding a lip applicator against a pink blazer', w: 1280, h: 1600 },
  { src: 'food-pancake-mix-red-set', cat: 'food', alt: 'Pancake mix styled on a bold red set with blueberries', w: 1143, h: 1600 },
  { src: 'furniture-walnut-dining-set', cat: 'furniture', alt: 'Walnut oval dining table with cane-back chairs', w: 1600, h: 1600 },
  { src: 'lifestyle-brass-tumbler-pour', cat: 'lifestyle', alt: 'Milk poured from a brass jug into brass tumblers', w: 1067, h: 1600 },
  { src: 'cosmetics-lip-tint-shade-lineup', cat: 'beauty', alt: 'Lip tints fanned out across a full shade range', w: 1600, h: 1142 },
  { src: 'food-millet-dosa-rustic', cat: 'food', alt: 'Millet dosa on a dark plate with chillies and spices', w: 1143, h: 1600 },
  { src: 'furniture-cane-chairs-trio', cat: 'furniture', alt: 'Three cane-back accent chairs on a white sweep', w: 1600, h: 1600 },
  { src: 'stationery-journal-desk-hand', cat: 'lifestyle', alt: 'Hand holding a kraft journal on a green desk', w: 1280, h: 1600 },
  { src: 'beauty-portrait-red-lip', cat: 'beauty', alt: 'Beauty portrait with a bold red lip', w: 1371, h: 1600 },
  { src: 'beverage-moody-bottle-glass', cat: 'food', alt: 'Dark beer bottle and red drink on a moody wooden table', w: 1067, h: 1600 },
  { src: 'lifestyle-family-living-room', cat: 'lifestyle', alt: 'Family in a sunlit living room for a lifestyle campaign', w: 1600, h: 1169 },
  { src: 'cosmetics-lip-tint-pink-swatch', cat: 'beauty', alt: 'Pink lip tint over a painted swatch', w: 1600, h: 1600 },
  { src: 'food-pancake-mix-yellow-set', cat: 'food', alt: 'Pancake mix on a yellow set with almonds and vanilla', w: 1143, h: 1600 },
  { src: 'furniture-outdoor-rope-chairs', cat: 'furniture', alt: 'Grey rope-weave outdoor chairs on a grey sweep', w: 1600, h: 1600 },
  { src: 'retail-storefront-billboard', cat: 'lifestyle', alt: 'Cosmetics storefront with a campaign billboard', w: 1600, h: 1280 },
  { src: 'beauty-haircare-model-bottles', cat: 'beauty', alt: 'Smiling model beside haircare bottles', w: 1280, h: 1600 },
  { src: 'food-dosa-mix-lifestyle-desk', cat: 'food', alt: 'Dosa mix pack and plated dosa on a bright desk', w: 1280, h: 1600 },
  { src: 'stationery-pencils-kraft-flatlay', cat: 'lifestyle', alt: 'Seed pencils and kraft envelope on mustard paper', w: 1280, h: 1600 },
  { src: 'skincare-mask-jar-hand', cat: 'beauty', alt: 'Hand reaching for a skincare mask jar', w: 1600, h: 1067 },
  { src: 'retail-beauty-store-interior', cat: 'lifestyle', alt: 'Black-and-white cosmetics store interior', w: 1600, h: 1143 },
  { src: 'cosmetics-lip-tint-red-swatch', cat: 'beauty', alt: 'Red lip tint over a bright red swatch', w: 1600, h: 1600 },
  { src: 'cosmetics-lip-tint-mauve-swatch', cat: 'beauty', alt: 'Mauve lip tint over a brushed swatch', w: 1600, h: 1600 },
]

export const STEPS = [
  { n: '01', title: 'Brief & moodboard', text: 'Tell us the product, the platform and the feeling. We come back with a shot list, references and a lighting direction before anything is booked.', img: 'stationery-pencils-kraft-flatlay', tags: ['Shot list', 'References', 'Formats'] },
  { n: '02', title: 'Set & shoot', text: 'Backdrops, props, styling and talent are sourced ahead of the day. Stills and video are captured together, with you reviewing frames as we shoot.', img: 'food-pancake-mix-yellow-set', tags: ['Styling', 'Stills', 'Video'] },
  { n: '03', title: 'Retouch & deliver', text: 'Colour-corrected, retouched files, sized for e-commerce, social, print and out-of-home, delivered ready to publish.', img: 'retail-storefront-billboard', tags: ['Retouching', 'Colour', 'Delivery'] },
]
