import React from 'react'
import { useState } from 'react'

// ARRAY DE OBJETOS CONTENDO O ESTADO INICIAL DO CARDAPIO
const cardapio = [
    {id:1,nome:"Combo-01",preco:25.00,disponivel: false,quantidade: 0},
    {id:2,nome:"Combo-02",preco:35.00,disponivel: true,quantidade: 0},
    {id:3,nome:"Combo-03",preco:45.00,disponivel: false,quantidade: 0},
    {id:4,nome:"Combo-04",preco:55.00,disponivel: true,quantidade: 0},
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
                item.id === id ? {...item,quantidade:Math.max(0,item.quantidade+valor)} : item 
                                // {spread}
            )
        )
    }

    // FILTER: Seleciona apenas os produtos disponiveis no carrinho
    const produtosDisponiveis = items.filter(item=> item.disponivel);
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
        <div>
            <h2>Cardápio do Restaurante</h2>

            <div>
                {produtosDisponiveis.map(produto=>(
                    <div key={produto.id}>
                        <span>{produto.nome} - R$ {produto.preco.toFixed(2)}</span>
                        <div>
                            <button onClick={()=>alterarQuantidade(produto.id,-1)}>-</button>
                            <span>{produto.quantidade}</span>
                            <button onClick={()=>alterarQuantidade(produto.id,+1)}>+</button>
                        </div>

                        <hr />
                        <div>
                            <h3>Resumo da Entrega</h3>
                            {carrinho.length === 0 ? (
                                <p>Seu Carrinho está Vazio</p>
                            ):(
                                <ul>
                                    {carrinho.map(item=>(
                                        <li key={item.id}>
                                            <span>{item.quantidade} X {item.nome}</span>
                                            <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>

                                        </li>
                                    ))}

                                    <div>
                                        <div>
                                            <span>SubTotal: </span>
                                            <span>R$ {subTotal.toFixed(2)}</span>
                                        </div>
                                        <div>
                                            <span>Taxa de Entrega</span>
                                            <span>R$ {taxaEntrega.toFixed(2)}</span>
                                        </div>
                                        <div>
                                            <span>Total</span>
                                            <span>R${total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <button onClick={ConfirmarPedido}>
                                        {enviar ? "Enviando": "Confirmar Pedido"}
                                    </button>
                                </ul>

                            )}
                        </div>
                        {status && (
                            <div>
                                <strong>Alerta:</strong> {status}
                            </div>
                        )}
                    </div> 

                    
                ))}
            </div>
        </div>
    </div>
  )
}

export default Pedido
