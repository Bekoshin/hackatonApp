export interface RecognitionResult {
  object: string;
  startFrame: number;
  endFrame: number;
  probability: number;
  action: string;
}
