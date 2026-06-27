/* ===========================
   CHANGE MAKERS — Generative Collage v2

   Changes from v1:
   - Uses local images from assets/images/Collage Photos/
   - background-size: contain so full image is visible
   - White 10px gaps between tiles; white container background
   - Title cell is REAL TEXT (Fredoka One), not an image
   - Text + background color changes with the chosen theme
   - Color swatch bar inserted between a random pair of rows
   - Swatch segments are wide rectangular blocks with white gaps
   - Collage height is ~55vh, not full viewport
   =========================== */

const BASE = 'assets/images/Collage Photos/';

/* ─── IMAGE POOL ────────────────────────────────────────────────
   Each image has:
     f  : filename
     sw : array of dominant hex colors (used for swatch bar)
   Images are organized by dominant color family.
──────────────────────────────────────────────────────────────── */
const POOL = {

  green: [
    { f:'paulius-dragunas-cIxcxnwsnoI-unsplash.jpg', sw:['#1B5E20','#388E3C','#66BB6A','#C8E6C9'] },
    { f:'jeremy-cai-ucYWe5mzTMU-unsplash.jpg',       sw:['#2E7D32','#43A047','#A5D6A7','#B0C8E8'] },
    { f:'samuel-field-OyamzdtPqfw-unsplash.jpg',     sw:['#558B2F','#8BC34A','#AED581','#87CEEB'] },
    { f:'kazuend-19SC2oaVZW0-unsplash.jpg',          sw:['#1B5E20','#2E7D32','#4CAF50','#C8E6C9'] },
    { f:'dan-meyers-0AgtPoAARtE-unsplash.jpg',       sw:['#33691E','#558B2F','#8BC34A','#B0C4DE'] },
    { f:'kristaps-ungurs-owcJsiIK7UU-unsplash.jpg',  sw:['#1A3C1A','#4A7C3F','#A5C78A','#F57F17'] },
    { f:'ivars-utinans-vkQgb1lZZPQ-unsplash.jpg',   sw:['#2E7D32','#388E3C','#66BB6A','#1565C0'] },
    { f:'qingbao-meng-01_igFr7hd4-unsplash.jpg',    sw:['#2E7D32','#4CAF50','#81C784','#C5E1A5'] },
    { f:'lingchor-lDy1K7RkLeA-unsplash.jpg',        sw:['#1B5E20','#2E7D32','#4CAF50','#A5D6A7'] },
    { f:'dan-meyers-IQVFVH0ajag-unsplash.jpg',      sw:['#33691E','#558B2F','#7CB342','#87CEEB'] },
    { f:'bailey-zindel-NRQV-hBF10M-unsplash.jpg',  sw:['#004D40','#00695C','#26A69A','#E64A19'] },
    { f:'nagy-arnold-X_IvVDuHvDQ-unsplash.jpg',     sw:['#2E7D32','#43A047','#81C784','#A5D6A7'] },
    { f:'untung-bekti-nugroho-6Aa4EeZTdqw-unsplash.jpg', sw:['#1B5E20','#388E3C','#4CAF50','#C8E6C9'] },
    { f:'jordan-opel-3VLHF9b9Plg-unsplash.jpg',    sw:['#33691E','#558B2F','#8BC34A','#AED581'] },
    { f:'filip-zrnzevic-QsWG0kjPQRY-unsplash.jpg', sw:['#2E7D32','#43A047','#4FC3F7','#0288D1'] },
    { f:'nrd-D6Tu_L3chLE-unsplash.jpg',             sw:['#388E3C','#D32F2F','#F9A825','#0288D1'] },
  ],

  blue: [
    { f:'naja-bertolt-jensen-PsWUz7l8zaw-unsplash.jpg', sw:['#006994','#0288D1','#4FC3F7','#B2EBF2'] },
    { f:'tim-mossholder-qq-8dpdlBsY-unsplash.jpg',      sw:['#455A64','#607D8B','#90A4AE','#B0BEC5'] },
    { f:'naja-bertolt-jensen-BJUoZu0mpt0-unsplash.jpg', sw:['#006064','#00838F','#4DD0E1','#B2EBF2'] },
    { f:'naja-bertolt-jensen-FxnqdmKBJps-unsplash.jpg', sw:['#006994','#01579B','#29B6F6','#B3E5FC'] },
    { f:'jonny-gios-OtDVgzo5yCM-unsplash.jpg',         sw:['#0D47A1','#1565C0','#64B5F6','#BBDEFB'] },
    { f:'tim-mossholder-xDwEa2kaeJA-unsplash.jpg',     sw:['#37474F','#546E7A','#78909C','#B0BEC5'] },
    { f:'knut-robinson-PXJ3Q00CCeE-unsplash.jpg',      sw:['#0D47A1','#1565C0','#1976D2','#64B5F6'] },
    { f:'christian-mackie-PBvFpF3f624-unsplash.jpg',   sw:['#0D47A1','#0288D1','#4FC3F7','#B2EBF2'] },
    { f:'igor-sporynin-A8zNmdqiL84-unsplash.jpg',      sw:['#1565C0','#0D47A1','#455A64','#78909C'] },
  ],

  orange: [
    { f:'chris-leboutillier-c7RWVGL8lPA-unsplash.jpg', sw:['#BF360C','#E64A19','#FF7043','#FFAB91'] },
    { f:'ella-ivanescu-JbfhNrpQ_dw-unsplash.jpg',      sw:['#E64A19','#F57C00','#FF9800','#546E7A'] },
    { f:'devin-avery-bx1G9db3FjA-unsplash.jpg',       sw:['#BF360C','#E64A19','#607D8B','#90A4AE'] },
    { f:'rodrigo-curi-XTBiFO8v1uk-unsplash.jpg',      sw:['#D84315','#E64A19','#558B2F','#87CEEB'] },
    { f:'mark-basarab-z8ct_Q3oCqM-unsplash.jpg',      sw:['#BF360C','#E65100','#FF8A65','#FFCCBC'] },
    { f:'felix-DRqAph42Uyo-unsplash.jpg',              sw:['#E65100','#BF360C','#FF7043','#FFAB91'] },
  ],

  earth: [
    { f:'wolfgang-hasselmann-Fd01B6nNPbo-unsplash.jpg', sw:['#C49A6C','#D2B48C','#DEB887','#E8D8C0'] },
    { f:'gabriel-jimenez-jin4W1HqgL4-unsplash.jpg',     sw:['#5D4037','#795548','#A1887F','#D7CCC8'] },
    { f:'john-fowler-03Pv2Ikm5Hk-unsplash.jpg',        sw:['#3E2723','#6D4C41','#5C6BC0','#9575CD'] },
    { f:'sultan-3DCGME9sGzE-unsplash.jpg',             sw:['#B71C1C','#C62828','#A1887F','#D7CCC8'] },
    { f:'mahdi-samadzad-FKHABEaOb-g-unsplash.jpg',     sw:['#8D6E63','#6D9EBA','#87CEEB','#F5DEB3'] },
    { f:'wolfgang-hasselmann-pVr6wvUneMk-unsplash.jpg',sw:['#C49A6C','#D2B48C','#DEB887','#B0B8B0'] },
    { f:'ilse-orsel-S8gB0s1u3SI-unsplash.jpg',        sw:['#9E9E9E','#BDBDBD','#E0E0E0','#607D8B'] },
    { f:'jo-round-JqVBxyvlDTs-unsplash.jpg',          sw:['#5D4037','#795548','#558B2F','#4CAF50'] },
    { f:'levi-meir-clancy-LheHIV3XpGM-unsplash.jpg',  sw:['#37474F','#546E7A','#78909C','#90A4AE'] },
    { f:'ted-balmer-2h3eyFnXq34-unsplash.jpg',        sw:['#6D4C41','#795548','#A1887F','#D7CCC8'] },
    { f:'gaetan-meyer--3Z-DiGK0hA-unsplash.jpg',      sw:['#795548','#A1887F','#BCAAA4','#D7CCC8'] },
    { f:'andrej-a-ot8jp_q98aU-unsplash.jpg',          sw:['#5D4037','#8D6E63','#BCAAA4','#EFEBE9'] },
    { f:'antoine-giret-7_TSzqJms4w-unsplash.jpg',     sw:['#607D8B','#90A4AE','#0288D1','#B2EBF2'] },
  ],

  dark: [
    { f:'marcus-dall-col-G11lsZns8IE-unsplash.jpg', sw:['#212121','#424242','#757575','#BDBDBD'] },
    { f:'nasa-Q1p7bh3SHj8-unsplash.jpg',             sw:['#0D1B2A','#0D47A1','#1565C0','#F9A825'] },
    { f:'neven-krcmarek-9dTg44Qhx1Q-unsplash.jpg',  sw:['#212121','#37474F','#546E7A','#ECEFF1'] },
    { f:'nasa-vhSz50AaFAs-unsplash.jpg',             sw:['#0D1B2A','#01579B','#1565C0','#E0F7FA'] },
    { f:'nasa-Yj1M5riCKk4-unsplash.jpg',             sw:['#0D1B2A','#0D47A1','#01579B','#FFC107'] },
    { f:'andreas-rasmussen-610dzNAqngs-unsplash.jpg',sw:['#263238','#37474F','#546E7A','#78909C'] },
    { f:'henning-witzel-ukvgqriuOgo-unsplash.jpg',  sw:['#0D1B2A','#1A237E','#F9A825','#FFC107'] },
  ],

  gold: [
    { f:'ben-o-bro-wpU4veNGnHg-unsplash.jpg',              sw:['#5D4037','#F57F17','#F9A825','#9E9E9E'] },
    { f:'ishan-seefromthesky-66Tu10CxYY0-unsplash.jpg',    sw:['#C4973A','#DBA853','#87CEEB','#E8D8B0'] },
    { f:'haidan-IAwnp88Fz8Y-unsplash.jpg',                 sw:['#1A1A1A','#C4973A','#D4AF37','#FFFFFF'] },
    { f:'mark-konig-Cn50Y3AxRvM-unsplash.jpg',            sw:['#C4973A','#8D6E63','#5B8DB8','#B0C4D8'] },
    { f:'boudhayan-bardhan-60tataLkJ0U-unsplash.jpg',      sw:['#F57F17','#F9A825','#FFC107','#FFD54F'] },
    { f:'ajin-k-s-Wpa-21T9fk8-unsplash.jpg',              sw:['#E65100','#F57F17','#FF9800','#FFB74D'] },
    { f:'casprine-assempah-VL5UyD5kYvI-unsplash.jpg',     sw:['#F57F17','#E65100','#FF8A65','#FFCCBC'] },
    { f:'ganapathy-kumar-L75D18aVal8-unsplash.jpg',       sw:['#F57F17','#F9A825','#FF9800','#FFCC80'] },
    { f:'mohammed-zayan-khan-U-Ary2Zw1RE-unsplash.jpg',   sw:['#E65100','#F57F17','#FFB74D','#FFE0B2'] },
    { f:'ashique-anan-abir-pMf7c5w7Dmc-unsplash.jpg',     sw:['#F57F17','#E65100','#FFB74D','#FFCC80'] },
    { f:'mahmoud-sulaiman-aO9nGw9Cbk0-unsplash.jpg',      sw:['#C4973A','#D4AF37','#5B8DB8','#E8D8B0'] },
    { f:'musa-ortac-89i18qfUuzA-unsplash.jpg',            sw:['#D4973A','#E8A83A','#87CEEB','#EDD8B0'] },
    { f:'izuddin-helmi-adnan-JFirQekVo3U-unsplash.jpg',   sw:['#F9A825','#FFC107','#558B2F','#4CAF50'] },
    { f:'hassan-kibwana-M8uKuPGETMg-unsplash.jpg',        sw:['#E65100','#F57F17','#FF9800','#FFCC80'] },
    { f:'ehmitrich-WcG7DOyrSoM-unsplash.jpg',             sw:['#F9A825','#FFC107','#F57F17','#FFCC80'] },
    { f:'ema-studios-aMIWXEiQ8yo-unsplash.jpg',           sw:['#E65100','#F57F17','#FF8A65','#FFAB91'] },
  ],
};

