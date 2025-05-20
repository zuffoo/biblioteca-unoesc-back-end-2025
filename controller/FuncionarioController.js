import Funcionario from "../model/FuncionarioModel.js";
import bcrypt from 'bcrypt';

async function listar(req, res) {
  const respostaBanco = await Funcionario.findAll();
  res.json(respostaBanco);
}

async function selecionar(req, res) {
  const id = req.params.id;
  const respostaBanco = await Funcionario.findByPk(id);
  res.json(respostaBanco);
}

async function inserir(req, res) {
  const respostaBanco = await Funcionario.create(req.body);
  res.json(respostaBanco);

}

async function alterar(req, res) {
  const nomefuncionario = req.body.nomefuncionario;
  const cpf = req.body.cpf;
  const email = req.body.email;
  const telefone = req.body.telefone;
  const nascimento = req.body.nascimento;
  const salario = req.body.salario;
  const contratacao = req.body.contratacao;

  const idfuncionario = req.params.id;

  const respostaBanco = await Funcionario.update(
    { nomefuncionario, cpf, email, telefone, nascimento, salario, contratacao },
    { where: { idfuncionario } }
  );
  res.json(respostaBanco);

  
}

async function demitir(req, res) {
      const idfuncionario = req.params.id;
      const dataDemissao = req.body.dataDemissao;
  
      const funcionario = await Funcionario.findByPk(idfuncionario);
      if (!funcionario) {
        return res.status(404).json({ mensagem: "Funcionário não encontrado." });
      }
  
      if (funcionario.ativo === false) {
        return res.status(400).json({ mensagem: "Funcionário já foi demitido anteriormente." });
      }
  
      const respostaBanco = await Funcionario.update(
        { ativo: false, dataDemissao },
        { where: { idfuncionario } }
      );
} 

async function definirSenha(req, res) {
  try {
    const idfuncionario = req.params.id;
    const { senha } = req.body;

    const funcionario = await Funcionario.findByPk(idfuncionario);
    if (!funcionario) {
      return res.status(404).json({ mensagem: "Funcionário não encontrado." });
    }

    if (!senha || senha.length < 6 || senha.length > 20) {
      return res.status(400).json({ 
        mensagem: "A senha deve ter entre 6 e 20 caracteres." 
      });
    }

    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    const respostaBanco = await Funcionario.update(
      { 
        senha: senhaHash, 
        token: null
      },
      { where: { idfuncionario } }
    );

    res.json({ mensagem: "Senha definida com sucesso." });
  } catch (error) {
    res.status(500).json({ 
      mensagem: "Erro ao definir senha do funcionário.", 
      erro: error.message 
    });
  }
}

async function login(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ 
        success: false,
        message: "Email e senha são obrigatórios" 
      });
    }

    const funcionario = await Funcionario.findOne({ where: { email } });
    
    if (!funcionario) {
      return res.status(404).json({ 
        success: false,
        message: "Credenciais inválidas" 
      });
    }

    if (!funcionario.ativo) {
      return res.status(403).json({ 
        success: false,
        message: "Funcionário inativo" 
      });
    }

    const senhaValida = await bcrypt.compare(senha, funcionario.senha);
    
    if (!senhaValida) {
      return res.status(401).json({ 
        success: false,
        message: "Credenciais inválidas" 
      });
    }

    const dataLogin = new Date().toISOString();
    await Funcionario.update(
      { token: dataLogin },
      { where: { idfuncionario: funcionario.idfuncionario } }
    );

    const dadosFuncionario = {
      id: funcionario.idfuncionario,
      nome: funcionario.nomefuncionario,
      email: funcionario.email,
      ultimoLogin: dataLogin
    };

    res.json({ 
      success: true,
      message: "Login realizado com sucesso",
      data: dadosFuncionario
    });

  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Erro no servidor",
      error: error.message 
    });
  }
}

export default {listar, selecionar, inserir, alterar, demitir, definirSenha, login};