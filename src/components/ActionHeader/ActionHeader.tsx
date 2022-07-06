import React from 'react';
import {StyleProp, View} from 'react-native';
import Container from '../Container';
import {ArrowLink} from '../Links';
import {Subtitle} from '../Typography';
import styles from './ActionHeader.styles';

type Props = {
  title: string;
  linkTitle: string;
  onLinkPress: () => void;
  containerStyle?: StyleProp<any>;
  actionShown?: boolean;
};

export default ({
  title,
  linkTitle,
  onLinkPress,
  containerStyle,
  actionShown = true,
}: Props) => {
  return (
    <View style={containerStyle}>
      <Container>
        <View style={styles.actionHeaderContainer}>
          <Subtitle>{title}</Subtitle>
          {actionShown && (
            <ArrowLink arrowPosition="forward" onPress={onLinkPress}>
              {linkTitle}
            </ArrowLink>
          )}
        </View>
      </Container>
    </View>
  );
};
