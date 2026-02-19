import { useNavigate } from 'react-router';
import { Calendar, Building2, ExternalLink, Clock } from 'lucide-react';
import { JobApplication } from '../lib/types';

interface JobCardProps {
  job: JobApplication;
}

export function JobCard({ job }: JobCardProps) {
  const navigate = useNavigate();

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Applied':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Interviewing':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Offer':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'Rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div
      onClick={() => navigate(`/job/${job.id}`)}
      className="glass-card group cursor-pointer overflow-hidden p-6 hover:shadow-2xl hover:shadow-blue-500/10"
    >
      <div className="flex justify-between items-start mb-6">
        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyles(job.status)}`}>
          {job.status}
        </div>
        <div className="p-2 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
          <ExternalLink className="w-4 h-4 text-white/40" />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
            {job.jobTitle}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-white/50">
            <Building2 className="w-4 h-4" />
            <span className="text-sm font-medium">{job.companyName}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white/40">
            <Calendar className="w-4 h-4" />
            <span className="text-xs font-bold">{formatDate(job.applicationDate)}</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-black text-white/20 uppercase tracking-tighter">
            <Clock className="w-3 h-3" />
            <span>Last Updated</span>
          </div>
        </div>
      </div>

      {/* Decorative gradient blur */}
      <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-blue-500/10 blur-3xl rounded-full group-hover:bg-blue-500/20 transition-all duration-700" />
    </div>
  );
}
