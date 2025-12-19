"use client"

export default function PromptList({ prompts = [] }) {
  if (!prompts.length) return null

  function copyPrompt(text) {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-4 mt-6">
      {prompts.map((prompt, index) => {
        // Format prompt visually with line breaks (display only)
        const displayPrompt = prompt
          .replace(/ — /g, "\n— ")
          .replace(/, (?=[A-Z])/g, ",\n")
        
        return (
          <div
            key={index}
            className="bg-neutral-900 border border-neutral-800 rounded-lg p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold text-neutral-300">
                Prompt {String(index + 1).padStart(2, "0")}
              </h3>
              <button
                onClick={() => copyPrompt(prompt)}
                className="text-xs px-2 py-1 rounded bg-blue-600 hover:bg-blue-700"
              >
                Copy
              </button>
            </div>

            <pre className="text-sm text-neutral-200 whitespace-pre-wrap leading-relaxed">
              {displayPrompt}
            </pre>
          </div>
        )
      })}
    </div>
  )
}
