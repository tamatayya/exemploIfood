 <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6 text-gray-800">

          {/* Cardápio do Restaurante */}
          <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  Cardápio do Restaurante
              </h2>

              <div className="space-y-3">
                  {produtosDisponiveis.map(produto => (
                      <div
                          key={produto.id}
                          className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100"
                      >
                          <span className="font-medium text-gray-700">
                              {produto.nome} <span className="text-sm text-gray-500 font-normal">R$ {produto.preco.toFixed(2)}</span>
                          </span>

                          <div className="flex items-center space-x-3 bg-white px-3 py-1 rounded-lg border border-gray-200 shadow-sm">
                              <button
                                  onClick={() => AlterarQuantidade(produto.id, -1)}
                                  className="text-gray-500 hover:text-red-600 font-bold px-1 transition-colors"
                              >
                                  -
                              </button>

                              <span className="font-semibold text-gray-800 w-4 text-center">
                                  {produto.quantidade}
                              </span>

                              <button
                                  onClick={() => AlterarQuantidade(produto.id, +1)}
                                  className="text-gray-500 hover:text-green-600 font-bold px-1 transition-colors"
                              >
                                  +
                              </button>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Linha separadora */}
          <hr className="border-gray-200 my-4" />

          {/* Resumo da Entrega */}
          <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Resumo da Entrega
              </h3>

              {carrinho.length === 0 ? (
                  <p className="text-sm text-gray-500 italic bg-gray-50 p-3 rounded-lg text-center">
                      Seu Carrinho está vazio
                  </p>
              ) : (
                  <div className="space-y-4">
                      <ul className="divide-y divide-gray-100 bg-gray-50 rounded-xl p-3 space-y-2">
                          {carrinho.map(item => (
                              <li key={item.id} className="flex justify-between text-sm text-gray-600 pt-2 first:pt-0">
                                  <span>{item.quantidade}x {item.nome}</span>
                                  <span className="font-medium text-gray-800">R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                              </li>
                          ))}
                      </ul>

                      <div className="space-y-1.5 text-sm text-gray-600 px-1">
                          <div className="flex justify-between">
                              <span>Subtotal:</span>
                              <span>R$ {subTotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                              <span>Taxa de Entrega:</span>
                              <span>R$ {taxaEntrega.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-100">
                              <span>Total a pagar:</span>
                              <span className="text-emerald-600">R$ {total.toFixed(2)}</span>
                          </div>
                      </div>

                      <button
                          onClick={ConfirmarPedido}
                          disabled={enviar}
                          className={`w-full py-3 px-4 rounded-xl font-medium text-white shadow-md transition-all ${enviar
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : "bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99]"
                              }`}
                      >
                          {enviar ? "Enviando..." : "Confirmar Pedido"}
                      </button>
                  </div>
              )}
          </div>

          {/* Status / Alerta */}
          {status && (
              <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded-r-lg text-amber-800 text-sm">
                  <strong className="font-semibold">Alerta: </strong> {status}
              </div>
          )}
      </div>