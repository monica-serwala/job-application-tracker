import { NavLink } from "react-router-dom"; 

const linkStyle = ({ isActive }) => ({
    display: "block",
    padding: "10px 12px",
    borderRadius: 8,
    textDecoration: "none",
    color: "balck", 
    backgroundColor: isActive ? "#eaeaea" : "transparent",
    marginBottom: 8,
})

export default function Sidebar() {
    return (
        <aside style={{ width: 200, padding: 16, borderRight: "1px solid #eee" }} >
            <div style={{ frontWeight: 700, fontSize: 18, marginBottom: 16 }}>
                Job Tracker</div> 

            <nav>
            <NavLink to="/" end style={linkStyle}>
                    Dashboard
                </NavLink>
                <NavLink to="/applications" style={linkStyle}>
                    Applications
                </NavLink>
                <NavLink to="/analytics" style={linkStyle}>
                    Analytics
                </NavLink>
            </nav>
        </aside>
    );
}
