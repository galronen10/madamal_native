import { IReport, IReportDTO } from '@/models/reports';
import { IUserRegister } from '@/models/user';
import { auth, database, storage } from 'config/firebase';
import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

export const reportCollectionRef = collection(database, 'reports');
export const userCollectionRef = collection(database, 'users');

export const api = {
  report: {
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
    uploadImage: async (
      imageUri: string,
      imageName?: string,
    ): Promise<string> => {
      const response = await fetch(imageUri);
      const blob = await response.blob();

      const imageRef = ref(storage, `images/${imageName}`);
      const res = await uploadBytes(imageRef, blob);

      return getDownloadURL(res.ref);
    },
  },
  auth: {
    register: async (data: IUserRegister): Promise<string> => {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(auth, data.email, data.password);

      const { uid } = userCredential.user;
      const docRef = doc(userCollectionRef, uid);

      await setDoc(docRef, {
        fullName: data.fullName,
        uid,
        email: data.email,
      });

      return uid;
    },
    login: async (email: string, password: string): Promise<UserCredential> =>
      signInWithEmailAndPassword(auth, email, password),
    logout: async (): Promise<void> => signOut(auth),
  },
  user: {
    getRefById: (userId: string) => doc(userCollectionRef, userId),
    getImageUri: async (userId: string): Promise<string> => {
      const imageRef = ref(storage, `images/${userId}/profile.jpg`);
      return getDownloadURL(imageRef);
    },
    // getById: async (userId: string): Promise<IBasicUserData> => {},
    // update: async (
    //   details: Partial<UserDto | UserLoginDeatils>,
    // ): Promise<UserDto> => {},
  },
};
