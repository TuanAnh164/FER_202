// export function formatPrice(v) {
//   // console.log(v);
//   const m = String(v).replace(/\$/, "");
//   const n = typeof m  === 'string' ? parseFloat(m) : m;
//   console.log(Number.isNaN(n));
//   return Number.isNaN(n) ? '$0.00' : `$${n.toFixed(2)}`;
// }
// export function assetUrl(p) {
//   if (!p) return '';
//   if (/^https?:\/\//i.test(p)) return p;     // nếu là URL tuyệt đối
//   return '/' + p.replace(/^\/+/, '');        // ép về /images/products/....
// }
// // const str = "abcdef";
// // const index = 2; // ký tự thứ 3 (0-based)
// // const result = str.slice(0, index) + str.slice(index + 1);
// // console.log(result); // "abdef"