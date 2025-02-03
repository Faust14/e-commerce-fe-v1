export function generateTableHeaders(data: any[]): { key: string; label: string }[] {
  if (!data || data.length === 0) return [];

  return Object.keys(data[0]).map(key => ({
    key,
    label: key.charAt(0).toUpperCase() + key.slice(1) // Capitalizes the first letter
  }));
}
