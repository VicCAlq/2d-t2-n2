const CORES = [
  { bg: '#EEF2FF', texto: '#4F46E5' },
  { bg: '#FFF7ED', texto: '#EA580C' },
  { bg: '#F0FDFA', texto: '#0D9488' },
  { bg: '#FDF2F8', texto: '#DB2777' },
  { bg: '#FEFCE8', texto: '#CA8A04' },
  { bg: '#F0FDF4', texto: '#16A34A' },
];

export function corDaCategoria(categoria) {
  const texto = categoria || 'Sem categoria';
  let hash = 0;
  for (let i = 0; i < texto.length; i++) {
    hash = texto.charCodeAt(i) + ((hash << 5) - hash);
  }
  const indice = Math.abs(hash) % CORES.length;
  return CORES[indice];
}