import { openDB } from 'idb';

const DB_NOME = 'agregador';
const DB_VERSAO = 1;

function connectarDB() {
  return openDB(DB_NOME, DB_VERSAO, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('fontes')) {
        const fontes = db.createObjectStore('fontes', { keyPath: 'id', autoIncrement: true });
        fontes.createIndex('nome', 'nome', { unique: false });
        fontes.createIndex('categoria', 'categoria', { unique: false });
      }

      if (!db.objectStoreNames.contains('noticias')) {
        const noticias = db.createObjectStore('noticias', { keyPath: 'id', autoIncrement: true });
        noticias.createIndex('nome', 'nome', { unique: false });
        noticias.createIndex('fonteNome', 'fonteNome', { unique: false });
        noticias.createIndex('categoria', 'categoria', { unique: false });
        noticias.createIndex('dataDePublicacao', 'dataDePublicacao', { unique: false });
      }
    },
  });
}

async function adicionarFonte(fonte) {
  const db = await connectarDB();
  return db.add('fontes', fonte);
}

async function listarFontes() {
  const db = await connectarDB();
  return db.getAll('fontes');
}

async function removerFonte(id) {
  const db = await connectarDB();
  return db.delete('fontes', id);
}

// Remove todas as fontes cadastradas. Como toda notícia deste app pertence a
// uma fonte (não existe notícia "solta"), também limpa a store de notícias
// para não deixar registros órfãos apontando pra fontes que não existem mais.
async function removerTodasFontes() {
  const db = await connectarDB();
  const tx = db.transaction(['fontes', 'noticias'], 'readwrite');
  await Promise.all([
    tx.objectStore('fontes').clear(),
    tx.objectStore('noticias').clear(),
  ]);
  await tx.done;
}

async function filtrarFontesPorCategoria(categoria) {
  const db = await connectarDB();
  return db.getAllFromIndex('fontes', 'categoria', categoria);
}

async function adicionarNoticia(noticia) {
  const db = await connectarDB();
  return db.add('noticias', noticia);
}

async function listarNoticias() {
  const db = await connectarDB();
  return db.getAll('noticias');
}

async function filtrarNoticiasPorFonte(fonteNome) {
  const db = await connectarDB();
  return db.getAllFromIndex('noticias', 'fonteNome', fonteNome);
}

async function filtrarNoticiasPorCategoria(categoria) {
  const db = await connectarDB();
  return db.getAllFromIndex('noticias', 'categoria', categoria);
}

async function removerNoticia(id) {
  const db = await connectarDB();
  return db.delete('noticias', id);
}

export {
  connectarDB,
  adicionarFonte,
  listarFontes,
  removerFonte,
  removerTodasFontes,
  filtrarFontesPorCategoria,
  adicionarNoticia,
  listarNoticias,
  filtrarNoticiasPorFonte,
  filtrarNoticiasPorCategoria,
  removerNoticia,
};