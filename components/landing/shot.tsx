import Image from "next/image"
import type { CSSProperties, ReactNode } from "react"
import { cn } from "@/lib/utils"

type Size = { w: number; h: number }
export type Region = { x: number; y: number; w: number; h: number }

// Every product screen is a 2000px-wide frame when measured; crops use that frame.
const FRAME_W = 2000

const SIZES = {
  dashboard: { w: 2880, h: 1536 },
  messages: { w: 2880, h: 1534 },
  activity: { w: 2880, h: 1538 },
  "knowledge-base": { w: 2880, h: 1540 },
  arrives: { w: 1545, h: 750 },
  source: { w: 1023, h: 720 },
} satisfies Record<string, Size>

export type Screen = keyof typeof SIZES

function Frame({
  tilt = "0deg",
  className,
  children,
}: {
  tilt?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div
      style={{ "--tilt": tilt } as CSSProperties}
      className={cn(
        "overflow-hidden rounded-2xl bg-white shadow-[0_40px_90px_-40px_oklch(0.4_0.12_285/0.45)] ring-1 ring-black/5",
        "rotate-(--tilt) transition-transform duration-500 ease-out hover:rotate-0 motion-reduce:transition-none",
        className,
      )}
    >
      {children}
    </div>
  )
}

export function Shot({
  screen,
  alt,
  tilt,
  className,
  priority,
  sizes = "(min-width: 1024px) 960px, 100vw",
}: {
  screen: Screen
  alt: string
  tilt?: string
  className?: string
  priority?: boolean
  sizes?: string
}) {
  const { w, h } = SIZES[screen]
  return (
    <Frame tilt={tilt} className={className}>
      <Image
        src={`/product-ui/${screen}.png`}
        alt={alt}
        width={w}
        height={h}
        sizes={sizes}
        priority={priority}
        className="block h-auto w-full"
      />
    </Frame>
  )
}

// A cropped window onto one of the 2880px screens, so a single export can serve
// several cards without faking a different screen.
export function Crop({
  screen,
  region,
  alt,
  tilt,
  className,
}: {
  screen: "messages" | "dashboard"
  region: Region
  alt: string
  tilt?: string
  className?: string
}) {
  const { w, h } = SIZES[screen]
  return (
    <Frame tilt={tilt} className={className}>
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: `${region.w} / ${region.h}` }}
      >
        <Image
          src={`/product-ui/${screen}.png`}
          alt={alt}
          width={w}
          height={h}
          sizes="(min-width: 1024px) 700px, 100vw"
          className="absolute max-w-none"
          style={{
            width: `${(FRAME_W / region.w) * 100}%`,
            left: `-${(region.x / region.w) * 100}%`,
            top: `-${(region.y / region.h) * 100}%`,
          }}
        />
      </div>
    </Frame>
  )
}

export function Caption({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p className={cn("mt-3 text-sm text-muted-foreground", className)}>{children}</p>
  )
}

export function SampleTag({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-brand-soft px-2.5 py-1 text-xs font-medium text-brand",
        className,
      )}
    >
      Sample data
    </span>
  )
}
