export default function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      border
      border-slate-200
      shadow-sm
      p-5
      h-full
      "
    >
      <div
        className="
        text-xs
        uppercase
        tracking-wider
        font-semibold
        text-slate-500
        mb-4
        "
      >
        {title}
      </div>

      {children}
    </div>
  );
}