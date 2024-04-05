export interface IReport {
  id: number;
  ownerId: string;
  data: string;
  image?: string;
}

export interface IReportDTO {
  ownerId?: string;
  data?: string;
  imageName?: any;
}

export interface IUpdateInReportDTO extends IReportDTO {
  reportId: string;
}
