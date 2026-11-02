# Product Team — saját fali gitártartó

Ketten tanulunk meg AI segítségével gitártartót tervezni, rövid bemutatóvideót készíteni és weboldalt építeni. A projekt folyamatban van; a modellt és a videókat később is frissítjük.

## A weboldal

- **A termék:** az ötlet, a videók helye és a valóban forgatható STEP-modell.
- **A tervezés folyamata:** referenciák, nehézségek, nyomtathatóság és a weboldal készítésének története.
- Saját Product Team logó és a Gibson Les Paul Dark Cherry Sunburst ihlette színvilág.

## Helyi megnyitás

```sh
python3 -m http.server 8080
```

Ezután nyisd meg a `http://localhost:8080` címet. A weboldal statikus HTML, CSS és JavaScript, nem igényel fordítást vagy csomagtelepítést. A betűtípusok, a Three.js és az OCCT STEP-olvasó internetkapcsolatot igényelnek.

## Közzététel

GitHub Pages: **Settings → Pages → Deploy from a branch → main → / (root)**. A main ágra küldött későbbi módosítások ugyanazon az oldalcímen jelennek meg.

## A modell későbbi frissítése

Jelenleg a korábban bemutatott **v1 prototípus** töltődik be az `assets/gitartarto-v1.step` fájlból. A legújabb modellre csak külön jelzés után váltunk.

Az új modell STEP-fájlja az `assets` mappába kerül. Az új fájlnevet az `app.js` `loadDefaultModel` függvényében és az `index.html` letöltési linkjében állítjuk be. A forgatás, nagyítás és műhelyháttér tovább használható.

## A videók feltöltése

A Blanka otthonról videó az `index.html` `blanka-video` elemének `src` attribútumával köthető be. A lejátszás, megállítás, némítás és nagyítás vezérlői már elkészültek. A második videóhely a modellezés bemutatására vár.

## Források és állapot

A natív Fusion-források és a nyomtatási fájlok egyelőre a közös munkamappában vannak. A végleges modell, a felvételek és a részletes leadási napló később kerülhetnek ide. A prototípus teherbírását még nem igazoltuk.

A gitár képe és a színinspiráció a [Gibson termékoldaláról](https://www.gibson.com/en-eu/products/gibson-les-paul-standard-50s-plain-top-dark-cherry-sunburst-exclusive) származik. A termékfotó a Gibson tulajdona. A Product Team projekt nem hivatalos Gibson-oldal. A kódhoz még nem választottunk külön nyílt forráskódú licencet.
