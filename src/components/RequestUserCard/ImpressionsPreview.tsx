import React from 'react';
import {Image, View} from 'react-native';
import {getImpressionImage, ImpressionIcon} from '../../assets/impressions';
import {BodyCopy} from '../Typography';
import styles from './RequestUserCard.styles';

const Impression = ({impression}: {impression: ImpressionIcon}) => {
  return (
    <Image
      source={getImpressionImage(impression)}
      style={styles.impressionIcon}
    />
  );
};

const ImpressionsPreview = ({
  impressions,
  take = 2,
}: {
  impressions: ImpressionIcon[];
  take?: number;
}) => {
  const totalImpressionsCount = impressions.length;
  const visibleImpressions = impressions.slice(0, take);
  const hiddenImpressionsCount =
    totalImpressionsCount - visibleImpressions.length;

  return (
    <View style={[styles.requestInfoLine, styles.requestInfoLineImpressions]}>
      {visibleImpressions.map(impression => (
        <Impression impression={impression} key={impression} />
      ))}
      {hiddenImpressionsCount > 0 && (
        <BodyCopy
          style={
            styles.hiddenImpressionsTip
          }>{`+${hiddenImpressionsCount}`}</BodyCopy>
      )}
    </View>
  );
};

export default ImpressionsPreview;
