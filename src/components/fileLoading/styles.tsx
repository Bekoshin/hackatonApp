import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';
import {TYPOGRAPHY} from "../../constants/typography";

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000099',
  },
  text: {
    ...(TYPOGRAPHY.HEADER_4 as Object),
    color: COLORS.BACKGROUND_2,
  }
});

export default styles;
