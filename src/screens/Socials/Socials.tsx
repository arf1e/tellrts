import {useQuery} from '@apollo/client';
import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import Container from '../../components/Container';
import {BodyCopy, Subtitle} from '../../components/Typography';
import colors from '../../utils/colors';
import ConnectInstagram from './Socials.ConnectInstagram';
import {
  CHECK_IF_I_HAVE_INSTAGRAM_QUERY,
  CHECK_IF_I_HAVE_INSTAGRAM_QUERY_RESULT,
} from './Socials.graphql';
import styles from './Socials.styles';

const Socials = () => {
  const {loading, data} = useQuery<CHECK_IF_I_HAVE_INSTAGRAM_QUERY_RESULT>(
    CHECK_IF_I_HAVE_INSTAGRAM_QUERY,
  );
  return (
    <View style={styles.container}>
      <Container>
        <Subtitle>Instagram</Subtitle>
        {loading && <ActivityIndicator size="large" color={colors.primary} />}
        {!loading && data?.me.instagram === null && <ConnectInstagram />}
        {data?.me.instagram && <BodyCopy>{`@${data.me.instagram}`}</BodyCopy>}
      </Container>
    </View>
  );
};

export default Socials;
