import {StyleSheet, Dimensions} from "react-native";
import {TYPOGRAPHY} from "../../constants/typography";
import {COLORS} from "../../constants/colors";

const {width} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerRightContainer: {
    position: undefined,
    flex: 1,
    left: 0,
  },
  backgroundVideo: {
    width: width - 20,
    height: 220,
    backgroundColor: 'black',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
    // alignItems: 'center',
  },
  videoLabel: {
    ...(TYPOGRAPHY.HEADER_5 as Object),
    color: COLORS.PRIMARY_DARK,
    marginVertical: 4,
  },
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
