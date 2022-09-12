import {useQuery} from '@apollo/client';
import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import Container from '../../components/Container';
import LoadingIndicator from '../../components/LoadingIndicator';
import {BodyCopy, Subtitle} from '../../components/Typography';
import {Request} from '../RequestResult/RequestResult.graphql';
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

const AnketOption = ({
  onPress,
  title,
  isActive,
}: {
  onPress: () => void;
  title: string;
  isActive: boolean;
}) => {
  const containerStyles = [
    styles.anketOptionContainer,
    isActive && styles.anketOptionContainerActive,
  ];

  const textStyles = [
    styles.anketOptionText,
    isActive && styles.anketOptionTextActive,
  ];
  return (
    <Pressable style={containerStyles} onPress={onPress}>
      <BodyCopy style={textStyles}>{title}</BodyCopy>
    </Pressable>
  );
};

const AnketSwitch = ({onOptionPress, activeAnket}: AnketSwitchProps) => {
  return (
    <View style={styles.anketSwitchContainer}>
      <AnketOption
        onPress={() => onOptionPress(MY)}
        title="My Request"
        isActive={activeAnket === MY}
      />
      <AnketOption
        onPress={() => onOptionPress(OTHER)}
        title="Other Request"
        isActive={activeAnket === OTHER}
      />
    </View>
  );
};

const getRequestId = (
  current: typeof MY | typeof OTHER,
  myRequest: Request,
  otherRequest: Request,
) => {
  switch (current) {
    case MY:
      return myRequest.id;
    case OTHER:
      return otherRequest.id;
  }
};

const Ankets = ({userId}: Props) => {
  const [currentAnket, setCurrentAnket] = useState<typeof MY | typeof OTHER>(
    MY,
  );

  const {error, loading, data} = useQuery<
    GetRequestsIdsResult,
    {userId: number}
  >(GET_REQUESTS_IDS, {variables: {userId}});

  if (loading) {
    return <LoadingIndicator />;
  }

  const {myRequest, otherRequest} = data?.seeContact;

  return (
    <View style={{marginBottom: 64}}>
      <Container>
        <Subtitle style={styles.profileSectionTitle}>Ankets</Subtitle>
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
