import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';
import {TYPOGRAPHY} from "../../constants/typography";

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 4,
  },
  inputStyle: {
    ...(TYPOGRAPHY.CAPTION as Object),
    flex: 1,
    // paddingTop: 15,
    // paddingBottom: 14,
    justifyContent: 'center',
    color: COLORS.TEXT_INPUT_COLOR,
  },
  iconContainer: {
    flex: 1,
    paddingTop: 14,
    paddingBottom: 11,
  },
});

export default styles;
