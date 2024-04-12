import React, { FC, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { HomeScreen, UserProfileScreen, UserReportsScreen } from '@/screens';
import { HeaderAddReport, LogoutButton } from '@/navigation/components';
import { EAppRoutes } from '@/models/routes';
import { titleDisplayText } from '@/navigation/models';
import { api, reportCollectionRef } from '@/api';
import { IReport } from '@/models/reports';
import { setReports } from '@/redux/reports';
import { Unsubscribe, onSnapshot, query } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { auth } from 'config/firebase';
import { IStoreUser, IUserFromDb } from '@/models/user';
import { updateUser } from '@/redux/user';

const Tab = createBottomTabNavigator();

export const BottomNavigator: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unSubArray: Unsubscribe[] = [];
    unSubArray.push(
      onSnapshot(query(reportCollectionRef), (reportsSnapshot) => {
        const reports: IReport[] = [];
        reportsSnapshot.forEach((documentSnapshot) => {
          reports.push({ ...(documentSnapshot.data() as IReport) });
        });

        dispatch(setReports(reports));
      }),
    );

    if (auth.currentUser?.uid)
      unSubArray.push(
        onSnapshot(
          api.user.getRefById(auth.currentUser?.uid),
          async (userSnapshot) => {
            const currUser: IUserFromDb = userSnapshot.data() as IUserFromDb;
            if (currUser) {
              const userImageUri = await api.user.getImageUri(currUser.uid);

              const userForStore: IStoreUser = {
                ...currUser,
              };

              if (userImageUri) {
                userForStore.imageUri = userImageUri;
              }

              dispatch(updateUser(userForStore));
            }
          },
        ),
      );

    // Stop listening for updates when no longer required
    return () =>
      unSubArray.forEach((unSub) => {
        unSub();
      });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerTitleAlign: 'center',
        title: titleDisplayText[route.name as EAppRoutes],
        tabBarLabel: titleDisplayText[route.name as EAppRoutes],
        // headerStyle: styles.header,
        headerRight: LogoutButton,
      })}
    >
      <Tab.Screen
        name={EAppRoutes.home}
        component={HomeScreen}
        options={({ navigation: { navigate } }) => ({
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
          headerLeft: () => <HeaderAddReport navigate={navigate} />,
        })}
      />
      <Tab.Screen
        name={EAppRoutes.myReports}
        component={UserReportsScreen}
        options={({ navigation: { navigate } }) => ({
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="list" size={size} color={color} />
          ),
          headerLeft: () => <HeaderAddReport navigate={navigate} />,
        })}
      />
      <Tab.Screen
        name={EAppRoutes.myProfile}
        component={UserProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
