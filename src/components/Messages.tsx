import React from 'react';

import Block from './Block';
import {IMessage} from '../constants/types';
import Text from './Text';
import Image from './Image';
import {useTheme} from '../hooks';
import moment from 'moment';

const Messages = ({text, createdAt, user}: IMessage) => {
  const {sizes} = useTheme();
  return (
    <Block marginTop={sizes.sm}>
      <Block row marginLeft={sizes.xs} marginBottom={sizes.xs} align={'center'}>
        <Image
          source={{uri: user.avatar}}
          style={{width: sizes.xxl, height: sizes.xxl, borderRadius: sizes.s}}
        />
        <Block marginLeft={sizes.s}>
          <Block row align={'flex-end'} style={{flex: 1}}>
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
        </Block>
      </Block>
    </Block>
  );
};

export default Messages;
