// ---------- Nastavení ----------
const CESTA_K_DATUM = "body.geojson";
const STRED_CR = [49.8, 15.5];
const ZOOM_CR = 7;

// ---------- Mapa a podkladová vrstva ----------
const mapa = L.map("mapa").setView(STRED_CR, ZOOM_CR);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapa);

// ---------- Pomocné funkce ----------
// Ochrana proti vložení HTML z dat do popupu
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text ?? "";
  return div.innerHTML;
}

function vytvorPopup(vlastnosti) {
  return `
    <div class="popup">
      <h2>${escapeHtml(vlastnosti.nazev)}</h2>
      <p>${escapeHtml(vlastnosti.popisek)}</p>
      <small>ID: ${escapeHtml(String(vlastnosti.id))}</small>
    </div>`;
}

function zobrazChybu(zprava) {
  const prvek = document.createElement("div");
  prvek.className = "chyba";
  prvek.textContent = zprava;
  document.body.appendChild(prvek);
}

// ---------- Načtení GeoJSONu ----------
fetch(CESTA_K_DATUM)
  .then((odpoved) => {
    if (!odpoved.ok) throw new Error(`HTTP ${odpoved.status}`);
    return odpoved.json();
  })
  .then((data) => {
    const vrstva = L.geoJSON(data, {
      onEachFeature: (feature, layer) => {
        layer.bindPopup(vytvorPopup(feature.properties));
        layer.bindTooltip(feature.properties.nazev);
      }
    }).addTo(mapa);

    document.getElementById("pocet-bodu").textContent =
      `Počet měst: ${data.features.length}`;

    // Přiblížení na všechny body (pro jeden bod ponechá rozumný zoom)
    mapa.fitBounds(vrstva.getBounds(), { padding: [50, 50], maxZoom: 9 });
  })
  .catch((chyba) => {
    console.error(chyba);
    zobrazChybu(
      "Nepodařilo se načíst body.geojson. Spusťte stránku přes webový server (viz README.md)."
    );
  });
