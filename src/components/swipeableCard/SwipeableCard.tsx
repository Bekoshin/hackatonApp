import React, {FunctionComponent} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {styles} from './styles';
import {Card} from '../card/Card';
import {SwipeableComponent} from '../swipeableComponent/SwipeableComponent';

type SwipeableCardProps = {
  onRightButtonPress: () => void;
  onPress: () => void;
  progressBarColor?: string;
  disabledSwipe?: boolean;
  disabledPress?: boolean;
  style?: StyleProp<ViewStyle>;
  noticeMode?: boolean;
};

export const SwipeableCard: FunctionComponent<SwipeableCardProps> = props => {
  const {
    onRightButtonPress,
    onPress,
    progressBarColor,
    style,
    disabledPress,
    disabledSwipe,
    noticeMode,
    children,
  } = props;

  return (
    <SwipeableComponent
      style={style}
      onRightButtonPress={onRightButtonPress}
      disabledSwipe={disabledSwipe}
      noticeMode={noticeMode}>
      <Card
        style={styles.card}
        onPress={onPress}
        disabled={disabledPress}
        progressBarColor={progressBarColor}>
        {children}
      </Card>
    </SwipeableComponent>
  );
};
