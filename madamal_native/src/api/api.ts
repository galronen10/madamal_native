import { IReportDTO } from '@/models/reports';

export const REFETCH_INTERVAL = 3000;

// export const reportCollection: TReportCollection =
//   firestore().collection('collection_name');

export const api = {
  report: {
    // getAll: (): Promise<TReportQuery> => reportCollection.get(),
    getById: async (reportId: string) => {},
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
