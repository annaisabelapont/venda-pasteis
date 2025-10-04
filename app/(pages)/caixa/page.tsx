"use client";
export type ShoppingCartItem = {
  itemCartId: string;
  quantity: number;
  produto: Produto;
};

import ConfirmarCompraButton from "@/app/components/caixa/ConfirmarCompraButton";
import ProdutoButton from "@/app/components/caixa/ProdutoButton";
import { Produto } from "@/app/lib/types";
import { useEffect, useState } from "react";

export default function Caixa() {
  const produtosList: Produto[] = [
    { id: 1, valorUnitario: 10, nome: "Queijo", imgSrc: "pastel-queijo.jpg" },
    {
      id: 2,
      valorUnitario: 10,
      nome: "Carne com queijo",
      imgSrc: "pastel-carne-queijo.jpg",
    },
    { id: 3, valorUnitario: 10, nome: "Carne", imgSrc: "pastel-carne.webp" },
    { id: 4, valorUnitario: 10, nome: "Pizza", imgSrc: "pastel-pizza.webp" },
  ];

  const [shoppingCart, setShoppingCart] = useState<ShoppingCartItem[]>([]);

  const addProdToShoppingCart = (produto: Produto) => {
    const itemInCartIndex = shoppingCart.findIndex(
      (item) => item.produto.id === produto.id
    );
    if (itemInCartIndex !== -1) {
      const itemCart = shoppingCart[itemInCartIndex];
      itemCart.quantity++;
      setShoppingCart(
        shoppingCart.map((item, index) =>
          index === itemInCartIndex ? itemCart : item
        )
      );
    } else {
      setShoppingCart([
        ...shoppingCart,
        {
          itemCartId: `${Date.now().toString()}-${Math.random()}}`,
          quantity: 1,
          produto,
        },
      ]);
    }
  };

  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const sumValue = shoppingCart.reduce(
      (sum, item) => (sum += item.quantity),
      0
    );
    setTotalValue(sumValue * 10);
  }, [shoppingCart]);

  return (
    <div className="flex max-lg:flex-col gap-5 lg:gap-10 justify-center mt-5">
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-flow-row gap-8 p-7 border-1 border-grey  bg-white rounded-md">
        {produtosList.map((prod, idx) => (
          <ProdutoButton
            key={idx}
            handleClick={() => addProdToShoppingCart(prod)}
            name={prod.nome}
            imgSrc={prod.imgSrc}
          />
        ))}
      </div>

      <div className="flex flex-col justify-between border-1 border-grey p-3 px-5 bg-white rounded-md">
        <div>
          <h1 className="text-center font-semibold mb-2"> CARRINHO </h1>

          <ul className="flex flex-col gap-3">
            {shoppingCart.map((item) => (
              <li key={item.itemCartId} className=" flex justify-between">
                <span>
                  {item.produto.nome} ({item.quantity}x)
                </span>
                <span>R$ {item.quantity * 10},00</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3.5 lg:min-w-56">
          <div className="flex justify-between mb-3 font-semibold text-lg">
            <span>TOTAL</span>

            <span>R$ {totalValue},00</span>
          </div>

          <button
            disabled={shoppingCart.length === 0}
            onClick={() => setShoppingCart([])}
            className="bg-red-50 border-1 border-red-100 text-red-950 p-1.5 px-3 rounded-md font-medium hover:brightness-97 transition-filter duration-100 disabled:opacity-50 disabled:cursor-not-allowed!"
          >
            Cancelar compra ❌
          </button>

          <ConfirmarCompraButton
            shoppingCart={shoppingCart}
            setShoppingCart={setShoppingCart}
            totalValue={totalValue}
          />
        </div>
      </div>
    </div>
  );
}
