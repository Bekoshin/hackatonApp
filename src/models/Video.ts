import {RecognitionResult} from "./RecognitionResult";

export interface Video {
  id: number;
  name: string;
  duration: number | null;
  createdAt: Date;
  userId: number;
  fileProcessing: boolean;
  status: number;
  recognitionResults: RecognitionResult[];
  file: {
    url: string;
    thumb: {
      url: string;
    };
  },
  taggedFile: {
    url: string | null;
    thumb: {
      url: string | null;
    };
  },
}
