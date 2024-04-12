export interface IReportInDb {
  userId: string;
  data: string;
  image?: string;
  title: string;
  lastUpdated: number;
}

export interface IReport extends Omit<IReportInDb, 'lastUpdated'> {
  id: string;
  lastUpdated: Date;
}

export interface IReportDTO {
  userId?: string;
  data?: string;
  imageName?: any;
}

export interface IUpdateInReportDTO extends IReportDTO {
  reportId: string;
}
