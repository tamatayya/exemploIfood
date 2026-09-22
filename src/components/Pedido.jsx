import React from 'react'
import { useState } from 'react'

// ARRAY DE OBJETOS CONTENDO O ESTADO INICIAL DO CARDAPIO
const cardapio = [
    {id:1,nome:"Combo-01",preço:25.00,disponivel: false,quantidade: 0},
    {id:2,nome:"Combo-02",preço:35.00,disponivel: true,quantidade: 0},
    {id:3,nome:"Combo-03",preço:45.00,disponivel: false,quantidade: 0},
    {id:4,nome:"Combo-04",preço:55.00,disponivel: true,quantidade: 0},
];
const Pedido = () => {

    const[items, setItems]=useState(cardapio);
    const[status, setStatus]=useState("");
    const[enviar, setEnviar]=useState(false);

    // VALOR FIXO ADICIONADO AO TOTAL QUANDO TIVER NO CARRINHO
    const taxaEntrega = 5.00;

    // FUNCAO QUE ALTERA A QUANTIDADE DO PEDIDO
    const alterarQuantidade=(id,valor)=>{
        setItems(alt=>

            // MAP : Cria um novo array e percorre os items sem modificar o original (imutabilidade)
            // ternario: verifica se o item da iteracao atual é o que deve ser alterado
            // spread (...item) - mantem os valores antigos e adiciona os novos
            // Math.max: objeto que garante que a quantidade nunca sera maior que 0
            alt.map(item=>
                item.id === 0 ? {...item,quantidade:Math.max(0,item.quantidade+valor)} : item 
                                // {spread}
            )
        )
    }

    // FILTER: Seleciona apenas os produtos disponiveis no carrinho
    const constDisponiveis = items.filter(item=> item.disponivel);
    const carrinho = items.filter(item=>item.quantidade>0);

    // REDUCE: Calcula soma dos items (preco*quantidade)
    // e adiciona a taxa de entrega
    const subTotal = carrinho.reduce((acumulador,item)=> acumulador + item.preco * item.quantidade,0);
    const total = subTotal > 0 ? subTotal + taxaEntrega:0;

    // SIMULACAO DO CICLO DE VIDA DA ENTREGA USANDO TEMPORIZADOR ASSINCRONO

    const ConfirmarPedido=()=>{
        setEnviar(true)
        setStatus("Restaurante confirmou seu pagamento, Preparando seu pedido...")
        setTimeout(()=>{
            setStatus("Seu Pedido saiu para Entrega")
            setEnviar(false)
        },5000) //5 segundos

        setTimeout(()=>{
            setStatus("Código confirmado. Seu pedido foi entregue com sucesso")
        },10000) //10 Segundos
    }

  return (
    <div>
      
    </div>
  )
}

export default Pedido
