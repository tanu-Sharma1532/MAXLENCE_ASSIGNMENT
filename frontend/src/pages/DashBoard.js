import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const [users, setUsers] = useState([]);

    // pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(10);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searching, setSearching] = useState(false);

    async function fetchUsers(page = 1) {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(`http://localhost:3000/user/all?page=${page}&limit=${limit}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setUsers(res.data.users);
            setTotalPages(res.data.totalPages);
            setCurrentPage(page);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleSearch() {
        if (!searchQuery.trim()) return;

        setSearching(true);
        setLoading(true);
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(`http://localhost:3000/user/search?query=${searchQuery}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setUsers(res.data.users);
        } catch (err) {
            console.error(err);
        } finally {
            setSearching(false);
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchUsers(1);
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div
            style={{
                maxWidth: '1000px', margin: '100px auto', padding: '30px',
                background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                borderRadius: '20px',
                boxShadow: '0 6px 20px -5px #0003',
                fontFamily: 'Arial,sans-serif'
            }}
        >
            <h2 style={{ marginBottom: '20px', color: '#ff7e5f', textAlign: 'center' }}>User Dashboard</h2>

            {/* Search Section */}
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ padding: '10px', marginRight: '10px' }}
                />
                <button onClick={handleSearch} style={{ padding: '10px 20px', background: '#ff7e5f', color: 'white', border: 'none', borderRadius: '5px' }}>
                    Search
                </button>
                {searching && <span style={{ marginLeft: '10px' }}>Searching...</span>}
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '10px', border: '1px solid #ff7e5f', background: '#ff7e5f', color: 'white' }}>Email</th>
                        <th style={{ padding: '10px', border: '1px solid #ff7e5f', background: '#ff7e5f', color: 'white' }}>First Name</th>
                        <th style={{ padding: '10px', border: '1px solid #ff7e5f', background: '#ff7e5f', color: 'white' }}>Last Name</th>
                        <th style={{ padding: '10px', border: '1px solid #ff7e5f', background: '#ff7e5f', color: 'white' }}>Role</th>
                        <th style={{ padding: '10px', border: '1px solid #ff7e5f', background: '#ff7e5f', color: 'white' }}>Phone</th>
                        <th style={{ padding: '10px', border: '1px solid #ff7e5f', background: '#ff7e5f', color: 'white' }}>Address</th>
                        <th style={{ padding: '10px', border: '1px solid #ff7e5f', background: '#ff7e5f', color: 'white' }}>Gender</th>
                        <th style={{ padding: '10px', border: '1px solid #ff7e5f', background: '#ff7e5f', color: 'white' }}>DOB</th>
                        <th style={{ padding: '10px', border: '1px solid #ff7e5f', background: '#ff7e5f', color: 'white' }}>Profile Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user._id}>
                                <td style={{ padding: '10px', border: '1px solid #ff7e5f' }}>{user.email}</td>
                                <td style={{ padding: '10px', border: '1px solid #ff7e5f' }}>{user.first_name}</td>
                                <td style={{ padding: '10px', border: '1px solid #ff7e5f' }}>{user.last_name}</td>
                                <td style={{ padding: '10px', border: '1px solid #ff7e5f' }}>{user.role}</td>
                                <td style={{ padding: '10px', border: '1px solid #ff7e5f' }}>{user.phone_number}</td>
                                <td style={{ padding: '10px', border: '1px solid #ff7e5f' }}>{user.address}</td>
                                <td style={{ padding: '10px', border: '1px solid #ff7e5f' }}>{user.gender}</td>
                                <td style={{ padding: '10px', border: '1px solid #ff7e5f' }}>{new Date(user.dob).toLocaleDateString()}</td>
                                <td style={{ padding: '10px', border: '1px solid #ff7e5f' }}>
                                    {user.profile_picture ? (
                                        <img src={`http://localhost:3000${user.profile_picture}`}
                                            alt="Profile"
                                            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                                        />
                                    ) : 'N.A'}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" style={{ textAlign: 'center' }}>No users found</td>
                        </tr>
                    )}

                </tbody>
            </table>

            {/* pagination controls */}
            {!searchQuery && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <button
                        disabled={currentPage <= 1}
                        onClick={() => fetchUsers(currentPage - 1)}
                        style={{ margin: '0 10px' }}
                    >
                        Previous
                    </button>

                    <span>Page {currentPage} of {totalPages}</span>

                    <button
                        disabled={currentPage >= totalPages}
                        onClick={() => fetchUsers(currentPage + 1)}
                        style={{ margin: '0 10px' }}
                    >
                        Next
                    </button>
                </div>
            )}

        </div>
    )
}

export default Dashboard;
