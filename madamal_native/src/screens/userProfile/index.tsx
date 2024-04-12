import { View, Image, Text } from 'react-native';
import React, { FC } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { styles } from './styles';
import { MadaMalBanner } from '@/components/common';
import { useNavigation } from '@react-navigation/native';
import { EAppRoutes } from '@/models/routes';
import { useAppSelector } from '@/hooks/store';
import { selectUser } from '@/redux/user';

export const UserProfileScreen: FC = () => {
  const userData = useAppSelector(selectUser);
  const navigation = useNavigation();

  const goToEdit = (): void => {
    navigation.navigate(EAppRoutes.editUser);
  };

  return (
    <View style={styles.container}>
      <MadaMalBanner />
      <View style={styles.userData}>
        <TextInput
          style={styles.textDisplay}
          label="אימייל"
          editable={false}
          value={userData.email}
          textAlign="right"
        />
        <TextInput
          style={styles.textDisplay}
          label="שם מלא"
          editable={false}
          value={userData.fullName}
          textAlign="right"
        />

        {userData.imageUri && (
          <Image
            style={styles.userImage}
            source={{ uri: userData.imageUri }}
            resizeMode="contain"
          />
        )}
      </View>

      <Button mode="contained" onPress={goToEdit} style={styles.button}>
        <Text>ערוך פרופיל</Text>
      </Button>
    </View>
  );
};
