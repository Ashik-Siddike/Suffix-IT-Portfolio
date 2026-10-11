// Match published content to illustrations from that original page, rather than generic filler.
export const solutionVisuals = {
  'payroll-system': [
    { match: /integrates/i, image: '/assets/Sponsor-bro.fe1a6b99.svg' },
    { match: /benefits/i, image: '/assets/Audit-rafiki.58a65c7d.svg' },
    { match: /features of HR/i, image: '/assets/Credit card-rafiki.05a08610.svg' },
    { match: /time|how it|^features$/i, image: '/assets/Time management-rafiki.9ce8fbde.svg' },
  ],
  'e-commerce': [
    { match: /integrated reservation/i, image: '/assets/Online shopping-amico.5b7c34c3.svg' },
    { match: /multiple payment/i, image: '/assets/Payment Information-rafiki.e3d961a1.svg' },
    { match: /more information/i, image: '/assets/moreInfo.b711057f.svg' },
  ],
  'rupantor-erp': [
    { match: /^general ledger$/i, image: '/assets/At the office-amico.f2e1aef8.svg' },
    { match: /^HR.*payroll/i, image: '/assets/Sponsor-bro.fe1a6b99.svg' },
    { match: /^inventory management$/i, image: '/assets/Server-amico.e143ea58.svg' },
    { match: /^sales.*invoicing$/i, image: '/assets/Processing-pana.2acb57df.svg' },
    { match: /^procurement$/i, image: '/assets/In no time-amico.e4fc34e1.svg' },
  ],
};
