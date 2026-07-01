import type { LearnArticle } from '@/registry/learn/schema'

export const photoRequirementsForOnlineApplicationsArticle: LearnArticle = {
  slug:       'photo-requirements-for-online-applications',
  title:      'Photo requirements for Indian online applications',
  shortTitle: 'Photo requirements guide',

  seoTitle:          'Photo requirements for Indian govt online applications: complete guide',
  description:       'Exact photo size, dimensions, and format for UPSC, GPSC, SSC, Aadhaar, PAN card, Passport, Voter ID, IBPS, and 10 more Indian government portals.',
  ogDescription:     'Every major Indian government portal has different photo requirements. This guide lists the exact pixel dimensions, file size limits, and format for UPSC, Aadhaar, PAN, Passport Seva, and more.',
  twitterDescription: 'Photo requirements for UPSC, Aadhaar, PAN, Passport, SSC, IBPS, Voter ID. Exact pixels, KB limits, and format for each portal.',
  keywords: [
    'photo requirements Indian government portal',
    'upsc photo size pixels',
    'aadhaar photo size requirement',
    'pan card photo size kb',
    'passport photo size india',
    'voter id photo size',
    'ibps photo requirement',
    'ssc photo size',
  ],

  category: 'government-portals',
  tags: ['government portals', 'photo requirements', 'upsc', 'aadhaar', 'pan card', 'passport', 'ssc', 'ibps'],

  introduction: [
    'Every Indian government portal has different photo requirements. UPSC wants 413x531 pixels. Aadhaar wants 200x200. Passport Seva wants 600x600. And each has a different file size limit on top of that.',
    'The frustrating part is that this information is scattered across different notification PDFs and official guidelines. Some portals update their requirements each cycle. You end up searching for 20 minutes just to find out the exact pixel dimensions.',
    'This guide collects the requirements for every major portal in one place with the exact dimensions, file size limits, and format. Use the linked tool for each portal to prepare your photo automatically.',
  ],

  sections: [
    {
      id:      'exam-portals',
      heading: 'Photo requirements for competitive exam portals',
      content: [
        {
          type: 'subsection',
          id:      'upsc-requirements',
          heading: 'UPSC (Civil Services, NDA, CDS, CAPF)',
          content: [
            {
              type: 'list',
              items: [
                'Photo dimensions: 413x531 pixels',
                'Photo file size: under 300 KB',
                'Signature dimensions: 140x60 pixels',
                'Signature file size: under 20 KB',
                'Format: JPEG',
                'Background: white or light-coloured',
              ],
            },
          ],
        },
        {
          type: 'subsection',
          id:      'gpsc-requirements',
          heading: 'GPSC (Gujarat Public Service Commission)',
          content: [
            {
              type: 'list',
              items: [
                'Photo dimensions: 413x531 pixels',
                'Photo file size: under 200 KB',
                'Signature dimensions: 140x60 pixels',
                'Signature file size: under 20 KB',
                'Format: JPEG',
              ],
            },
          ],
        },
        {
          type: 'subsection',
          id:      'ssc-requirements',
          heading: 'SSC (Staff Selection Commission)',
          content: [
            {
              type: 'list',
              items: [
                'Photo dimensions: 413x531 pixels',
                'Photo file size: 20 KB to 100 KB',
                'Signature dimensions: 140x60 pixels',
                'Signature file size: 10 KB to 50 KB',
                'Format: JPEG',
              ],
            },
          ],
        },
        {
          type: 'subsection',
          id:      'ibps-requirements',
          heading: 'IBPS (Bank exams: PO, Clerk, SO)',
          content: [
            {
              type: 'list',
              items: [
                'Photo dimensions: 413x531 pixels',
                'Photo file size: 20 KB to 100 KB',
                'Signature dimensions: 140x60 pixels',
                'Signature file size: 10 KB to 30 KB',
                'Format: JPEG',
              ],
            },
          ],
        },
        {
          type: 'subsection',
          id:      'nda-railway-requirements',
          heading: 'NDA and Indian Railways',
          content: [
            {
              type: 'list',
              items: [
                'NDA photo: 413x531 pixels, under 300 KB, JPEG',
                'NDA signature: 140x60 pixels, under 20 KB, JPEG',
                'Railway (RRB): 413x531 pixels, 20 KB to 100 KB, JPEG',
                'Railway signature: 140x60 pixels, 10 KB to 40 KB, JPEG',
              ],
            },
          ],
        },
      ],
    },
    {
      id:      'id-document-portals',
      heading: 'Photo requirements for ID document portals',
      content: [
        {
          type: 'subsection',
          id:      'aadhaar-requirements',
          heading: 'Aadhaar (UIDAI)',
          content: [
            {
              type: 'list',
              items: [
                'Photo dimensions: 200x200 pixels (square)',
                'Photo file size: under 50 KB',
                'Format: JPEG',
                'Background: white or light-coloured',
                'No signature upload required for most updates',
              ],
            },
          ],
        },
        {
          type: 'subsection',
          id:      'pan-requirements',
          heading: 'PAN card (NSDL)',
          content: [
            {
              type: 'list',
              items: [
                'Photo dimensions: 200x230 pixels',
                'Photo file size: under 50 KB',
                'Signature dimensions: 140x60 pixels',
                'Signature file size: under 10 KB',
                'Format: JPEG',
              ],
            },
          ],
        },
        {
          type: 'subsection',
          id:      'passport-requirements',
          heading: 'Passport Seva (MEA)',
          content: [
            {
              type: 'list',
              items: [
                'Photo dimensions: 600x600 pixels (square)',
                'Photo file size: under 500 KB',
                'Format: JPEG',
                'Background: white, no patterns',
                'Face must fill 70 to 80% of the frame',
              ],
            },
          ],
        },
        {
          type: 'subsection',
          id:      'voter-id-requirements',
          heading: 'Voter ID (NVSP)',
          content: [
            {
              type: 'list',
              items: [
                'Photo dimensions: 413x531 pixels',
                'Photo file size: under 100 KB',
                'Format: JPEG',
                'Background: light-coloured',
              ],
            },
          ],
        },
        {
          type: 'subsection',
          id:      'driving-licence-requirements',
          heading: 'Driving Licence (state RTOs)',
          content: [
            {
              type: 'paragraph',
              text: 'Driving licence requirements vary by state. Most state RTO portals require a photo of 200x200 to 413x531 pixels, under 100 KB, JPEG. Check the specific state RTO portal for exact requirements. Presetly\'s driving licence tool targets common state requirements.',
            },
          ],
        },
      ],
    },
    {
      id:      'key-differences',
      heading: 'Key differences to remember',
      content: [
        {
          type: 'paragraph',
          text: 'Most exam portals (UPSC, GPSC, SSC, IBPS, NDA, Railway) use the same dimension: 413x531 pixels. They are portrait format.',
        },
        {
          type: 'paragraph',
          text: 'ID document portals differ more. Aadhaar uses 200x200 (square, smaller). PAN uses 200x230 (portrait, smaller). Passport uses 600x600 (square, larger). Voter ID uses 413x531 (same as exam portals).',
        },
        {
          type: 'paragraph',
          text: 'File size limits also vary. Passport Seva is most lenient at 500 KB. PAN signature is strictest at 10 KB. Always check the current year\'s notification for the specific portal you are using.',
        },
      ],
    },
  ],

  faqs: [
    {
      question: 'Can I use the same photo for UPSC and SSC?',
      answer:   'Yes, if both are in the same application window and the photo is recent. Both require 413x531 pixels and JPEG. The file size limits differ (UPSC allows 300 KB, SSC requires 20 to 100 KB), so make sure the file meets the stricter SSC limit.',
    },
    {
      question: 'How old can the photo be for government applications?',
      answer:   'Most portals require a recent photo, usually taken within the last 6 months. Some are lenient but it is best practice to use a recent photo for every application.',
    },
    {
      question: 'My exam notification says "passport size photo". Does that mean 600x600?',
      answer:   'In Indian official documents, "passport size" means a 3.5x4.5 cm portrait format, which is 413x531 pixels at 300 DPI. The Passport Seva portal (for actual passports) uses 600x600. These are two different things despite both being called "passport size" colloquially.',
    },
    {
      question: 'Do the requirements change each year for competitive exams?',
      answer:   'They can. Major portals like UPSC and IBPS occasionally update their technical requirements. Always check the current year\'s detailed advertisement or notification PDF before preparing your photos. The values in this guide are accurate as of 2025-2026.',
    },
    {
      question: 'What happens if I upload a photo that meets file size but not dimensions?',
      answer:   'The portal will reject it. Both file size and dimensions are checked. Portals do not crop or resize your photo to fit. You need to submit a photo that already meets both requirements.',
    },
  ],

  conclusion: 'Keep this guide bookmarked for application season. Most exam portals share the 413x531 pixel standard. ID document portals each have unique requirements. For each portal, use the matching preset tool for a one-step solution that handles dimensions and file size together.',

  relatedArticles: [
    'image-dimensions-vs-file-size',
    'complete-passport-photo-guide',
    'complete-signature-upload-guide',
    'common-image-upload-problems',
  ],
  relatedTools: [
    'upsc-photo-resizer',
    'aadhaar-photo-resizer',
    'pan-card-photo-resizer',
    'passport-photo-maker',
    'signature-resize-20kb',
  ],

  readingTime: 8,
  publishedAt: '2026-06-01',
  updatedAt:   '2026-07-01',
  search: {
    primaryQuery: 'photo requirements for online applications india',
    relatedQueries: [
      'government portal photo requirements',
      'exam application photo size',
      'online application photo specifications',
      'india government photo guidelines',
      'photo size for upsc gpsc aadhaar',
    ],
    intent: 'informational',
    topicCluster: 'exam-photos',
  },
  status:   'published',
  priority: 'high',
}
