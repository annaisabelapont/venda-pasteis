"use client";

import Statistics from "@/app/components/vendas/Statistics";
import ListagemVendas from "@/app/components/vendas/VendasListagem";
import {
  useSumQuantProdsQuery,
  useSumVendasQuery,
} from "@/app/lib/vendas-service";
import { useQuery } from "@tanstack/react-query";

export default function VendasListagemEEstatisticas() {
  const somaValor = useQuery(useSumVendasQuery());
  const somaQuantidade = useQuery(useSumQuantProdsQuery());

  const formatCurrency = (valor: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(valor);

  const valorTotal = somaValor.data?.data?.[0]?.sum ?? 0;
  const quantidadeTotal = somaQuantidade.data?.data?.[0]?.sum ?? 0;

  return (
    <div className="mx-50">
      <div className="flex justify-center flex-wrap gap-15 mt-6 mb-14">
        {!(somaValor.isLoading || somaQuantidade.isLoading) && (
          <>
            <Statistics
              isLoading={somaValor.isLoading}
              isError={somaValor.isError}
              info={formatCurrency(valorTotal)}
              title="LUCRO TOTAL"
            />
            <Statistics
              isLoading={somaQuantidade.isLoading}
              isError={somaQuantidade.isError}
              info={`${quantidadeTotal}`}
              title="PASTÉIS VENDIDOS"
            />
          </>
        )}
      </div>

      <ListagemVendas />
    </div>
  );
}
