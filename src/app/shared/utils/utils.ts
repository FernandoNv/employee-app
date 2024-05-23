// https://stackoverflow.com/questions/33299687/how-to-convert-dd-mm-yyyy-string-into-javascript-date-object
export function parseDMY(s: string): Date {
  const [d, m, y] = s.split(/\D/).map(v => parseInt(v, 10));
  return new Date(y, m - 1, d);
}
