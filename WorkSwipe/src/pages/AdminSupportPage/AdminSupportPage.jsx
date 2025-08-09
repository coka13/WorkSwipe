import React from 'react'
import { useSelector } from 'react-redux'
import Conversation from '../../components/Conversation/Conversation'
import './AdminSupportPage.css'

const AdminSupportPage = () => {
    const user = useSelector((state) => state.auth.role)
    const admin = {
        _id: 0,
        username: "adminUser",
        name: "WorkSwipe Admin",
        isEmployer: false,
        isAdmin: true,
        email: "admin@workswipe.com",
        url: "https://cdn-icons-png.flaticon.com/512/2304/2304226.png"
    }
    
    return (
        <>
            <div className="admin-support-page">
                <div className="admin-support-header">
                    <h2>🛠️ Admin Support Dashboard</h2>
                    <p>Manage user support requests and provide assistance</p>
                </div>
                <div className="admin-chat-container">
                    <div className="admin-intro">
                        <h3>💬 Active Support Session</h3>
                        <p>You're now connected to provide support to WorkSwipe users</p>
                        <div className="admin-features">
                            <span className="admin-feature">📊 Monitor Conversations</span>
                            <span className="admin-feature">🔧 Technical Support</span>
                            <span className="admin-feature">👥 User Assistance</span>
                        </div>
                    </div>
                    <Conversation user1={user} user2={admin} />
                </div>
            </div>
        </>
    )
}

export default AdminSupportPage