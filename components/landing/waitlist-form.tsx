"use client"

import { useState, useTransition } from "react"
import { CircleCheck } from "lucide-react"
import { joinWaitlist, saveWaitlistDetails } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  CHANNELS,
  SELLS,
  validateDetails,
  validateEmail,
  type DetailsErrors,
  type Source,
} from "@/lib/waitlist"
import { cn } from "@/lib/utils"

const CHANNEL_LABELS: Record<(typeof CHANNELS)[number], string> = {
  messenger: "Messenger",
  instagram: "Instagram",
  whatsapp: "WhatsApp",
  equal: "About equal",
}

const selectClass =
  "h-9 w-full rounded-lg border border-input bg-white px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive"

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="text-sm text-destructive">
      {message}
    </p>
  )
}

// UTM tags let us tell real owners from classmates, so read them at submit time.
function readSource(): Source {
  const params = new URLSearchParams(window.location.search)
  const pick = (k: keyof Source) => params.get(k) ?? undefined
  return {
    utm_source: pick("utm_source"),
    utm_medium: pick("utm_medium"),
    utm_campaign: pick("utm_campaign"),
  }
}

type Stage = "email" | "joined" | "thanks"

export function WaitlistForm() {
  const [stage, setStage] = useState<Stage>("email")
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState<string>()
  const [detailErrors, setDetailErrors] = useState<DetailsErrors>({})
  const [channel, setChannel] = useState("")
  const [failed, setFailed] = useState(false)
  const [pending, startTransition] = useTransition()

  function onJoin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const result = validateEmail(String(form.get("email") ?? ""))
    if (!result.ok) {
      setEmailError(result.error)
      return
    }
    setEmailError(undefined)
    setFailed(false)
    startTransition(async () => {
      try {
        const response = await joinWaitlist({
          email: result.email,
          source: readSource(),
          trap: String(form.get("company_website") ?? ""),
        })
        if (response.ok) {
          setEmail(result.email)
          setStage("joined")
        } else setEmailError(response.error)
      } catch {
        setFailed(true)
      }
    })
  }

  function onDetails(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const input = {
      sells: String(form.get("sells") ?? ""),
      channel,
      whatsapp: String(form.get("whatsapp") ?? ""),
    }
    const result = validateDetails(input)
    if (!result.ok) {
      setDetailErrors(result.errors)
      return
    }
    setDetailErrors({})
    setFailed(false)
    startTransition(async () => {
      try {
        const response = await saveWaitlistDetails({ ...input, email })
        if (response.ok) setStage("thanks")
        else {
          setDetailErrors(response.errors)
          if (Object.keys(response.errors).length === 0) setFailed(true)
        }
      } catch {
        setFailed(true)
      }
    })
  }

  if (stage === "thanks") {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <CircleCheck className="size-8 text-brand" aria-hidden />
        <p className="text-3xl font-medium tracking-tight">Thank you. That helps.</p>
        <p className="text-muted-foreground">
          We will email you at {email} when your spot opens.
        </p>
      </div>
    )
  }

  if (stage === "joined") {
    return (
      <div className="text-left">
        <div className="flex flex-col items-center gap-2 text-center">
          <CircleCheck className="size-8 text-brand" aria-hidden />
          <p className="text-3xl font-medium tracking-tight">You&apos;re on the list.</p>
          <p className="text-muted-foreground">We will email you at {email}.</p>
        </div>
        <form
          aria-label="A few optional questions"
          onSubmit={onDetails}
          noValidate
          className="mt-7 space-y-5 border-t pt-6"
        >
          <fieldset>
            <legend className="text-sm font-medium">
              One thing that helps us: which app do your customers message you on most?
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {CHANNELS.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={channel === c}
                  onClick={() => setChannel(channel === c ? "" : c)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm transition-colors",
                    channel === c
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-white hover:bg-muted",
                  )}
                >
                  {CHANNEL_LABELS[c]}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="space-y-2">
            <Label htmlFor="sells">What do you sell? (optional)</Label>
            <select
              id="sells"
              name="sells"
              defaultValue=""
              aria-invalid={!!detailErrors.sells}
              className={selectClass}
            >
              <option value="">Choose one</option>
              {SELLS.map((s) => (
                <option key={s} value={s}>
                  {s[0].toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
            <FieldError id="sells-error" message={detailErrors.sells} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp number for early access (optional)</Label>
            <Input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              autoComplete="tel"
              placeholder="077 123 4567"
              aria-invalid={!!detailErrors.whatsapp}
              aria-describedby={detailErrors.whatsapp ? "whatsapp-error" : undefined}
              className="h-9 bg-white"
            />
            <FieldError id="whatsapp-error" message={detailErrors.whatsapp} />
          </div>
          {failed && (
            <p role="alert" className="text-sm text-destructive">
              Something went wrong. Please try again.
            </p>
          )}
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={pending} className="h-10 rounded-full px-5">
              {pending ? "Sending…" : "Send answers"}
            </Button>
            <button
              type="button"
              onClick={() => setStage("thanks")}
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              Skip
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <form
      aria-label="Join the waitlist"
      onSubmit={onJoin}
      noValidate
      className="space-y-5 text-left"
    >
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@yourshop.lk"
          aria-invalid={!!emailError}
          aria-describedby={emailError ? "email-error" : undefined}
          className="h-10 bg-white"
        />
        <FieldError id="email-error" message={emailError} />
      </div>
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {failed && (
        <p role="alert" className="text-sm text-destructive">
          Something went wrong. Please try again.
        </p>
      )}
      <Button
        type="submit"
        size="lg"
        disabled={pending}
        className="h-11 w-full rounded-full text-base"
      >
        {pending ? "Joining…" : "Join the waitlist"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        We use your email only for this waitlist.
      </p>
    </form>
  )
}
