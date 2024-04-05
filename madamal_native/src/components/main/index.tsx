import { IReport } from '@/models/reports';
import { MainNavigator } from '@/navigation';
import { setReports } from '@/redux/reports';
import { collection, onSnapshot, query } from '@firebase/firestore';
import { database } from 'config/firebase';
import React, { FC, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';

export const Main: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const subscriber = onSnapshot(
      query(collection(database, 'reports')),
      (reportsSnapshot) => {
        const reports: IReport[] = [];
        reportsSnapshot.forEach((documentSnapshot) => {
          reports.push({ ...(documentSnapshot.data() as IReport) });
        });

        dispatch(setReports(reports));
      },
    );

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  return (
    <>
      <MainNavigator />
      <Toast />
    </>
  );
};
