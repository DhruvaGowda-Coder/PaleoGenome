import { WorkspaceShell } from "@/components/app/WorkspaceShell";

const pendingSections = [
  {
    eyebrow: "Model information",
    title: "No model connected",
    description: "Model version, architecture, and training data will be listed when the actual model is integrated.",
  },
  {
    eyebrow: "Training history",
    title: "No training logs available",
    description: "Training and validation curves require genuine logs from a trained model.",
  },
  {
    eyebrow: "Reconstruction evaluation",
    title: "No evaluation results available",
    description: "Accuracy and other metrics will appear only after real predictions are compared with held-out reference DNA.",
  },
  {
    eyebrow: "Sequence comparison",
    title: "No model predictions available",
    description: "Input, predicted bases, and reference bases will be shown when a connected model returns an actual result.",
  },
];

export default function ModelResultsPage() {
  return (
    <WorkspaceShell active="/results">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="mb-8 max-w-3xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-teal-800">Model results</p>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Results and validation</h1>
          <p className="mt-3 text-base leading-7 text-slate-700">This page is reserved for outputs from the connected trained model. It does not contain generated sample metrics or sample predictions.</p>
        </div>

        <section aria-labelledby="connection-status" className="rounded-2xl border border-amber-300 bg-amber-50 p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-900">Connection status</p>
          <h2 id="connection-status" className="mt-1 text-xl font-semibold text-slate-950">No trained model or inference service connected</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700">No predictions, confidence values, training curves, or accuracy metrics can be reported yet. This page will populate when the actual model and its verified outputs are integrated.</p>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {pendingSections.map((section) => (
            <section key={section.eyebrow} aria-label={section.eyebrow} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-800">{section.eyebrow}</p>
              <h2 className="mt-1 text-xl font-semibold text-slate-950">{section.title}</h2>
              <p className="mt-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm leading-6 text-slate-600">{section.description}</p>
            </section>
          ))}
        </div>
      </div>
    </WorkspaceShell>
  );
}
