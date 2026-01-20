export default function SectionHeader({ title, subtitle }: { title: string, subtitle?: string }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold mb-3">{title}</h2>
      {subtitle && <p className="text-gray-500 max-w-2xl mx-auto">{subtitle}</p>}
      <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
    </div>
  );
}