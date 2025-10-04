"use client";

import VendaRecord from "./VendaRecord";
import { useListarVendasQuery } from "@/app/lib/vendasService";
import { useQuery } from "@tanstack/react-query";

// { vendas }: { vendas: Venda[] }
export default function ListagemVendas() {
  const { data: vendas, isError, isLoading } = useQuery(useListarVendasQuery());

  return (
    <>
      <ul className="bg-white rounded-md overflow-hidden">
        {isLoading && <span>Carregando...</span>}
        {isError && (
          <span>Não foi possível carregar a listagem de vendas.</span>
        )}
        {vendas !== undefined && JSON.stringify(vendas.data)

        }
      </ul>
    </>
  );
}
