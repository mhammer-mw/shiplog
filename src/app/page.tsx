import { APP_NAME, APP_VERSION } from "@/lib/app-info";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 bg-zinc-50 p-8 text-center font-sans dark:bg-black">
      <span className="rounded-full border border-black/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-black/50 dark:border-white/15 dark:text-white/50">
        MVP · v{APP_VERSION}
      </span>
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">{APP_NAME}</h1>
      <p className="max-w-md text-balance text-lg text-black/60 dark:text-white/60">
        Turn the work you ship into a public changelog — automatically.
      </p>
      <p className="font-mono text-sm text-black/40 dark:text-white/40">
        Hello, world. The foundation is live. 🚀
      </p>
    </main>
  );
}
