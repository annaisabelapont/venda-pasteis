export default function Statistics({
  info,
  title,
}: {
  info: string;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-2 p-7 bg-white rounded-md ">
      <span className="text-2xl text-center font-semibold text-green-800">{info}</span>
      <span className="text-center text-sm tracking-wider">{title}</span>
    </div>
  );
}
