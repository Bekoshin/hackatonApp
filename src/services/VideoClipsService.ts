import {endpoints} from "../constants/endpoints";
import {safeFetch} from "../utils/FetchUtils";
import {Video} from "../models/Video";
import {parseVideo} from "../parsers/videoParser";

export class VideoClipsService {
  private readonly _token: string;
  constructor(token: string) {
    this._token = token;
  }

  getVideoClips = async (page: number, pageSize: number): Promise<Video[]> => {
    const endpoint = endpoints.base + endpoints.video_clips + `?page=${page}&page_size=${pageSize}`;

    const init = {
      method : 'GET',
      headers : {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this._token
      }
    };

    try {
      const json = await safeFetch(endpoint, init);
      console.log('JSON: ', json);
      const videos: Video[] = [];
      for (let jsonVideo of json) {
        videos.push(parseVideo(jsonVideo));
      }
      return videos;
    } catch (error) {
      console.log('GET VIDEO CLIPS ERROR: ', error);
      throw error;
    }
  }

  getVideoClip = async (id: number): Promise<Video> => {
    const endpoint = endpoints.base + endpoints.video_clips + `/${id}`;

    const init = {
      method : 'GET',
      headers : {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this._token
      }
    };

    try {
      const json = await safeFetch(endpoint, init);
      console.log('JSON: ', json);
      return parseVideo(json);
    } catch (error) {
      console.log('GET VIDEO CLIP ERROR: ', error);
      throw error;
    }
  }

  loadVideoClip = async (name: string, uri: string, fileName: string) => {
    const endpoint = endpoints.base + endpoints.video_clips;

    let formData = new FormData();
    formData.append('name', name);
    formData.append('file', {uri: uri, name: fileName, type: 'video/mp4'});

    const init = {
      method : 'POST',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': this._token,
      },
      body: formData,
    };

    try {
      const json = await safeFetch(endpoint, init);
      console.log('json: ', json);
    } catch (error) {
      console.log('LOAD VIDEO CLIP ERROR: ', error);
      throw error;
    }
  }

  deleteVideoClip = async (id: number) => {
    const endpoint = endpoints.base + endpoints.video_clips + `/${id}`;

    const init = {
      method : 'DELETE',
      headers : {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this._token
      }
    };

    try {
      const json = await safeFetch(endpoint, init);
      console.log('json: ', json);
    } catch (error) {
      console.log('LOAD VIDEO CLIP ERROR: ', error);
      throw error;
    }
  }
}
