import {Video} from "../../../models/Video";
import {ImagePickerResponse} from "react-native-image-picker";

export type HomeState = {
  videos: Video[];
  page: number;
  allVideosLoaded: boolean;
  refreshing: boolean;
  moreVideosLoading: boolean;
  modalVisible: boolean;
  fileLoading: boolean;
  pickerResponse: ImagePickerResponse | null;
};
