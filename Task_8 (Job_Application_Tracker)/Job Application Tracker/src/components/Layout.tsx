import { Outlet, NavLink } from 'react-router';
import { Briefcase, LayoutDashboard, PlusCircle, Download, Upload } from 'lucide-react';
import { useJobs } from '../context/JobContext';
import { useRef } from 'react';

export function Layout() {
  const { jobs, exportJobs, importJobs } = useJobs();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    exportJobs();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await importJobs(file);
    } catch (error) {
      console.error('Import failed:', error);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass border-b border-white/10 sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="p-2.5 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div className="block">
                <h1 className="text-2xl font-black tracking-tight">
                  <span className="text-gradient">HireFlow</span>
                </h1>
                <p className="text-[10px] uppercase tracking-widest text-blue-400 font-bold">
                  {jobs.length} ACTIVE APPLICATIONS
                </p>
              </div>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center gap-3">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 ${isActive
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/10'
                    : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                  }`
                }
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="font-medium">Dashboard</span>
              </NavLink>
              <NavLink
                to="/add"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 ${isActive
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/10'
                    : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                  }`
                }
              >
                <PlusCircle className="w-4 h-4" />
                <span className="font-medium">Add Job</span>
              </NavLink>

              {/* Action Buttons */}
              <div className="ml-4 flex items-center gap-3 pl-6 border-l border-white/10">
                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 p-2.5 text-white/60 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all"
                  title="Export to JSON"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={handleImportClick}
                  className="flex items-center gap-2 p-2.5 text-white/60 hover:text-purple-400 hover:bg-purple-500/10 rounded-xl transition-all"
                  title="Import from JSON"
                >
                  <Upload className="w-5 h-5" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </nav>

            {/* Mobile Header Actions */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={handleExport}
                className="p-3 text-white/60 hover:bg-white/5 rounded-xl active:bg-blue-500/20"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={handleImportClick}
                className="p-3 text-white/60 hover:bg-white/5 rounded-xl active:bg-purple-500/20"
              >
                <Upload className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Outlet />
      </main>

      <footer className="footer py-8 border-t border-white/5 bg-white/[0.02] text-center mb-24 md:mb-0">
        <p className="text-white/40 font-medium text-sm">
          Powered by <a href="https://www.linkedin.com/in/iasmachanna/" target="_blank" rel="noopener" className="text-blue-400 hover:text-blue-300 font-bold underline transition-colors">Asma Channa</a>
        </p>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mt-2 footer-note">
          Data updates in real-time
        </p>
      </footer>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-6 left-6 right-6 glass p-2 rounded-2xl flex gap-2 z-50 shadow-2xl border border-white/10">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center gap-1 py-3 rounded-xl transition-all ${isActive
              ? 'bg-blue-500/20 text-blue-400'
              : 'text-white/40 hover:text-white/60'
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Dash</span>
        </NavLink>
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center gap-1 py-3 rounded-xl transition-all ${isActive
              ? 'bg-purple-500/20 text-purple-400'
              : 'text-white/40 hover:text-white/60'
            }`
          }
        >
          <PlusCircle className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Add</span>
        </NavLink>
      </nav>
    </div>
  );
}
