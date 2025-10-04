"use client";

import {
  useListarVendaProdutosQuery,
  useListarVendasQuery,
} from "@/app/lib/vendas-service";
import { useQuery } from "@tanstack/react-query";

export default function ListagemVendas() {
  const vendas = useQuery(useListarVendasQuery());
  const vendaProdutos = useQuery(useListarVendaProdutosQuery());

  return (
    <ul className="bg-white rounded-md overflow-hidden">
      {(vendas.isLoading || vendaProdutos.isLoading) && (
        <span>Carregando...</span>
      )}
      {(vendas.isError || vendaProdutos.isError) && (
        <span>Não foi possível carregar a listagem de vendas.</span>
      )}
      {vendas.data !== undefined && vendaProdutos.data !== undefined && (
        <>
          {JSON.stringify(vendas.data.data)}
          {JSON.stringify(vendaProdutos.data.data)}
        </>
      )}
    </ul>
  );
}
