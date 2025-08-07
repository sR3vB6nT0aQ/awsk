<p align="center">
  <img src="https://qu.ax/CxVTw.jpg" width="600" alt="@awita/scraper">
</p>
<blockquote>
<p><strong>@awita/scraper</strong><br>
Toolkit NPM modular para descargas, scraping, generación de contenido, utilidades multimedia y mucho más.<br>
Soporta decenas de servicios: YouTube, Spotify, Facebook, Instagram, TikTok, Apple Music, SoundCloud, Threads, Pinterest, X/Twitter, Roblox, imágenes y más.<br>
Todas las respuestas en JSON homogéneo, fácil de consumir y manejar.</p>
</blockquote>
<hr>
<h2 id="-instalación">✨ Instalación</h2>
<pre><code>npm install @awita/scraper
</code></pre>
<hr>
<h2 id="-estructura-de-respuesta">📚 Estructura de respuesta</h2>
<pre><code>{
  "autor": "🜲 ᵖᵃᵗᵒ",
  "status": true,
  "data": { ... }
}
</code></pre>
<hr>
<h2 id="-tabla-de-contenidos">📖 Tabla de contenidos</h2>
<ol>
<li>🤖 Chat &amp; IA</li>
<li>🎨 Generación de imágenes</li>
<li>📥 Descargas<br>
3.1 Redes sociales<br>
3.2 Música / Vídeo</li>
<li>🔍 Búsquedas</li>
<li>⚙️ Utilidades</li>
<li>🐞 Módulos con error / en revisión</li>
</ol>
<hr>
<h1 id="1--chat--ia">1. 🤖 Chat &amp; IA</h1>

























<table><thead><tr><th>Módulo</th><th>Descripción breve</th></tr></thead><tbody><tr><td><code>awita</code></td><td>Chatbot principal estilo IA conversacional.</td></tr><tr><td><code>ayesoul</code></td><td>AI “Soul X3” para preguntas generales.</td></tr><tr><td><code>blackboxAIChat</code></td><td>Chat basado en Blackbox.</td></tr><tr><td><code>luminaiChat</code></td><td>AI con nombre de usuario opcional.</td></tr></tbody></table>
<h2 id="ejemplo-de-uso">Ejemplo de uso</h2>
<pre><code>import { awita, ayesoul, blackboxAIChat, luminaiChat } from '@awita/scraper';

await awita('¡Hola AwiTa!');
/* {
  "autor": "...",
  "status": true,
  "data": { "response": "¡Hola! ¿Qué onda? ..." }
} */

await ayesoul.request('¿Quién es tu creador?');
/* {
  "autor": "...",
  "status": true,
  "data": {
    "type": "chat",
    "message": "AyeSoul built me, Soul X3 AI...",
    ...
  }
} */

await blackboxAIChat('Holaa');
/* {
  "autor": "...",
  "status": true,
  "data": { "result": "¡Hola! ¿Cómo puedo ayudarte hoy?" }
} */

await luminaiChat('Cuéntame un chiste', 'UsuarioDePrueba');
/* {
  "autor": "...",
  "status": true,
  "data": { "result": "¡Claro! Aquí va uno: ..." }
} */
</code></pre>
<hr>
<h1 id="2--generación-de-imágenes">2. 🎨 Generación de imágenes</h1>













<table><thead><tr><th>Módulo</th><th>Descripción</th></tr></thead><tbody><tr><td><code>fluxGenerateAI</code></td><td>Genera arte digital/imágenes vía prompt.</td></tr></tbody></table>
<pre><code>import { fluxGenerateAI } from '@awita/scraper';

const res = await fluxGenerateAI('Un gato astronauta en el espacio, arte digital');
console.log(res);
/* {
  "autor": "...",
  "status": true,
  "data": {
    "imageUrl": "https://fast-flux-demo.replicate.workers.dev/api/generate-image?text=..."
  }
} */
</code></pre>
<hr>
<h1 id="3--descargas">3. 📥 Descargas</h1>
<h2 id="31-redes-sociales">3.1 Redes Sociales</h2>













































