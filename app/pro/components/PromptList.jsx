"use client"
export default function PromptList({prompts=[]}) {
  if (!prompts || !prompts.length) return <div className="p-4 bg-neutral-900 rounded">No prompts yet</div>
  return (
    <div className="mt-4 p-4 bg-neutral-900 rounded border border-neutral-800">
      <h3 className="text-sm text-neutral-300 mb-2">Generated Prompts</h3>
      <div className="space-y-3">
        {prompts.map((p,i)=>(
          <pre key={i} className="p-3 bg-black/60 rounded text-xs whitespace-pre-wrap">{p}</pre>
        ))}
      </div>
    </div>
  )
}
