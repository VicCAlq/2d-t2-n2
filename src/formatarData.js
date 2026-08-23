export function formatarData(valor) {
  if (!valor) {
    return 'Data não informada';
  }

  let data = new Date(valor);

  if (isNaN(data.getTime())) {
    const match = valor.match(/(\d{2})\/(\d{2})\/(\d{4})\s*(\d{2}):(\d{2}):(\d{2})/);
    if (match) {
      const dia = match[1];
      const mes = match[2];
      const ano = match[3];
      const hora = match[4];
      const min = match[5];
      const seg = match[6];
      data = new Date(`${ano}-${mes}-${dia}T${hora}:${min}:${seg}`);
    }
  }

  if (isNaN(data.getTime())) {
    return 'Data não informada';
  }

  return data.toLocaleString('pt-BR');
}