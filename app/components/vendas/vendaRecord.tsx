import { VendaQueryResult } from "@/app/lib/vendas-service";
import { Fragment } from "react";

export default function VendaRecord({ venda }: { venda: VendaQueryResult }) {
  return (
    <li className="flex justify-between border-b border-grey p-5 hover:bg-orange/7 transition-colors duration-100">
      <div>
        {venda.venda_produto.map((prod, index) => (
          <Fragment key={index}>
            <span>
              {prod.produto.nome} ({prod.quantidade}x)
            </span>

            {index + 1 < venda.venda_produto.length && <span>, </span>}
          </Fragment>
        ))}
      </div>

      <span>R$ {venda.valor},00</span>
    </li>
  );
}
