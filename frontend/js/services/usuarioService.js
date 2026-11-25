
import { api } from '../api.js';

function validar(dados) {
  const nome = dados.nome?.trim();
  const email = dados.email?.trim();

  if (!nome) {
    throw new Error('Informe o nome do usuário.');
  }

  if (!email) {
    throw new Error('Informe o e-mail do usuário.');
  }

  return { nome, email };
}

export const usuarioService = {
  listar() {
    return api.get('/usuarios');
  },

  criar(dados) {
    return api.post('/usuarios', validar(dados));
  },

  atualizar(id, dados) {
    return api.put(`/usuarios/${id}`, validar(dados));
  },

  remover(id) {
    return api.delete(`/usuarios/${id}`);
  },
};
