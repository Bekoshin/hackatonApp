import React, {useCallback, useEffect, useLayoutEffect, useReducer, useState} from "react";
import {ActivityIndicator, FlatList, SafeAreaView, TouchableOpacity, View} from "react-native";
import {MssButton} from "../../components/mssButton/MssButton";
import {createToken, deleteCredentials, getCredentialsFromKeychain} from "../../utils/CredentialsUtils";
import {VideoClipsService} from "../../services/VideoClipsService";
import {Video} from "../../models/Video";
import {RouteProp} from "@react-navigation/native";
import {RootStackParamList} from "../../App";
import {StackNavigationProp} from "@react-navigation/stack";
import {createVideo} from "../../utils/VideoUtils";
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {InputModal} from "../../components/inputModal/InputModal";
import {VideoCard} from "../../components/videoCard/VideoCard";
import {styles} from "./styles";
import {HeaderRight} from "../../components/headerRight/HeaderRight";
import {LineAwesomeIcon} from "../../constants/LineAwesomeIconSet";
import {COLORS} from "../../constants/colors";
import messaging from "@react-native-firebase/messaging";
import {getTokenFromAsyncStorage, saveTokenToAsyncStorage} from "../../utils/FirebaseUtils";
import {AuthService} from "../../services/AuthService";
import {FileLoading} from "../../components/fileLoading/FileLoading";
import {HomeState} from "./homeReducer/HomeState";
import {homeReducer} from "./homeReducer/homeReducer";
import {
  CHANGED_FILE_LOADING,
  CHANGED_MODAL_VISIBLE, CHANGED_PICKER_RESPONSE,
  LOADED_FIRST_PAGE,
  LOADED_MORE_VIDEOS,
  LOADING_MORE_VIDEOS,
  REFRESHING
} from "./homeReducer/homeActionTypes";

export const PAGE_SIZE = 10;

