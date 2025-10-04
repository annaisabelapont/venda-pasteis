export type Produto = {
  id: number;
  nome: string;
  valorUnitario: number;
  imgSrc: string;
};

export type Venda = {
  valor: number;
};

export type VendaProduto = {
  quantidade: number;
  valorTotal: number;
  idProdFk: number;
  idVendaFk: number;
};

export type VendaProdutoSQL = {
  quantidade: number;
  valor_total: number;
  id_prod_fk: number;
  id_venda_fk: number;
};
