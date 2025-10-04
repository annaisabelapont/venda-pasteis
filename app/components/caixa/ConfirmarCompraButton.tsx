"use state";

import { ShoppingCartItem } from "@/app/(pages)/caixa/page";
import { VendaProdutoSQL } from "@/app/lib/types";
import {
  useCadastrarVendaMutation,
  useCadastrarVendaProdutosMutation,
} from "@/app/lib/vendas-service";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

export default function ConfirmarCompraButton({
  shoppingCart,
  setShoppingCart,
  totalValue,
}: {
  shoppingCart: ShoppingCartItem[];
  setShoppingCart: Dispatch<SetStateAction<ShoppingCartItem[]>>;
  totalValue: number;
}) {
  const save = useSave();

  return (
    <button
      onClick={() => save(shoppingCart, setShoppingCart, totalValue)}
      className="rounded-md font-medium p-1.5 px-3 bg-green-50 border-1 border-green-200 text-green-950 hover:brightness-97 transition-filter duration-100"
    >
      Confirmar compra ✅
    </button>
  );
}

const useSave = () => {
  const { mutateAsync: mutateVenda, error: vendaError } = useMutation(
    useCadastrarVendaMutation()
  );

  const { mutateAsync: mutateVendaProduto, error: vendaProdutosError } =
    useMutation(useCadastrarVendaProdutosMutation());

  const save = async (
    shoppingCart: ShoppingCartItem[],
    setShoppingCart: Dispatch<SetStateAction<ShoppingCartItem[]>>,
    totalValue: number
  ) => {
    const venda = await mutateVenda({ valor: totalValue });

    if (!vendaError && venda.data) {
      const vendasProdutos: VendaProdutoSQL[] = shoppingCart.map((item) => ({
        quantidade: item.quantity,
        valor_total: totalValue,
        id_prod_fk: item.produto.id,
        id_venda_fk: venda.data[0].id,
      }));

      console.log(vendasProdutos)

      await mutateVendaProduto(vendasProdutos);
    }
    if (!venda.error || !vendaProdutosError || !vendaError) {
      console.log('Venda cadastrada com sucesso!')
      setShoppingCart([]);
    } else {
      console.log("Ocorreu um erro ao cadastrar a venda.");
      console.log(venda.error);
      console.log(vendaError);
      console.log(vendaProdutosError);
    }
  };

  return save;
};
