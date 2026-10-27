export function Eyebrow({
  children,
  center = false,
}: {
  children: React.ReactNode
  center?: boolean
}) {
  return (
    <p className={center ? "mb-4 text-center" : "mb-4"}>
      <span className="inline-flex items-center rounded-full border border-brand/15 bg-white/80 px-3 py-1 text-xs font-medium text-brand shadow-sm">
        {children}
      </span>
    </p>
  )
}
