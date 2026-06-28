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

## Pagina's toevoegen

Voor elke nieuwe pagina:
1. Maak een map aan, bijv. /functies/
2. Maak daarin index.html
3. Verwijs naar CSS met ../css/design-system.css
4. Voeg toe aan sitemap.xml

## Git workflow

```bash
# Wijziging maken
# ...bestand bewerken...

git add -A
git commit -m "beschrijving van wijziging"
git push origin main
# Render deployt automatisch binnen 1-2 minuten
```

## Volgende stappen (na livegang)

- [ ] Echte foto toevoegen (img/founder.jpg)
- [ ] OG-afbeelding aanmaken (img/og-image.jpg)
- [ ] Favicon maken (img/favicon.svg + favicon.png)
- [ ] EN vertaling (/en/index.html)
- [ ] DE vertaling (/de/index.html)
- [ ] Subpagina's: /functies/ /prijzen/ /over/ /contact/
- [ ] Vergelijkingspagina's: /vergelijking/vs-formitable/
- [ ] Blog structuur: /blog/
- [ ] WhatsApp nummer invullen in index.html
- [ ] Telefoonnummer invullen in index.html
- [ ] Google Analytics of Plausible toevoegen

## Contact

hallo@atablebooked.nl
https://www.atablebooked.nl
