export default function ProdutoButton({
  name,
  imgSrc,
  handleClick
}: {
  name: string;
  imgSrc: string;
  handleClick: () => void
}) {
  return (
    <button onClick={handleClick} className="flex flex-col items-center justify-between border-1 border-grey p-4 gap-3 hover:bg-orange/10 hover:-translate-y-0.5 transition-all duration-100 rounded-md">
      <div className="w-full bg-grey/20 border-1 border-grey/35 flex justify-center items-center rounded-md">
        {/* eslint-disable @next/next/no-img-element  */}
        <img
          src={"../" + imgSrc}
          className="h-32 object-contain"
          alt="Imagem do item"
        />
      </div>
      <div className="flex justify-between items-center w-full gap-2">
        <h2 className="font-semibold tracking-wide">{name}</h2>

        <span className="text-xs">R$ 10,00</span>
      </div>
    </button>
  );
}
