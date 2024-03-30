import { Image } from 'react-native';
import React, { FC } from 'react';
import { madaMalBannerImg } from '@/constants/images';
import { styles } from './styles';

export const MadaMalBanner: FC = () => {
  return (
    <Image
      style={styles.topImage}
      source={madaMalBannerImg}
      resizeMode="stretch"
    />
  );
};
