import {useQuery} from '@apollo/client';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import Container from '../../components/Container';
import Link from '../../components/Links';
import LoadingIndicator from '../../components/LoadingIndicator';
import {BodyCopy} from '../../components/Typography';
import ContactAnket from './Contact.Anket';
import {GetRequestsIdsResult, GET_REQUESTS_IDS} from './Contact.graphql';
import styles from './Contact.styles';

type Props = {
  userId: number;
};

const MY = 'my';
const OTHER = 'other';

type AnketSwitchProps = {
  onOptionPress: (value: typeof MY | typeof OTHER) => void;
  activeAnket: typeof MY | typeof OTHER;
};
const AnketSwitch = ({onOptionPress, activeAnket}: AnketSwitchProps) => {
  const {t} = useTranslation();
  const inactiveAnket = activeAnket === MY ? OTHER : MY;
  return (
    <View style={styles.anketSwitchContainer}>
      <BodyCopy style={styles.anketSwitchActive}>
        {t(`app.contact.${activeAnket}RequestTitle`)}
      </BodyCopy>
      <Link
        style={styles.anketSwitchInactive}
        onPress={() => onOptionPress(inactiveAnket)}>
        {t(`app.contact.${inactiveAnket}RequestTitle`)}
      </Link>
    </View>
  );
};

const Ankets = ({userId}: Props) => {
  const [currentAnket, setCurrentAnket] = useState<typeof MY | typeof OTHER>(
    MY,
  );
  const {loading, data} = useQuery<GetRequestsIdsResult, {userId: number}>(
    GET_REQUESTS_IDS,
    {variables: {userId}},
  );

  if (loading) {
    return <LoadingIndicator />;
  }

  const {myRequest, otherRequest} = data?.seeContact;

  return (
    <View style={{marginBottom: 64}}>
      <Container>
        <AnketSwitch
          activeAnket={currentAnket}
          onOptionPress={value => setCurrentAnket(value)}
        />
      </Container>
      {currentAnket === MY && <ContactAnket requestId={myRequest.id} />}
      {currentAnket === OTHER && <ContactAnket requestId={otherRequest.id} />}
    </View>
  );
};

export default Ankets;
