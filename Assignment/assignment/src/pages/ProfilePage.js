import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
export default function ProfilePage() {
    const { user, logout } = useAuth();
    const [profile, setProfile] = useState(null);
    console.log("User in profile page:", user);
    useEffect(() => {
        if (user) {
            fetch(`http://localhost:3001/accounts/${user.id}`)
                .then(res => {
                    if (!res.ok) throw new Error("Failed to load profile");
                    return res.json(); 
                })
                .then(data => {
                    console.log("Profile from API:", data);
                    setProfile(data);
                })
                .catch(err => console.error("Load profile failed", err));
        }
    }, [user]);

    if (!profile) return <div style={{ padding: 20 }}>Loading profile...</div>;

    return (
        <div style={{ padding: 16, maxWidth: 600, margin: "0 auto" }}>
            <Card className="p-4" style={{ borderRadius: 12 }}>
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                    <img
                        src={profile.avatar || "/uploads/default.png"}
                        alt="Avatar"
                        style={{
                            width: 120,
                            height: 120,
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "3px solid #ddd",
                        }}
                    />
                    <h3 style={{ marginTop: 12 }}>{profile.name}</h3>
                    <p style={{ color: "#666" }}>{profile.email}</p>
                </div>

                <div style={{ lineHeight: "1.8" }}>
                    <strong>Username:</strong> {profile.username} <br />
                    <strong>Email:</strong> {profile.email} <br />
                </div>

                <div style={{ marginTop: 20, textAlign: "center" }} className="gap-4 d-flex justify-content-center" >
                    <Button variant="dark" as={Link} to="/">
                        Back to Home
                    </Button>
                    <Button variant="danger" onClick={logout} as={Link} to="/">
                        Logout
                    </Button>
                </div>
            </Card>
        </div>
    );
}
