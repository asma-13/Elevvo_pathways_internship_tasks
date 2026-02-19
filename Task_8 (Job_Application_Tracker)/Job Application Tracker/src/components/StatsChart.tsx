import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useJobs } from '../context/JobContext';
import { useMemo } from 'react';

export function StatsChart() {
    const { jobs } = useJobs();

    const data = useMemo(() => {
        const stats = {
            Applied: jobs.filter(j => j.status === 'Applied').length,
            Interviewing: jobs.filter(j => j.status === 'Interviewing').length,
            Offer: jobs.filter(j => j.status === 'Offer').length,
            Rejected: jobs.filter(j => j.status === 'Rejected').length,
        };

        return [
            { name: 'Applied', value: stats.Applied, color: '#3b82f6' },
            { name: 'Interviewing', value: stats.Interviewing, color: '#a855f7' },
            { name: 'Offer', value: stats.Offer, color: '#22d3ee' },
            { name: 'Rejected', value: stats.Rejected, color: '#ef4444' },
        ].filter(item => item.value > 0);
    }, [jobs]);

    if (jobs.length === 0) return null;

    return (
        <div className="glass-card p-6 h-[300px]">
            <h3 className="text-lg font-semibold mb-4 text-white/90">Application Status</h3>
            <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        animationBegin={0}
                        animationDuration={1500}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(17, 24, 39, 0.8)',
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                            backdropFilter: 'blur(12px)',
                            color: '#fff'
                        }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        formatter={(value) => <span className="text-white/70 text-sm">{value}</span>}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
