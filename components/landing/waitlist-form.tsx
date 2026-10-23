"use client"

import { useState, useTransition } from "react"
import { CircleCheck } from "lucide-react"
import { joinWaitlist } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { validateWaitlist, type WaitlistErrors, type WaitlistInput } from "@/lib/waitlist"

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="text-sm text-destructive">
      {message}
    </p>
  )
}

export function WaitlistForm() {
  const [errors, setErrors] = useState<WaitlistErrors>({})
  const [done, setDone] = useState(false)
  const [failed, setFailed] = useState(false)
  const [pending, startTransition] = useTransition()

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const input: WaitlistInput = {
      name: String(form.get("name") ?? ""),
      whatsapp: String(form.get("whatsapp") ?? ""),
      business: String(form.get("business") ?? ""),
      channel: String(form.get("channel") ?? ""),
    }

    const result = validateWaitlist(input)
    if (!result.ok) {
      setErrors(result.errors)
      return
    }
    setErrors({})
    setFailed(false)
    startTransition(async () => {
      try {
        const response = await joinWaitlist(input)
        if (response.ok) setDone(true)
        else setErrors(response.errors)
      } catch {
        setFailed(true)
      }
    })
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <CircleCheck className="size-8 text-primary" aria-hidden />
        <p className="font-heading text-3xl">You&apos;re on the list.</p>
        <p className="text-muted-foreground">
          We&apos;ll message you on WhatsApp when early access opens.
        </p>
      </div>
    )
  }

  return (
    <form
      aria-label="Join the waitlist"
      onSubmit={onSubmit}
      noValidate
      className="space-y-5 text-left"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        <FieldError id="name-error" message={errors.name} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="whatsapp">WhatsApp number</Label>
        <Input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          autoComplete="tel"
          placeholder="077 123 4567"
          aria-invalid={!!errors.whatsapp}
          aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined}
        />
        <FieldError id="whatsapp-error" message={errors.whatsapp} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="business">Business name or Instagram handle</Label>
        <Input
          id="business"
          name="business"
          aria-invalid={!!errors.business}
          aria-describedby={errors.business ? "business-error" : undefined}
        />
        <FieldError id="business-error" message={errors.business} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="channel">Main sales channel</Label>
        <select
          id="channel"
          name="channel"
          defaultValue=""
          aria-invalid={!!errors.channel}
          aria-describedby={errors.channel ? "channel-error" : undefined}
          className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive"
        >
          <option value="" disabled>
            Choose one
          </option>
          <option value="whatsapp">WhatsApp</option>
          <option value="instagram">Instagram</option>
          <option value="both">Both</option>
        </select>
        <FieldError id="channel-error" message={errors.channel} />
      </div>
      {failed && (
        <p role="alert" className="text-sm text-destructive">
          Something went wrong. Please try again.
        </p>
      )}
      <Button type="submit" size="lg" disabled={pending} className="w-full rounded-full">
        {pending ? "Joining…" : "Join the waitlist"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        No spam. We&apos;ll only message you about early access.
      </p>
    </form>
  )
}
