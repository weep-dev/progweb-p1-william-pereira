
const el = {
  form: document.querySelector('#form-usuario'),
  salvar: document.querySelector('#usr-salvar'),
  cancelar: document.querySelector('#usr-cancelar'),
  carregando: document.querySelector('#usuarios-carregando'),
  erro: document.querySelector('#usuarios-erro'),
  erroMsg: document.querySelector('#usuarios-erro-msg'),
  recarregar: document.querySelector('#usuarios-recarregar'),
  vazio: document.querySelector('#usuarios-vazio'),
  sucesso: document.querySelector('#usuarios-sucesso'),
  linhas: document.querySelector('#usuarios-linhas'),
};

function celula(texto, classe = '') {
  const td = document.createElement('td');
  td.textContent = texto;
  td.className = classe;
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

function linha(usuario, editandoId) {
  const tr = document.createElement('tr');

  if (usuario.id === editandoId) {
    tr.className = 'editando';
  }

  const acoes = celula('', 'text-end text-nowrap');

  acoes.append(
    botao('Editar', 'editar', usuario.id, 'btn-outline-primary me-1'),
    botao('Remover', 'remover', usuario.id, 'btn-outline-danger'),
  );

  tr.append(
    celula(usuario.id),
    celula(usuario.nome),
    celula(usuario.email),
    acoes,
  );

  return tr;
}

export const usuarioView = {
  render({ status, usuarios, erro, editandoId, salvando }) {
    el.carregando.classList.toggle('d-none', status !== 'carregando');
    el.erro.classList.toggle('d-none', status !== 'erro');
    el.vazio.classList.toggle('d-none', status !== 'vazio');
    el.sucesso.classList.toggle('d-none', status !== 'sucesso');

    el.erroMsg.textContent = erro ?? '';

    el.linhas.replaceChildren(
      ...usuarios.map((usuario) => linha(usuario, editandoId))
    );

    el.salvar.disabled = salvando;

    el.salvar.textContent = salvando
      ? 'Salvando…'
      : editandoId
        ? 'Salvar alterações'
        : 'Cadastrar usuário';

    el.cancelar.classList.toggle('d-none', !editandoId);
  },

  preencherForm(usuario) {
    el.form.elements.id.value = usuario.id;
    el.form.elements.nome.value = usuario.nome;
    el.form.elements.email.value = usuario.email;
    el.form.elements.nome.focus();
  },

  limparForm() {
    el.form.reset();
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
