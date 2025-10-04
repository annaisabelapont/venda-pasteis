import { createClient, PostgrestSingleResponse } from "@supabase/supabase-js";
import {
  mutationOptions,
  queryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { Venda, VendaProduto } from "./types";

const supabaseUrl = "https://wmruvrmxaiqusvyfllyq.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;

export const useSupabaseClient = () => {
  const supabase = createClient(supabaseUrl, supabaseKey);
  return supabase;
};

//

export const useListarVendasQuery = () => {
  const supabase = useSupabaseClient();

  return queryOptions({
    queryKey: ["vendas-listagem"],
    queryFn: async () => await supabase.from("venda").select(),
  });
};

// cadastros

export const useCadastrarVendaMutation = (venda: Venda) => {
  const supabase = useSupabaseClient();

  return mutationOptions({
    mutationFn: async () =>
      await supabase.from("venda").insert({
        id: venda.id,
        valor: venda.valor,
      }),
  });
};

export const useCadastrarVendaProdutosMutation = (
  vendaProduto: VendaProduto
) => {
  const supabase = useSupabaseClient();

  return mutationOptions({
    mutationFn: async () =>
      await supabase.from("venda_produto").insert({
        quantidade: vendaProduto.quantidade,
        valor_total: vendaProduto.valorTotal,
        id_prod_fk: vendaProduto.idProdFk,
        id_venda_fk: vendaProduto.idVendaFk,
      }),
  });
};
