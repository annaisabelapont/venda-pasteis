import Statistics from "@/app/components/vendas/Statistics";
import ListagemVendas from "@/app/components/vendas/VendasListagem";

export default function VendasListagemEEstatisticas() {
  return (
    <div className="mx-50">
      <div className="flex justify-center gap-15 mt-6 mb-14">
        <Statistics info="R$ 250,00" title="LUCRO TOTAL" />
        <Statistics info="25" title="PASTÉIS VENDIDOS" />
      </div>

      <ListagemVendas />
    </div>
  );
}
