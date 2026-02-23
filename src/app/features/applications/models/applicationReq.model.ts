import { ApplicationStatus } from "./applicationStatus.enum";

export interface ApplicationReqModel {
  userId: string;
  offerId: string;
  apiSource: string;
  title: string;
  company: string;
  location: string;
  url: string;
  status?: ApplicationStatus;
  notes?: string;
}
