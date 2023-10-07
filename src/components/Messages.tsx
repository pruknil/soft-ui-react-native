import React from 'react';

import Block from './Block';
import {IMessage} from '../constants/types';
import Text from './Text';
import Image from './Image';
import {useTheme} from '../hooks';
import moment from 'moment';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';

const Messages = ({text, createdAt, unRead, user}: IMessage) => {
  const {assets, colors, fonts, gradients, sizes} = useTheme();
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Chat', {user})}>
      <Block color={colors.card} flex={0} marginTop={0} padding={sizes.xs}>
        <Block
          row
          marginLeft={sizes.xs}
          marginBottom={sizes.xs}
          align={'center'}>
          <Image
            source={{uri: user.avatar}}
            style={{width: sizes.xxl, height: sizes.xxl, borderRadius: sizes.s}}
          />
          <Block marginLeft={sizes.s}>
            <Block row align={'flex-start'} style={{flex: 1}}>
              <Text p semibold>
                {user.name}
              </Text>
              <Block>
                <Text size={sizes.s} gray style={{textAlign: 'right'}}>
                  {moment(createdAt).calendar(null, {
                    lastDay: '[Yesterday]',
                    sameDay: 'LT',
                    nextDay: '[Tomorrow]',
                    lastWeek: 'dddd',
                    nextWeek: 'dddd',
                    sameElse: 'L',
                  })}
                </Text>
              </Block>
            </Block>
            <Text p gray>
              {text}
            </Text>
            {unRead > 0 && (
              <Block
                flex={0}
                //padding={0}
                paddingHorizontal={9}
                justify="center"
                position="absolute"
                top={sizes.m}
                right={sizes.xs}
                // width={sizes.m}
                height={sizes.m}
                radius={sizes.m}
                gradient={gradients?.primary}>
                <Text
                  white
                  center
                  bold
                  size={10}
                  lineHeight={10}
                  paddingTop={3}>
                  {unRead}
                </Text>
              </Block>
            )}
          </Block>
        </Block>
      </Block>
    </TouchableOpacity>
  );
};

export default Messages;
