/**
 * Format an ISO/`YYYY-MM-DD` date string for display. Uses UTC so the output
 * is deterministic between server render and any client interaction.
 */
export function formatDate(
  date: string,
  opts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' },
): string {
  return new Date(date).toLocaleDateString('en-US', { timeZone: 'UTC', ...opts })
}
