import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';
import {TYPOGRAPHY} from "../../constants/typography";

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 4,
    height: 46,
    alignSelf: 'stretch',
  },
  touchableContainer: {
    borderRadius: 4,
  },
  buttonContainer: {
    height: 46,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 4,
    justifyContent: 'center',
  },
  label: {
    ...(TYPOGRAPHY.BUTTON_LABEL as Object),
    color: 'white',
  },
});

export default styles;
