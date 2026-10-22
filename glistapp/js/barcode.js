// Draws a loyalty card number as a barcode (SVG), with no outside libraries.
// 12 or 13 digits with a valid check digit -> EAN-13 (what the Stop & Shop card
// uses; 12 digits is a UPC-A, drawn as EAN-13 with a leading 0).
// Anything else -> Code 128, which nearly every scanner reads.

const EAN_L = ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"];
const EAN_G = ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"];
const EAN_R = ["1110010", "1100110", "1101100", "1000010", "1011100", "1001110", "1010000", "1000100", "1001000", "1110100"];
const EAN_PARITY = ["LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG", "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"];

export function eanCheckDigit(first12) {
  let sum = 0;
  for (let i = 0; i < 12; i++) sum += Number(first12[i]) * (i % 2 ? 3 : 1);
  return (10 - (sum % 10)) % 10;
}

function isEan13(code) {
  return /^\d{13}$/.test(code) && eanCheckDigit(code.slice(0, 12)) === Number(code[12]);
}

// Returns a string of "1" (bar) and "0" (space), one character per module.
function ean13Modules(code) {
  const parity = EAN_PARITY[Number(code[0])];
  let bits = "101";
  for (let i = 1; i <= 6; i++) bits += (parity[i - 1] === "L" ? EAN_L : EAN_G)[Number(code[i])];
  bits += "01010";
  for (let i = 7; i <= 12; i++) bits += EAN_R[Number(code[i])];
  return bits + "101";
}

// Code 128 bar patterns (widths of bar/space/bar/space/bar/space), values 0-106.
const C128 = "212222 222122 222221 121223 121322 131222 122213 122312 132212 221213 221312 231212 112232 122132 122231 113222 123122 123221 223211 221132 221231 213212 223112 312131 311222 321122 321221 312212 322112 322211 212123 212321 232121 111323 131123 131321 112313 132113 132311 211313 231113 231311 112133 112331 132131 113123 113321 133121 313121 211331 231131 213113 213311 213131 311123 311321 331121 312113 312311 332111 314111 221411 431111 111224 111422 121124 121421 141122 141221 112214 112412 122114 122411 142112 142211 241211 221114 413111 241112 134111 111242 121142 121241 114212 124112 124211 411212 421112 421211 212141 214121 412121 111143 111341 131141 114113 114311 411113 411311 113141 114131 311141 411131 211412 211214 211232 2331112".split(" ");

function code128Modules(text) {
  const vals = [];
  const digitsOnly = /^\d+$/.test(text) && text.length % 2 === 0 && text.length >= 4;
  if (digitsOnly) {
    vals.push(105); // Start C: two digits per symbol
    for (let i = 0; i < text.length; i += 2) vals.push(Number(text.slice(i, i + 2)));
  } else {
    vals.push(104); // Start B
    for (const ch of text) {
      const c = ch.charCodeAt(0);
      vals.push(c >= 32 && c <= 127 ? c - 32 : 0);
    }
  }
  let sum = vals[0];
  for (let i = 1; i < vals.length; i++) sum += vals[i] * i;
  vals.push(sum % 103, 106);
  let bits = "";
  for (const v of vals) {
    [...C128[v]].forEach((w, j) => { bits += (j % 2 ? "0" : "1").repeat(Number(w)); });
  }
  return bits;
}

export function barcodeFor(raw) {
  let code = String(raw || "").replace(/\s+/g, "");
  if (/^\d{12}$/.test(code) && eanCheckDigit("0" + code.slice(0, 11)) === Number(code[11])) code = "0" + code;
  if (isEan13(code)) return { type: "EAN-13", modules: ean13Modules(code), quiet: 11 };
  return { type: "Code 128", modules: code128Modules(code), quiet: 10 };
}

// Builds a crisp SVG: each module is a whole number of pixels wide, with white
// quiet zones on both sides so the scanner can find the edges.
export function barcodeSvg(raw, maxWidthPx, heightPx) {
  const { modules, quiet, type } = barcodeFor(raw);
  const total = modules.length + quiet * 2;
  const unit = Math.max(2, Math.floor(maxWidthPx / total));
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("width", total * unit);
  svg.setAttribute("height", heightPx);
  svg.setAttribute("viewBox", `0 0 ${total} ${heightPx}`);
  svg.setAttribute("preserveAspectRatio", "none");
  svg.setAttribute("shape-rendering", "crispEdges");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", `${type} barcode for ${raw}`);
  const bg = document.createElementNS(ns, "rect");
  bg.setAttribute("width", total); bg.setAttribute("height", heightPx); bg.setAttribute("fill", "#fff");
  svg.append(bg);
  let x = quiet;
  for (let i = 0; i < modules.length;) {
    if (modules[i] === "1") {
      let w = 1;
      while (modules[i + w] === "1") w++;
      const bar = document.createElementNS(ns, "rect");
      bar.setAttribute("x", x); bar.setAttribute("width", w); bar.setAttribute("height", heightPx); bar.setAttribute("fill", "#000");
      svg.append(bar);
      x += w; i += w;
    } else { x++; i++; }
  }
  return svg;
}
