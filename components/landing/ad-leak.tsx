import { PRODUCT_NAME } from "./content"
import { Caption, Shot } from "./shot"

export function AdLeak() {
  return (
    <section className="bg-pastel-soft py-24">
      <div className="mx-auto grid w-full max-w-5xl items-center gap-14 px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-balance text-4xl sm:text-5xl">
            See which ad is leaking enquiries.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            You boost a post. Some chats go to WhatsApp, some to Messenger.{" "}
            {PRODUCT_NAME} shows, for each post, how many messages arrived on each app
            and how many are still unanswered, so you find the leak the same day.
          </p>
        </div>
        <div>
          <Shot
            screen="source"
            tilt="1.5deg"
            sizes="(min-width: 1024px) 480px, 100vw"
            alt="Chats by app: WhatsApp, Instagram and Messenger, with a warning about unanswered chats from the boosted post."
          />
          <Caption className="text-center">
            Sample data from a made-up shop. Not a real result.
          </Caption>
        </div>
      </div>
    </section>
  )
}
