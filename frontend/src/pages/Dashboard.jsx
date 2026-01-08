function Dashboard() {
    return (
        <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
            <div style={{
                padding: "20px",
                background: "#1e293b",
                color: "#fff"
            }}>
                <h2>HireIntel Admin Dashboard</h2>
            </div>

            <div style={{ padding: "30px" }}>
                <div style={card}>
                    <h3>Total Applicants</h3>
                    <p>128</p>
                </div>

                <div style={card}>
                    <h3>Active Job Posts</h3>
                    <p>5</p>
                </div>

                <div style={card}>
                    <h3>AI Shortlisted</h3>
                    <p>24</p>
                </div>
            </div>
        </div>
    );
}

const card = {
    background: "#fff",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
};

export default Dashboard;
