# ATableBooked — Marketingsite

Zelfstandige statische marketingsite voor [www.atablebooked.nl](https://www.atablebooked.nl).
Volledig los van de ATB-applicatie op app.atablebooked.nl.

## Structuur

```
atablebooked-marketing/
├── index.html          Homepage Nederlands
├── render.yaml         Render Static Site configuratie
├── _redirects          Redirect regels (apex naar www)
├── robots.txt          Zoekmachine instructies
├── sitemap.xml         Sitemap (wordt uitgebreid)
├── css/
│   ├── design-system.css   Variabelen, typografie, reset
│   ├── components.css      Herbruikbare componenten
│   └── homepage.css        Pagina-specifieke stijlen
├── js/
│   ├── main.js             Navigatie, scroll, animaties
│   └── pricing.js          Pricing toggle
└── img/                Afbeeldingen
```

## Lokaal bekijken

Open index.html direct in je browser.
Geen build stap nodig.

## Kleurpalet

```
Gold:  #C9A96E
Ink:   #1A1816
Beige: #EEE9E2
White: #FFFFFF
```

## Typografie

```
Display: Playfair Display (700)
Body:    Inter (400, 500, 600)
```

## Deployment

Render Static Site — gratis tier.
Custom domain: [www.atablebooked.nl](https://www.atablebooked.nl)
DNS: CNAME www → render-url
