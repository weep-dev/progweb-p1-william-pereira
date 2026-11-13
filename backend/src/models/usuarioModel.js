
const usuarios = [];
let proximoId = 1;

export function listar() {
    return usuarios;
}

export function buscarPorId(id) {
    return usuarios.find(usuario => usuario.id === id);
}

export function buscarPorEmail(email) {
    return usuarios.find(usuario => usuario.email === email);
}

export function criar(dados) {
    const novoUsuario = {
        id: proximoId++,
        nome: dados.nome,
        email: dados.email
    };

    usuarios.push(novoUsuario);

    return novoUsuario;
}

export function atualizar(id, dados) {
    const usuario = buscarPorId(id);

    if (!usuario) {
        return null;
    }

    usuario.nome = dados.nome;
    usuario.email = dados.email;

    return usuario;
}

export function remover(id) {
    const indice = usuarios.findIndex(usuario => usuario.id === id);

    if (indice === -1) {
        return false;
    }

    usuarios.splice(indice, 1);

    return true;
}
