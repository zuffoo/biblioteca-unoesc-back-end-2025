
import Usuario from "../model/UsuarioModel.js";
import bcrypt from 'bcrypt';

async function listar(req, res) {
  const respostaBanco = await Usuario.findAll();
  res.json(respostaBanco);
}

async function selecionar(req, res) {
  const id = req.params.id;
  const respostaBanco = await Usuario.findByPk(id);
  res.json(respostaBanco);
}

async function inserir(req, res) {
  const respostaBanco = await Usuario.create(req.body);
  res.json(respostaBanco);
}

async function alterar(req, res) {
  const nome = req.body.nome;
  const cpf = req.body.cpf;
  const email = req.body.email;
  const telefone = req.body.telefone;
  const nascimento = req.body.nascimento;
  const senha = req.body.senha;

  const idusuario = req.params.id;

  const respostaBanco = await Usuario.update(
    { nome, cpf, email, telefone, nascimento, senha },
    { where: { idusuario } }
  );
  res.json(respostaBanco);
}

async function excluir(req, res) {
  const idusuario = req.params.id;

  const respostaBanco = await Usuario.destroy({ where: { idusuario } });
  res.json(respostaBanco);
}

async function definirSenha(req, res) {
  try {
    const idusuario = req.params.id;
    const { senha } = req.body;

    const usuario = await Usuario.findByPk(idusuario);
    if (!usuario) {
      return res.status(404).json({ mensagem: "Funcionário não encontrado." });
    }

    if (!senha || senha.length < 6 || senha.length > 20) {
      return res.status(400).json({ 
        mensagem: "A senha deve ter entre 6 e 20 caracteres." 
      });
    }

    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    const respostaBanco = await Usuario.update(
      { 
        senha: senhaHash, 
        token: null
      },
      { where: { idusuario } }
    );

    res.json({ mensagem: "Senha definida com sucesso." });
  } catch (error) {
    res.status(500).json({ 
      mensagem: "Erro ao definir senha do funcionário.", 
      erro: error.message 
    });
  }
}

export default { listar, selecionar, inserir, alterar, excluir, definirSenha };