<table><thead><tr><th>Módulo</th><th>Plataforma</th><th>Observaciones</th></tr></thead><tbody><tr><td><code>douyinDl</code></td><td>Douyin/TikTok</td><td>Puede lanzar error.</td></tr><tr><td><code>fbdl2</code>, <code>fbdl2v2</code></td><td>Facebook</td><td>Dos métodos alternativos.</td></tr><tr><td><code>igram</code>, <code>instagram2</code>, <code>instagram3</code></td><td>Instagram</td><td>Tres fuentes alternas.</td></tr><tr><td><code>pindl</code>, <code>pindl2</code></td><td>Pinterest</td><td>Pin estático / alternativo.</td></tr><tr><td><code>threadsScraper</code>, <code>threadsImg</code></td><td>Threads (Meta)</td><td>Imagen / descarga directa.</td></tr><tr><td><code>tiktok</code></td><td>TikTok</td><td>Descarga sin marca de agua.</td></tr><tr><td><code>twitter</code>, <code>twitter2</code>, <code>twitter3</code></td><td>X/Twitter</td><td>Tres métodos, dos pueden fallar.</td></tr></tbody></table>
<h3 id="ejemplo-facebook">Ejemplo: Facebook</h3>
<pre><code>import { fbdl2, fbdl2v2 } from '@awita/scraper';

await fbdl2('https://www.facebook.com/watch/?v=10153231379946729');
/* {
  "autor": "...",
  "status": true,
  "data": {
    "image": [
      "https://scontent-hel3-1.xx.fbcdn.net/v/t15.5256-10/513848276_1223715089224349_2150254473737811455_n.jpg?..."
    ],
    "video": [
      "https://video-hel3-1.xx.fbcdn.net/o1/v/t2/f2/m69/AQPN-vUW3GTwzg_EqoB5s4k8JyXCgXNRDLO4sE0VKL55_WiDeLWKt5IkXeTJ7cVZgowkVUY4UfJR0zd8-lKgUmxh.mp4?..."
    ]
  }
} */

await fbdl2v2('https://www.facebook.com/watch/?v=10153231379946729');
/* {
  "autor": "...",
  "status": true,
  "data": {
    "metadata": { "title": "...", "image": "..." },
    "media": [
      "https://ssscdn.io/getmyfb/..."
    ]
  }
} */
</code></pre>
<h3 id="ejemplo-instagram">Ejemplo: Instagram</h3>
<pre><code>import { igram, instagram2, instagram3 } from '@awita/scraper';

await igram('https://www.instagram.com/reel/DLUlKBYBaJ_/?igsh=...');
/* {
  "author": "...",
  "status": true,
  "media": [
    "https://media.igram.world/get?__sig=...mp4"
  ]
} */

await instagram2('https://www.instagram.com/reel/DLUlKBYBaJ_/?igsh=...');
/* {
  "author": "...",
  "status": true,
  "data": {
    "media": [
      "https://cdn.downloadgram.org/?token=..."
    ]
  }
} */

await instagram3('https://www.instagram.com/reel/DLUlKBYBaJ_/?igsh=...');
/* {
  "author": "...",
  "status": true,
  "data": {
    "media": [
      { "type": "video", "url": "https://scontent-lhr8-2.cdninstagram.com/o1/v/t16/f2/..." }
    ]
  }
} */
</code></pre>
<h3 id="ejemplo-tiktok">Ejemplo: TikTok</h3>
<pre><code>import { tiktok } from '@awita/scraper';

await tiktok('https://www.tiktok.com/@scout2015/video/6718335390845095173');
/* {
  "autor": "...",
  "status": true,
  "data": [
    {
      "type": "watermark",
      "url": "https://v16m-default.tiktokcdn.com/a39837ee463d229196415c1a32812ac6/..."
    },
    {
      "type": "nowatermark",
      "url": "https://v16m-default.tiktokcdn.com/33e9a7aafb8b39d552a412e22a5bcdd8/..."
    }
  ]
} */
</code></pre>
<h3 id="ejemplo-twitterx">Ejemplo: Twitter/X</h3>
<pre><code>import { twitter, twitter2, twitter3 } from '@awita/scraper';

await twitter('https://x.com/IsManuPlay/status/1939040819043881118');
/* {
  "autor": "...",
  "status": true,
  "data": [
    {
      "type": "image",
      "thumb": "https://pbs.twimg.com/media/GujbWOZXwAAO3hV.jpg",
      "download": "https://dl.snapcdn.app/get?token=..."
    }
  ]
} */

