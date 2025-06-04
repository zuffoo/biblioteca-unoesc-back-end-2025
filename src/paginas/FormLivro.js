import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import TituloCadastro from "../componentes/TituloCadastro";

export default function FormLivro() {
    const navegacao = useNavigate();
    const { id } = useParams();

    //Declarar um useState para cada campo da tabela
    const [titulo, setLivroTitulo] = useState('');
    const [edicao, setEdicao] = useState('');
    const [paginas, setPaginas] = useState('');
    const [publicacao, setPublicacao] = useState('');
    const [foto, setFoto] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [resumo, setResumo] = useState('');
    const [condicaofisica, setCondicaoFisica] = useState('');
    const [ideditora, setIdEditora] = useState('');
    const [idcategoria, setIdCategoria] = useState('');
    const [editoras, setEditoras] = useState([]);
    const [categorias, setCategorias] = useState([]);


    const voltar = () => {
        navegacao('/listalivro');
    };

    const carregarEditorasECategorias = async () => {
    const respEditoras = await axios.get("http://localhost:4000/editora");
    const respCategorias = await axios.get("http://localhost:4000/categoria");
    setEditoras(respEditoras.data);
    setCategorias(respCategorias.data);
    };


    const selecionar = async () => {
        let { data } = await axios.get(`http://localhost:4000/livro/${id}`);
        //carregar cada campo na sua respectiva variável
        setLivroTitulo(data.titulo);
        setEdicao(data.edicao);
        setPaginas(data.paginas);
        setPublicacao(data.publicacao);
        setFoto(data.foto);
        setLocalizacao(data.localizacao);
        setResumo(data.resumo);
        setCondicaoFisica(data.condicaofisica);        
    }

    const alterar = async () => {
        //montar o json do body com todos os campos que precisam ser enviados
        let body = {
            "titulo": titulo,
            "edicao": edicao,
            "paginas": paginas,
            "publicacao": publicacao,
            "foto": foto,
            "localizacao": localizacao,
            "resumo": resumo,
            "condicaofisica": condicaofisica,
            "ideditora": ideditora,
            "idcategoria": idcategoria,
        };

        await axios.put(`http://localhost:4000/livro/${id}`, body);
        voltar();
    }

    const inserir = async () => {
        let body = {
            "titulo": titulo,
            "edicao": edicao,
            "paginas": paginas,
            "publicacao": publicacao,
            "foto": foto,
            "localizacao": localizacao,
            "resumo": resumo,
            "condicaofisica": condicaofisica,
            "ideditora": ideditora,
            "idcategoria": idcategoria,        
        };

        await axios.post(`http://localhost:4000/livro`, body);
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
        await axios.delete(`http://localhost:4000/livro/${id}`);
        voltar();
    }

    useEffect(() => {
        if (id) {
            selecionar();
        }
    }, []);

    useEffect(() => {
    carregarEditorasECategorias();
    if (id) {
        selecionar();
    }
    }, []);

    return (
        <>
            <TituloCadastro id={id} titulo="livro" />

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
                        Nome do livro
                    </label>
                    <input
                        type="string"
                        className="form-control"
                        value={titulo}
                        onChange={(evento) => setLivroTitulo(evento.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Número da edição
                    </label>
                    <input
                        type="string"
                        className="form-control"
                        value={edicao}
                        onChange={(evento) => setEdicao(evento.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Número de páginas
                    </label>
                    <input
                        type="integer"
                        className="form-control"
                        value={paginas}
                        onChange={(evento) => setPaginas(evento.target.value)}
                    />
                </div>

                 <div className="mb-3">
                    <label className="form-label">
                        Ano de publicação
                    </label>
                    <input
                        type="integer"
                        className="form-control"
                        value={publicacao}
                        onChange={(evento) => setPublicacao(evento.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Foto
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={foto}
                        onChange={(evento) => setFoto(evento.target.value)}
                    />
                    <img src={foto} className="img-thumbnail" style={{ width: '250px' }} />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Localização
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={localizacao}
                        onChange={(evento) => setLocalizacao(evento.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Resumo
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={resumo}
                        onChange={(evento) => setResumo(evento.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Condição Física
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={condicaofisica}
                        onChange={(evento) => setCondicaoFisica(evento.target.value)}
                    />
                </div>

                <div className="mb-3">
                <select className="form-control" value={ideditora} onChange={(e) => setIdEditora(e.target.value)}>
                <option value="">Selecione uma editora</option>
                    {editoras.map((editora) => (
                <option key={editora.ideditora} value={editora.ideditora}>
                    {editora.nomeeditora}
                </option>
                    ))}
                
                </select>
                </div>

                <div className="mb-3">
                <select className="form-control" value={idcategoria} onChange={(e) => setIdCategoria(e.target.value)}>
                <option value="">Selecione uma categoria</option>
                    {categorias.map((categoria) => (
                <option key={categoria.idcategoria} value={categoria.idcategoria}>
                    {categoria.nomecategoria}
                </option>
                    ))}
                </select>
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