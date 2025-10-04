import { createClient } from "@supabase/supabase-js";
import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { Venda, VendaProdutoSQL } from "./types";

const supabaseUrl = "https://wmruvrmxaiqusvyfllyq.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export type VendaQueryResult = {
  valor: number;
  venda_produto: {
    produto: { nome: string };
    quantidade: number;
    valor_total: number;
  }[];
};

// ===== listagens =====

export const useListarVendasQuery = () =>
  queryOptions({
    queryKey: ["venda-produtos-listagem"],
    queryFn: async () =>
      await supabase
        .from("venda")
        .select(
          "valor, venda_produto (quantidade, valor_total, produto (nome))"
        )
        .overrideTypes<VendaQueryResult[]>(),
  });

// ===== cadastros =====

export const useCadastrarVendaMutation = () =>
  mutationOptions({
    mutationFn: async (venda: Venda) =>
      await supabase
        .from("venda")
        .insert({
          valor: venda.valor,
        })
        .select(),
  });

export const useCadastrarVendaProdutosMutation = () =>
  mutationOptions({
    mutationFn: async (vendaProdutos: VendaProdutoSQL[]) =>
      await supabase.from("venda_produto").insert(vendaProdutos).select(),
  });
