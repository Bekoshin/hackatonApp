import {Dimensions, StyleSheet} from "react-native";

const {width} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  safeAreaView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width - 20,
  },
});
