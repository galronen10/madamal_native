import { View, Image, Text } from 'react-native';
import React, { FC, useState } from 'react';
import { userStub } from '@/constants/userStub';
import { IBasicUserData } from '@/models/user';
import { Button, TextInput } from 'react-native-paper';
import { styles } from './styles';
import { MadaMalBanner } from '@/components/common';

export const UserProfileScreen: FC = () => {
  const [userData, setUserData] = useState<IBasicUserData>(userStub);

  const goToEdit = (): void => {};
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

        {userData.imageUrl && (
          <Image
            style={styles.userImage}
            source={{ uri: userData.imageUrl }}
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
