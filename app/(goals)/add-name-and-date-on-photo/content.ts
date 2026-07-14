import type { FAQ, HowItWorksStep } from '@/types/registry'

// Page content for /add-name-and-date-on-photo. Standalone tools live outside
// the goal registry, so their copy is co-located with the route (see /crop-image).
//
// URL and title were chosen to match the exact-match keyword "add name and
// date to photo" that top-ranking competitors (Pi7, WebUtility.io,
// Pixellize.io, Pokecut, Fotor) all target with this same slug pattern.
//
// Under the hood this is a Photo Footer Generator, NOT a watermark or
// on-image overlay tool — the uploaded photo is never drawn on. Name and/or
// Date appear only in a white (or chosen colour) footer band added below the
// photo. That mechanism is explained in FOOTER_GUIDE below; the page title
// and H1 use the "add name and date to photo" phrasing searchers actually type.

export const PAGE_TITLE = 'Add Name & Date to Photo Online'
export const SEO_TITLE = 'Add Name & Date to Photo Online – Free & Private | Presetly'
export const DESCRIPTION =
  "Add your name and today's date to any photo, free and instantly. Perfect for passport " +
  'photos, ID cards and exam uploads (SSC, UPSC). Nothing is ever uploaded.'

export const HOW_IT_WORKS: HowItWorksStep[] = [
  { title: 'Upload your photo', body: 'Drop in a JPEG, PNG, WebP or AVIF file, paste from your clipboard, or take a photo on mobile. It never leaves your device.' },
  { title: 'Turn on Name and/or Date', body: 'Each has its own on/off switch — type a name, pick a date and format, or use both together.' },
  { title: 'Choose alignment and footer style', body: 'Set left/center/right alignment and font size for each field, and the footer height, background and text colour.' },
  { title: 'Download', body: 'Tap Download and your photo — untouched — is ready with its new name and date footer, as JPEG, PNG or WebP.' },
]

export const USE_CASES_GUIDE = {
  heading: 'Why add your name and date to a photo',
  paragraphs: [
    'Government exam candidates are one of the most common reasons people search for this tool — SSC, UPSC, Railways, PSC and other recruitment boards often require a passport-size photo with the applicant\'s name and date of photo (DOB/DOP) printed directly below it as part of the application. Presetly adds that name-and-date strip without touching the photo itself, so it stays sharp and within the exam board\'s size limits.',
    'Beyond exam applications, a name and date strip is useful for site inspectors and field engineers logging who took a photo and when, parents captioning family photos, and sellers date-stamping product or delivery photos for buyers. Older phone cameras used to burn a date directly onto every photo — this tool recreates a cleaner version of that idea as a separate footer bar, so the photo itself always stays untouched.',
  ],
}

export const FOOTER_GUIDE = {
  heading: 'How the footer lays out Name and Date',
  paragraphs: [
    'By default, Name sits on the left of the footer and Date sits on the right — the classic layout, and it never needs any extra thought. If you switch Name and Date to the same alignment (for example, both centred), Presetly automatically stacks them as two lines instead of letting them overlap, growing the footer height if needed so neither line is ever clipped.',
    'Footer height, background colour and text colour are all adjustable under "Footer" — white background with dark text is the default, but any combination works, and the live preview always matches exactly what gets downloaded.',
  ],
}

export const PRIVACY_GUIDE = {
  heading: 'Your photo never leaves your device',
  paragraphs: [
    'This tool runs entirely in your browser using the Canvas API. Your photo is read from your file system into memory, extended downward with a footer band, and the result is offered back to you as a download — at no point is the image sent to a server, and there is no sign-up or account required. The uploaded photo itself is never modified or drawn on.',
    'That also means it works offline once the page has loaded, and there is no limit on how many photos you process.',
  ],
}

export const FAQS: FAQ[] = [
  { question: 'Can I use this to add name and date to a photo for SSC, UPSC or Railway exams?', answer: 'Yes. Many exam boards ask for a passport-size photo with your name and date of photo (DOB/DOP) printed below it — turn on Name and Date, set the alignment and font size, and download. The photo itself is never resized or altered beyond the added footer.' },
  { question: 'Does this draw the name and date on top of my photo?', answer: 'No. The photo is left completely untouched — Presetly extends the canvas downward and adds a footer band below the photo, and the name/date only ever appear inside that footer.' },
  { question: 'Is my photo uploaded anywhere?', answer: 'No. Everything runs on your device using the browser\'s Canvas API. Your photo is never transmitted to a server.' },
  { question: 'Can I add just a name, just a date, or both?', answer: 'Yes. Name and Date each have their own on/off switch, so you can use either one alone or both together.' },
  { question: 'What happens if I set Name and Date to the same alignment?', answer: 'Presetly automatically stacks them as two lines instead of letting them overlap, growing the footer height if needed so both lines always stay fully visible.' },
  { question: 'What date formats are supported?', answer: 'Five common formats: DD-MM-YYYY, DD/MM/YYYY, YYYY-MM-DD, "MMM DD, YYYY" and "DD MMM YYYY". The date defaults to today but can be changed to any date.' },
  { question: 'Can I change the footer height and colors?', answer: 'Yes. Footer height, background colour and text colour are all adjustable under "Footer" — white background with dark text is the default.' },
  { question: 'Which photo formats are supported?', answer: 'You can upload JPEG, PNG, WebP or AVIF images up to 20 MB. The result can be downloaded as JPEG, PNG or WebP without quality loss.' },
  { question: 'Does this work on mobile phones?', answer: 'Yes. It is built mobile-first with large touch targets and a sticky Download button, and works in Chrome, Safari, Firefox and Edge on both Android and iOS.' },
  { question: 'Is this tool free to use?', answer: 'Completely free, with no sign-up, no watermark, and no limit on how many photos you process. Because processing happens on your device, it costs nothing to run.' },
]
