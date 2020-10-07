import {Video} from "../models/Video";

export const parseVideo = (json: any): Video => {
  const video: Video = {
    id: json.id,
    name: json.name,
    duration: json.duration,
    createdAt: new Date(json.created_at),
    userId: json.user_id,
    fileProcessing: json.file_processing,
    status: json.status,
    recognitionResults: [],
    file: {
      url: json.file.url,
      thumb: {
        url: json.file.thumb.url,
      }
    },
    taggedFile: {
      url: json.tagged_file.url,
      thumb: {
        url: json.tagged_file ? json.tagged_file : null,
      },
    }
  };

  for (let recognitionResultJson of json.recognition_results) {
    video.recognitionResults.push({
      object: recognitionResultJson.object,
      startFrame: recognitionResultJson.start_frame,
      endFrame: recognitionResultJson.end_frame,
      probability: recognitionResultJson.probability,
      action: recognitionResultJson.action,
    });
  }

  return video;
};
