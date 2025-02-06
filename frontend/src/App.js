import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const vm_ip_addr = "http://128.2.205.21:5001/"	

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(vm_ip_addr + "register", { email });
            setMessage(response.data.message);
            if (response.status === 201 || response.status === 200) {
                navigate("/home");
            }
        } catch (error) {
            setMessage(error.response?.data?.error || "An error occurred");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Enter your Email</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    style={{ padding: "10px", fontSize: "16px" }}
                />
                <button type="submit" style={{ marginLeft: "10px", padding: "10px 20px", fontSize: "16px" }}>
                    Submit
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

const Home = () => {
    const [timeSlots, setTimeSlots] = useState([]);
    const vm_ip_addr = "http://128.2.205.21:5001/"
    useEffect(() => {
        axios.get(vm_ip_addr + "time-slots")
            .then(response => setTimeSlots(response.data))
            .catch(error => console.error("Error fetching time slots:", error));
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Available Time Slots</h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <table style={{
                    width: "60%",
                    borderCollapse: "collapse",
                    border: "2px solid #ddd",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                    fontSize: "18px",
                    textAlign: "center"
                }}>
                    <thead>
                        <tr style={{ backgroundColor: "#4CAF50", color: "white", fontSize: "20px" }}>
                            <th style={{ padding: "15px", border: "1px solid #ddd" }}>Day</th>
                            <th style={{ padding: "15px", border: "1px solid #ddd" }}>Time Slot</th>
                            <th style={{ padding: "15px", border: "1px solid #ddd" }}>Availability</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timeSlots.map((slot, index) => (
                            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff" }}>
                                <td style={{ padding: "15px", border: "1px solid #ddd" }}>{slot.day}</td>
                                <td style={{ padding: "15px", border: "1px solid #ddd" }}>{slot.slot}</td>
                                <td style={{
                                    padding: "15px",
                                    border: "1px solid #ddd",
                                    color: slot.available ? "green" : "red",
                                    fontWeight: "bold"
                                }}>
                                    {slot.available ? "Available" : "Unavailable"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
};

export default App;
