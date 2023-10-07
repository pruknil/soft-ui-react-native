import React, {useEffect, useLayoutEffect, useState} from 'react';
import {RefreshControl} from 'react-native';

import {useNavigation} from '@react-navigation/core';
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
import {IMessage} from '../../constants/types';
import axios from 'axios';

const ChatMain = () => {
  const {t} = useTranslation();
  const {colors, assets, sizes} = useTheme();
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  //const {messages} = useData();

  const [messages, setMessages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [change, setChange] = useState(false);

  const onRefresh = () => {
    setChange(!change);
    setRefreshing(true);
  };

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
  const baseUrl = 'http://10.167.1.138:8080';
  useEffect(() => {
    const abortController = new AbortController();
    const url = `${baseUrl}/chat`;

    const fetchUsers = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(url, {
          signal: abortController.signal,
        });

        if (response.status === 200) {
          setMessages(response.data);
          setIsLoading(false);
          setRefreshing(false);
          console.debug(response.data);
          return;
        } else {
          throw new Error('Failed to fetch users');
        }
      } catch (error) {
        if (abortController.signal.aborted) {
          console.log('Data fetching cancelled');
        } else {
          setErrorFlag(true);
          setIsLoading(false);
          setRefreshing(false);
        }
      }
    };

    fetchUsers();
    return () => abortController.abort('Data fetching cancelled');
  }, [change]);

  return (
    <Block safe>
      <Block
        scroll
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        //contentContainerStyle={{paddingVertical: sizes.padding}}
      >
        <Block>
          <Block color={colors.card} flex={0} padding={sizes.s}>
            <Input search placeholder={t('common.search')} />
          </Block>

          <Block>
            {isLoading && <Text> Loading </Text>}

            {!isLoading && hasError && <Text> An error has occurred </Text>}

            {messages?.map((message: IMessage) => (
              <Messages {...message} key={`chat-${message?.id}`} />
            ))}
          </Block>
        </Block>
      </Block>
    </Block>
  );
};
export default ChatMain;
