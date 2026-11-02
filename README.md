# Product Team — saját fali gitártartó

Ketten tanulunk meg AI segítségével gitártartót tervezni, rövid bemutatóvideót készíteni és weboldalt építeni. A projekt folyamatban van; a modellt és a videókat később is frissítjük.

## A weboldal

- **A termék:** az ötlet, a videók helye és a valóban forgatható STEP-modell.
- **A tervezés folyamata:** referenciák, nehézségek, nyomtathatóság és a weboldal készítésének története.
- **Mellékletek:** darabjegyzék, robbantott ábra és a 8 nyomtatandó alkatrész STEP-fájljai.
- Saját Product Team logó és a Gibson Les Paul Dark Cherry Sunburst ihlette színvilág.

## Helyi megnyitás

```sh
python3 -m http.server 8080
```

Ezután nyisd meg a `http://localhost:8080` címet. A weboldal statikus HTML, CSS és JavaScript, nem igényel fordítást vagy csomagtelepítést. A betűtípusok, a Three.js és az OCCT STEP-olvasó internetkapcsolatot igényelnek.

## Közzététel

GitHub Pages: **Settings → Pages → Deploy from a branch → main → / (root)**. A main ágra küldött későbbi módosítások ugyanazon az oldalcímen jelennek meg.

## A modell későbbi frissítése

A forgatható megjelenítőben a **végleges CAD-modell** töltődik be az `assets/gitartarto-vegleges.step` fájlból. A Mellékletek fülön külön is letölthető mind a 8 nyomtatandó alkatrész.

Az új modell STEP-fájlja az `assets` mappába kerül. Az új fájlnevet az `app.js` `loadDefaultModel` függvényében és az `index.html` letöltési linkjében állítjuk be. A forgatás, nagyítás és műhelyháttér tovább használható.

## A videók feltöltése

A Blanka otthonról videó az `index.html` `blanka-video` elemének `src` attribútumával köthető be. A lejátszás, megállítás, némítás és nagyítás vezérlői már elkészültek. A második videóhely a modellezés bemutatására vár.

## Források és állapot

A végleges STEP-modell, a nyomtatandó alkatrészek, a darabjegyzék és a robbantott ábra az `assets` mappában találhatók. A natív Fusion-források a közös munkamappában vannak. A felvételek később kerülnek ide. A prototípus működését és teherbírását még fizikai próbával ellenőrizzük.

A gitár képe és a színinspiráció a [Gibson termékoldaláról](https://www.gibson.com/en-eu/products/gibson-les-paul-standard-50s-plain-top-dark-cherry-sunburst-exclusive) származik. A termékfotó a Gibson tulajdona. A Product Team projekt nem hivatalos Gibson-oldal. A kódhoz még nem választottunk külön nyílt forráskódú licencet.
