import ProdutoButton from "@/app/components/caixa/ProdutoButton";

export default async function Caixa() {
  const produtosList = [
    { name: "Queijo", imgSrc: "/pastel-queijo.jpg" },
    { name: "Carne com queijo", imgSrc: "/pastel-carne-queijo.jpg" },
    { name: "Carne", imgSrc: "/pastel-carne.webp" },
    { name: "Pizza", imgSrc: "/pastel-pizza.webp" },
  ];
  return (
    <div className="flex gap-10 justify-center mt-5">
      <div className=" grid grid-cols-3 grid-flow-row gap-8 p-7 border-1 border-grey  bg-white rounded-md">
        {produtosList.map((prod, idx) => (
          <ProdutoButton key={idx} name={prod.name} imgSrc={prod.imgSrc} />
        ))}
      </div>

      <div className="flex flex-col justify-between border-1 border-grey p-3 px-5 bg-white rounded-md">
        <div>
          <h1 className="text-center font-semibold mb-2"> CARRINHO </h1>

          <ul className="flex flex-col gap-3">
            <li className=" flex justify-between">
              <span>Queijo (2x)</span>
              <span>R$ 20,00</span>
            </li>
            {/* <li className=" flex justify-between">
              <span>Queijo</span>
              <span>999 reais</span>
              </li> */}
            <li className=" flex justify-between">
              <span>Carne (1x)</span>
              <span>R$ 10,00</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3.5 min-w-56">
          <div className="flex justify-between mb-3 font-semibold text-lg">
            <span>TOTAL</span>

            <span>R$ 30,00</span>
          </div>

          <button className="bg-red-50 border-1 border-red-100 text-red-950 p-1.5 px-3 rounded-md font-medium hover:brightness-97 transition-filter duration-100">
            Cancelar compra ❌
          </button>
          
          <button className="rounded-md font-medium p-1.5 px-3 bg-green-50 border-1 border-green-200 text-green-950 hover:brightness-97 transition-filter duration-100">
            Confirmar compra ✅
          </button>
        </div>
      </div>
    </div>
  );
}