// twitter2 y twitter3 pueden devolver status: false o data: []
</code></pre>
<h3 id="ejemplo-threads">Ejemplo: Threads</h3>
<pre><code>import { threadsScraper, threadsImg } from '@awita/scraper';

await threadsScraper('https://www.threads.com/@felipwhisky/post/DLbo1AytN28?...');
/* {
  "autor": "...",
  "status": true,
  "data": {
    "download_url": "https://instagram.fhan3-5.fna.fbcdn.net/v/t51.2885-15/511528790_17910835392118713_3119151686004081458_n.jpg?...",
    "type": "image"
  }
} */

await threadsImg('https://www.threads.com/@felipwhisky/post/DLbo1AytN28?...');
/* {
  "autor": "...",
  "status": true,
  "data": {
    "imagesUrl": "https://scontent-cdg4-1.cdninstagram.com/v/t51.75761-15/511528790_17910835392118713_3119151686004081458_n.jpg?..."
  }
} */
</code></pre>
<hr>
<h2 id="32-música--vídeo">3.2 Música / Vídeo</h2>



































<table><thead><tr><th>Módulo</th><th>Plataforma</th><th>Resultado</th></tr></thead><tbody><tr><td><code>spotidl</code></td><td>Spotify (mp3)</td><td>✅</td></tr><tr><td><code>spotiDownV3</code>, <code>descargarCancion</code>, <code>downloadFromSpotymate</code></td><td>Spotify</td><td>Alternativas, algunos fallan.</td></tr><tr><td><code>savetube</code>, <code>ytdown</code>, <code>ytmp3</code>, <code>getmp3</code>, <code>getmp4</code>, <code>ytdlmp3</code>, <code>ytdlmp4</code>, <code>audown</code>, <code>vidown</code>, <code>ssvid</code></td><td>YouTube</td><td>Varios formatos.</td></tr><tr><td><code>notubedl</code>, <code>notubesc</code></td><td>YouTube (NoTube)</td><td>Descarga / búsqueda.</td></tr><tr><td><code>appleMusicDownload</code></td><td>Apple Music (m4a)</td><td>✅</td></tr></tbody></table>
<h3 id="ejemplo-spotify">Ejemplo: Spotify</h3>
<pre><code>import { spotidl, descargarCancion } from '@awita/scraper';

await spotidl('https://open.spotify.com/track/3CLSHJv5aUROAN2vfOyCOh');
/* {
  "autor": "...",
  "status": true,
  "data": {
    "artist": "DVRST",
    "title": "Close Eyes",
    "duration": "2:12",
    "image": "...",
    "download": "https://spotiydownloader.com/api/files/DVRST - Close Eyes.mp3?token=..."
  }
} */

await descargarCancion('https://open.spotify.com/track/3CLSHJv5aUROAN2vfOyCOh');
/* {
  "autor": "...",
  "status": true,
  "data": { "file_url": "https://api.fabdl.com/spotify/download-mp3/..." }
} */
</code></pre>
<h3 id="ejemplo-youtube">Ejemplo: YouTube</h3>
<pre><code>import { savetube, ytdown, ytmp3, getmp3, getmp4, ytdlmp3, ytdlmp4, audown, vidown, ssvid } from '@awita/scraper';

