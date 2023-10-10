import React, {useEffect, useLayoutEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/core';
import {useHeaderHeight} from '@react-navigation/stack';

import {useTheme, useData, useTranslation} from '../../hooks/';
import {Block, Image} from '../../components/';
import {ImageBackground, Text} from 'react-native';
import {IUser} from '../../constants/types';

const ChatProfile = ({route, navigation}) => {
  const {colors, assets, sizes} = useTheme();
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
          <Text style={{flex: 1, backgroundColor: 'red'}}>xxx</Text>
          <Block flex={5}>
            <Image
              width={64}
              height={64}
              marginBottom={sizes.sm}
              source={{uri: user.avatar}}
            />
          </Block>

          <Text style={{flex: 1, backgroundColor: 'green'}}>xxx</Text>
        </Block>
      </ImageBackground>
    </Block>
  );
};
export default ChatProfile;
