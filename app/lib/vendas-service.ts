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
    queryKey: ["vendas-listagem"],
    refetchInterval: 10000,
    queryFn: async () =>
      await supabase
        .from("venda")
        .select(
          "valor, venda_produto (quantidade, valor_total, produto (nome))"
        )
        .overrideTypes<VendaQueryResult[]>(),
  });

export const useSumVendasQuery = () =>
  queryOptions({
    queryKey: ["vendas-sum"],
    refetchInterval: 10000,
    queryFn: async () =>
      await supabase
        .from("venda_produto")
        .select("valor_total.sum()")
        .overrideTypes<VendaQueryResult[]>(),
  });

export const useSumQuantProdsQuery = () =>
  queryOptions({
    queryKey: ["vendas-quantidade-sum"],
    refetchInterval: 10000,
    queryFn: async () =>
      await supabase
        .from("venda_produto")
        .select("quantidade.sum()")
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
