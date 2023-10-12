import React, {useEffect, useLayoutEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/core';
import {useHeaderHeight} from '@react-navigation/stack';

import {useTheme, useData, useTranslation} from '../../hooks/';
import {Block, Image, Text} from '../../components/';
import {ImageBackground} from 'react-native';
import {IUser} from '../../constants/types';
import Button from '../../components/Button';

const ChatProfile = ({route, navigation}) => {
  const {colors, assets, sizes, gradients} = useTheme();
  const headerHeight = useHeaderHeight();
  const {user} = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({
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

  return (
    <Block>
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={{uri: user.avatar}}>
        <Block style={{justifyContent: 'space-between'}}>
          <Block flex={1}>
            <Block flex={1} style={{justifyContent: 'flex-end'}}>
              <Button
                flex={0}
                width={sizes.md}
                onPress={() => navigation.goBack()}>
                <Text
                  size={sizes.m}
                  white
                  transform="uppercase"
                  style={{
                    textShadowColor: 'rgba(0, 0, 0, 0.75)',
                    textShadowOffset: {width: 1, height: 1},
                    textShadowRadius: 5,
                  }}>
                  ✖
                </Text>
              </Button>
            </Block>
          </Block>

          <Block flex={5}>
            <Block style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                width={sizes.xl * 2}
                height={sizes.xl * 2}
                marginBottom={sizes.sm}
                radius={sizes.xl}
                source={{uri: user.avatar}}
              />
            </Block>
          </Block>

          <Text style={{flex: 1, backgroundColor: 'green'}}>xxx</Text>
        </Block>
      </ImageBackground>
    </Block>
  );
};
export default ChatProfile;
