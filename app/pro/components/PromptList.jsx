"use client"

export default function PromptList({ prompts }) {
  if (!prompts.length) return null

  function copy(text) {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-4 mt-6">
      {prompts.map((prompt, index) => (
        <div
          key={index}
          className="bg-neutral-900 border border-neutral-800 rounded p-4"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-neutral-400">
              Prompt {index + 1}
            </div>
            <button
              onClick={() => copy(prompt)}
              className="text-xs px-2 py-1 bg-blue-600 rounded"
            >
              Copy
            </button>
          </div>

          <pre className="text-sm whitespace-pre-wrap leading-relaxed text-neutral-200">
            {prompt}
          </pre>
        </div>
      ))}
    </div>
  )
}
