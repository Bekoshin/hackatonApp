import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 4,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: COLORS.OUTLINE,
    marginBottom: 8,
    overflow: 'hidden',
  },
  contentContainer: {
    paddingLeft: 14,
    paddingTop: 13,
    paddingBottom: 17,
    paddingRight: 21,
    backgroundColor: 'white',
  },
  progressBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 4,
    backgroundColor: COLORS.BACKGROUND_1,
  },
});

export default styles;
