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

export type IReportDTO = Omit<IReportInDB, 'image'>;

export interface IUpdateInReportDTO extends IReportDTO {
  reportId: string;
}
