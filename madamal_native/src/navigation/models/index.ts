export enum EAppRoutes {
  main = 'main',
  home = 'home',
  myProfile = 'myProfile',
  myReports = 'myReports',
  reportForm = 'reportForm',
}

export const tabDisplayText: Record<EAppRoutes, string> = {
  [EAppRoutes.home]: 'בית',
  [EAppRoutes.myProfile]: 'הפרופיל שלי',
  [EAppRoutes.myReports]: 'הדיווחים שלי',
  [EAppRoutes.main]: '',
  [EAppRoutes.reportForm]: '',
};
