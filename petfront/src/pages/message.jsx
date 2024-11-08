import React, { useEffect, useState } from "react";

const apiUrl = process.env.REACT_APP_API_URL;
const Message = () => {
  const [users, setUsers] = useState([]);
  const [emailData, setEmailData] = useState({ to: "", subject: "", text: "" });
  const [loading, setLoading] = useState(true); 
  const [sending, setSending] = useState(false); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${apiUrl}/user/all`);
        const data = await response.json();
        setUsers(data.Users);
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

  return (
    <div>
      <h1>User List</h1>
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="user-cards">
          {users.length > 0 ? (
            users.map((user) => (
              <div className="user-card" key={user._id}>
                <h3>{user.name}</h3>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
                <button
                  onClick={() => {
                    setEmailData({ ...emailData, to: user.email });
                  }}
                >
                  Prepare Email
                </button>
              </div>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </div>
      )}

      <div className="email-form">
        <h2>Send a Customized Email</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          name="to"
          placeholder="Recipient Email"
          value={emailData.to}
          onChange={handleChange}
          disabled
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={emailData.subject}
          onChange={handleChange}
          required
        />
        <textarea
          name="text"
          placeholder="Email Body"
          value={emailData.text}
          onChange={handleChange}
          required
        ></textarea>
        <button
          onClick={handleEmailSend}
          disabled={sending || !emailData.subject || !emailData.text}
        >
          {sending ? "Sending..." : "Send Email"}
        </button>
      </div>
    </div>
  );
};

export default Message;
