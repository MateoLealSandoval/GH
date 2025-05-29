export function normalizeSkillName(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 +#]/g, '')
    .replace(/[\s_\-]+/g, '')
    .trim();
}
