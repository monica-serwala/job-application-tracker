import { useEffect, useState } from "react";
import { getDashboard } from "../api/jobApplications";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function Dashboard() {

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadDashboard() {
            try {
                const data = await getDashboard();
                setStats(data);
            } catch (error) {
                console.error("Error loading dashboard:", error);
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, []);

    if (loading) {
        return <div>Loading dashboard...</div>;
    }

    const chartData = Object.entries(stats.statusBreakdown || {}).map(([key, value]) => ({
        name: key,
        value: value
    }));

    const weeklyGoal = 10;
    const weeklyProgress = stats.applicationsThisWeek || 0;

    const goalPercentage = Math.min(
        (weeklyProgress / weeklyGoal) * 100,
        100
    );

    const COLORS = [
        "#6366F1",
        "#22C55E",
        "#F59E0B",
        "#EF4444",
        "#8B5CF6",
        "#06B6D4"
    ];

    return (
        <div className="dashboard-container">

            <h1>Dashboard</h1>

            {/* KPI CARDS */}
            <div className="stats-grid">

                <div className="stat-card">
                    <h4>Total Applications</h4>
                    <p>{stats.totalApplications}</p>
                </div>

                <div className="stat-card">
                    <h4>Interviews</h4>
                    <p>{stats.interviews}</p>
                </div>

                <div className="stat-card">
                    <h4>Offers</h4>
                    <p>{stats.offers}</p>
                </div>

                <div className="stat-card">
                    <h4>Rejected</h4>
                    <p>{stats.rejected}</p>
                </div>

                <div className="stat-card">
                    <h4>Response Rate</h4>
                    <p>{stats.responseRate}%</p>
                </div>

            </div>


            {/* STATUS BREAKDOWN CHART */}
            <div className="widget">
                <h3>Status Breakdown</h3>


                <PieChart width={350} height={250}>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={90}
                        fill="#8884d8"
                        label
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>

                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>

            {/* TWO COLUMN SECTION */}
            <div className="dashboard-grid">

                <div className="widget">

                    <h3>Recent Applications</h3>

                    <ul>
                        {stats.recentApplications.map((app, index) => (
                            <li key={index}>
                                {app.roleTitle} — {app.companyName}
                            </li>
                        ))}
                    </ul>

                </div>


                <div className="widget">

                    <h3>Upcoming Follow Ups</h3>

                    {stats.followUps.length === 0 ? (
                        <p>No upcoming follow ups</p>
                    ) : (
                        <ul>
                            {stats.followUps.map((item, index) => (
                                <li key={index}>
                                    <strong>{item.roleTitle}</strong> — {item.companyName}
                                    <br />
                                    <small>
                                        {new Date(item.followUpDate).toLocaleDateString()}
                                    </small>
                                </li>
                            ))}
                        </ul>
                    )}

                </div>

                <div className="widget">

                    <h3>Weekly Goal</h3>

                    <p>
                        {weeklyProgress} / {weeklyGoal} Applications
                    </p>

                    <div className="goal-bar">
                        <div
                            className="goal-progress"
                            style={{ width: `${goalPercentage}%` }}
                        />
                    </div>

                </div>

            </div>

        </div>
    );
}