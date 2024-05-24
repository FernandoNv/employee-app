// https://stackoverflow.com/questions/33299687/how-to-convert-dd-mm-yyyy-string-into-javascript-date-object
export function parseYMD(s: string | undefined): Date {
  if (!s) return new Date();
  const [y, m, d] = s.split(/\D/).map(v => parseInt(v, 10));
  return new Date(y, m - 1, d);
}
