import type { DNASequenceRecord } from "./types";

// IUPAC nucleotide alphabet for DNA, including ambiguity symbols and N.
export const DNA_ALPHABET = "ACGTRYSWKMBDHVN";
const VALID_BASES = new Set(DNA_ALPHABET);

export interface FastaParseResult {
  records: DNASequenceRecord[];
  errors: string[];
}

interface RawRecord {
  header: string;
  chunks: string[];
}

/** Parse FASTA records, or a single raw sequence when allowRawSequence is true. */
export function parseFastaText(
  text: string,
  source: DNASequenceRecord["source"],
  sourceName?: string,
  allowRawSequence = false,
): FastaParseResult {
  const errors: string[] = [];
  const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/);
  const hasHeader = lines.some((line) => line.trimStart().startsWith(">"));

  if (!hasHeader) {
    if (!allowRawSequence) {
      return { records: [], errors: ["FASTA files must start each record with a >header line."] };
    }
    const raw = lines.join("").replace(/\s/g, "").toUpperCase();
    if (!raw) return { records: [], errors: ["Enter a DNA sequence before loading it."] };
    const invalid = findInvalidSymbols(raw);
    if (invalid.length) {
      return { records: [], errors: [`Unsupported symbol(s): ${invalid.join(", ")}. Use the IUPAC DNA alphabet.`] };
    }
    return {
      records: [{ localId: "manual-0", identifier: "Manual sequence", sequence: raw, source, sourceName }],
      errors,
    };
  }

  const rawRecords: RawRecord[] = [];
  let current: RawRecord | null = null;

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    if (trimmed.startsWith(">")) {
      const header = trimmed.slice(1).trim();
      if (!header) {
        errors.push(`Line ${index + 1}: FASTA header is empty.`);
        current = null;
        return;
      }
      current = { header, chunks: [] };
      rawRecords.push(current);
      return;
    }
    if (!current) {
      errors.push(`Line ${index + 1}: sequence data appears before a valid >header.`);
      return;
    }
    current.chunks.push(trimmed.replace(/\s/g, ""));
  });

  const records: DNASequenceRecord[] = [];
  rawRecords.forEach((record, index) => {
    const sequence = record.chunks.join("").toUpperCase();
    if (!sequence) {
      errors.push(`Record “${record.header}” has no sequence.`);
      return;
    }
    const invalid = findInvalidSymbols(sequence);
    if (invalid.length) {
      errors.push(`Record “${record.header}” contains unsupported symbol(s): ${invalid.join(", ")}.`);
      return;
    }
    const [identifier, ...descriptionParts] = record.header.split(/\s+/);
    records.push({
      localId: `${source}-${index}`,
      identifier,
      description: descriptionParts.join(" ") || undefined,
      sequence,
      source,
      sourceName,
    });
  });

  if (rawRecords.length === 0 && errors.length === 0) {
    errors.push("No FASTA records were found.");
  }
  return { records, errors };
}

function findInvalidSymbols(sequence: string): string[] {
  return Array.from(new Set(Array.from(sequence).filter((base) => !VALID_BASES.has(base)))).slice(0, 12);
}

