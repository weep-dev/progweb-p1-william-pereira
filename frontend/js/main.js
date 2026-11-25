
import { usuarioService } from './services/usuarioService.js';
import { treinoService } from './services/treinoService.js';
import { criarStore } from './state/store.js';
import { usuarioView } from './ui/usuarioView.js';
import { treinoView } from './ui/treinoView.js';
import { aviso } from './ui/aviso.js';

// Estado dos usuários
const store = criarStore({
  status: 'carregando',
  usuarios: [],
  erro: null,
  editandoId: null,
  salvando: false,
});

// Estado dos treinos
const treinoStore = criarStore({
  status: 'carregando',
  treinos: [],
  usuarios: [],
  erro: null,
  editandoId: null,
  salvando: false,
});

store.assinar((estado) => usuarioView.render(estado));
treinoStore.assinar((estado) => treinoView.render(estado));

// ==============================
// USUÁRIOS
// ==============================

async function carregarUsuarios() {
  store.set({ status: 'carregando', erro: null });

  try {
    const usuarios = await usuarioService.listar();

    store.set({
      usuarios,
      status: usuarios.length === 0 ? 'vazio' : 'sucesso',
      erro: null,
    });

    // Atualiza a lista de usuários disponível no formulário de treinos.
    treinoStore.set({ usuarios });
    treinoView.preencherUsuarios(usuarios);
  } catch (erro) {
    store.set({ status: 'erro', erro: erro.message });
  }
}

async function salvarUsuario(dados) {
  const id = store.get().editandoId;

  store.set({ salvando: true });
  aviso.limpar();

  try {
    if (id) {
      await usuarioService.atualizar(id, dados);
      aviso.sucesso('Usuário atualizado com sucesso!');
    } else {
      await usuarioService.criar(dados);
      aviso.sucesso('Usuário cadastrado com sucesso!');
    }

    cancelarEdicaoUsuario();
    await carregarUsuarios();
  } catch (erro) {
    aviso.erro(erro.message);
  } finally {
    store.set({ salvando: false });
  }
}

function editarUsuario(id) {
  const usuario = store.get().usuarios.find((item) => item.id === id);
  if (!usuario) return;

  store.set({ editandoId: id });
  usuarioView.preencherForm(usuario);
}

async function removerUsuario(id) {
  const usuario = store.get().usuarios.find((item) => item.id === id);
  if (!usuario) return;

  const confirmar = window.confirm(`Deseja realmente remover ${usuario.nome}?`);
  if (!confirmar) return;

  aviso.limpar();

  try {
    await usuarioService.remover(id);
    aviso.sucesso('Usuário removido com sucesso!');

    if (store.get().editandoId === id) {
      cancelarEdicaoUsuario();
    }

    await carregarUsuarios();
  } catch (erro) {
    aviso.erro(erro.message);
  }
}

function cancelarEdicaoUsuario() {
  store.set({ editandoId: null });
  usuarioView.limparForm();
}

// ==============================
// TREINOS
// ==============================

async function carregarTreinos() {
  treinoStore.set({ status: 'carregando', erro: null });

  try {
    const treinos = await treinoService.listar();

    treinoStore.set({
      treinos,
      status: treinos.length === 0 ? 'vazio' : 'sucesso',
      erro: null,
    });
  } catch (erro) {
    treinoStore.set({ status: 'erro', erro: erro.message });
  }
}

async function salvarTreino(dados) {
  const id = treinoStore.get().editandoId;

  treinoStore.set({ salvando: true });
  aviso.limpar();

  try {
    if (id) {
      await treinoService.atualizar(id, dados);
      aviso.sucesso('Treino atualizado com sucesso!');
    } else {
      await treinoService.criar(dados);
      aviso.sucesso('Treino cadastrado com sucesso!');
    }

    cancelarEdicaoTreino();
    await carregarTreinos();
  } catch (erro) {
    aviso.erro(erro.message);
  } finally {
    treinoStore.set({ salvando: false });
  }
}

function editarTreino(id) {
  const treino = treinoStore.get().treinos.find((item) => item.id === id);
  if (!treino) return;

  treinoStore.set({ editandoId: id });
  treinoView.preencherForm(treino);
}

async function removerTreino(id) {
  const treino = treinoStore.get().treinos.find((item) => item.id === id);
  if (!treino) return;

  const confirmar = window.confirm(`Deseja realmente remover o treino ${treino.nome}?`);
  if (!confirmar) return;

  aviso.limpar();

  try {
    await treinoService.remover(id);
    aviso.sucesso('Treino removido com sucesso!');

    if (treinoStore.get().editandoId === id) {
      cancelarEdicaoTreino();
    }

    await carregarTreinos();
  } catch (erro) {
    aviso.erro(erro.message);
  }
}

function cancelarEdicaoTreino() {
  treinoStore.set({ editandoId: null });
  treinoView.limparForm();
}

// ==============================
// EVENTOS E INICIALIZAÇÃO
// ==============================

usuarioView.aoEnviar(salvarUsuario);
usuarioView.aoCancelar(cancelarEdicaoUsuario);
usuarioView.aoRecarregar(carregarUsuarios);
usuarioView.aoClicarNaLista({
  editar: editarUsuario,
  remover: removerUsuario,
});

treinoView.aoEnviar(salvarTreino);
treinoView.aoCancelar(cancelarEdicaoTreino);
treinoView.aoRecarregar(carregarTreinos);
treinoView.aoClicarNaLista({
  editar: editarTreino,
  remover: removerTreino,
});

async function inicializar() {
  await carregarUsuarios();
  await carregarTreinos();
}

inicializar();
