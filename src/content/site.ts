/**
 * Alle teksten en gegevens van de site op één plek.
 * Iets aanpassen? Dat kan hier — de componenten hoeven niet open.
 */
import videoPoster from '../assets/images/video-friend-like-me-1280.webp'

export interface AgendaItem {
  /** Datum als JJJJ-MM-DD. Optredens verhuizen na deze dag automatisch naar "Eerder". */
  date: string
  title: string
  venue?: string
  city?: string
  /** Bijvoorbeeld "20:30" */
  time?: string
  note?: string
  /** Link naar kaartverkoop of meer info */
  url?: string
  /** Markeert een voorbeeld-item dat alleen de opmaak laat zien. Verwijder bij echte data. */
  placeholder?: boolean
}

export const site = {
  name: 'Vocal Group Utrecht',
  shortName: 'VGU',
  tagline: 'Close harmony · a capella · Utrecht',

  // TODO: bevestigen — het adres op de huidige site was niet uit te lezen.
  email: 'info@vocalgrouputrecht.nl',

  socials: [
    { name: 'Instagram', handle: '@vocalgrouputrecht', url: 'https://www.instagram.com/vocalgrouputrecht/' },
    { name: 'Facebook', handle: 'Vocal Group Utrecht', url: 'https://www.facebook.com/VocalGroupUtrecht' },
    { name: 'YouTube', handle: '@vocalgrouputrecht', url: 'https://www.youtube.com/@vocalgrouputrecht' },
  ],

  nav: [
    { id: 'over-ons', label: 'Over ons' },
    { id: 'luister', label: 'Luister' },
    { id: 'dirigent', label: 'Dirigent' },
    { id: 'agenda', label: 'Agenda' },
    { id: 'boeken', label: 'Boek ons' },
    { id: 'meezingen', label: 'Zing mee' },
    { id: 'contact', label: 'Contact' },
  ],

  hero: {
    titleLines: ['Vocal Group', 'Utrecht'],
    // Alternatief: '18 stemmen. Liefde voor muziek. Gezongen in verbinding met elkaar en met jou.'
    lede: '18 stemmen. A capella. One wall of sound.',
    primaryCta: { label: 'Bekijk de agenda', target: 'agenda' },
    secondaryCta: { label: 'Boek ons', target: 'boeken' },
  },

  /**
   * Zoeken we een nieuwe zanger? Zet `open` op false als de plek vervuld is:
   * het bericht in de hero verdwijnt en "Zing mee" toont de algemene tekst.
   */
  vacancy: {
    open: true,
    label: 'Gezocht',
    voice: 'lage bas',
  },

  about: {
    eyebrow: 'Over ons',
    titleLines: ['18 stemmen.', 'Liefde voor muziek.'],
    lead: 'Vocal Group Utrecht is een close harmony a-capellagroep van achttien muzikanten, onder leiding van Hilde Konings.',
    paragraphs: [
      'We zingen pop — van Rosalía en Muse tot Radiohead en Merol — in eigen arrangementen, met alle ruimte voor ieders creativiteit. Zingen doen we in verbinding: met elkaar én met het publiek.',
      'We zijn een divers gezelschap met één ding gemeen: muzikaliteit en plezier in zingen. Sommigen van ons werken in de muziek, bespelen een instrument of komen uit de dans- of theaterwereld. Een aantal schrijft zelf arrangementen.',
      // TODO: derde beroep toevoegen (was: machine learning engineer).
      'We zijn tussen de 25 en 45 jaar en werken als muziekdocent, apotheker of wijkmanager — en alles daartussenin. Naast de repetities is er tijd voor borrels, repetitieweekenden, feestjes en karaoke.',
    ],
    photoCaption: 'Op het podium tijdens onze voorstelling Heartbeat.',
    stats: [
      { value: '18', label: 'stemmen' },
      { value: '0', label: 'instrumenten' },
      { value: '25–45', label: 'jaar jong' },
      { value: 'Di', label: 'elke dinsdagavond repetitie' },
    ],
  },

  repertoire: {
    intro: 'Van',
    artists: ['Rosalía', 'Muse', 'Radiohead', 'Merol'],
  },

  video: {
    eyebrow: 'Kijk & luister',
    title: 'De warme surround sound van 18 stemmen',
    text: 'We delen onze liefde voor muziek heel graag met jou. Hier alvast een voorproefje — live klinkt het nog beter.',
    /** Het stukje na "youtu.be/" of "watch?v=" in de YouTube-link. */
    youtubeId: 'xrmsMW1HUZc',
    videoTitle: 'Friend Like Me',
    /** Eigen voorvertoning-afbeelding. Laat weg (undefined) om die van YouTube te gebruiken. */
    poster: videoPoster as string | undefined,
    channelLabel: 'Meer op YouTube',
    channelUrl: 'https://www.youtube.com/@vocalgrouputrecht',
  },

  conductor: {
    eyebrow: 'De dirigent',
    name: 'Hilde Konings',
    role: 'Dirigent sinds 2025',
    paragraphs: [
      'Sinds 2025 staat Vocal Group Utrecht onder leiding van Hilde Konings. Na de opleiding Docent Muziek volgde ze de master Vocal Leadership, waarin ze zich specialiseerde in het leiden van vocale groepen.',
      'Haar uitdaging: muziek écht tot leven brengen voor het publiek.',
    ],
    /** Nog geen portret beschikbaar — voeg hier later een afbeelding toe. */
    photo: null as string | null,
  },

  agenda: {
    eyebrow: 'Agenda',
    title: 'Kom ons zien',
    intro: 'Eigen voorstellingen, optredens in de stad en af en toe iets onverwachts.',
    emptyTitle: 'Nieuwe data volgen binnenkort',
    emptyText: 'Houd onze socials in de gaten — daar hoor je het als eerste.',
    pastTitle: 'Eerder',
    items: [
      // Voorbeeld-items om de opmaak te tonen. Vervangen door echte optredens.
      {
        date: '2027-04-17',
        title: 'Voorjaarsvoorstelling',
        venue: 'Locatie volgt',
        city: 'Utrecht',
        time: '20:30',
        note: 'Voorbeeld — datum en locatie zijn nog niet bekend.',
        placeholder: true,
      },
      {
        date: '2026-12-19',
        title: 'Kerstoptreden',
        venue: 'Locatie volgt',
        city: 'Utrecht',
        note: 'Voorbeeld — datum en locatie zijn nog niet bekend.',
        placeholder: true,
      },
      // Echte optredens van de huidige site.
      { date: '2026-04-18', title: 'Onze grote voorstelling', venue: 'Theater Kikker', city: 'Utrecht' },
      { date: '2025-12-20', title: 'Kerstlichtjesvaart', city: 'De Meern' },
    ] as AgendaItem[],
  },

  booking: {
    eyebrow: 'Boek ons',
    title: '18 stemmen op jouw moment',
    text: 'Naast onze eigen voorstellingen zijn we te boeken voor bruiloften, kerstmarkten en andere evenementen. Vertel ons wat je voor ogen hebt, dan denken we graag mee over een passend programma.',
    occasions: [
      { title: 'Bruiloften', text: 'Van ceremonie tot feest.' },
      { title: 'Kerstmarkten', text: 'Wintersfeer in close harmony.' },
      { title: 'Evenementen', text: 'Bedrijfsfeest, opening of festival.' },
    ],
    cta: 'Vraag een optreden aan',
    mailSubject: 'Boeking Vocal Group Utrecht',
  },

  join: {
    eyebrow: 'Zing mee',
    /** Getoond zolang `vacancy.open` true is. */
    open: {
      title: 'Gezocht: een lage bas',
      text: 'We hebben plek voor een nieuwe lage stem. Zing jij bas en lijkt het je wat om met ons mee te doen? Stuur ons een mailtje — we horen graag van je.',
      note: 'Andere stemsoort? Houd de socials in de gaten voor audities of open repetities!',
      cta: 'Meld je aan',
    },
    /** Getoond als `vacancy.open` false is. */
    closed: {
      title: 'Zin om mee te zingen?',
      text: 'Op dit moment zijn alle plekken bezet. Wil je horen wanneer er audities of open repetities zijn? Stuur ons een mailtje, dan houden we je op de hoogte.',
      note: 'Houd ook onze socials in de gaten voor audities of open repetities!',
      cta: 'Houd me op de hoogte',
    },
    facts: [
      { label: 'Repetitie', value: 'Elke dinsdagavond' },
      { label: 'Onder leiding van', value: 'Hilde Konings' },
      { label: 'Daarnaast', value: 'Borrels, repetitieweekenden, feestjes en karaoke' },
    ],
    mailSubject: 'Meezingen bij Vocal Group Utrecht',
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Laat van je horen',
    text: 'Wil je ons boeken, je aanmelden voor de nieuwsbrief, samenwerken, meezingen of op de hoogte blijven van audities? Of heb je een andere vraag? Mail ons, of stuur een bericht via de socials.',
  },
}

export function mailto(subject?: string): string {
  return `mailto:${site.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`
}
