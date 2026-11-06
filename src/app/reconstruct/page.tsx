"use client";

import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { WorkspaceShell } from "@/components/app/WorkspaceShell";
import { StyledDropdown } from "@/components/app/StyledDropdown";
import { parseFastaText } from "@/lib/paleogenome/fasta";
import type { DNASequenceRecord } from "@/lib/paleogenome/types";

const WINDOW_SIZES = [48, 96, 180];
const BASE_STYLE: Record<string, string> = {
  A: "bg-emerald-100 text-emerald-950 border-emerald-300",
  C: "bg-blue-100 text-blue-950 border-blue-300",
  G: "bg-amber-100 text-amber-950 border-amber-300",
  T: "bg-rose-100 text-rose-950 border-rose-300",
  N: "bg-slate-200 text-slate-800 border-slate-400",
  ambiguous: "bg-violet-100 text-violet-950 border-violet-300",
};

function isCanonical(base: string) {
  return base === "A" || base === "C" || base === "G" || base === "T";
}

function FieldLabel({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) {
  return <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-slate-800">{children}</label>;
}

export default function ReconstructionPage() {
  useEffect(() => {
    window.sessionStorage.removeItem("paleogenome-demo-run");
  }, []);

  const [records, setRecords] = useState<DNASequenceRecord[]>([]);
  const [activeId, setActiveId] = useState("");
  const [manualText, setManualText] = useState("");
  const [parseErrors, setParseErrors] = useState<string[]>([]);
  const [maskedPositions, setMaskedPositions] = useState<Set<number>>(new Set());
  const [maskStart, setMaskStart] = useState("");
  const [maskEnd, setMaskEnd] = useState("");
  const [maskError, setMaskError] = useState("");
  const [windowSize, setWindowSize] = useState(96);
  const [windowStart, setWindowStart] = useState(0);
  const inputCounter = useRef(0);
  const activeRecord = records.find((record) => record.localId === activeId) ?? null;
  const sequence = activeRecord?.sequence ?? "";
  const visibleSequence = useMemo(
    () => sequence.slice(windowStart, Math.min(sequence.length, windowStart + windowSize)),
    [sequence, windowStart, windowSize],
  );
  const stats = useMemo(() => {
    const counts = { A: 0, C: 0, G: 0, T: 0, N: 0, ambiguous: 0 };
    for (const base of sequence) {
      if (base === "A" || base === "C" || base === "G" || base === "T" || base === "N") counts[base] += 1;
      else counts.ambiguous += 1;
    }
    const canonical = counts.A + counts.C + counts.G + counts.T;
    const gcPercent = canonical ? ((counts.G + counts.C) / canonical) * 100 : null;
    return { ...counts, gcPercent };
  }, [sequence]);

  function activateRecord(record: DNASequenceRecord) {
    setActiveId(record.localId);
    setMaskedPositions(new Set());
    setWindowStart(0);
    setMaskStart("");
    setMaskEnd("");
    setMaskError("");
  }

  function receiveRecords(nextRecords: DNASequenceRecord[], errors: string[]) {
    setParseErrors(errors);
    if (!nextRecords.length) return;
    const identified = nextRecords.map((record, index) => ({ ...record, localId: `browser-input-${++inputCounter.current}-${index}` }));
    setRecords((current) => current.length && nextRecords[0].source === "manual" ? [...current, ...identified] : identified);
    setActiveId(identified[0].localId);
    setMaskedPositions(new Set());
    setWindowStart(0);
    setMaskStart("");
    setMaskEnd("");
  }

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const parsed = parseFastaText(await file.text(), "upload", file.name, false);
      receiveRecords(parsed.records, parsed.errors);
    } catch {
      setParseErrors(["The selected file could not be read. Try another FASTA file."]);
    }
    event.target.value = "";
  }

  function loadManualSequence() {
    const parsed = parseFastaText(manualText, "manual", undefined, true);
    receiveRecords(parsed.records, parsed.errors);
    if (parsed.records.length) setManualText("");
  }

  function applyMask() {
    if (!sequence) return;
    const start = Number(maskStart);
    const end = Number(maskEnd);
    if (!Number.isInteger(start) || !Number.isInteger(end) || start < 1 || end < start || end > sequence.length) {
      setMaskError(`Choose coordinates from 1 to ${sequence.length}, with the start before the end.`);
      return;
    }
    const next = new Set(maskedPositions);
    for (let index = start - 1; index < end; index += 1) {
      if (!isCanonical(sequence[index])) {
        setMaskError(`Region ${start}–${end} contains an ambiguous or naturally unknown base at position ${index + 1}. Select only A, C, G, or T bases.`);
        return;
      }
      next.add(index);
    }
    setMaskedPositions(next);
    setMaskError("");
    setWindowStart(Math.floor((start - 1) / windowSize) * windowSize);
  }

  function clearWorkspace() {
    setRecords([]);
    setActiveId("");
    setMaskedPositions(new Set());
    setParseErrors([]);
    setMaskError("");
    setManualText("");
    setWindowStart(0);
  }

  const rangeEnd = Math.min(sequence.length, windowStart + windowSize);
  const canPrevious = windowStart > 0;
  const canNext = rangeEnd < sequence.length;

  return (
    <WorkspaceShell active="/reconstruct">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="mb-8 max-w-3xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-teal-800">DNA reconstruction</p>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Sequence workspace</h1>
          <p className="mt-3 text-base leading-7 text-slate-700">Load a real FASTA sequence to inspect its bases and create a reversible masking experiment. Sequence handling stays in this browser.</p>
        </div>

        <section aria-labelledby="sequence-guide" className="mb-6 rounded-2xl border border-teal-200 bg-teal-50 p-5 sm:p-6">
          <h2 id="sequence-guide" className="text-lg font-semibold text-slate-950">What is a DNA sequence?</h2>
          <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-700">It is the order of DNA building blocks written as letters: <strong>A, C, G, and T</strong>. For example, <code className="rounded bg-white px-1.5 py-0.5 font-mono text-slate-900">ACGTTG</code> is six bases. <strong>N</strong> means a base is unknown in the input; purple letters mark other ambiguity codes.</p>
          <ol className="mt-4 grid gap-3 text-sm leading-6 text-slate-700 md:grid-cols-3">
            <li className="rounded-xl border border-teal-100 bg-white/80 p-3"><strong className="text-slate-950">1. Load a sequence.</strong> Paste a DNA sequence or open a FASTA file from a source you trust.</li>
            <li className="rounded-xl border border-teal-100 bg-white/80 p-3"><strong className="text-slate-950">2. Mask a region.</strong> Enter start and end coordinates. Orange N marks bases hidden for the experiment; gray N was already unknown.</li>
            <li className="rounded-xl border border-teal-100 bg-white/80 p-3"><strong className="text-slate-950">3. Reconstruct with a model.</strong> This is unavailable until a trained model and inference service are connected.</li>
          </ol>
        </section>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.72fr)]">
          <section aria-labelledby="source-heading" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5">
              <h2 id="source-heading" className="text-lg font-semibold text-slate-950">Sequence input</h2>
              <p className="mt-1 text-sm text-slate-600">No curated datasets are connected. Files and pasted sequences are parsed locally in this browser.</p>
            </div>
            <div>
              <FieldLabel htmlFor="fasta-file">Upload FASTA file</FieldLabel>
              <input id="fasta-file" type="file" accept=".fa,.fasta,.fna,.fas,.txt,text/plain" onChange={handleFile} className="block w-full cursor-pointer rounded-lg border border-slate-300 bg-white text-sm text-slate-700 file:mr-4 file:border-0 file:bg-teal-800 file:px-4 file:py-2.5 file:font-semibold file:text-white hover:file:bg-teal-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700" />
              <p className="mt-2 text-xs text-slate-600">FASTA records may contain A, C, G, T, IUPAC ambiguity symbols, and N.</p>
            </div>

            <div className="mt-6 border-t border-slate-200 pt-5">
              <FieldLabel htmlFor="manual-sequence">Or paste a DNA sequence</FieldLabel>
              <textarea id="manual-sequence" value={manualText} onChange={(event) => setManualText(event.target.value)} rows={4} spellCheck={false} placeholder={">optional_identifier description\nACGTNRY..."} className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2.5 font-mono text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/20" />
              <button type="button" onClick={loadManualSequence} className="mt-3 rounded-lg bg-teal-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700">Load sequence locally</button>
            </div>

            {parseErrors.length > 0 && (
              <div role="alert" className="mt-5 rounded-lg border border-rose-300 bg-rose-50 p-3 text-sm text-rose-950">
                <p className="font-semibold">Some sequence input needs attention</p>
                <ul className="mt-1 list-inside list-disc space-y-1">{parseErrors.map((error, index) => <li key={`${index}-${error}`}>{error}</li>)}</ul>
              </div>
            )}
          </section>

          <aside className="rounded-2xl border border-teal-900/15 bg-[#edf6f4] p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-900">Model status</p>
                <h2 className="mt-1 text-xl font-semibold text-slate-950">Model not connected</h2>
              </div>
              <span aria-hidden="true" className="mt-1 h-3 w-3 rounded-full bg-slate-400" />
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-700">No trained model or inference service is connected. You can inspect a real sequence and mask a region, but this page will not generate predictions until genuine model outputs are available.</p>
            <button type="button" disabled className="mt-5 w-full cursor-not-allowed rounded-lg bg-slate-300 px-4 py-3 text-sm font-semibold text-slate-600" aria-describedby="model-disabled-note">Reconstruction unavailable</button>
            <p id="model-disabled-note" className="mt-2 text-xs text-slate-600">No predictions, confidence scores, or accuracy values are being generated.</p>
          </aside>
        </div>

        <section aria-labelledby="sequence-heading" className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-800">Local sequence viewer</p>
              <h2 id="sequence-heading" className="mt-1 text-xl font-semibold text-slate-950">DNA sequence</h2>
            </div>
            <div className="flex flex-wrap items-end gap-3">
              <div className="min-w-48">
                <FieldLabel htmlFor="record-select">Loaded sequence</FieldLabel>
                <StyledDropdown id="record-select" value={activeId} disabled={records.length === 0} onChange={(id) => {
                  const selected = records.find((record) => record.localId === id);
                  if (selected) activateRecord(selected);
                }} options={records.length === 0 ? [{ value: "", label: "No sequence loaded" }] : records.map((record) => ({ value: record.localId, label: `${record.identifier} · ${record.sequence.length.toLocaleString()} bp` }))} />
              </div>
              {records.length > 0 && <button type="button" onClick={clearWorkspace} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Clear</button>}
            </div>
          </div>

          {!activeRecord ? (
            <div className="py-14 text-center">
              <p className="font-medium text-slate-800">No DNA sequence loaded</p>
              <p className="mt-1 text-sm text-slate-600">Upload a FASTA file or paste a sequence above. No sample data is preloaded.</p>
            </div>
          ) : (
            <>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Stat label="Sequence length" value={`${sequence.length.toLocaleString()} bp`} />
                <Stat label="GC content" value={stats.gcPercent === null ? "Not calculable" : `${stats.gcPercent.toFixed(1)}%`} detail="among unambiguous A/C/G/T bases" />
                <Stat label="Unknown N bases" value={stats.N.toLocaleString()} />
                <Stat label="Ambiguous bases" value={stats.ambiguous.toLocaleString()} />
              </div>

              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="truncate font-mono text-sm font-semibold text-slate-900" title={activeRecord.identifier}>{activeRecord.identifier}</p>
                    <p className="mt-1 text-xs text-slate-600">{activeRecord.source === "upload" ? `Uploaded file: ${activeRecord.sourceName ?? "unknown"}` : "Manual browser input"}{activeRecord.description ? ` · ${activeRecord.description}` : ""}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <span id="window-size-label">Window size</span>
                    <StyledDropdown id="window-size" ariaLabelledBy="window-size-label" widthClass="w-36" value={String(windowSize)} onChange={(value) => { setWindowSize(Number(value)); setWindowStart(0); }} options={WINDOW_SIZES.map((size) => ({ value: String(size), label: `${size} bases` }))} />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-medium tabular-nums text-slate-700">Positions {sequence.length ? `${windowStart + 1}–${rangeEnd}` : "0"} of {sequence.length.toLocaleString()}</p>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setWindowStart(Math.max(0, windowStart - windowSize))} disabled={!canPrevious} className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-45">Previous</button>
                    <button type="button" onClick={() => setWindowStart(Math.min(Math.max(0, sequence.length - 1), windowStart + windowSize))} disabled={!canNext} className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-45">Next</button>
                  </div>
                </div>

                <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-white p-3" aria-label="Scrollable DNA sequence window">
                  <div className="flex min-w-max gap-1.5" role="list" aria-label={`Bases at positions ${windowStart + 1} to ${rangeEnd}`}>
                    {Array.from(visibleSequence).map((base, index) => {
                      const position = windowStart + index;
                      const masked = maskedPositions.has(position);
                      const displayBase = masked ? "N" : base;
                      const style = masked ? "bg-orange-100 text-orange-950 border-orange-500 ring-1 ring-orange-400" : BASE_STYLE[base] ?? BASE_STYLE.ambiguous;
                      const coordinate = position % 10 === 0 || position === windowStart;
                      return (
                        <div role="listitem" key={position} className="flex w-8 shrink-0 flex-col items-center gap-1">
                          <span className="h-3 text-[9px] tabular-nums text-slate-500">{coordinate ? (position + 1).toLocaleString() : ""}</span>
                          <span title={`Position ${(position + 1).toLocaleString()}: ${masked ? "experimentally masked base" : base}`} aria-label={`Position ${(position + 1).toLocaleString()}, ${masked ? "experimentally masked" : base}`} className={`grid h-9 w-8 place-items-center rounded border font-mono text-sm font-bold ${style}`}>{displayBase}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-700" aria-label="Nucleotide color legend">
                  {[["A", "Adenine"], ["C", "Cytosine"], ["G", "Guanine"], ["T", "Thymine"], ["N", "Unknown/natural N"], ["◇", "Other IUPAC ambiguity"], ["N", "Artificially masked"]].map(([symbol, label], index) => <span key={`${label}-${index}`} className="inline-flex items-center gap-1.5"><span aria-hidden="true" className={`grid h-5 min-w-5 place-items-center rounded border px-1 font-mono font-bold ${index === 6 ? "border-orange-500 bg-orange-100 text-orange-950" : BASE_STYLE[symbol] ?? BASE_STYLE.ambiguous}`}>{symbol}</span>{label}</span>)}
                </div>
              </div>

              <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.7fr)]">
                <div className="rounded-xl border border-slate-200 p-4">
                  <h3 className="font-semibold text-slate-950">Experimental masking</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">Select a 1-based region of known A/C/G/T bases. The original sequence remains in local memory; masked positions display as orange N and are not predictions.</p>
                  <div className="mt-4 flex flex-wrap items-end gap-3">
                    <div><FieldLabel htmlFor="mask-start">Start position</FieldLabel><input id="mask-start" type="number" min="1" max={sequence.length} value={maskStart} onChange={(event) => setMaskStart(event.target.value)} style={{ colorScheme: "light" }} className="w-32 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm placeholder:text-slate-400 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/20" /></div>
                    <div><FieldLabel htmlFor="mask-end">End position</FieldLabel><input id="mask-end" type="number" min="1" max={sequence.length} value={maskEnd} onChange={(event) => setMaskEnd(event.target.value)} style={{ colorScheme: "light" }} className="w-32 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm placeholder:text-slate-400 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/20" /></div>
                    <button type="button" onClick={applyMask} className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700">Mask region</button>
                    <button type="button" onClick={() => { setMaskedPositions(new Set()); setMaskError(""); }} disabled={maskedPositions.size === 0} className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45">Restore all</button>
                  </div>
                  {maskError && <p role="alert" className="mt-3 text-sm text-rose-800">{maskError}</p>}
                  <p className="mt-3 text-xs text-slate-600">{maskedPositions.size.toLocaleString()} artificially masked position{maskedPositions.size === 1 ? "" : "s"} · N in gray is naturally present in the input.</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="font-semibold text-slate-950">Reconstruction results</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">No model output is available yet. Masking only hides selected bases; it does not predict replacements.</p>
                  <div className="mt-4 rounded-lg border border-dashed border-slate-300 bg-white px-4 py-5 text-sm leading-6 text-slate-600">Real predictions and confidence scores will appear here after a trained model and inference service are connected.</div>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </WorkspaceShell>
  );
}

function Stat({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return <div className="rounded-lg border border-slate-200 bg-white px-4 py-3"><p className="text-xs font-medium text-slate-600">{label}</p><p className="mt-1 text-lg font-semibold tabular-nums text-slate-950">{value}</p>{detail && <p className="text-[11px] text-slate-600">{detail}</p>}</div>;
}

