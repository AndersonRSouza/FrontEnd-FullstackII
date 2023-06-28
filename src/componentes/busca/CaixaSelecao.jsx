import { useEffect, useState } from "react";
import { Col, Container, Row, Form, Spinner } from "react-bootstrap";
// Depende de componentes estilizados pelo bootstrap
// enderecoFonteDados: informa qual a url que a caixa de seleção utilizara para para recuperar os dados
// campoChave: nos dados, qual campo é a chave primária
// campoExibicao: Qual coluna deve ser exibida pela caixa de seleção
// funcaoSelecao: Que é a função que receberá o objeto selecionado pelo usuário 
export default function CaixaSelecao({ enderecoFonteDados,
    campoChave,
    campoExibicao,
    funcaoSelecao }) {
    const [valorSelecionado, setValorSelecionado] = useState({
        [campoChave]: 0,
        [campoExibicao]: "Não foi possível obter os dados do backend"
    });
    const [carregandoDados, setCarregandoDados] = useState(false);
    const [dados, setDados] = useState([])

    useEffect(() => {
        try {
            setCarregandoDados(true);
            fetch(enderecoFonteDados, { method: "GET" }).then((resposta) => {
                if (resposta.ok) {
                    return resposta.json();
                }
                else {
                    return ([{
                        [campoChave]: 0,
                        [campoExibicao]: "Não foi possível obter os dados do backend"
                    }]);
                }
            }).then((listaDados) => {
                setCarregandoDados(false);
                setDados(listaDados);
                //lembrar que minha caixa de seleção possui um valor previamente selecionado
                if (listaDados.length > 0){
                    setValorSelecionado(listaDados[0]);
                    funcaoSelecao(listaDados[0]);
                }
            });
        } catch (erro) {
            setCarregandoDados(false);
            setDados([{
                [campoChave]: 0,
                [campoExibicao]: "Não foi possível obter os dados do backend" + erro.message
            }]);
        }
    }, []);
    return (
        <Container border>
            <Row>
                <Col md={11}>
                    <Form.Select 
                                 onChange={(evento) =>{
                                    const itemSelecionado = evento.currentTarget.value;
                                    //valorSelecionado e funcaoSelecao esperam objetos da lista
                                                //gerando uma lista de ids, cpfs, codigo
                                    const pos = dados.map((item) => item[campoChave].toString()).indexOf(itemSelecionado);
                                    setValorSelecionado(dados[pos]);
                                    funcaoSelecao(dados[pos]);
                                 }}>
                        {
                            dados.map((item) => {
                                return <option key={item[campoChave]}
                                    value={item[campoChave]}>
                                    {item[campoExibicao]}
                                </option>
                            })
                        }

                    </Form.Select>
                </Col>
                <Col md={1}>
                    <Spinner className={carregandoDados ? "visible" : "invisible"}></Spinner>
                </Col>
            </Row>

        </Container>
    );
}