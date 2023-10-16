export function formatDate(date: Date | string): string {
  const dateObject = new Date(date);
  const formattedDate = dateObject.toLocaleString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });
  return `${formattedDate}`;
}
