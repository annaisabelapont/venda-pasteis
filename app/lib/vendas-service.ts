import { createClient } from "@supabase/supabase-js";
import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { Venda, VendaProduto, VendaProdutoSQL } from "./types";

const supabaseUrl = "https://wmruvrmxaiqusvyfllyq.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);
// export const useSupabaseClient = () => {
//   return supabase;
// };

// listagens

// TODO: relacionar com a tabela venda_produto
export const useListarVendasQuery = () => {
  // const supabase = useSupabaseClient();

  return queryOptions({
    queryKey: ["vendas-listagem"],
    queryFn: async () => await supabase.from("venda").select(),
  });
};
export const useListarVendaProdutosQuery = () => {
  // const supabase = useSupabaseClient();

  return queryOptions({
    queryKey: ["vendas-listagem"],
    queryFn: async () => await supabase.from("venda_produto").select(),
  });
};

// cadastros

export const useCadastrarVendaMutation = () => {
  // const supabase = useSupabaseClient();

  return mutationOptions({
    mutationFn: async (venda: Venda) =>
      await supabase
        .from("venda")
        .insert({
          valor: venda.valor,
        })
        .select(),
  });
};

export const useCadastrarVendaProdutosMutation = () => {
  // const supabase = useSupabaseClient();

  return mutationOptions({
    mutationFn: async (vendaProdutos: VendaProdutoSQL[]) =>
      await supabase.from("venda_produto").insert(vendaProdutos).select(),
  });
};
