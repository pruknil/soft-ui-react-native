import React, {useEffect, useLayoutEffect, useState} from 'react';
import {FlatList} from 'react-native';

import {useNavigation} from '@react-navigation/core';
import {useHeaderHeight} from '@react-navigation/stack';

import {useTheme, useData, useTranslation} from '../hooks/';
import { Block, Button, Switch, Image, Modal, Text, Input, Messages } from "../components/";
import { IMessage } from '../constants/types';

const Chat = () => {
  const { assets, sizes } = useTheme();
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const { messages } = useData();
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
      )
    });
  }, [assets.header, navigation, sizes.width, headerHeight]);

  return (
    <Block safe>
      <Block
        scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: sizes.padding }}>
        <Block>
          <Input
            search
            marginBottom={sizes.sm}
            placeholder="Search"
          />
          <Block>
            {messages?.map((message: IMessage) => (
              <Messages {...message} key={`chat-${message?.id}`} />
            ))}
          </Block>
        </Block>
      </Block>
    </Block>
  );
};
export default Chat;
