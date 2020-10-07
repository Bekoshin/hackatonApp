import {StyleSheet} from 'react-native';
import {COLORS} from "../../constants/colors";
import {TYPOGRAPHY} from "../../constants/typography";

export const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
  },
  modal: {
    backgroundColor: COLORS.BACKGROUND_2,
  },
  inputLabel: {
    ...(TYPOGRAPHY.HEADER_5 as Object),
    color: COLORS.SECONDARY_DARK_1,
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    marginRight: 6,
  },
  okButton: {
    flex: 1,
    marginLeft: 6,
  },
});
