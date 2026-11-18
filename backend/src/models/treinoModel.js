
const treinos = [];
let proximoId = 1;

export function listar() {
    return treinos;
}

export function buscarPorId(id) {
    return treinos.find(treino => treino.id === id);
}

export function listarPorUsuario(usuarioId) {
    return treinos.filter(treino => treino.usuarioId === usuarioId);
}

export function criar(dados) {
    const novoTreino = {
        id: proximoId++,
        nome: dados.nome,
        descricao: dados.descricao,
        usuarioId: dados.usuarioId
    };

    treinos.push(novoTreino);

    return novoTreino;
}

export function atualizar(id, dados) {
    const treino = buscarPorId(id);

    if (!treino) {
        return null;
    }

    treino.nome = dados.nome;
    treino.descricao = dados.descricao;

    return treino;
}

export function remover(id) {
    const indice = treinos.findIndex(treino => treino.id === id);

    if (indice === -1) {
        return false;
    }

    treinos.splice(indice, 1);

    return true;
}
