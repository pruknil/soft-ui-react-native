import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useHeaderHeight} from '@react-navigation/stack';
import {useData, useTheme, useTranslation} from '../../hooks/';
import {Block, Image, Text, Input, Messages, Button} from '../../components/';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import axios from 'axios';
import {IChat, IMessage} from '../../constants/types';
import moment from 'moment';
import Constants from 'expo-constants';

const Chat = ({route, navigation}) => {
  const isAndroid = Platform.OS === 'android';
  const {isDark} = useData();
  const {t} = useTranslation();
  const {colors, assets, sizes} = useTheme();
  const {user} = route.params;
  const headerHeight = useHeaderHeight();
  const [messages, setMessages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const url = `${Constants.expoConfig.extra.api.host}/chat/11`;

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

  return (
    <Block safe>
      <Block scroll>
        {messages?.map((chat: IChat) => (
          <View
            style={{
              flexDirection: chat.u ? 'row-reverse' : 'row',
              alignSelf: chat.u ? 'flex-end' : 'flex-start',
              padding: 2,
            }}
            width={'80%'}
            key={`chat-${chat?.id}`}>
            {!chat.u && (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('ChatProfile', {user})}>
                <Image
                  radius={20}
                  width={40}
                  height={40}
                  source={{uri: user?.avatar}}
                />
              </TouchableWithoutFeedback>
            )}
            <Block card>
              <Text align={'left'}>{chat.text}</Text>
            </Block>
            <Text size={sizes.s} gray paddingHorizontal={3}>
              {moment(chat.createdAt).calendar(null, {
                lastDay: '[Yesterday]',
                sameDay: 'LT',
                nextDay: '[Tomorrow]',
                lastWeek: 'dddd',
                nextWeek: 'dddd',
                sameElse: 'L',
              })}
            </Text>
          </View>
        ))}
      </Block>
      <KeyboardAvoidingView
        keyboardVerticalOffset={headerHeight}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <Block row color={colors.card} flex={0} padding={sizes.s}>
          <Block flex={1}>
            <Input placeholder={t('common.message')} />
          </Block>
          <Button flex={0} shadow={!isAndroid}>
            <Image
              source={assets.send}
              height={sizes.m}
              width={sizes.m}
              rounded={true}
              color={isDark ? colors.icon : undefined}
            />
          </Button>
        </Block>
      </KeyboardAvoidingView>
    </Block>
  );
};

export default Chat;
