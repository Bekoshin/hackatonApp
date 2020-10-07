import React from "react";
import {Video} from "../../models/Video";
import {Image, Text, View} from "react-native";
import {endpoints} from "../../constants/endpoints";
import {LineAwesomeIcon} from "../../constants/LineAwesomeIconSet";
import {COLORS} from "../../constants/colors";
import {styles} from "./styles";
import {SwipeableCard} from "../swipeableCard/SwipeableCard";
import moment from "moment";

type VideoCardProps = {
  video: Video;
  onPress: (video: Video) => void;
  onDeletePress: (video: Video) => void;
}

export const VideoCard = (props: VideoCardProps) => {
  const {video, onPress, onDeletePress} = props;

  let durationString = '';
  if (video.duration) {
    durationString = new Date(video.duration * 1000).toISOString().substr(11, 8)
  }

  const handlePress = () => {
    onPress(video);
  }

  const handleDeletePress = () => {
    onDeletePress(video);
  }

  const renderIcon = () => {
    if (video.status === 1) {
      return <LineAwesomeIcon name="clock" color={COLORS.PRIMARY_DARK} size={48}/>
    } else if (video.status === 2) {
      return <LineAwesomeIcon name="check" color={COLORS.SECONDARY_2} size={48}/>
    } else if (video.status === 3) {
      return <LineAwesomeIcon name="ban" color={COLORS.SECONDARY_3} size={48}/>
    }
  }

  return (
    <SwipeableCard style={{marginBottom: 8}} onRightButtonPress={handleDeletePress} onPress={handlePress}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <View style={{height: 80, width: 80}}>
          <Image style={{height: '100%', width: '100%', borderRadius: 4}}
                 source={{uri: endpoints.baseForThumb + video.file.thumb.url}}/>
        </View>
        <View style={{flex: 1, marginLeft: 10}}>
          <Text
            style={styles.createdAtLabel}>{`Дата создания: ${moment(video.createdAt).utc().format('DD-MM-YY HH:mm')}`}</Text>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={styles.duration}>{durationString}</Text>
            {renderIcon()}
          </View>
        </View>
      </View>
    </SwipeableCard>
  );
}
