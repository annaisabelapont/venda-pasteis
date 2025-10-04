export type Produto = {
  id: number;
  nome: string;
  valorUnitario: number;
  imgSrc: string;
};

export type Venda = {
  id: number;
  valor: number;
};

export type VendaProduto = {
  quantidade: number;
  valorTotal: number;
  idProdFk: number;
  idVendaFk: number;
};
