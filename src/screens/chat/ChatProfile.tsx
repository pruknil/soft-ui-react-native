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
    <Block safe>
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={{uri: user.avatar}}
      />
    </Block>
  );
};
export default ChatProfile;