await savetube.download('https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'mp3');
/* {
  "autor": "...",
  "status": true,
  "code": 200,
  "data": {
    "title": "...",
    "type": "audio",
    "format": "mp3",
    "thumbnail": "...",
    "download": "...",
    ...
  }
} */

await ytdown.download('https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'mp3');
/* {
  "autor": "...",
  "status": true,
  "data": {
    "title": "...",
    "type": "audio",
    "format": "mp3",
    "thumbnail": "...",
    "download": "...",
    ...
  }
} */
</code></pre>
<h3 id="ejemplo-apple-music">Ejemplo: Apple Music</h3>
<pre><code>import { appleMusicDownload } from '@awita/scraper';

await appleMusicDownload('https://music.apple.com/id/album/close-eyes/1573608254?i=1573608260');
/* {
  "autor": "...",
  "status": true,
  "data": {
    "info": {
      "name": "Close Eyes",
      "albumname": "Close Eyes - Single",
      "artist": "DVRST",
      "thumb": "...",
      "duration": "2m 12s",
      "url": "https://music.apple.com/id/album/close-eyes/1573608254?i=1573608260"
    },
    "download": {
      "dlink": "https://awd13.mymp3.xyz/phmp3?fname=Close Eyes- DVRST.m4a",
      "status": "success",
      "comments": "success"
    }
  }
} */
</code></pre>
<hr>
<h1 id="4--búsquedas">4. 🔍 Búsquedas</h1>









































<table><thead><tr><th>Módulo</th><th>Descripción</th></tr></thead><tbody><tr><td><code>getBestLyrics</code></td><td>Letra sincronizada (LRC).</td></tr><tr><td><code>spotifyxv</code>, <code>fspotifyxv</code></td><td>Búsqueda avanzada en Spotify.</td></tr><tr><td><code>soundcloudSearch</code>, <code>fsoundcloudSearch</code></td><td>Búsqueda en SoundCloud.</td></tr><tr><td><code>appleMusicSearch</code>, <code>fappleMusicSearch</code></td><td>Búsqueda en Apple Music.</td></tr><tr><td><code>ytSearch</code>, <code>fytSearch</code></td><td>Búsqueda rápida / extensa en YouTube.</td></tr><tr><td><code>notubesc</code></td><td>Búsqueda YouTube vía NoTube.</td></tr><tr><td><code>yahooimg</code>, <code>googleimg</code>, <code>bingimg</code></td><td>Imágenes Yahoo, Google, Bing.</td></tr><tr><td><code>rSearch</code></td><td>Búsqueda de usuario Roblox.</td></tr></tbody></table>
<h3 id="ejemplo-búsqueda-spotify">Ejemplo: Búsqueda Spotify</h3>
<pre><code>import { fspotifyxv } from '@awita/scraper';

await fspotifyxv('Never Gonna Give You Up');
/* {
  "autor": "...",
  "status": true,
  "data": [
    {
      "name": "Never Gonna Give You Up",
      "artista": ["Rick Astley"],
      "album": "Whenever You Need Somebody",
      "duracion": "3:33",
      "url": "https://open.spotify.com/track/4PTG3Z6ehGkBFwjybzWkR8",
      "imagen": "https://i.scdn.co/image/ab67616d0000b27315ebbedaacef61af244262a8"
    },
    {
      "name": "Never Gonna Give You Up/Maniac",
      "artista": ["Muziek Grand Band"],
      "album": "70'S &amp; 80'S Night",
      "duracion": "3:35",
      "url": "https://open.spotify.com/track/5PzZfbMGBATeyhDqBCzo2h",
      "imagen": "https://i.scdn.co/image/ab67616d0000b273baab4199d6f69afb588c5202"
    }
  ]
} */
</code></pre>
<h3 id="ejemplo-búsqueda-de-imágenes">Ejemplo: Búsqueda de imágenes</h3>
<pre><code>import { googleimg } from '@awita/scraper';

await googleimg('cat');
/* {
  "autor": "...",
  "status": true,
  "data": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/960px-Cat_November_2010-1a.jpg",
    "https://www.cats.org.uk/media/13139/220325case013.jpg"
  ]
} */
</code></pre>
<h3 id="ejemplo-soundcloud">Ejemplo: SoundCloud</h3>
<pre><code>import { soundcloudSearch } from '@awita/scraper';

await soundcloudSearch('Never Gonna Give You Up');
/* {
  "autor": "...",
  "status": true,
  "data": [
    {
      "id": 1242868615,
      "titulo": "Never Gonna Give You Up",
      "artista": "Rick Astley",
      "url": "https://soundcloud.com/rick-astley-official/never-gonna-give-you-up-4",
      "thumbnail": "https://i1.sndcdn.com/artworks-IWCdvUbRJLroVlJn-9qazlQ-t500x500.jpg",
      "duracion": "3:32"
    },
    {
      "id": 1219405522,
      "titulo": "Memories x Bad And Boujee x Never Gonna Give You Up (Tiktok Mashup) Tibodd Migos x David Guetta",
      "artista": "MIRAGLIOTTA",
      "url": "https://soundcloud.com/imshadix-fr/memories-x-bad-and-boujee-x-never-gonna-give-you-up-tiktok-mashup-tibodd-migos-x-david-guetta",
      "thumbnail": "https://i1.sndcdn.com/artworks-uq377pkExJbhyyN7-Tmi0mA-t500x500.png",
      "duracion": "2:40"
    }
  ]
} */
</code></pre>
<h3 id="ejemplo-roblox">Ejemplo: Roblox</h3>
<pre><code>import { rSearch } from '@awita/scraper';

await rSearch('David132UwU');
/* {
  "autor": "...",
  "status": true,
  "data": [
    {
      "id": 2625095575,
      "name": "David132UwU",
      "displayName": "Pato",
      "avatarUrl": "https://www.roblox.com/headshot-thumbnail/image?userId=2625095575&amp;width=420&amp;height=420&amp;format=png"
    }
  ]
} */
</code></pre>
<hr>
<h1 id="5-️-utilidades">5. ⚙️ Utilidades</h1>

















<table><thead><tr><th>Módulo</th><th>Función</th></tr></thead><tbody><tr><td><code>isTooLarge</code></td><td>Comprueba si una URL excede tamaño permitido.</td></tr><tr><td><code>checknsfw</code></td><td>Detección de términos/palabras NSFW.</td></tr></tbody></table>
<pre><code>import { isTooLarge, checknsfw } from '@awita/scraper';

await isTooLarge('https://travis40.oceansaver.in/pacific/?ocH4l9t3AWliASfZv70oRxZ');
// true o false

await checknsfw('desnudos');
/* {
  "autor": "...",
  "status": true,
  "data": {
    "isnsfw": true,
    "message": "❌ -  ¡Eso suena a una mala idea! No voy a buscarlo."
  }
} */
</code></pre>
<hr>
<h1 id="6--módulos-con-error--en-revisión">6. 🐞 Módulos con error / en revisión</h1>
<p>Estos módulos devolvieron error en las pruebas pero se mantienen documentados:</p>





























<table><thead><tr><th>Módulo</th><th>Error reportado</th></tr></thead><tbody><tr><td><code>spotiDownV3</code></td><td><code>status: false, data: {}</code></td></tr><tr><td><code>downloadFromSpotymate</code></td><td><code>status: false, data: {}</code></td></tr><tr><td><code>y2ma</code>, <code>y2mv</code>, <code>y2mu</code></td><td><strong>Error al obtener authString</strong> (cambio en y2mate)</td></tr><tr><td><code>twitter2</code>, <code>twitter3</code></td><td><code>status: false</code> o <code>data: []</code></td></tr><tr><td><code>douyinDl</code></td><td><code>"cheerio.load() expects a string"</code></td></tr></tbody></table>
<pre><code>import { spotiDownV3, downloadFromSpotymate, y2ma, y2mv, y2mu, twitter2, twitter3, douyinDl } from '@awita/scraper';

await spotiDownV3('https://open.spotify.com/track/3CLSHJv5aUROAN2vfOyCOh');
// { "autor": "...", "status": false, "data": {} }

await y2ma('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
// Error: Error al obtener authString: No se encontró código de autorización

await douyinDl('https://v.douyin.com/i6e6dypv/');
// { "autor": "...", "status": false, "data": { "error": "cheerio.load() expects a string" } }
</code></pre>
<hr>
<h2 id="️-badges-rápidos">🖼️ Badges rápidos</h2>
<p><img src="https://img.shields.io/npm/v/@awita/scraper" alt="npm"> <img src="https://img.shields.io/npm/l/@awita/scraper" alt="license"> <img src="https://img.shields.io/npm/dt/@awita/scraper" alt="downloads"></p>
<hr>
<h2 id="-contribuir">🤝 Contribuir</h2>
<ol>
<li><code>git clone https://github.com/tu-repo/awita-scraper.git</code></li>
<li><code>npm install</code></li>
<li>¡Pull requests bienvenidos! Documenta tu módulo en <code>README.md</code> y añade pruebas.</li>
</ol>
<hr>
<h2 id="-licencia">📄 Licencia</h2>
<p>MIT © 2025 🜲 ᵖᵃᵗᵒ<br>
Feel free to fork, mejorar y compartir. ¡Que disfrutes scrapeando!</p>