import React from "react";
import {ActivityIndicator, Text, View} from "react-native";
import {COLORS} from "../../constants/colors";
import styles from "./styles";

type FileLoadingProps = {
  visible: boolean;
}

export const FileLoading = (props: FileLoadingProps) => {
  const {visible} = props;

  if (visible) {
    return (
      <View style={styles.mainContainer}>
        <ActivityIndicator color={COLORS.BACKGROUND_2} size='large'/>
        <Text style={styles.text}>Отправка файла на сервер</Text>
      </View>
    );
  } else {
    return null;
  }
}
