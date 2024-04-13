export interface IReportInDB {
  userId: string;
  data: string;
  image: string;
  title: string;
  lastUpdated: number;
}

export interface IReport extends Omit<IReportInDB, 'lastUpdated'> {
  id: string;
  lastUpdated: Date;
}
export interface IUpdateReportDTO {
  data: string;
  title: string;
  imageUri?: string;
  reportId: string;
}

export interface IAddReportDTO extends Omit<IUpdateReportDTO, 'reportId'> {
  userId: string;
}
