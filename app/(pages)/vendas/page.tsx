import Statistics from "@/app/components/vendas/Statistics";
import VendaRecord from "@/app/components/vendas/VendaRecord";

export default function Caixa() {
  return (
    <div className="mx-50">
      <div className="flex justify-center gap-15 mt-6 mb-14">
        <Statistics info="R$ 250,00" title="LUCRO TOTAL" />
        <Statistics info="25" title="PASTÉIS VENDIDOS" />
      </div>

      <ul className="bg-white rounded-md overflow-hidden">
        <VendaRecord />
        <VendaRecord />
        <VendaRecord />
        <VendaRecord />
        <VendaRecord />
      </ul>
    </div>
  );
}
