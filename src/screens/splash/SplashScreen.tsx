import React, {useEffect} from "react";
import {Image, SafeAreaView, View} from "react-native";
import {getCredentialsFromKeychain} from "../../utils/CredentialsUtils";
import {styles} from "./styles";



type SplashScreenProps = {
  setAuthorized: (value: boolean) => void;
}

export const SplashScreen = (props: SplashScreenProps) => {
  const {setAuthorized} = props;

  useEffect(() => {
    const initData = async () => {
      let credentials = await getCredentialsFromKeychain();
      setAuthorized(!!credentials);
    }
    initData().catch(error => console.log('init data error: ', error));
  }, []);

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.safeAreaView}>
        <Image style={styles.image} source={require('../../../assets/images/logo.jpg')} resizeMode="center"/>
      </SafeAreaView>
    </View>
  );
}
