import {StyleSheet} from "react-native";
import {ifIphoneX} from "react-native-iphone-x-helper";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerRightContainer: {
    position: undefined,
    flex: 1,
    left: 0,
  },
  flatList: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  flatListContentContainer: {
    paddingTop: 10,
    paddingBottom: 50,
  },
  loadButton: {
    position: 'absolute',
    left: 10,
    ...ifIphoneX({
      bottom: 44,
    }, {
      bottom: 10,
    }),
    right: 10,
  },
});
