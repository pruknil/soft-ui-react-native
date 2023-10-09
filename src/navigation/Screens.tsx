import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  Articles,
  Components,
  Home,
  Profile,
  Register,
  Pro,
  MyCamera,
} from '../screens';
import ChatMain from '../screens/chat/ChatMain';
import Chat from '../screens/chat/Chat';
import {useScreenOptions, useTranslation} from '../hooks';
import Settings from '../screens/Settings';
import ChatProfile from '../screens/chat/ChatProfile';

const Stack = createStackNavigator();

export default () => {
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions.stack}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: t('navigation.home')}}
      />

      <Stack.Screen
        name="MyCamera"
        component={MyCamera}
        options={screenOptions.camera}
      />

      <Stack.Screen
        name="ChatMain"
        component={ChatMain}
        options={{title: t('navigation.chat'), headerRight: undefined}}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{...screenOptions.back, title: t('navigation.chat')}}
      />
      <Stack.Screen
        name="ChatProfile"
        component={ChatProfile}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Components"
        component={Components}
        options={screenOptions.components}
      />

      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{title: t('navigation.articles')}}
      />

      <Stack.Screen name="Pro" component={Pro} options={screenOptions.pro} />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{...screenOptions.back, title: t('navigation.settings')}}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
