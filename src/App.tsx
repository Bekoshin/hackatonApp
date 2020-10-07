import React, {useState} from 'react';
import 'react-native-gesture-handler';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from "./screens/home/HomeScreen";
import {AuthScreen} from "./screens/auth/AuthScreen";
import {SplashScreen} from "./screens/splash/SplashScreen";
import {VideoScreen} from "./screens/video/VideoScreen";
import {TYPOGRAPHY} from "./constants/typography";
import {COLORS} from "./constants/colors";
import {Video} from "./models/Video";
import * as moment from 'moment';
import 'moment/locale/ru';

export type RootStackParamList = {
  Home: { setAuthorized: (value: boolean) => void };
  Auth: { setAuthorized: (value: boolean) => void };
  Video: { id: number };
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  const [authorized, setAuthorized] = useState<boolean | undefined>(undefined);

  if (authorized === undefined) {
    return <SplashScreen setAuthorized={setAuthorized}/>;
  }

  return <Stack.Navigator
    screenOptions={{
      gestureEnabled: true,
      headerTitleStyle: TYPOGRAPHY.HEADER_4,
      headerTitle: () => null,
      headerLeft: () => null,
    }}
  >
    {authorized ? <Stack.Screen name="Home" component={HomeScreen} initialParams={{setAuthorized: setAuthorized}}/> :
      <Stack.Screen name="Auth" component={AuthScreen} initialParams={{setAuthorized: setAuthorized}}
                    options={{header: () => null}}/>}
    <Stack.Screen name="Video" component={VideoScreen}/>
  </Stack.Navigator>
}

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.BACKGROUND_2,
    card: 'white',
  },
};

const App = () => {
  moment.locale('ru');

  return (
    <NavigationContainer theme={Theme}>
      <RootStack/>
    </NavigationContainer>
  )
};

export default App;
