"use state";

import { ShoppingCartItem } from "@/app/(pages)/caixa/page";
import { VendaProdutoSQL } from "@/app/lib/types";
import {
  useCadastrarVendaMutation,
  useCadastrarVendaProdutosMutation,
} from "@/app/lib/vendas-service";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import Swal from "sweetalert2";

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
      disabled={shoppingCart.length === 0}
      onClick={() => save(shoppingCart, setShoppingCart, totalValue)}
      className="rounded-md font-medium p-1.5 px-3 bg-green-50 border-1 border-green-200 text-green-950 hover:brightness-97 transition-filter duration-100 disabled:opacity-50 disabled:cursor-not-allowed!"
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
    if (shoppingCart.length === 0) {
      Swal.fire({
        icon: "warning",
        text: "O carrinho está vazio.",
      });
      return;
    }

    const confirm = await Swal.fire({
      title: "Finalizar venda?",
      text: `Total: R$ ${totalValue.toFixed(2)}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sim, finalizar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      const venda = await mutateVenda({ valor: totalValue });

      if (venda?.error) throw venda.error;
      if (!venda?.data) throw new Error("Erro ao registrar a venda.");

      const vendasProdutos: VendaProdutoSQL[] = shoppingCart.map((item) => ({
        quantidade: item.quantity,
        valor_total: item.quantity * 10,
        id_prod_fk: item.produto.id,
        id_venda_fk: venda.data[0].id,
      }));

      await mutateVendaProduto(vendasProdutos);

      // const sound = new Audio(`../sounds/caixa-registradora.mp3`);

      // sound.play().catch(() => {
      //   console.warn("Não foi possível reproduzir o som.");
      // });

      Swal.fire({
        icon: "success",
        title: "Venda concluída!",
        text: "Venda cadastrada com sucesso!",
        timer: 2000,
        showConfirmButton: false,
      });

      setShoppingCart([]);
    } catch (error) {
      console.error("Erro ao salvar venda:", error);

      Swal.fire({
        icon: "error",
        title: "Erro ao cadastrar venda",
        text:
          error instanceof Error
            ? error.message
            : "Ocorreu um erro inesperado ao cadastrar a venda.",
      });
    }
  };

  return save;
};
