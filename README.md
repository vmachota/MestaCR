# Mapa měst ČR (Leaflet)

Jednoduchá webová mapa měst České republiky. Data se načítají z GeoJSONu.

## Struktura

| Soubor          | Účel                                              |
|-----------------|---------------------------------------------------|
| `index.html`    | Stránka, načtení Leafletu a vlastních souborů     |
| `map.js`        | Inicializace mapy, načtení a vykreslení GeoJSONu  |
| `styl.css`      | Vzhled stránky a popupů                           |
| `body.geojson`  | Data měst (id, nazev, popisek)                    |
| `README.md`     | Tento návod                                       |

## Spuštění

Prohlížeče blokují `fetch()` při otevření přes `file://`, proto je potřeba
lokální webový server. V adresáři projektu spusťte:

```bash
python -m http.server 8000
```

a otevřete <http://localhost:8000>.
(Alternativně např. `npx serve` nebo rozšíření Live Server ve VS Code.)

## Přidání nového města

Do pole `features` v `body.geojson` přidejte další objekt:

```json
{
  "type": "Feature",
  "properties": {
    "id": 3,
    "nazev": "Brno",
    "popisek": "Druhé největší město ČR."
  },
  "geometry": {
    "type": "Point",
    "coordinates": [16.6068, 49.1951]
  }
}
```

**Pozor:** v GeoJSONu je pořadí souřadnic **[délka, šířka]** (lon, lat),
tedy opačně než v Leafletu (`[lat, lng]`).

## Atributy

- `id` – jedinečný identifikátor města
- `nazev` – název zobrazený v tooltipu a v popupu
- `popisek` – text zobrazený v popupu po kliknutí na bod

## Použité technologie

- [Leaflet 1.9.4](https://leafletjs.com/)
- Podkladová mapa © [OpenStreetMap](https://www.openstreetmap.org/copyright) přispěvatelé
