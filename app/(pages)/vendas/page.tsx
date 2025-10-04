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

  return (
    <div className="mx-50">
      <div className="flex justify-center gap-15 mt-6 mb-14">
        {somaValor.data && somaQuantidade.data && (
          <>
            <Statistics
              isLoading={somaValor.isLoading}
              isError={somaValor.isError}
              info={`R$ ${somaValor.data!.data![0].sum},00`}
              title="LUCRO TOTAL"
            />
            <Statistics
              isLoading={somaQuantidade.isLoading}
              isError={somaQuantidade.isError}
              info={`${somaQuantidade.data!.data![0].sum}`}
              title="PASTÉIS VENDIDOS"
            />
          </>
        )}
      </div>

      <ListagemVendas />
    </div>
  );
}
