import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  ArrowLeft,
  Edit2,
  Trash2,
  Save,
  X,
  Calendar,
  Building2,
  Briefcase,
  FileText,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { useJobs } from '../context/JobContext';
import { JobFormData } from '../lib/types';

export function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getJobById, updateJob, deleteJob } = useJobs();

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const job = id ? getJobById(id) : undefined;

  const [formData, setFormData] = useState<JobFormData>({
    companyName: '',
    jobTitle: '',
    status: 'Applied',
    applicationDate: '',
    notes: '',
  });

  useEffect(() => {
    if (job) {
      setFormData({
        companyName: job.companyName,
        jobTitle: job.jobTitle,
        status: job.status,
        applicationDate: job.applicationDate,
        notes: job.notes,
      });
    }
  }, [job]);

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto text-center py-24">
        <h2 className="text-3xl font-black text-white mb-6">Lost in space?</h2>
        <p className="text-white/40 mb-10">This job application doesn't seem to exist.</p>
        <button
          onClick={() => navigate('/')}
          className="px-8 py-4 bg-white text-black font-black rounded-2xl hover:scale-105 active:scale-95 transition-all"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!id) return;
    updateJob(id, formData);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (!id) return;
    deleteJob(id);
    navigate('/');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Applied': return 'bg-blue-500/20 text-blue-400 border-blue-500/30 shadow-blue-500/10';
      case 'Interviewing': return 'bg-purple-500/20 text-purple-400 border-purple-500/30 shadow-purple-500/10';
      case 'Offer': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30 shadow-cyan-500/10';
      case 'Rejected': return 'bg-red-500/20 text-red-400 border-red-500/30 shadow-red-500/10';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="group flex items-center gap-2 text-white/40 hover:text-white mb-10 transition-colors font-bold uppercase tracking-widest text-xs"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Dashboard
      </button>

      {/* Main Card */}
      <div className="glass-card overflow-hidden relative">
        <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full opacity-10 transition-colors ${isEditing ? 'bg-purple-500' : 'bg-blue-500'}`} />

        {/* Header Section */}
        <div className="p-8 sm:p-12 border-b border-white/5 bg-white/[0.02]">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
            <div className="flex-1 space-y-4">
              {isEditing ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 pl-1">Role Title</label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      className="w-full text-2xl font-black bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 pl-1">Company</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full text-lg font-bold bg-white/5 border-white/10"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <div className={`inline-flex px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-lg mb-6 ${getStatusStyles(job.status)}`}>
                      {job.status}
                    </div>
                    <h1 className="text-5xl font-black text-white leading-tight mb-2 tracking-tighter">
                      {job.jobTitle}
                    </h1>
                    <div className="flex items-center gap-3 text-2xl font-bold text-white/60">
                      <Building2 className="w-6 h-6 text-blue-400" />
                      {job.companyName}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Actions */}
            {!isEditing && (
              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-4 bg-white/5 hover:bg-blue-500/20 text-white/60 hover:text-blue-400 rounded-2xl transition-all border border-white/5 hover:border-blue-500/30"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="p-4 bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 rounded-2xl transition-all border border-white/5 hover:border-red-500/30"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Info Grid */}
        <div className="p-8 sm:p-12 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column: Details */}
            <div className="space-y-8">
              <DetailSection
                icon={<Calendar className="w-5 h-5 text-blue-400" />}
                label="Timeline"
              >
                {isEditing ? (
                  <input
                    type="date"
                    name="applicationDate"
                    value={formData.applicationDate}
                    onChange={handleChange}
                    className="w-full"
                  />
                ) : (
                  <p className="text-xl font-bold text-white/80">{formatDate(job.applicationDate)}</p>
                )}
              </DetailSection>

              <DetailSection
                icon={<TrendingUp className="w-5 h-5 text-purple-400" />}
                label="Current Stage"
              >
                {isEditing ? (
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full cursor-pointer"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                ) : (
                  <p className="text-xl font-bold text-white/80 uppercase tracking-widest">{job.status}</p>
                )}
              </DetailSection>
            </div>

            {/* Right Column: Notes */}
            <DetailSection
              icon={<FileText className="w-5 h-5 text-cyan-400" />}
              label="Intelligence & Notes"
              fullWidth
            >
              {isEditing ? (
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={8}
                  className="w-full text-base resize-none"
                  placeholder="Record interview feedback, contact people, and next steps..."
                />
              ) : job.notes ? (
                <div className="glass bg-white/[0.02] rounded-3xl p-8 border border-white/5">
                  <p className="text-white/70 text-lg leading-relaxed whitespace-pre-wrap">{job.notes}</p>
                </div>
              ) : (
                <div className="py-8 border-2 border-dashed border-white/5 rounded-3xl text-center">
                  <p className="text-white/20 font-bold uppercase tracking-widest text-xs italic">No additional intel recorded</p>
                </div>
              )}
            </DetailSection>
          </div>

          {/* Footer Metadata */}
          <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 text-white/20">
                <Clock className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Added {formatDateTime(job.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2 text-white/20">
                <Clock className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Last Activity {formatDateTime(job.updatedAt)}</span>
              </div>
            </div>
          </div>

          {/* Edit Mode Buttons */}
          {isEditing && (
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleSave}
                className="flex-1 py-5 bg-white text-black font-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
              >
                Apply Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 py-5 glass hover:bg-white/10 text-white/60 hover:text-white rounded-2xl active:scale-95 transition-all font-bold"
              >
                Cancel Edit
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center p-6 z-[200] animate-in fade-in duration-300">
          <div className="glass-card max-w-md w-full p-10 border-red-500/20 text-center">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trash2 className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-2xl font-black text-white mb-4 tracking-tight text-gradient">Terminate Entry?</h3>
            <p className="text-white/50 mb-10 font-medium">
              Are you sure you want to delete <span className="text-white">{job.jobTitle}</span>? This intelligence cannot be recovered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleDelete}
                className="flex-1 py-4 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 active:scale-95 transition-all"
              >
                Delete Permanently
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-4 glass hover:bg-white/10 text-white/60 rounded-2xl active:scale-95 transition-all"
              >
                Abort
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailSection({ icon, label, children, fullWidth = false }: { icon: React.ReactNode; label: string; children: React.ReactNode; fullWidth?: boolean }) {
  return (
    <div className={`space-y-4 ${fullWidth ? 'md:col-span-2' : ''}`}>
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-white/5 rounded-xl border border-white/5">{icon}</div>
        <span className="text-xs font-black uppercase tracking-[0.2em] text-white/30">{label}</span>
      </div>
      <div className="pl-14">
        {children}
      </div>
    </div>
  );
}

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