/* ─── THEME PAIRS ───────────────────────────────────────────────
   Each theme picks two color families to blend.
   titleBg: background of the title cell
   titleColor: color of "CHANGE MAKERS" text
   subColor: color of "Seeds of Tomorrow" subtitle
──────────────────────────────────────────────────────────────── */
/* ─── CATEGORY REPRESENTATIVE COLORS ────────────────────────────
   One vivid color per category. Used to derive the title cell
   background (darker) and text (lighter) each render.
──────────────────────────────────────────────────────────────── */
const CAT_COLOR = {
  green:  '#3DCC52',
  blue:   '#1EADE0',
  orange: '#F4511E',
  earth:  '#C4A07A',
  dark:   '#546E7A',
  gold:   '#F9A825',
};

/* Relative luminance (0 = black, 1 = white) */
function luminance(hex) {
  const toLinear = c => { const s = c/255; return s<=0.03928?s/12.92:Math.pow((s+0.055)/1.055,2.4); };
  const [r,g,b] = [1,3,5].map(i => toLinear(parseInt(hex.slice(i,i+2),16)));
  return 0.2126*r + 0.7152*g + 0.0722*b;
}

/* hex → [H°, S%, L%] */
function hexToHsl(hex) {
  let r=parseInt(hex.slice(1,3),16)/255,
      g=parseInt(hex.slice(3,5),16)/255,
      b=parseInt(hex.slice(5,7),16)/255;
  const max=Math.max(r,g,b), min=Math.min(r,g,b);
  let h,s, l=(max+min)/2;
  if(max===min){h=s=0}else{
    const d=max-min;
    s=l>0.5?d/(2-max-min):d/(max+min);
    if(max===r)h=((g-b)/d+(g<b?6:0))/6;
    else if(max===g)h=((b-r)/d+2)/6;
    else h=((r-g)/d+4)/6;
  }
  return [h*360, s*100, l*100];
}

