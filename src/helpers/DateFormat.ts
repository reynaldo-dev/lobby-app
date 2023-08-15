export function formatDate(date: Date | string): string {
  const dateObject = new Date(date);
  const formattedDate = dateObject.toLocaleString("es-SV", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return formattedDate;
}
