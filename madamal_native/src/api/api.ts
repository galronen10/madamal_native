import { IReport, IReportDTO } from '@/models/reports';
import { database } from 'config/firebase';
import { collection, doc, getDoc } from 'firebase/firestore';

export const reportCollectionRef = collection(database, 'reports');

export const api = {
  report: {
    // getAll: (): Promise<TReportQuery> => reportCollection.get(),
    getById: async (reportId: string): Promise<IReport> => {
      const docRef = doc(reportCollectionRef, reportId);
      return (await getDoc(docRef)).data() as IReport;
    },
    deleteReport: async (reportId: string): Promise<void> => {},
    addReport: async (reportDTO: IReportDTO): Promise<void> => {},
    updateReport: async (reportDTO: IReportDTO): Promise<void> => {},
  },
  image: {
    uploadImage: async (image: FormData, imageName?: string) => {},
  },
  // auth: {
  //   register: async (
  //     data: UserRegister,
  //   ): Promise<AxiosResponse<UserRegister>> => {},
  //   login: async (
  //     details: UserLoginDeatils,
  //   ): Promise<AxiosResponse<LoginDecodedData>> => {},
  //   logout: async (): Promise<AxiosResponse<void>> => {},
  //   refresh: async (): Promise<AxiosResponse<LoginDecodedData>> => {},
  // },
  // user: {
  //   getById: async (userId: string): Promise<UserDto> => {},
  //   update: async (
  //     details: Partial<UserDto | UserLoginDeatils>,
  //   ): Promise<UserDto> => {},
  // },
};
