import PromptGenerator from "./components/PromptGenerator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Stills Archive Meta Generator PRO
      </h1>
      <p className="text-neutral-400 text-sm mb-6 text-center">
        Enter any subject or scene to instantly generate 10 cinematic stills-archive prompts.
      </p>
      <PromptGenerator />
    </main>
  );
}
