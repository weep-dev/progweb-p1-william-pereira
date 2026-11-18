
const el = {
  form: document.querySelector('#form-treino'),
  salvar: document.querySelector('#trn-salvar'),
  cancelar: document.querySelector('#trn-cancelar'),
  usuario: document.querySelector('#trn-usuario'),
  carregando: document.querySelector('#treinos-carregando'),
  erro: document.querySelector('#treinos-erro'),
  erroMsg: document.querySelector('#treinos-erro-msg'),
  recarregar: document.querySelector('#treinos-recarregar'),
  vazio: document.querySelector('#treinos-vazio'),
  sucesso: document.querySelector('#treinos-sucesso'),
  linhas: document.querySelector('#treinos-linhas'),
};

function celula(texto) {
  const td = document.createElement('td');
  td.textContent = texto;
  return td;
}

function botao(texto, acao, id, classe) {
  const b = document.createElement('button');
  b.type = 'button';
  b.textContent = texto;
  b.className = `btn btn-sm ${classe}`;
  b.dataset.acao = acao;
  b.dataset.id = id;
  return b;
}

function linha(treino, usuarios) {
  const tr = document.createElement('tr');

  const usuario = usuarios.find(
    (item) => item.id === treino.usuarioId
  );

  const acoes = celula('');
  acoes.className = 'text-end text-nowrap';

  acoes.append(
    botao('Editar', 'editar', treino.id, 'btn-outline-primary me-1'),
    botao('Remover', 'remover', treino.id, 'btn-outline-danger'),
  );

  tr.append(
    celula(treino.id),
    celula(treino.nome),
    celula(treino.descricao),
    celula(usuario?.nome ?? 'Usuário não encontrado'),
    acoes,
  );

  return tr;
}

export const treinoView = {
  render({ status, treinos, usuarios, erro, editandoId, salvando }) {
    el.carregando.classList.toggle('d-none', status !== 'carregando');
    el.erro.classList.toggle('d-none', status !== 'erro');
    el.vazio.classList.toggle('d-none', status !== 'vazio');
    el.sucesso.classList.toggle('d-none', status !== 'sucesso');

    el.erroMsg.textContent = erro ?? '';
    el.linhas.replaceChildren(...treinos.map((treino) => linha(treino, usuarios)));

    el.salvar.disabled = salvando;
    el.salvar.textContent = salvando
      ? 'Salvando…'
      : editandoId
        ? 'Salvar alterações'
        : 'Cadastrar treino';

    el.cancelar.classList.toggle('d-none', !editandoId);
  },

  preencherUsuarios(usuarios) {
    const selecionado = el.usuario.value;

    el.usuario.replaceChildren();

    const opcaoInicial = document.createElement('option');
    opcaoInicial.value = '';
    opcaoInicial.textContent = 'Selecione um usuário';
    el.usuario.append(opcaoInicial);

    usuarios.forEach((usuario) => {
      const opcao = document.createElement('option');
      opcao.value = usuario.id;
      opcao.textContent = usuario.nome;
      el.usuario.append(opcao);
    });

    if (usuarios.some((usuario) => String(usuario.id) === selecionado)) {
      el.usuario.value = selecionado;
    }
  },

  preencherForm(treino) {
    el.form.elements.id.value = treino.id;
    el.form.elements.nome.value = treino.nome;
    el.form.elements.descricao.value = treino.descricao;
    el.usuario.value = treino.usuarioId;
    el.usuario.disabled = true;
    el.salvar.textContent = 'Salvar alterações';
    el.cancelar.classList.remove('d-none');
    el.form.elements.nome.focus();
  },

  limparForm() {
    el.form.reset();
    el.form.elements.id.value = '';
    el.usuario.disabled = false;
  },

  aoEnviar(fn) {
    el.form.addEventListener('submit', (evento) => {
      evento.preventDefault();
      fn(Object.fromEntries(new FormData(el.form)));
    });
  },

  aoCancelar(fn) {
    el.cancelar.addEventListener('click', fn);
  },

  aoRecarregar(fn) {
    el.recarregar.addEventListener('click', fn);
  },

  aoClicarNaLista({ editar, remover }) {
    el.linhas.addEventListener('click', (evento) => {
      const alvo = evento.target.closest('button[data-acao]');

      if (!alvo) return;

      const id = Number(alvo.dataset.id);

      if (alvo.dataset.acao === 'editar') editar(id);
      if (alvo.dataset.acao === 'remover') remover(id);
    });
  },
};
