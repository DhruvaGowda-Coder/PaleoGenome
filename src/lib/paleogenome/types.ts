/** Metadata supplied by a real dataset catalog or by a user-provided sequence file. */
export interface DatasetMetadata {
  id: string;
  name: string;
  species?: string;
  source: string;
  accession?: string;
  sequenceCount?: number;
  loadedAt?: string;
}

/** A sequence held in the browser for local inspection. */
export interface DNASequenceRecord {
  localId: string;
  identifier: string;
  description?: string;
  sequence: string;
  source: "upload" | "manual";
  sourceName?: string;
}

export interface ReconstructionRequest {
  sequenceId: string;
  inputSequence: string;
  maskedRegions: Array<{ start: number; end: number }>;
  datasetId?: string;
}

export interface EvaluationMetrics {
  accuracy?: number;
  precision?: number;
  recall?: number;
  f1?: number;
  evaluatedPositions?: number;
}

export interface ReconstructionResponse {
  modelVersion: string;
  inputSequence: string;
  predictedSequence: string;
  groundTruthSequence?: string;
  confidenceByPosition?: Array<number | null>;
  metrics?: EvaluationMetrics;
}

export interface TrainingHistoryPoint {
  epoch: number;
  trainingLoss: number;
  validationLoss?: number | null;
}

export interface ModelMetadata {
  name: string;
  architecture: string;
  version: string;
  status: "trained" | "training" | "unavailable";
  datasetSummary?: string;
  trainingConfiguration?: Record<string, string | number | boolean>;
}

export interface BaselineComparison {
  name: string;
  metrics: EvaluationMetrics;
}

export interface ModelResultsData {
  model: ModelMetadata;
  trainingHistory: TrainingHistoryPoint[];
  evaluationByDataset: Array<{ dataset: DatasetMetadata; metrics: EvaluationMetrics }>;
  baselines: BaselineComparison[];
  example?: ReconstructionResponse;
}

