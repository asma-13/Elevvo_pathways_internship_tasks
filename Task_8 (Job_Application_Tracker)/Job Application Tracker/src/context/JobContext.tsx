import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { JobApplication, JobFormData } from '../lib/types';
import { Toast, ToastType } from '../components/Toast';

interface JobContextType {
  jobs: JobApplication[];
  addJob: (job: JobFormData) => void;
  updateJob: (id: string, job: JobFormData) => void;
  deleteJob: (id: string) => void;
  getJobById: (id: string) => JobApplication | undefined;
  exportJobs: () => void;
  importJobs: (file: File) => Promise<void>;
  showToast: (message: string, type: ToastType) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

const STORAGE_KEY = 'job-applications';

export function JobProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const showToast = useCallback((message: string, type: ToastType) => {
    setToast({ message, type });
  }, []);

  // Load jobs from localStorage on mount
  useEffect(() => {
    const storedJobs = localStorage.getItem(STORAGE_KEY);
    if (storedJobs) {
      try {
        const parsedJobs = JSON.parse(storedJobs);
        setJobs(parsedJobs);
      } catch (error) {
        console.error('Error loading jobs from localStorage:', error);
      }
    }
  }, []);

  // Save jobs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (jobData: JobFormData) => {
    const newJob: JobApplication = {
      id: `job-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...jobData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setJobs((prevJobs) => [newJob, ...prevJobs]);
    showToast('Job application added successfully!', 'success');
  };

  const updateJob = (id: string, jobData: JobFormData) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id
          ? {
            ...job,
            ...jobData,
            updatedAt: new Date().toISOString(),
          }
          : job
      )
    );
    showToast('Job application updated!', 'success');
  };

  const deleteJob = (id: string) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
    showToast('Job application deleted', 'info');
  };

  const getJobById = (id: string) => {
    return jobs.find((job) => job.id === id);
  };

  const exportJobs = () => {
    try {
      const dataStr = JSON.stringify(jobs, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `job-applications-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast('Data exported successfully!', 'success');
    } catch (error) {
      showToast('Failed to export data', 'error');
    }
  };

  const importJobs = async (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const importedJobs = JSON.parse(content) as JobApplication[];

          if (!Array.isArray(importedJobs)) {
            throw new Error('Invalid file format: expected an array of jobs');
          }

          const isValid = importedJobs.every(
            (job) =>
              job.id &&
              job.companyName &&
              job.jobTitle &&
              job.status &&
              job.applicationDate
          );

          if (!isValid) {
            throw new Error('Invalid job data structure in file');
          }

          setJobs(importedJobs);
          showToast('Data imported successfully!', 'success');
          resolve();
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Invalid JSON file';
          showToast(message, 'error');
          reject(error);
        }
      };

      reader.onerror = () => {
        showToast('Error reading file', 'error');
        reject(new Error('Error reading file'));
      };

      reader.readAsText(file);
    });
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        addJob,
        updateJob,
        deleteJob,
        getJobById,
        exportJobs,
        importJobs,
        showToast,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {children}
    </JobContext.Provider>
  );
}

export function useJobs() {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
}
