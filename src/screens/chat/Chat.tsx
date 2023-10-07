import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useHeaderHeight} from '@react-navigation/stack';
import {useData, useTheme, useTranslation} from '../../hooks/';
import {Block, Image, Text, Input, Messages} from '../../components/';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import axios from 'axios';
import {IChat, IMessage} from '../../constants/types';

const Chat = ({route, navigation}) => {
  const {t} = useTranslation();
  const {colors, assets, sizes} = useTheme();
  const {user} = route.params;
  const headerHeight = useHeaderHeight();
  const [messages, setMessages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);

  const baseUrl = 'http://10.167.1.138:8080';
  useEffect(() => {
    const abortController = new AbortController();
    const url = `${baseUrl}/chat/11`;

    const fetchChat = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(url, {
          signal: abortController.signal,
        });

        if (response.status === 200) {
          setMessages(response.data);
          setIsLoading(false);
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
        }
      }
    };

    fetchChat();
    return () => abortController.abort('Data fetching cancelled');
  }, []);

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
  // var myloop = [];
  //
  // for (let i = 0; i < 30; i++) {
  //   myloop.push(
  //     <View
  //       style={{
  //         height: 80,
  //         margin: 10,
  //         borderWidth: 1,
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //       }}
  //       key={i}>
  //       <Text>{i}</Text>
  //     </View>,
  //   );
  // }

  return (
    <Block safe>
      <Block scroll>
        {messages?.map((chat: IChat) => (
          <Block width={'70%'} row>
            <Image
              width={40}
              height={40}
              source={{uri: user?.avatar}}
            />
            <Block card >
              <Text key={`chat-${chat?.id}`} align={'left'}>
                {chat.text}
              </Text>
            </Block>
          </Block>
        ))}
      </Block>
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
