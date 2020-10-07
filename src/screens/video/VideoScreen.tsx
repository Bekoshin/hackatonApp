import React, {useEffect, useLayoutEffect, useState} from "react";
import {RouteProp} from "@react-navigation/native";
import {RootStackParamList} from "../../App";
import {StackNavigationProp} from "@react-navigation/stack";
import {ActivityIndicator, ScrollView, Text, View} from "react-native";
import {endpoints} from "../../constants/endpoints";
import {styles} from "./styles";
import {HeaderRight} from "../../components/headerRight/HeaderRight";
import {COLORS} from "../../constants/colors";
import {RecognitionResultCard} from "../../components/recognitionResultCard/RecognitionResultCard";
import {createToken, getCredentialsFromKeychain} from "../../utils/CredentialsUtils";
import {VideoClipsService} from "../../services/VideoClipsService";
import {Video as VideoModel} from "../../models/Video";
import VideoPlayer from 'react-native-video-player';

type VideoScreenProps = {
  route: RouteProp<RootStackParamList, 'Video'>;
  navigation: StackNavigationProp<RootStackParamList, 'Video'>;
}

export const VideoScreen = (props: VideoScreenProps) => {
  const {route, navigation} = props;
  const {id} = route.params;

  const [video, setVideo] = useState<VideoModel | null>(null);

  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRightContainerStyle: styles.headerRightContainer,
      headerRight: () => <HeaderRight onBackButtonPress={navigation.goBack} title="Просмотр"/>
    })
  }, []);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        setLoading(true);
        const credentials = await getCredentialsFromKeychain();
        if (credentials) {
          const token = createToken(credentials);
          const videoClipsService = new VideoClipsService(token);
          setVideo(await videoClipsService.getVideoClip(id));
        }
      } finally {
        setLoading(false);
      }
    };

    loadVideo().catch(error => console.log('loadVideoError: ', error));
  }, []);

  const renderResults = () => {
    if (video) {
      return video.recognitionResults.map(item => {
        return (
          <RecognitionResultCard result={item} onPress={() => {
          }}/>
        );
      });
    }
  }

  if (video && !loading) {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 30}}>
          <View style={{marginBottom: 8}}>
            <Text style={styles.videoLabel}>Исходное видео:</Text>
            <VideoPlayer video={{uri: endpoints.baseForThumb + video.file.url}}
                         resizeMode="contain"
                         thumbnail={{uri: video.file.thumb.url ? endpoints.baseForThumb + video.file.thumb.url : undefined}}
            />
          </View>
          {video.taggedFile.url ?
            <View style={{marginBottom: 8}}>
              <Text style={styles.videoLabel}>Результат:</Text>
              <VideoPlayer video={{uri: endpoints.baseForThumb + video.taggedFile.url}}
                           resizeMode="contain"
                           thumbnail={{uri: video.file.thumb.url ? endpoints.baseForThumb + video.file.thumb.url : undefined}}
              />
            </View> : null}
          {renderResults()}
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY}/>
      </View>
    )
  }
}
