import React from "react";
import {RecognitionResult} from "../../models/RecognitionResult";
import {Card} from "../card/Card";
import {Text} from "react-native";
import {styles} from "./styles";

type RecognitionResultCardProps = {
  result: RecognitionResult;
  onPress: (result: RecognitionResult) => void;
}

export const RecognitionResultCard = (props: RecognitionResultCardProps) => {
  const {result, onPress} = props;

  const handlePress = () => {
    onPress(result);
  }

  return (
    <Card onPress={handlePress}>
      <Text style={styles.text}>{'Объект: ' + result.object}</Text>
      <Text style={styles.text}>{'Действие: ' + result.action}</Text>
      <Text style={styles.text}>{'Вероятность: ' + result.probability + ' %'}</Text>
    </Card>
  )
}
