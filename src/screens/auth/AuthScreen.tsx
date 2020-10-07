import React, {useState} from "react";
import {Alert, Platform, SafeAreaView, Text, View} from "react-native";
import styles from "./styles";
import {MssInput} from "../../components/mssInput/MssInput";
import {COLORS} from "../../constants/colors";
import {MssButton} from "../../components/mssButton/MssButton";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {VideoClipsService} from "../../services/VideoClipsService";
import {createToken, setCredentialsToKeychain} from "../../utils/CredentialsUtils";
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from "../../App";
import {TYPOGRAPHY} from "../../constants/typography";

type AuthScreenProps = {
  route: RouteProp<RootStackParamList, 'Auth'>;
  navigation: StackNavigationProp<RootStackParamList, 'Auth'>;
}

export const AuthScreen = (props: AuthScreenProps) => {
  const {route} = props;
  const {setAuthorized} = route.params

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const clearUsername = () => {
    setUsername('');
  };
  const clearPassword = () => {
    setPassword('');
  };

  const allFieldsFilled = () => {
    return !!(username && password);
  };

  const signIn = async () => {
    const credentials = {username: username, password: password};
    const token = createToken(credentials);
    const videoClipsService = new VideoClipsService(token);
    try {
      setLoading(true);
      await videoClipsService.getVideoClips(1,1);
      await setCredentialsToKeychain(credentials);
      setAuthorized(true);
    } catch (error) {
      console.log('SIGN IN ERROR: ', error);
      if (error.name === 'Authentication error') {
        Alert.alert('Неверное имя пользователя или пароль.')
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.authContainer}>
          <View style={styles.headerContainer}>
            <Text style={TYPOGRAPHY.HEADER_3}>Войдите в свой аккаунт</Text>
          </View>
          <MssInput
            style={styles.input}
            placeholder="Логин"
            value={username}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={setUsername}
            onClearButtonPress={clearUsername}
            color={COLORS.BACKGROUND_2}
          />
          <MssInput
            style={styles.input}
            placeholder="Пароль"
            autoCapitalize={'none'}
            autoCorrect={false}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            onClearButtonPress={clearPassword}
            color={COLORS.BACKGROUND_2}
          />
          <MssButton
            style={styles.button}
            label="Войти"
            onPress={signIn}
            color={!allFieldsFilled() || loading ? COLORS.BACKGROUND_1 : COLORS.PRIMARY}
            disabled={!allFieldsFilled() || loading}
          />
        </View>
        {Platform.OS === 'ios' ? <KeyboardSpacer /> : null}
      </SafeAreaView>
    </View>
  );
}
