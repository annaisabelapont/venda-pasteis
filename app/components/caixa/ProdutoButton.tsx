
export default function ProdutoButton({
  name,
  imgSrc,
}: {
  name: string;
  imgSrc: string;
}) {
  return (
    <button className="flex flex-col items-center justify-between border-1 border-grey p-4 gap-3 hover:bg-orange/10 transition-colors duration-100 rounded-md">
      <div className="w-full bg-grey/20 border-1 border-grey/35 flex justify-center items-center rounded-md">

      <img src={'../..' + imgSrc} className="h-32 object-contain" alt="Imagem do item" />
      
      </div>
      <div className="flex justify-between items-center w-full gap-2">
        <h2 className="font-semibold tracking-wide">
          {name}
        </h2>

        <span className="text-xs">R$ 10,00</span>
      </div>
    </button>
  );
}
