import React from 'react';
import {StyleProp, View} from 'react-native';
import Container from '../Container';
import Link, {ArrowLink} from '../Links';
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
          <Subtitle style={styles.sectionTitle}>{title}</Subtitle>
          {actionShown && (
            <Link textStyle={styles.sectionLink} onPress={onLinkPress}>
              {linkTitle}
            </Link>
          )}
        </View>
      </Container>
    </View>
  );
};
