import {StyleSheet} from "react-native";
import {TYPOGRAPHY} from "../../constants/typography";
import {COLORS} from "../../constants/colors";

export const styles = StyleSheet.create({
  duration: {
    ...(TYPOGRAPHY.HEADER_4 as Object),
    color: COLORS.PRIMARY_DARK,
  },
  createdAtLabel: {
    ...(TYPOGRAPHY.LABEL as Object),
    color: COLORS.SECONDARY_DARK_2,
  }
});
