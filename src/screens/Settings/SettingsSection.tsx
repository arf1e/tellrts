import React from 'react';
import {StyleProp, View} from 'react-native';
import {BodyCopy, Subtitle} from '../../components/Typography';
import Link from '../../components/Links';
import styles from './Settings.styles';
import Container from '../../components/Container';

type SettingsLink = {
  title?: string;
  icon?: string;
  linkTitle: string;
  onPress: () => void;
  additionalStyle?: StyleProp<Text>;
};

type Props = {
  title: string;
  links: SettingsLink[];
};

const SettingsSection = ({title, links}: Props) => {
  const renderLink = (link: SettingsLink) => {
    return (
      <View style={styles.settingsSectionLink} key={link.linkTitle}>
        <Link
          onPress={link.onPress}
          icon={link.icon}
          containerStyle={link.additionalStyle}
          textStyle={styles.settingsSectionLinkText}>
          {link.linkTitle}
        </Link>
      </View>
    );
  };
  return (
    <View style={styles.settingsSectionContainer}>
      <Container>
        <Subtitle style={styles.settingsSectionSubtitle}>{title}</Subtitle>
        {links.map(link => renderLink(link))}
      </Container>
    </View>
  );
};

export default SettingsSection;
