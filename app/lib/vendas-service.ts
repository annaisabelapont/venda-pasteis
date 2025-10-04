import { createClient } from "@supabase/supabase-js";
import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { Venda, VendaProduto, VendaProdutoSQL } from "./types";

const supabaseUrl = "https://wmruvrmxaiqusvyfllyq.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// ===== listagens =====

export const useListarVendasQuery = () =>
  queryOptions({
    queryKey: ["venda-produtos-listagem"],
    queryFn: async () =>
      await supabase
        .from("venda")
        .select(
          "id, valor, venda_produto (id, quantidade, valor_total, produto (id, nome)) "
        ),
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
