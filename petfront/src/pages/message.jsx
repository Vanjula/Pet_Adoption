import React, { useEffect, useState } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

const Message = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [emailData, setEmailData] = useState({ to: "", subject: "", text: "" });
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${apiUrl}/user/all`);
        const data = await response.json();
        setUsers(data.Users);
        setFilteredUsers(data.Users); // Initially set the filtered users to all users
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleEmailSend = async () => {
    if (!emailData.subject || !emailData.text) {
      alert("Please fill out the subject and email body.");
      return;
    }

    setSending(true);
    setError(null);
    try {
      const response = await fetch(`${apiUrl}/user/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setEmailData({ to: "", subject: "", text: "" });
      } else {
        setError(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setError("Failed to send email.");
    } finally {
      setSending(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [name]: value };
      filterUsers(updatedFilters);
      return updatedFilters;
    });
  };

  const filterUsers = (filters) => {
    let filtered = users;

    if (filters.name) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    if (filters.email) {
      filtered = filtered.filter((user) =>
        user.email.toLowerCase().includes(filters.email.toLowerCase())
      );
    }
    if (filters.role) {
      filtered = filtered.filter((user) =>
        user.role.toLowerCase().includes(filters.role.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  };

  return (
    <div className="message-container">
      <h1 className="message-title">User List</h1>

      {/* Filter Section */}
      

      {loading ? (
        <p className="loading-text">Loading users...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="user-cards">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div className="user-card" key={user._id}>
                <h3 className="user-name">{user.name}</h3>
                <p className="user-email">Email: {user.email}</p>
                <button
                  onClick={() => {
                    setEmailData({ ...emailData, to: user.email });
                  }}
                  className="prepare-email-button"
                >
                  Prepare Email
                </button>
              </div>
            ))
          ) : (
            <p className="no-users-text">No users found.</p>
          )}
        </div>
      )}

      <div className="email-form-container">
        <h2 className="email-form-title">Send a Customized Email</h2>
        {error && <p className="email-error-message">{error}</p>}
        <input
          type="email"
          name="to"
          placeholder="Recipient Email"
          value={emailData.to}
          onChange={handleChange}
          disabled
          className="email-input"
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={emailData.subject}
          onChange={handleChange}
          required
          className="email-input"
        />
        <textarea
          name="text"
          placeholder="Email Body"
          value={emailData.text}
          onChange={handleChange}
          required
          className="email-textarea"
        ></textarea>
        <button
          onClick={handleEmailSend}
          disabled={sending || !emailData.subject || !emailData.text}
          className="send-email-button"
        >
          {sending ? "Sending..." : "Send Email"}
        </button>
      </div>
    </div>
  );
};

export default Message;
