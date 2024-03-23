import { View, Text } from 'react-native';
import React, { FC } from 'react';
import { styles } from './styles';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

interface IReportFormScreenProps extends NativeStackHeaderProps {}

export const ReportFormScreen: FC<IReportFormScreenProps> = ({
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <Text>report form </Text>
    </View>
  );
};
