import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { IReport } from '../reports';

export type TReportCollection =
  FirebaseFirestoreTypes.CollectionReference<IReport>;

export type TReportQuery = FirebaseFirestoreTypes.QuerySnapshot<IReport>;

export type TReportDoc = FirebaseFirestoreTypes.DocumentSnapshot<IReport>;
