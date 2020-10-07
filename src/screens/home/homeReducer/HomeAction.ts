import {Video} from "../../../models/Video";
import {ImagePickerResponse} from "react-native-image-picker";

export type HomeAction = | {
  type: 'refreshing',
} | {
  type: 'loaded_first_page',
  videos: Video[];
} | {
  type: 'loading_more_videos',
} | {
  type: 'loaded_more_videos';
  videos: Video[];
  page: number;
} | {
  type: 'changed_modal_visible';
  modalVisible: boolean;
} | {
  type: 'changed_file_loading';
  fileLoading: boolean;
} | {
  type: 'changed_picker_response';
  pickerResponse: ImagePickerResponse | null;
}
