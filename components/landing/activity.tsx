import { Caption, Shot } from "./shot"

export function Activity() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl sm:text-5xl">Nothing happens in the dark.</h2>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Every reply the assistant sends is in a log: what the customer asked, what it
          answered, which of your facts it used, and which private details it refused to
          share. If a reply is wrong, one click marks it, and you teach it a better
          answer.
        </p>
      </div>
      <div className="mt-14">
        <Shot
          screen="activity"
          tilt="-0.6deg"
          alt="The Activity Log: a list of assistant actions and a detail panel showing which facts were used and which were blocked."
        />
        <Caption className="text-center">Every action, with the reason. Sample data.</Caption>
      </div>
    </section>
  )
}
