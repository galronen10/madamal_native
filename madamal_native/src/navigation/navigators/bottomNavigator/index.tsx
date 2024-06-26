import React, { FC, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { HomeScreen, UserProfileScreen, UserReportsScreen } from '@/screens';
import { HeaderAddReport, LogoutButton } from '@/navigation/components';
import { EAppRoutes } from '@/models/routes';
import { titleDisplayText } from '@/navigation/models';
import { api } from '@/api';
import { IReport, IReportInDB as IReportInDB } from '@/models/reports';
import { setReports } from '@/redux/reports';
import { Unsubscribe, onSnapshot } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { auth } from 'config/firebase';
import { IStoreUser, IUserFromDb } from '@/models/user';
import { updateUser } from '@/redux/user';
import { FullSizeLoader, WeatherDisplay } from '@/components/common';

const Tab = createBottomTabNavigator();

export const BottomNavigator: FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unSubArray: Unsubscribe[] = [];
    unSubArray.push(
      onSnapshot(api.report.getAll(), (reportsSnapshot) => {
        const reports: IReport[] = [];
        reportsSnapshot.forEach((documentSnapshot) => {
          const reportFromDb = documentSnapshot.data() as IReportInDB;

          reports.push({
            data: reportFromDb.data,
            image: reportFromDb.image,
            title: reportFromDb.title,
            userId: reportFromDb.userId,
            lastUpdated: new Date(reportFromDb.lastUpdated),
            id: documentSnapshot.id,
          });
        });

        dispatch(setReports(reports));
        setIsLoading(false);
      }),
    );

    if (auth.currentUser?.uid)
      unSubArray.push(
        onSnapshot(
          api.user.getRefById(auth.currentUser?.uid),
          async (userSnapshot) => {
            const currUser: IUserFromDb = userSnapshot.data() as IUserFromDb;
            if (currUser) {
              const userForStore: IStoreUser = { ...currUser };

              const userImageUri = await api.user.getImageUri(currUser.uid);
              if (userImageUri) userForStore.imageUri = userImageUri;

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

  return isLoading ? (
    <FullSizeLoader />
  ) : (
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
          headerLeft: () => <WeatherDisplay />,
        }}
      />
    </Tab.Navigator>
  );
};
