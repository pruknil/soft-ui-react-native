import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useHeaderHeight} from '@react-navigation/stack';

import {useTheme, useData, useTranslation} from '../../hooks/';
import {
  Block,
  Button,
  Switch,
  Image,
  Modal,
  Text,
  Input,
  Messages,
} from '../../components/';
import axios from 'axios';

const Chat = ({route, navigation}) => {
  const {t} = useTranslation();
  const {colors, assets, sizes} = useTheme();
  const {user} = route.params;
  const headerHeight = useHeaderHeight();
  //const {messages} = useData();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text p white>
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

  return (
    <Block safe>
      <Block
        scroll
        showsVerticalScrollIndicator={false}
        //contentContainerStyle={{paddingVertical: sizes.padding}}
      />
    </Block>
  );
};
export default Chat;
