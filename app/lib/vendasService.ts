import { createClient } from "@supabase/supabase-js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Venda, VendaProduto } from "./types";

const supabaseUrl = "https://wmruvrmxaiqusvyfllyq.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY!;

const useSupabaseClient = () => {
  const supabase = createClient(supabaseUrl, supabaseKey);
  return supabase;
};

export const vendasService = {
  cadastrar: async (venda: Venda, vendaProdutos: VendaProduto[]) => {
    const supabase = useSupabaseClient();

    const {mutate: vendaMutate} = useMutation({
      mutationFn: async () =>
        await supabase.from("venda").insert({
          id: venda.id,
          valor: venda.valor,
        }),
    });

    vendaMutate();

    //

    vendaProdutos.forEach((vp) => {
      const {mutate: vpMutate} = useMutation({
        mutationFn: async () =>
          await supabase.from("venda_produto").insert({
            quantidade: vp.quantidade,
            valor_total: vp.valorTotal,
            id_prod_fk: vp.idProdFk,
            id_venda_fk: vp.idVendaFk,
          }),
      });

      vpMutate();
    });
  },

  listar: async () => {
    const supabase = useSupabaseClient();

    const {
      data: vendas,
      isLoading,
      isError,
    } = useQuery({
      queryKey: ["vendas-listagem"],
      queryFn: async () => await supabase.from("produto").select(),
    });

    return { vendas, isLoading, isError };
  },
};
