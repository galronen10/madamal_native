import { IReport, IReportDTO } from '@/models/reports';
import { IUserRegister } from '@/models/user';
import { auth, database } from 'config/firebase';
import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { collection, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

export const reportCollectionRef = collection(database, 'reports');
export const userCollectionRef = collection(database, 'users');

export const api = {
  report: {
    // getAll: (): Promise<TReportQuery> => reportCollection.get(),
    getById: async (reportId: string): Promise<IReport> => {
      const docRef = doc(reportCollectionRef, reportId);
      return (await getDoc(docRef)).data() as IReport;
    },
    deleteReport: async (reportId: string): Promise<void> => {
      const docRef = doc(reportCollectionRef, reportId);
      return deleteDoc(docRef);
    },
    addReport: async (reportDTO: IReportDTO): Promise<void> => {},
    updateReport: async (reportDTO: IReportDTO): Promise<void> => {},
  },
  image: {
    uploadImage: async (image: FormData, imageName?: string) => {},
  },
  auth: {
    register: async (data: IUserRegister): Promise<void> => {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      const docRef = doc(userCollectionRef, data.email);

      await setDoc(docRef, {
        fullName: data.fullName,
        uid: userCredential.user.uid,
      });
    },
    login: async (email: string, password: string): Promise<UserCredential> =>
      signInWithEmailAndPassword(auth, email, password),
    logout: async (): Promise<void> => signOut(auth),
  },
  // user: {
  //   getById: async (userId: string): Promise<UserDto> => {},
  //   update: async (
  //     details: Partial<UserDto | UserLoginDeatils>,
  //   ): Promise<UserDto> => {},
  // },
};
