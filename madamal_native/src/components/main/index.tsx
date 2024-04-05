import { reportCollection } from '@/api';
import { IReport } from '@/models/reports';
import { MainNavigator } from '@/navigation';
import { setReports } from '@/redux/reports';
import React, { FC, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';

export const Main: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const subscriber = reportCollection.onSnapshot((reportsSnapshot) => {
      const reports: IReport[] = [];
      reportsSnapshot.forEach((documentSnapshot) => {
        reports.push({ ...documentSnapshot.data() });
      });

      dispatch(setReports(reports));
    });

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
