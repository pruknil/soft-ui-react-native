import React, {useLayoutEffect} from 'react';
import {useHeaderHeight} from '@react-navigation/stack';
import {useTheme, useTranslation} from '../../hooks/';
import {Block, Image, Text, Input} from '../../components/';
import {KeyboardAvoidingView, Platform, View} from 'react-native';

const Chat = ({route, navigation}) => {
  const {t} = useTranslation();
  const {colors, assets, sizes} = useTheme();
  const {user} = route.params;
  const headerHeight = useHeaderHeight();
  //const {messages} = useData();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text h5 bold color={colors.white}>
          {user.name}
        </Text>
      ),
      headerBackground: () => (
        <Image
          radius={0}
          resizeMode="cover"
          width={sizes.width}
          height={headerHeight}
          source={assets.header}
        />
      ),
    });
  }, [assets.header, navigation, sizes.width, headerHeight]);
  var myloop = [];

  for (let i = 0; i < 30; i++) {
    myloop.push(
      <View
        style={{
          height: 80,
          margin: 10,
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        key={i}>
        <Text>{i}</Text>
      </View>,
    );
  }

  return (
    <Block safe>
      <Block scroll>{myloop}</Block>
      <KeyboardAvoidingView
        keyboardVerticalOffset={headerHeight}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <Block color={colors.card} flex={0} padding={sizes.s}>
          <Input placeholder={t('common.message')} />
        </Block>
      </KeyboardAvoidingView>
    </Block>
  );
};

export default Chat;
