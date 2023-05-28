import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
// import TelaCarregamento from "../TelasDeCadastro/TelaCarregamento";
// import TelaErro from "../TelasDeCadastro/TelaErro";
// import STATUS from "../utilitarios/util";
import { IMaskInput } from "react-imask";
// import { Imask}
// import { LinkContainer } from "react-router-bootstrap";

export default function FormCadFornecedor(props) {
  const [validado, setValidado] = useState(false);
  // const [listaFornecedores, setListaFornecedores] = useState([]);
  // const [status, setStatus] = useState(STATUS.sucesso);
  // const [fornecedorSelecionado, setFornecedorSelecionado] = useState({});
  const [cadFornecedor, setCadFornecedor] = useState({
    codigo: 0,
    razaoSocial: "",
    nomeFantasia: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: "",
    pessoa: "",
    cnpj: "",
    estadual: "",
    municipal: "",
    email: "",
    celular: "",
    telefone: "",
    contato: "",
    // codPedido: 0,
    // produto: "",
    // quantidade: 0,
    // dataCompra: "",
  });

  function gravarFornecedor() {
    fetch("http://localhost:4000/fornecedor", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        razaoSocial: cadFornecedor.razaoSocial,
        nomeFantasia: cadFornecedor.nomeFantasia,
        endereco: cadFornecedor.endereco,
        numero: cadFornecedor.numero,
        complemento: cadFornecedor.complemento,
        bairro: cadFornecedor.bairro,
        cidade: cadFornecedor.cidade,
        uf: cadFornecedor.uf,
        cep: cadFornecedor.cep,
        pessoa: cadFornecedor.pessoa,
        cnpj: cadFornecedor.cnpj,
        estadual: cadFornecedor.estadual,
        municipal: cadFornecedor.municipal,
        email: cadFornecedor.email,
        celular: cadFornecedor.celular,
        telefone: cadFornecedor.telefone,
        contato: cadFornecedor.contato,
        // produto: cadPedido.produto,
        // quantidade: cadPedido.quantidade,
        // dataCompra: cadPedido.dataCompra,
        // fornecedor: {
        //   codigo: fornecedorSelecionado.codigo,
        // },
      }),
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        if (dados.status) {
          setCadFornecedor({ ...cadFornecedor, codigo: dados.codigo });
        }
        alert(dados.mensagem);
      })
      .catch((erro) => {
        alert("Não foi possivel registrar o fornecedor: " + erro.message);
      });
  }

  function manipularMudanca(e) {
    const alvo = e.target.name;
    if (e.target.type === "checkbox") {
      setCadFornecedor({ ...cadFornecedor, [alvo]: e.target.checked });
    } else {
      setCadFornecedor({ ...cadFornecedor, [alvo]: e.target.value });
      console.log("Digitou " + e.target.value);
    }
  }

  const manipularSubmissao = (evento) => {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      setValidado(false);
      gravarFornecedor();
    } else {
      setValidado(true);
    }
    evento.preventDefault();
    evento.stopPropagation();
  };

  return (
    <Container>
      <Row className="mb-3 border border-success d-flex text-center">
        <h3>Cadastro de Fornecedor</h3>
      </Row>
      <Row className="mt-2 p-2 border border-success">
        <Form noValidate validated={validado} onSubmit={manipularSubmissao}>
          <Row className="mb-1">
            <Form.Group as={Col} md="1">
              <Form.Label>Código</Form.Label>
              <Form.Control
                id="codigo"
                name="codigo"
                required
                disabled
                type="int"
                value={cadFornecedor.codigo}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o código do forncedor!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="5">
              <Form.Label>Razão Social</Form.Label>
              <Form.Control
                id="razaoSocial"
                name="razaoSocial"
                required
                type="text"
                placeholder="Razão Social"
                value={cadFornecedor.razaoSocial}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe a razão social do fornecedor!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="5">
              <Form.Label>Nome Fantasia</Form.Label>
              <Form.Control
                id="nomeFantasia"
                name="nomeFantasia"
                required
                type="text"
                placeholder="Nome Fantasia"
                value={cadFornecedor.nomeFantasia}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe a nome fantasia do fornecedor!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="7">
              <Form.Label>Endereço</Form.Label>
              <Form.Control
                id="endereco"
                name="endereco"
                required
                type="text"
                placeholder="Endereço"
                value={cadFornecedor.endereco}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o endereço do fornecedor!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="2">
              <Form.Label>Número</Form.Label>
              <Form.Control
                id="numero"
                name="numero"
                required
                type="text"
                value={cadFornecedor.numero}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o número do fornecedor!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Complemento</Form.Label>
              <Form.Control
                id="complemento"
                name="complemento"
                required
                type="text"
                placeholder="Complemento"
                value={cadFornecedor.complemento}
                onChange={manipularMudanca}
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Bairro</Form.Label>
              <Form.Control
                id="bairro"
                name="bairro"
                required
                type="text"
                placeholder="Bairro"
                value={cadFornecedor.bairro}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o bairro do fornecedor!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Cidade</Form.Label>
              <Form.Control
                id="cidade"
                name="cidade"
                required
                type="text"
                placeholder="Cidade"
                value={cadFornecedor.cidade}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe a cidade do fornecedor!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="2">
              <Form.Label>UF</Form.Label>
              {/* <Form.Control id="uf" name="uf"/> */}
              <Form.Select
                id="uf"
                name="uf"
                defaultValue=""
                value={cadFornecedor.uf}
                onChange={manipularMudanca}
              >
                <option>AC</option>
                <option>AL</option>
                <option>AP</option>
                <option>AM</option>
                <option>BA</option>
                <option>CE</option>
                <option>DF</option>
                <option>ES</option>
                <option>GO</option>
                <option>MA</option>
                <option>MT</option>
                <option>MS</option>
                <option>MG</option>
                <option>PA</option>
                <option>PB</option>
                <option>PR</option>
                <option>PE</option>
                <option>PI</option>
                <option>RJ</option>
                <option>RN</option>
                <option>RS</option>
                <option>RO</option>
                <option>RR</option>
                <option>SC</option>
                <option>SP</option>
                <option>SE</option>
                <option>TO</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Por favor, informe o estado do fornecedor!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>CEP</Form.Label>
              <Form.Control
                id="cep"
                name="cep"
                required
                type="text"
                as={IMaskInput}
                mask="00000-000"
                placeholder="00000-000"
                value={cadFornecedor.cep}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe CEP do fornecedor!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="2">
              <Form.Label>Pessoa</Form.Label>
              {/* <Form.Control id="pessoa" name="pessoa" required type="text"/> */}
              <Form.Select
                id="pessoa"
                name="pessoa"
                defaultValue=""
                value={cadFornecedor.pessoa}
                onChange={manipularMudanca}
              >
                <option>Jurídica</option>
                <option>Física</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Por favor, informe a pessoa do fornecedor!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>CNPJ/CPF</Form.Label>
              <Form.Control
                id="cnpj"
                name="cnpj"
                required
                type="text"
                as={IMaskInput}
                mask="00.000.000/0000-00"
                placeholder="00.000.000/0000-00"
                value={cadFornecedor.cnpj}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe CNPJ/CPF do fornecedor!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Inscrição Estadual</Form.Label>
              <Form.Control
                id="estadual"
                name="estadual"
                required
                type="text"
                placeholder="000.000.000.000"
                value={cadFornecedor.estadual}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe a inscrição estadual do fornecedor!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Inscrição Municipal</Form.Label>
              <Form.Control
                id="municipal"
                name="municipal"
                required
                type="text"
                placeholder="000.000.000.000"
                value={cadFornecedor.municipal}
                onChange={manipularMudanca}
              />
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>E-Mail</Form.Label>
              <Form.Control
                id="email"
                name="email"
                required
                type="text"
                placeholder="E-Mail"
                value={cadFornecedor.email}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe a E-Mail do fornecedor!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Celular</Form.Label>
              <Form.Control
                id="celular"
                name="celular"
                required
                type="text"
                as={IMaskInput}
                mask="(00)00000-0000"
                placeholder="(00)00000-0000"
                value={cadFornecedor.celular}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe a celular do fornecedor!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                id="telefone"
                name="telefone"
                required
                type="text"
                as={IMaskInput}
                mask="(00)0000-0000"
                placeholder="(00)0000-0000"
                value={cadFornecedor.telefone}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe a telfone do fornecedor!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Nome do Contato</Form.Label>
              <Form.Control
                id="contato"
                name="contato"
                required
                type="text"
                placeholder="Nome do Vendedor"
                value={cadFornecedor.contato}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o contato do fornecedor!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                required
                label="Ativo"
                feedback="Você deve informar se o fornecedor esta ativo!!"
                feedbackType="invalid"
              />
            </Form.Group>
          </Row>
          <Button
            className="btn btn-success border border-success"
            type="submit"
          >
            Cadastrar
          </Button>
          &nbsp;
          <Button
            className="btn btn-warning border border-warning text-white"
            type="button"
            onClick={() => {
              props.onTabela(true);
            }}
          >
            Voltar
          </Button>
          &nbsp;
        </Form>
      </Row>
    </Container>
  );
  // } else if (status === STATUS.ocioso) {
  //   return <TelaCarregamento />;
  // } else {
  //   return (
  //     <TelaErro mensagem="Não foi possível recuperar os dados dos fornecedores, entre em contato com o administrador do sistema!" />
  //   );
  // }
}
