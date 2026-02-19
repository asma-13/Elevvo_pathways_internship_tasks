export type JobStatus = 'Applied' | 'Interviewing' | 'Offer' | 'Rejected';

export interface JobApplication {
  id: string;
  companyName: string;
  jobTitle: string;
  status: JobStatus;
  applicationDate: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobFormData {
  companyName: string;
  jobTitle: string;
  status: JobStatus;
  applicationDate: string;
  notes: string;
}
