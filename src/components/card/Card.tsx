import React, {FunctionComponent} from 'react';
import styles from './styles';
import {COLORS} from '../../constants/colors';
import {StyleProp, TouchableHighlight, View, ViewStyle} from 'react-native';

type CardProps = {
  onPress: () => void;
  progressBarColor?: string;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

export const Card: FunctionComponent<CardProps> = props => {
  const {children, onPress, progressBarColor, style, disabled} = props;

  let progressBarBackgroundColor = COLORS.BACKGROUND_1;
  if (progressBarColor) {
    progressBarBackgroundColor = progressBarColor;
  }

  return (
    <TouchableHighlight
      style={[styles.mainContainer, style]}
      onPress={onPress}
      activeOpacity={0.9}
      underlayColor={COLORS.SECONDARY_DARK_1}
      disabled={disabled}>
      <View style={styles.contentContainer}>
        {children}
        <View
          style={[
            styles.progressBar,
            {backgroundColor: progressBarBackgroundColor},
          ]}
        />
      </View>
    </TouchableHighlight>
  );
};