type HomeScreenProps = {
  route: RouteProp<RootStackParamList, 'Home'>;
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

export const HomeScreen = (props: HomeScreenProps) => {
  const {route, navigation} = props;
  const {setAuthorized} = route.params;

  const initialState: HomeState = {
    videos: [],
    page: 0,
    allVideosLoaded: false,
    moreVideosLoading: false,
    refreshing: false,
    modalVisible: false,
    fileLoading: false,
    pickerResponse: null,
  }

  const [state, dispatch] = useReducer(homeReducer, initialState);

  const loadFirstPageVideos = useCallback(async () => {
    dispatch({type: REFRESHING});
    try {
      dispatch({type: LOADED_FIRST_PAGE, videos: await loadVideos(1)});
    } catch (error) {
      dispatch({type: LOADED_FIRST_PAGE, videos: []});
    }
  }, []);

  const loadMoreVideos = async () => {
    dispatch({type: LOADING_MORE_VIDEOS});
    const newPage = state.page + 1;
    const newVideos = await loadVideos(newPage);
    dispatch({type: LOADED_MORE_VIDEOS, videos: newVideos, page: newPage});
  }

  const onEndReached = async () => {
    if (!state.moreVideosLoading && !state.allVideosLoaded) {
      await loadMoreVideos();
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRightContainerStyle: styles.headerRightContainer,
      headerRight: () => (
        <HeaderRight title="Список">
          <TouchableOpacity onPress={handleLogoutButton}>
            <LineAwesomeIcon
              name="file-export"
              size={22}
              color={COLORS.SECONDARY_DARK_1}
            />
          </TouchableOpacity>
        </HeaderRight>
      )
    })
  }, []);

  useEffect(() => {
    const registerToken = async () => {
      let messagingToken: string;
      const tokenFromAsyncStorage = await getTokenFromAsyncStorage();
      if (!tokenFromAsyncStorage) {
        messagingToken = await messaging().getToken();
        await saveTokenToAsyncStorage(messagingToken);
      } else {
        messagingToken = tokenFromAsyncStorage;
      }
      const credentials = await getCredentialsFromKeychain();
      if (credentials) {
        const token = createToken(credentials);
        const authService = new AuthService(token);
        await authService.sendDevice(messagingToken);
      }
    };
    registerToken().catch(error => console.log('register token error: ', error));
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      await loadFirstPageVideos();
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      await loadFirstPageVideos();
    });

    loadFirstPageVideos().catch(error => console.log('load videos error: ', error));
  }, []);

  const showModal = () => {
    dispatch({type: CHANGED_MODAL_VISIBLE, modalVisible: true});
  };
  const hideModal = () => {
    dispatch({type: CHANGED_MODAL_VISIBLE, modalVisible: false});
  }

  const handleLoadVideoButtonPress = async () => {
    try {
      const response = await createVideo();
      if (!response) {
        return;
      }
      dispatch({type: CHANGED_PICKER_RESPONSE, pickerResponse: response});
      showModal();
    } catch (error) {
      console.log('HANDLE LOD VIDEO PRESS ERROR: ', error);
    }
  };

  const uploadVideo = async (videoName: string) => {
    try {
      dispatch({type: CHANGED_FILE_LOADING, fileLoading: true});
      if (videoName === '' || !state.pickerResponse) {
        return;
      }

      let fileName = uuidv4();
      if (state.pickerResponse.path) {
        const extension = state.pickerResponse.path.substring(state.pickerResponse.path.lastIndexOf('.') + 1);
        fileName += '.' + extension;
      } else {
        fileName += '.mp4';
      }

      const credentials = await getCredentialsFromKeychain();
      if (!credentials) {
        return;
      }

      const token = createToken(credentials);
      const videoClipsService = new VideoClipsService(token);
      await videoClipsService.loadVideoClip(videoName, state.pickerResponse.uri, fileName);

      await loadFirstPageVideos();
      dispatch({type: CHANGED_PICKER_RESPONSE, pickerResponse: null});
    } finally {
      dispatch({type: CHANGED_FILE_LOADING, fileLoading: false});
    }
  };

  const handleLogoutButton = async () => {
    await deleteCredentials();
    setAuthorized(false);
  };

  const handlePress = (video: Video) => {
    navigation.navigate('Video', {id: video.id});
  }

  const handleDeletePress = async (video: Video) => {
    const credentials = await getCredentialsFromKeychain();
    if (!credentials) {
      return;
    }
    const token = createToken(credentials);
    const videoClipsService = new VideoClipsService(token);
    await videoClipsService.deleteVideoClip(video.id);

    await loadFirstPageVideos();
  }

  const renderVideoClip = ({item}: { item: Video }) => {
    return <VideoCard video={item} onPress={handlePress} onDeletePress={handleDeletePress}/>;
  }

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.mainContainer}>
        <FlatList
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContentContainer} data={state.videos} renderItem={renderVideoClip}
          keyExtractor={item => item.id.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={onEndReached}
          onRefresh={loadFirstPageVideos}
          refreshing={state.refreshing}
          ListFooterComponent={state.moreVideosLoading ? <ActivityIndicator/> : null}
        />
        <MssButton
          style={styles.loadButton}
          label="Загрузить видео"
          onPress={handleLoadVideoButtonPress}
        />
      </SafeAreaView>
      <InputModal
        label="Введите название"
        value={''}
        visible={state.modalVisible}
        onSwipeComplete={hideModal}
        onOkButtonPress={uploadVideo}
        onBackdropPress={hideModal}
        placeholder="Название"
      />
      <FileLoading visible={state.fileLoading}/>
    </View>
  );
}

const loadVideos = async (page: number) => {
  try {
    const credentials = await getCredentialsFromKeychain();
    if (credentials) {
      const token = createToken(credentials);
      const videoClipsService = new VideoClipsService(token);
      return await videoClipsService.getVideoClips(page, PAGE_SIZE);
    }
    return [];
  } catch (error) {
    console.log('LOAD VIDEOS ERROR: ', error);
    throw error;
  }
};
