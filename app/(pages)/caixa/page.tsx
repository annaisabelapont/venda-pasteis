"use client";

import ProdutoButton from "@/app/components/caixa/ProdutoButton";
import { Produto } from "@/app/lib/types";
import { useState } from "react";

export default function Caixa() {
  const produtosList: Produto[] = [
    { id: 1, valorUnitario: 10, nome: "Queijo", imgSrc: "/pastel-queijo.jpg" },
    {
      id: 2,
      valorUnitario: 10,
      nome: "Carne com queijo",
      imgSrc: "/pastel-carne-queijo.jpg",
    },
    { id: 3, valorUnitario: 10, nome: "Carne", imgSrc: "/pastel-carne.webp" },
    { id: 4, valorUnitario: 10, nome: "Pizza", imgSrc: "/pastel-pizza.webp" },
  ];

  type ShoppingCartItem = {
    itemCartId: string;
    quantity: number;
    produto: Produto;
  };

  const [shoppingCart, setShoppingCart] = useState<ShoppingCartItem[]>([]);

  const addProdToShoppingCart = (produto: Produto) => {
    const itemInCartIndex = shoppingCart.findIndex(
      (item) => item.produto.id === produto.id
    );
    if (itemInCartIndex !== -1) {
      const itemCart = shoppingCart[itemInCartIndex];
      itemCart.quantity++;
      // const newCartList = (shoppingCart[itemInCartIndex] = itemCart);
      setShoppingCart(
        shoppingCart.map((item, index) =>
          index === itemInCartIndex ? itemCart : item
        )
      );
    } else {
      setShoppingCart([
        ...shoppingCart,
        { itemCartId: new Date().getMilliseconds().toString(), quantity: 1, produto },
      ]);
    }
  };

  return (
    <div className="flex gap-10 justify-center mt-5">
      <div className=" grid grid-cols-3 grid-flow-row gap-8 p-7 border-1 border-grey  bg-white rounded-md">
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

        <div className="flex flex-col gap-3.5 min-w-56">
          <div className="flex justify-between mb-3 font-semibold text-lg">
            <span>TOTAL</span>

            <span>R$ 30,00</span>
          </div>

          <button onClick={() => setShoppingCart([])} className="bg-red-50 border-1 border-red-100 text-red-950 p-1.5 px-3 rounded-md font-medium hover:brightness-97 transition-filter duration-100">
            Cancelar compra ❌
          </button>

          <button className="rounded-md font-medium p-1.5 px-3 bg-green-50 border-1 border-green-200 text-green-950 hover:brightness-97 transition-filter duration-100">
            Confirmar compra ✅
          </button>
        </div>
      </div>
    </div>
  );
}
