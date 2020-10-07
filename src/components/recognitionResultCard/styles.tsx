import {StyleSheet} from "react-native";
import {TYPOGRAPHY} from "../../constants/typography";
import {COLORS} from "../../constants/colors";

export const styles = StyleSheet.create({
  text: {
    ...(TYPOGRAPHY.TEXT_SECONDARY as Object),
    color: COLORS.PRIMARY_DARK,
  }
});
