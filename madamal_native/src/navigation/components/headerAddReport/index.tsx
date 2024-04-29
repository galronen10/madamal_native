import { WeatherDisplay } from '@/components/common';
import { EAppRoutes } from '@/models/routes';
import React, { FC } from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface IHeaderAddReportProps {
  navigate: any;
}

export const styles = StyleSheet.create({
  container: { alignItems: 'center', flexDirection: 'row' },
});

export const HeaderAddReport: FC<IHeaderAddReportProps> = ({ navigate }) => {
  return (
    <View style={styles.container}>
      <IconButton
        icon="plus"
        size={20}
        onPress={() => navigate(EAppRoutes.reportForm)}
      />
      <WeatherDisplay />
    </View>
  );
};
