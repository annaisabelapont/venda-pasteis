export type Produto = {
  nome: string;
  valorUnitario: number;
}

export type Venda ={
  id: number;
  valor: number;
}

export type VendaProduto = {
  quantidade: number;
  valorTotal: number;
  idProdFk: number;
  idVendaFk: number;
}