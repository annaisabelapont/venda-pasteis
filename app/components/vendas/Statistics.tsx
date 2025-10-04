export default function Statistics({
  info,
  title,
  isLoading,
  isError,
}: {
  info: string;
  title: string;
  isLoading: boolean;
  isError: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 p-7 bg-white rounded-md ">
      {isLoading && <span>Carregando...</span>}
      {isError && <span>Não foi possível carregar a informação.</span>}

      {!isLoading && !isError && (
        <>
          <span className="text-2xl text-center font-semibold text-green-800">
            {info}
          </span>
          <span className="text-center text-sm tracking-wider">{title}</span>
        </>
      )}
    </div>
  );
}
