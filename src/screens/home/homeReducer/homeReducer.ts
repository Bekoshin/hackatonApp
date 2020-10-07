import {HomeState} from "./HomeState";
import {HomeAction} from "./HomeAction";
import {
  CHANGED_FILE_LOADING,
  CHANGED_MODAL_VISIBLE, CHANGED_PICKER_RESPONSE,
  LOADED_FIRST_PAGE,
  LOADED_MORE_VIDEOS,
  LOADING_MORE_VIDEOS,
  REFRESHING
} from "./homeActionTypes";
import {PAGE_SIZE} from "../HomeScreen";

export const homeReducer = (state: HomeState, action: HomeAction): HomeState => {
  switch (action.type) {
    case REFRESHING: {
      return {
        ...state,
        refreshing: true,
      }
    }
    case LOADED_FIRST_PAGE: {
      return {
        ...state,
        videos: action.videos,
        page: 1,
        refreshing: false,
        allVideosLoaded: action.videos.length < PAGE_SIZE,
      }
    }
    case LOADING_MORE_VIDEOS: {
      return {
        ...state,
        moreVideosLoading: true,
      };
    }
    case LOADED_MORE_VIDEOS: {
      return {
        ...state,
        videos: [...state.videos, ...action.videos],
        page: action.page,
        allVideosLoaded: action.videos.length < PAGE_SIZE,
        moreVideosLoading: false,
      };
    }
    case CHANGED_MODAL_VISIBLE: {
      return {
        ...state,
        modalVisible: action.modalVisible,
      };
    }
    case CHANGED_FILE_LOADING: {
      return {
        ...state,
        fileLoading: action.fileLoading,
      };
    }
    case CHANGED_PICKER_RESPONSE: {
      return {
        ...state,
        pickerResponse: action.pickerResponse,
      };
    }
    default: {
      return state;
    }
  }
}
