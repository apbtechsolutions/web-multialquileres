export function FaqList({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <details key={item.question} className="rounded-2xl border border-line bg-white p-4 open:shadow-sm">
          <summary className="cursor-pointer font-semibold text-brand-dark">{item.question}</summary>
          <p className="mt-3 text-sm leading-6 text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