/* [H°, S%, L%] → hex */
function hslToHex(h,s,l) {
  h/=360; s/=100; l/=100;
  const hue2rgb=(p,q,t)=>{
    if(t<0)t+=1; if(t>1)t-=1;
    if(t<1/6)return p+(q-p)*6*t;
    if(t<1/2)return q;
    if(t<2/3)return p+(q-p)*(2/3-t)*6;
    return p;
  };
  let r,g,b;
  if(s===0){r=g=b=l}else{
    const q=l<0.5?l*(1+s):l+s-l*s, p=2*l-q;
    r=hue2rgb(p,q,h+1/3); g=hue2rgb(p,q,h); b=hue2rgb(p,q,h-1/3);
  }
  return '#'+[r,g,b].map(x=>Math.round(x*255).toString(16).padStart(2,'0')).join('');
}

const THEME_PAIRS = [
  { cats:['green','blue'],   titleBg:'#E8F5E9', titleColor:'#1B5E20', subColor:'#2E7D32' },
  { cats:['green','earth'],  titleBg:'#F1F8E9', titleColor:'#33691E', subColor:'#558B2F' },
  { cats:['blue','dark'],    titleBg:'#E3F2FD', titleColor:'#0D47A1', subColor:'#1565C0' },
  { cats:['blue','orange'],  titleBg:'#E1F5FE', titleColor:'#01579B', subColor:'#0288D1' },
  { cats:['orange','earth'], titleBg:'#FBE9E7', titleColor:'#BF360C', subColor:'#D84315' },
  { cats:['dark','gold'],    titleBg:'#FFF8E1', titleColor:'#E65100', subColor:'#F57F17' },
  { cats:['green','gold'],   titleBg:'#F9FBE7', titleColor:'#33691E', subColor:'#558B2F' },
  { cats:['earth','gold'],   titleBg:'#FFF3E0', titleColor:'#BF360C', subColor:'#E65100' },
  { cats:['blue','green'],   titleBg:'#E0F7FA', titleColor:'#006064', subColor:'#0097A7' },
  { cats:['dark','blue'],    titleBg:'#E8EAF6', titleColor:'#1A237E', subColor:'#283593' },
  { cats:['orange','dark'],  titleBg:'#FBE9E7', titleColor:'#BF360C', subColor:'#E64A19' },
  { cats:['gold','green'],   titleBg:'#FFFDE7', titleColor:'#E65100', subColor:'#F57F17' },
];

