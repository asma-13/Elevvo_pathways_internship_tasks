import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Search, Filter, PlusCircle, Briefcase, TrendingUp, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useJobs } from '../context/JobContext';
import { JobCard } from '../components/JobCard';
import { JobStatus } from '../lib/types';
import { StatsChart } from '../components/StatsChart';

export function Dashboard() {
  const { jobs } = useJobs();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<JobStatus | 'All'>('All');

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.notes.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'All' || job.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [jobs, searchQuery, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: jobs.length,
      applied: jobs.filter((j) => j.status === 'Applied').length,
      interviewing: jobs.filter((j) => j.status === 'Interviewing').length,
      offers: jobs.filter((j) => j.status === 'Offer').length,
      rejected: jobs.filter((j) => j.status === 'Rejected').length,
    };
  }, [jobs]);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black tracking-tight mb-2">
            <span className="text-gradient">HireFlow</span>
          </h1>
          <p className="text-white/50 font-medium">
            Monitor and accelerate your career progression in real-time.
          </p>
        </div>
        <button
          onClick={() => navigate('/add')}
          className="flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:scale-105 transition-all font-bold shadow-xl shadow-blue-500/20 active:scale-95"
        >
          <PlusCircle className="w-5 h-5" />
          Track New Application
        </button>
      </div>

      {/* Top Section: Stats & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard
            label="Total Applications"
            value={stats.total}
            icon={<Briefcase className="w-5 h-5 text-blue-400" />}
            color="blue"
          />
          <StatCard
            label="Interviewing"
            value={stats.interviewing}
            icon={<TrendingUp className="w-5 h-5 text-purple-400" />}
            color="purple"
          />
          <StatCard
            label="Offers Received"
            value={stats.offers}
            icon={<CheckCircle className="w-5 h-5 text-cyan-400" />}
            color="cyan"
          />
          <StatCard
            label="Total Rejected"
            value={stats.rejected}
            icon={<XCircle className="w-5 h-5 text-red-400" />}
            color="red"
          />

          {/* Quick Info Card */}
          <div className="col-span-2 sm:col-span-4 glass-card p-6 flex items-center justify-between border-l-4 border-blue-500 bg-blue-500/5">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-full">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h4 className="text-white font-bold">Keep going!</h4>
                <p className="text-white/50 text-sm">Consistency is the key to landing your dream job.</p>
              </div>
            </div>
            <div className="hidden sm:block text-right">
              <span className="text-2xl font-black text-blue-500">
                {Math.round((stats.offers / (stats.total || 1)) * 100)}%
              </span>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-tighter">Success Rate</p>
            </div>
          </div>
        </div>

        <StatsChart />
      </div>

      {/* Filters Area */}
      <div className="glass p-6 rounded-3xl border border-white/5 space-y-4">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-blue-400 transition-colors" />
            <input
              type="text"
              placeholder="Search by company, role, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 text-white placeholder:text-white/20 transition-all font-medium"
            />
          </div>

          <div className="flex gap-2 p-1 bg-white/5 rounded-2xl border border-white/10 shrink-0">
            {['All', 'Applied', 'Interviewing', 'Offer', 'Rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status as JobStatus | 'All')}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${statusFilter === status
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {searchQuery || statusFilter !== 'All' ? (
          <p className="text-xs font-bold text-white/40 uppercase tracking-widest pl-2">
            Showing {filteredJobs.length} results
          </p>
        ) : null}
      </div>

      {/* Results Grid */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <div className="glass-card p-20 text-center rounded-[3rem] border-dashed border-2 border-white/10">
          <div className="w-24 h-24 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-float">
            <Briefcase className="w-12 h-12 text-blue-400" />
          </div>
          <h3 className="text-3xl font-black text-white mb-4">Start Your Journey</h3>
          <p className="text-white/50 max-w-sm mx-auto mb-10 font-medium">
            Your career portal is empty. Track your first application to see the magic happen.
          </p>
          <button
            onClick={() => navigate('/add')}
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-2xl hover:scale-105 transition-all font-black shadow-2xl active:scale-95"
          >
            <PlusCircle className="w-6 h-6" />
            Add First Application
          </button>
        </div>
      ) : (
        <div className="glass-card p-20 text-center rounded-[3rem]">
          <Search className="w-20 h-20 text-white/10 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-white mb-2">No matching applications</h3>
          <p className="text-white/40 font-medium">Try adjusting your filters to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon, color }: { label: string; value: number; icon: React.ReactNode; color: string }) {
  const shadowColor = {
    blue: 'shadow-blue-500/10',
    purple: 'shadow-purple-500/10',
    cyan: 'shadow-cyan-500/10',
    red: 'shadow-red-500/10',
  }[color];

  return (
    <div className={`glass-card p-6 flex flex-col justify-between border-t-2 border-${color}-500/30 ${shadowColor}`}>
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2.5 bg-${color}-500/10 rounded-xl`}>{icon}</div>
      </div>
      <div>
        <p className="text-4xl font-black text-white mb-1 tracking-tighter">{value}</p>
        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest leading-none">{label}</p>
      </div>
    </div>
  );
}
