import {
  IReport,
  IAddReportDTO,
  IReportInDB,
  IUpdateReportDTO,
} from '@/models/reports';
import { IUserRegister } from '@/models/user';
import { auth, database, storage } from 'config/firebase';
import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
} from 'firebase/firestore';

export const reportCollectionRef = collection(database, 'reports_native');
export const userCollectionRef = collection(database, 'users');

const getUserImageUrl = (userId: string): string =>
  `users/${userId}/profile.jpg`;

const getReportImageUrl = (reportId: string): string =>
  `reports/${reportId}/reportImage.jpg`;

const uploadImage = async (
  imageUri: string,
  imageName?: string,
): Promise<string> => {
  const response = await fetch(imageUri);
  const blob = await response.blob();

  const imageRef = ref(storage, `images/${imageName}`);
  const res = await uploadBytes(imageRef, blob);

  return getDownloadURL(res.ref);
};

export const api = {
  report: {
    getAll: () => query(reportCollectionRef, orderBy('lastUpdated', 'desc')),
    getById: async (reportId: string): Promise<IReport> => {
      const docRef = doc(reportCollectionRef, reportId);
      return (await getDoc(docRef)).data() as IReport;
    },
    deleteReport: async (reportId: string): Promise<void> => {
      const docRef = doc(reportCollectionRef, reportId);
      return deleteDoc(docRef);
    },
    addReport: async (reportDTO: IAddReportDTO): Promise<void> => {
      const docRef = doc(reportCollectionRef);

      const { imageUri, ...restOfDTO } = reportDTO;

      const uploadedImageUrl: string = imageUri
        ? await uploadImage(imageUri, getReportImageUrl(docRef.id))
        : '';

      const reportToAdd: IReportInDB = {
        ...restOfDTO,
        image: uploadedImageUrl,
        lastUpdated: new Date().getTime(),
      };

      await setDoc(docRef, reportToAdd);
    },
    updateReport: async ({
      data,
      imageUri,
      reportId,
      title,
    }: IUpdateReportDTO): Promise<void> => {
      const docRef = doc(reportCollectionRef, reportId);

      const dataToUpdate: Partial<IReportInDB> = {
        data,
        title,
        lastUpdated: new Date().getTime(),
      };

      if (imageUri) {
        const uploadedImageUrl: string = await uploadImage(
          imageUri,
          getReportImageUrl(reportId),
        );

        dataToUpdate.image = uploadedImageUrl;
      }

      await updateDoc(docRef, dataToUpdate);
    },
  },
  image: {
    uploadImage,
  },
  auth: {
    register: async (data: IUserRegister): Promise<void> => {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(auth, data.email, data.password);

      const { uid } = userCredential.user;

      if (data.imageUri) await uploadImage(data.imageUri, getUserImageUrl(uid));

      const docRef = doc(userCollectionRef, uid);

      await setDoc(docRef, {
        fullName: data.fullName,
        uid,
        email: data.email,
      });
    },
    login: async (email: string, password: string): Promise<UserCredential> =>
      signInWithEmailAndPassword(auth, email, password),
    logout: async (): Promise<void> => signOut(auth),
  },
  user: {
    getRefById: (userId: string) => doc(userCollectionRef, userId),
    getImageUri: async (userId: string): Promise<string> => {
      try {
        const imageRef = ref(storage, `images/${getUserImageUrl(userId)}`);
        return await getDownloadURL(imageRef);
      } catch (error: any) {
        if (error.code === 'storage/object-not-found') {
          return '';
        } else {
          return '';
        }
      }
    },
    update: async (uid: string, fullName: string): Promise<void> =>
      updateDoc(doc(userCollectionRef, uid), {
        fullName,
      }),
  },
};