/* ─── GRID LAYOUTS ──────────────────────────────────────────────
   Each entry is an array of rows; each row is an array of
   relative column widths (fr units).
   Columns per row: 2–6. Rows per layout: 2–3.
──────────────────────────────────────────────────────────────── */
const GRID_LAYOUTS = [
  /* ── 2 rows ── */
  [ [1,1,1],       [1,2,1,1]       ],
  [ [2,1,1],       [1,1,2]         ],
  [ [1,1,1,1],     [2,1,1]         ],
  [ [1,2,1],       [1,1,1,1]       ],
  [ [3,1,2],       [1,1,1]         ],
  [ [1,1],         [2,1,2]         ],
  [ [1,1,2,1],     [1,1,1]         ],
  [ [1,1,1,1,1],   [1,2,1,1]       ],
  [ [1,2,1,1,1],   [1,1,1,1,1]     ],
  [ [1,1,1,1,1,1], [1,1,1,1]       ],
  [ [1,1,1],       [1,1,1,1,1,1]   ],
  [ [2,1,1,1,1],   [1,1,1,1,1]     ],
  [ [1,1,1,1,1],   [2,1,1,1,1,1]   ],
  [ [1,2,2,1],     [1,1,1,1,1]     ],

  /* ── 2 rows with single-image rows ── */
  [ [1],           [1,1,1,1]       ],  // 1 + 4
  [ [1,1,1,1],     [1]             ],  // 4 + 1
  [ [1],           [1,2,1,1,1]     ],  // 1 + 5
  [ [1,1,1,1,1],   [1]             ],  // 5 + 1
  [ [2],           [1,1,1]         ],  // 1 wide + 3
  [ [1,1,1],       [2]             ],  // 3 + 1 wide

  /* ── 3 rows ── */
  [ [1,1,1],       [1,1,1],        [2,1,1,1]       ],
  [ [1,2],         [1,1,1,1],      [1,2]            ],
  [ [1,1,1],       [1,1,1,1,1],    [1,1,1,1]        ],
  [ [1,1,1,1],     [1,1,1],        [1,1,1,1,1]      ],
  [ [1,2,1,1,1],   [1,1,1],        [1,1,1,1]        ],
  [ [1,1,1,1,1,1], [1,1,1],        [1,1,1,1,1]      ],
  [ [1,1],         [1,1,1,1,1],    [1,1,1]          ],
  [ [1,1,1,1],     [1,1,1,1,1,1],  [1,1,1]          ],
  [ [2,1,1],       [1,1,1,1,1],    [1,2,1,1]        ],
  [ [1,1,1,1,1],   [1,2,1],        [1,1,1,1,1,1]    ],
  [ [1,1,1,1,1,1], [1,1,1,1,1,1],  [1,1,1,1]        ],

  /* ── 3 rows with single-image rows ── */
  [ [1],           [1,1,1,1],      [1,1,1]          ],  // 1+4+3
  [ [1,1,1],       [1],            [1,1,1,1,1]      ],  // 3+1+5
  [ [1,1,1,1],     [1,1,1],        [1]              ],  // 4+3+1
  [ [1],           [1,1,1,1,1,1],  [1,1,1]          ],  // 1+6+3
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ─── MAIN BUILD ─────────────────────────────────────────────── */
/* Viewport-appropriate layouts — fewer tiles on smaller screens */
function pickLayout() {
  const w = window.innerWidth;
  if (w <= 480) {
    // Mobile: max 2 rows, max 3 cols each
    return [
      [[1,1],   [1,2]  ],
      [[2,1],   [1,1]  ],
      [[1,1,1], [1,2]  ],
      [[1,2],   [1,1,1]],
    ][Math.floor(Math.random() * 4)];
  }
  if (w <= 900) {
    // Tablet: max 3 rows, max 4 cols each
    const tablet = GRID_LAYOUTS.filter(l =>
      l.length <= 3 && l.every(r => r.length <= 4)
    );
    return tablet[Math.floor(Math.random() * tablet.length)];
  }
  return GRID_LAYOUTS[Math.floor(Math.random() * GRID_LAYOUTS.length)];
}

function buildCollage() {
  const theme  = THEME_PAIRS[Math.floor(Math.random() * THEME_PAIRS.length)];
  const layout = pickLayout();

  // Pull images from both categories and shuffle
  const cat1 = POOL[theme.cats[0]] || [];
  const cat2 = POOL[theme.cats[1]] || [];
  const pool  = shuffle([...cat1, ...cat2]);

  // Decide where to put the title cell (random row, random col in that row)
  const titleRowIdx = Math.floor(Math.random() * layout.length);
  const titleColIdx = Math.floor(Math.random() * layout[titleRowIdx].length);

  // Decide where to insert the swatch bar (between which rows)
  // Must have at least one row above and one below
  const swatchAfterRow = layout.length > 1
    ? Math.floor(Math.random() * (layout.length - 1))
    : null; // null means no swatch (shouldn't happen with ≥2 rows)

  let imgIdx = 0;

  const rows = layout.map((cols, r) => ({
    cols,
    cells: cols.map((fr, c) => {
      if (r === titleRowIdx && c === titleColIdx) {
        return { type: 'title', fr };
      }
      const img = pool[imgIdx++ % pool.length];
      return { type: 'image', fr, ...img };
    }),
  }));

  // Build swatch colors — 8 equal-width blocks
  const usedImages = rows.flatMap(r => r.cells.filter(c => c.type === 'image'));
  const allRawColors = usedImages.flatMap(img => img.sw || []);
  const uniqueColors = [...new Set(allRawColors)];
  const swatches = shuffle(uniqueColors).slice(0, 8).map(color => ({ color }));

  // Title cell: pick ONE swatch color, derive dark bg + light text from its hue.
  // This gives a monochromatic block that always matches the collage palette.
  const base = swatches[Math.floor(swatches.length / 2)]?.color || '#1EADE0';
  const [bh, bs] = hexToHsl(base);
  const sat    = Math.max(bs, 35);              // keep enough saturation
  const titleBg    = hslToHex(bh, sat, 22);    // dark: same hue, 22% lightness
  const titleColor = hslToHex(bh, sat * 0.5, 84); // light: same hue, 84% lightness
  const subColor   = titleColor;

  return { rows, theme, swatchAfterRow, swatches, titleBg, titleColor, subColor };
}

/* ─── RENDER ─────────────────────────────────────────────────── */
function renderCollage() {
  const wrap     = document.getElementById('collage-wrap');
  const swatchEl = document.getElementById('swatch-bar');
  if (!wrap) return;

  const { rows, swatchAfterRow, swatches, titleBg, titleColor, subColor } = buildCollage();

  let html = '';

  rows.forEach(({ cols, cells }, r) => {
    const template = cells.map(c => `${c.fr}fr`).join(' ');
    html += `<div class="collage-row" style="grid-template-columns:${template}">`;

    cells.forEach(cell => {
      if (cell.type === 'title') {
        html += buildTitleCell(cell, { titleBg, titleColor, subColor });
      } else {
        const g1 = cell.sw?.[1] || '#888';
        const g2 = cell.sw?.[3] || '#aaa';
        /* Use background-image longhand (NOT shorthand) so the CSS class
           background-size:contain / background-position / background-color
           are NOT reset by the inline style. */
        html += `
          <div class="collage-cell img-cell"
               style="background-image:linear-gradient(135deg,${g1},${g2})"
               data-url="${BASE}${cell.f}"
               data-sw='${JSON.stringify(cell.sw || [])}'>
          </div>`;
      }
    });

    html += '</div>';

    // Insert swatch bar BETWEEN rows (not at the very bottom)
    if (r === swatchAfterRow) {
      html += buildSwatchBar(swatches);
    }
  });

  wrap.innerHTML = html;

  // Move swatch-bar element out of view — we've inlined it
  if (swatchEl) swatchEl.style.display = 'none';

  // Load images progressively; dismiss loader when all finish
  const imgCells = [...wrap.querySelectorAll('.img-cell[data-url]')];
  let loadedCount = 0;
  const total = imgCells.length;

  function onImageSettled() {
    loadedCount++;
    if (loadedCount >= total) dismissLoader();
  }

  imgCells.forEach(cell => {
    const url = cell.dataset.url;
    const img = new Image();
    img.onload  = () => { cell.style.backgroundImage = `url('${url}')`; onImageSettled(); };
    img.onerror = () => { onImageSettled(); };
    img.src = url;
  });

  // Safety: always dismiss within 4 s regardless of network
  setTimeout(dismissLoader, 4000);

  // Scale title text to its cell size
  observeTitleCell(theme);
}

/* ─── TITLE CELL HTML ────────────────────────────────────────── */
function buildTitleCell(cell, { titleBg, titleColor, subColor }) {
  return `
    <div class="collage-cell title-cell" data-title
         style="background:${titleBg}">
      <div class="title-inner" data-title-inner>
        <div class="title-main" data-title-main
             style="color:${titleColor}">CHANGE MAKERS</div>
        <div class="title-sub" data-title-sub
             style="color:${subColor}">Seeds of Tomorrow</div>
      </div>
    </div>`;
}

/* ─── SWATCH BAR HTML ────────────────────────────────────────── */
function buildSwatchBar(swatches) {
  /* ~8 equal-width solid rectangular blocks, 2px white gap between them */
  const segs = swatches
    .map(s => `<div class="swatch-seg" style="background:${s.color}"></div>`)
    .join('');
  return `<div class="collage-swatch-inline">${segs}</div>`;
}

/* ─── TITLE TEXT SCALING ─────────────────────────────────────── */
/* Sizes text proportionally to the cell. Text wraps via CSS
   (word-break:break-word) so no overflow shrink loop is needed. */
function observeTitleCell() {
  const cell = document.querySelector('[data-title]');
  if (!cell) return;

  const obs = new ResizeObserver(([entry]) => {
    const { width: w, height: h } = entry.contentRect;
    const smaller = Math.min(w, h);
    const main = cell.querySelector('[data-title-main]');
    const sub  = cell.querySelector('[data-title-sub]');
    if (main) main.style.fontSize = `${Math.max(smaller * 0.14, 10)}px`;
    if (sub)  sub.style.fontSize  = `${Math.max(smaller * 0.065, 7)}px`;
  });
  obs.observe(cell);
}

/* ─── LOADER ─────────────────────────────────────────────────── */
const _loaderStart = Date.now();
function dismissLoader() {
  const el = document.getElementById('cm-loader');
  if (!el || el.dataset.dismissed) return;
  const elapsed = Date.now() - _loaderStart;
  const delay = Math.max(0, 2000 - elapsed);
  setTimeout(() => {
    if (el.dataset.dismissed) return;
    el.dataset.dismissed = '1';
    el.classList.add('cm-loader--out');
    setTimeout(() => el.remove(), 1200);
  }, delay);
}

/* ─── DOUBLE-CLICK TO REGENERATE ────────────────────────────── */
function initRegenOnDblClick() {
  const wrap = document.getElementById('collage-wrap');
  if (!wrap) return;
  wrap.addEventListener('dblclick', () => {
    wrap.style.opacity = '0';
    wrap.style.transition = 'opacity 0.25s ease';
    setTimeout(() => {
      renderCollage();
      wrap.style.opacity = '1';
    }, 250);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderCollage();
  initRegenOnDblClick();
});

/* Re-render on significant viewport resize so layout matches screen size */
let _resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(_resizeTimer);
  _resizeTimer = setTimeout(() => {
    const wrap = document.getElementById('collage-wrap');
    if (!wrap) return;
    wrap.style.opacity = '0';
    wrap.style.transition = 'opacity 0.2s ease';
    setTimeout(() => {
      renderCollage();
      wrap.style.opacity = '1';
    }, 200);
  }, 350);
});
