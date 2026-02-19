import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Save, X, Briefcase, Building2, Calendar, FileText } from 'lucide-react';
import { useJobs } from '../context/JobContext';
import { JobFormData } from '../lib/types';

export function AddJob() {
  const navigate = useNavigate();
  const { addJob } = useJobs();

  const [formData, setFormData] = useState<JobFormData>({
    companyName: '',
    jobTitle: '',
    status: 'Applied',
    applicationDate: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof JobFormData, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof JobFormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof JobFormData, string>> = {};
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';
    if (!formData.applicationDate) newErrors.applicationDate = 'Application date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    addJob(formData);
    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-white mb-3 tracking-tight">
          Track New <span className="text-gradient">Opportunity</span>
        </h1>
        <p className="text-white/40 font-medium">Record the details of your latest application.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="glass-card p-8 sm:p-12 space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-purple-500 to-cyan-500" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Job Title */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-white/60 uppercase tracking-widest pl-1">
              <Briefcase className="w-4 h-4 text-blue-400" />
              Job Title
            </label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="e.g. Senior Frontend Engineer"
              className={`w-full ${errors.jobTitle ? 'border-red-500/50 focus:ring-red-500/20' : ''}`}
            />
            {errors.jobTitle && <p className="text-red-400 text-xs font-bold pl-1">{errors.jobTitle}</p>}
          </div>

          {/* Company Name */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-white/60 uppercase tracking-widest pl-1">
              <Building2 className="w-4 h-4 text-purple-400" />
              Company
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="e.g. Google"
              className={`w-full ${errors.companyName ? 'border-red-500/50 focus:ring-red-500/20' : ''}`}
            />
            {errors.companyName && <p className="text-red-400 text-xs font-bold pl-1">{errors.companyName}</p>}
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-white/60 uppercase tracking-widest pl-1">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full cursor-pointer appearance-none"
            >
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Application Date */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-white/60 uppercase tracking-widest pl-1">
              <Calendar className="w-4 h-4 text-blue-400" />
              Date Applied
            </label>
            <input
              type="date"
              name="applicationDate"
              value={formData.applicationDate}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              className={`w-full cursor-pointer ${errors.applicationDate ? 'border-red-500/50' : ''}`}
            />
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-white/60 uppercase tracking-widest pl-1">
            <FileText className="w-4 h-4 text-blue-400" />
            Notes & Details
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={5}
            placeholder="Add specific keywords, salary expectations, or interview dates..."
            className="w-full resize-none"
          />
          <div className="flex justify-end pr-1">
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
              {formData.notes.length} characters
            </span>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:scale-[1.02] active:scale-95 transition-all font-black shadow-xl shadow-blue-500/20"
          >
            <Save className="w-5 h-5" />
            Create Application
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex-1 flex items-center justify-center gap-3 px-8 py-5 glass hover:bg-white/10 text-white/60 hover:text-white rounded-2xl active:scale-95 transition-all font-bold"
          >
            <X className="w-5 h-5" />
            Discard Changes
          </button>
        </div>
      </form>
    </div>
  );
}

// Utility icon
function TrendingUp(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
