// Event dates are stored as plain YYYY-MM-DD, so format in UTC to avoid off-by-one shifts.
const dayFormat = new Intl.DateTimeFormat("en", { day: "2-digit", timeZone: "UTC" });
const monthFormat = new Intl.DateTimeFormat("en", { month: "short", timeZone: "UTC" });

export function formatEventDate(isoDate: string): { day: string; month: string } {
  const date = new Date(`${isoDate}T00:00:00Z`);
  return { day: dayFormat.format(date), month: monthFormat.format(date) };
}

/** Today as YYYY-MM-DD (UTC), comparable with stored event dates. */
export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}
