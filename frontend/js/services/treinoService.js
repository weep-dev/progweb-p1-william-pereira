
import { api } from '../api.js';

function validar(dados) {
  const nome = dados.nome?.trim();
  const descricao = dados.descricao?.trim();
  const usuarioId = Number(dados.usuarioId);

  if (!nome) {
    throw new Error('Informe o nome do treino.');
  }

  if (!descricao) {
    throw new Error('Informe a descrição do treino.');
  }

  if (!usuarioId || !Number.isInteger(usuarioId)) {
    throw new Error('Selecione um usuário válido.');
  }

  return { nome, descricao, usuarioId };
}

export const treinoService = {
  listar() {
    return api.get('/treinos');
  },

  listarPorUsuario(usuarioId) {
    return api.get(`/treinos/usuario/${usuarioId}`);
  },

  criar(dados) {
    return api.post('/treinos', validar(dados));
  },

  atualizar(id, dados) {
    const { nome, descricao } = dados;

    if (!nome?.trim() || !descricao?.trim()) {
      throw new Error('Nome e descrição são obrigatórios.');
    }

    return api.put(`/treinos/${id}`, {
      nome: nome.trim(),
      descricao: descricao.trim(),
    });
  },

  remover(id) {
    return api.delete(`/treinos/${id}`);
  },
};
