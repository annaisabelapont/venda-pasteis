"use client";

import { useListarVendasQuery } from "@/app/lib/vendas-service";
import { useQuery } from "@tanstack/react-query";
import VendaRecord from "./VendaRecord";

export default function ListagemVendas() {
  const vendas = useQuery(useListarVendasQuery());

  return (
    <ul className="bg-white rounded-md overflow-hidden">
      {vendas.isLoading && <span>Carregando...</span>}
      {(vendas.isError || vendas.error !== null) && (
        <span>Não foi possível carregar a listagem de vendas.</span>
      )}
      {
        vendas.data !== undefined &&
          vendas.data.data !== null &&
          vendas.data.data.map((venda, index) => (
            <VendaRecord key={index} venda={venda} />
          ))
        // <pre>{JSON.stringify(vendas.data.data, null, 2)}</pre>
      }
    </ul>
  );
}
