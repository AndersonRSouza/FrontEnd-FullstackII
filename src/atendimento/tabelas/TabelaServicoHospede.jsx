// import { useState } from "react";
import { Table, Button, Container } from "react-bootstrap";

export default function TabelaServicoHospede(props) {
    var totalPedido =0;
    return (
        <Container className="mb-3 border">
            <Table striped bordered hover variant="success">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descrição do Servico</th>
                        <th>Preço</th>
                        <th>Qtd</th>
                        <th>SubTotal</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.listaItens?.map((item, indice) => {
                            totalPedido += parseFloat(item.subTotal);
                            return <tr key={indice}>
                                <td>{item.codServico}</td>
                                <td>{item.nome}</td>
                                <td>{item.preco}</td>
                                <td>{item.qtd}</td>
                                <td>{item.subTotal}</td>
                                <td>
                                    <Button onClick={() => {
                                        // remover o item da lista
                                        const lista = props.listaItens.filter((prod)=> prod.codServico !== item.codServico);
                                        props.setCadConsumoServico({...props.dadosConsumoServico, listaServicos:lista});
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            fill="currentColor"
                                            className="bi bi-x-square-fill"
                                            viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                                        </svg>

                                    </Button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
            <p>Total de Servicos: {totalPedido}</p>
        </Container>
    )
}