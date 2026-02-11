export interface JobModel {
  id:string;
  jobTitle: string;
  companyName: string;
  location: string;
  publicationDate: string;
  description: string;
  descriptionPreview: string;
  fullOfferLink: string;
  salary?: string;
}
