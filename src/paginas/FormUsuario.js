import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import TituloCadastro from "../componentes/TituloCadastro";

export default function FormUsuario() {
    const navegacao = useNavigate();
    const { id } = useParams();

    //Declarar um useState para cada campo da tabela
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');


    const voltar = () => {
        navegacao('/listausuario');
    };

    const selecionar = async () => {
        let { data } = await axios.get(`http://localhost:4000/usuario/${id}`);
        //carregar cada campo na sua respectiva variável
        setNome(data.nome);
        setEmail(data.email);
        setTelefone(data.telefone);

    }

    const alterar = async () => {
        //montar o json do body com todos os campos que precisam ser enviados
        let body = {
            "nome": nome,
            "email": email,
            "telefone": telefone,
        };

        await axios.put(`http://localhost:4000/usuario/${id}`, body);
        voltar();
    }

    const inserir = async () => {
        let body = {
            "nome": nome,
            "email": email,
            "telefone": telefone,
        };

        await axios.post(`http://localhost:4000/usuario`, body);
        voltar();
    }

    const salvar = async () => {
        if (id) {
            alterar();
        }
        else {
            inserir();
        }
    }

    const excluir = async () => {
        await axios.delete(`http://localhost:4000/autor/${id}`);
        voltar();
    }

    useEffect(() => {
        if (id) {
            selecionar();
        }
    }, []);

    return (
        <>
            <TituloCadastro id={id} titulo="autor" />

            <form>
                {id && (
                    <div className="mb-3">
                        <label className="form-label">
                            Código
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={id}
                        />
                    </div>
                )}

                <div className="mb-3">
                    <label className="form-label">
                        Nome do usuário
                    </label>
                    <input
                        type="string"
                        className="form-control"
                        value={nome}
                        onChange={(evento) => setNome(evento.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        E-mail
                    </label>
                    <input
                        type="string"
                        className="form-control"
                        value={email}
                        onChange={(evento) => setEmail(evento.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Telefone
                    </label>
                    <input
                        type="string"
                        className="form-control"
                        value={telefone}
                        onChange={(evento) => setTelefone(evento.target.value)}
                    />
                </div>

                <button type="button" className="btn btn-primary"
                    onClick={() => salvar()}>
                    Salvar
                </button>
                <button type="button"
                    className="btn btn-secondary"
                    onClick={() => voltar()}>
                    Cancelar
                </button>
                {id && (
                    <button type="button"
                        className="btn btn-danger"
                        onClick={() => excluir()}>
                        Excluir
                    </button>
                )}
            </form>
        </>
    );
};