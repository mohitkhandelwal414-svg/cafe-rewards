import React, { useState, useEffect } from "react";
import { getMembers, createMember, recordPurchase, getRewards, redeemReward, getMemberTransactions, createReward } from "./api";
import "./Dashboard.css";

function Dashboard({ user, token, onLogout }) {
    const [members, setMembers] = useState([]);
    const [rewards, setRewards] = useState([]);
    const [search, setSearch] = useState("");

    // Member Form
    const [newMemberName, setNewMemberName] = useState("");
    const [newMemberPhone, setNewMemberPhone] = useState("");

    // Selected Member
    const [selectedMember, setSelectedMember] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [purchaseAmount, setPurchaseAmount] = useState("");
    const [selectedRewardId, setSelectedRewardId] = useState("");

    // Reward Form
    const [newRewardName, setNewRewardName] = useState("");
    const [newRewardPoints, setNewRewardPoints] = useState("");

    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchMembers();
        fetchRewards();
    }, [search]);

    const fetchMembers = async () => {
        try {
            const res = await getMembers(token, search);
            setMembers(res.members || []);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchRewards = async () => {
        try {
            const res = await getRewards(token);
            setRewards(res.rewards || []);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreateMember = async (e) => {
        e.preventDefault();
        try {
            await createMember(token, newMemberName, newMemberPhone);
            setNewMemberName("");
            setNewMemberPhone("");
            fetchMembers();
            setMessage("Member created successfully!");
        } catch (err) {
            setMessage("Failed to create member");
        }
    };

    const handleSelectMember = async (member) => {
        setSelectedMember(member);
        setMessage("");
        try {
            const res = await getMemberTransactions(token, member._id);
            setTransactions(res.transactions || []);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreateReward = async (e) => {
        e.preventDefault();
        try {
            await createReward(token, newRewardName, "Café Reward", Number(newRewardPoints));
            setNewRewardName("");
            setNewRewardPoints("");
            fetchRewards();
            setMessage("Reward created successfully!");
        } catch (err) {
            setMessage("Failed to create reward.");
        }
    };

    const handlePurchase = async (e) => {
        e.preventDefault();
        try {
            const res = await recordPurchase(token, selectedMember._id, Number(purchaseAmount));
            if (res.member) {
                setSelectedMember(res.member);
                setMessage(`Purchase recorded. User earned ${res.transaction.points || 0} points! Now at ${res.member.tier} tier.`);
                setPurchaseAmount("");
                fetchMembers();
                const txRes = await getMemberTransactions(token, selectedMember._id);
                setTransactions(txRes.transactions || []);
            } else {
                setMessage(res.message || "Failed to record purchase.");
            }
        } catch (err) {
            setMessage("Failed to record purchase.");
        }
    };

    const handleRedeem = async (e) => {
        e.preventDefault();
        if (!selectedRewardId) return;
        try {
            const res = await redeemReward(token, selectedMember._id, selectedRewardId);
            if (res.member) {
                setSelectedMember(res.member);
                setMessage(`Reward redeemed successfully: ${res.redemption.rewardName}`);
                fetchMembers();
                const txRes = await getMemberTransactions(token, selectedMember._id);
                setTransactions(txRes.transactions || []);
            } else {
                setMessage(res.message || "Redemption failed.");
            }
        } catch (err) {
            setMessage("Redemption failed.");
        }
    };

    return (
        <div className="dashboard">
            <nav className="navbar">
                <div className="logo brand">☕ CaféRewards Counter</div>
                <div className="user-info">
                    <span>{user.name}</span>
                    <button className="logout-btn" onClick={onLogout}>Logout</button>
                </div>
            </nav>

            <div className="dashboard-content">
                {message && <div className="toast">{message}</div>}

                <div className="left-panel">
                    <h2>Counter & Members</h2>

                    <div className="card">
                        <h3>Search Members</h3>
                        <input
                            type="text"
                            placeholder="Search by name or phone..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="search-input"
                        />
                        <div className="member-list">
                            {members.map(m => (
                                <div
                                    key={m._id}
                                    className={`member-item ${selectedMember?._id === m._id ? 'selected' : ''}`}
                                    onClick={() => handleSelectMember(m)}
                                >
                                    <div className="member-info">
                                        <strong>{m.name}</strong> • {m.phone}
                                    </div>
                                    <div className="member-tier">
                                        <span className={`badge tier-${m.tier.toLowerCase()}`}>{m.tier}</span>
                                        <span className="pts">{m.pointsBalance} pts</span>
                                    </div>
                                </div>
                            ))}
                            {members.length === 0 && <p className="empty">No members found.</p>}
                        </div>
                    </div>

                    <div className="card">
                        <h3>New Member Registration</h3>
                        <form onSubmit={handleCreateMember} className="inline-form">
                            <input
                                type="text"
                                placeholder="Name"
                                value={newMemberName}
                                onChange={e => setNewMemberName(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Phone"
                                value={newMemberPhone}
                                onChange={e => setNewMemberPhone(e.target.value)}
                                required
                            />
                            <button type="submit" className="primary-btn">Add</button>
                        </form>
                    </div>

                    <div className="card">
                        <h3>Create New Reward</h3>
                        <form onSubmit={handleCreateReward} className="inline-form">
                            <input
                                type="text"
                                placeholder="Ex: Free Coffee"
                                value={newRewardName}
                                onChange={e => setNewRewardName(e.target.value)}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Points Required"
                                value={newRewardPoints}
                                onChange={e => setNewRewardPoints(e.target.value)}
                                required
                            />
                            <button type="submit" className="primary-btn" style={{ background: '#059669' }}>Save Reward</button>
                        </form>
                    </div>
                </div>

                <div className="right-panel">
                    {selectedMember ? (
                        <>
                            <div className="card highlight-card">
                                <h2>{selectedMember.name}</h2>
                                <p className="phone">{selectedMember.phone}</p>
                                <div className="stats">
                                    <div className="stat-box">
                                        <label>Balance</label>
                                        <div className="stat-value">{selectedMember.pointsBalance} pts</div>
                                    </div>
                                    <div className="stat-box">
                                        <label>Tier</label>
                                        <div className={`stat-value tier-${(selectedMember.tier || 'bronze').toLowerCase()}`}>{selectedMember.tier || 'Bronze'}</div>
                                    </div>
                                    <div className="stat-box">
                                        <label>Qualifying Pts</label>
                                        <div className="stat-value">{selectedMember.qualifyingPoints}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="action-row">
                                <div className="card">
                                    <h3>Record Purchase</h3>
                                    <form onSubmit={handlePurchase}>
                                        <input
                                            type="number"
                                            placeholder="Purchase Amount (₹)"
                                            value={purchaseAmount}
                                            onChange={e => setPurchaseAmount(e.target.value)}
                                            required
                                        />
                                        <button type="submit" className="primary-btn mt">Record & Earn</button>
                                    </form>
                                </div>

                                <div className="card">
                                    <h3>Redeem Reward</h3>
                                    <form onSubmit={handleRedeem}>
                                        <select
                                            value={selectedRewardId}
                                            onChange={e => setSelectedRewardId(e.target.value)}
                                            required
                                        >
                                            <option value="">Select Reward</option>
                                            {Array.isArray(rewards) ? rewards.map(r => (
                                                <option key={r._id} value={r._id} disabled={selectedMember.pointsBalance < r.pointsRequired}>
                                                    {r.name} ({r.pointsRequired} pts)
                                                </option>
                                            )) : null}
                                        </select>
                                        <button type="submit" className="primary-btn mt select-btn">Redeem Points</button>
                                    </form>
                                </div>
                            </div>

                            <div className="card tx-card">
                                <h3>Transaction History</h3>
                                <div className="tx-list">
                                    {Array.isArray(transactions) && transactions.length > 0 ? transactions.map(tx => (
                                        <div key={tx._id} className="tx-item">
                                            <div>
                                                <strong>{tx.type}</strong>
                                                <div className="date">{new Date(tx.createdAt).toLocaleString()}</div>
                                            </div>
                                            <div className={`tx-points ${tx.points > 0 ? 'earn' : 'spend'}`}>
                                                {tx.points > 0 ? '+' : ''}{tx.points} pts
                                            </div>
                                        </div>
                                    )) : <p className="empty">No transactions yet.</p>}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="placeholder-card">
                            <h2>Select a member to view details</h2>
                            <p>Search and click a member on the left panel.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
