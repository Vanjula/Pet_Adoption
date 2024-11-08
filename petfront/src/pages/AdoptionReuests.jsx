import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import placeholder from "../components/assets/placeholder.png";

const apiUrl = process.env.REACT_APP_API_URL; 

const AdoptionRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`${apiUrl}/request/all`);
        if (!response.ok) {
          throw new Error("Failed to fetch adoption requests");
        }
        const data = await response.json();
        setRequests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (requestId) => {
    try {
      const response = await fetch(`${apiUrl}/request/approve/${requestId}`, {
        method: "POST",
      });
      if (response.ok) {
        setRequests((prev) => prev.filter((req) => req._id !== requestId));
      }
    } catch (err) {
      setError("Error approving request: " + err.message);
    }
  };

  const handleDeny = async (requestId) => {
    try {
      const response = await fetch(`${apiUrl}/request/deny/${requestId}`, {
        method: "POST",
      });
      if (response.ok) {
        setRequests((prev) => prev.filter((req) => req._id !== requestId));
      }
    } catch (err) {
      setError("Error denying request: " + err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="adoption-requests">
      <h1 className="title">Adoption Requests</h1>
      {requests.length === 0 ? (
        <p className="no-requests">No adoption requests available.</p>
      ) : (
        <ul className="request-list">
          {requests.map((request) => (
            <li key={request._id} className="request-item">
              <Link
                to={`/adoption-request/${request._id}`}
                className="request-link"
              >
                <img
                  src={request.pet ? request.pet.imageUrl : placeholder}
                  alt="Pet"
                  className="requestImg"
                />
                {`User: ${request.user.username}, Pet: ${
                  request.pet ? request.pet.name : "Unknown Pet"
                }, Status: ${request.status}`}
              </Link>
              <div className="button-group">
                <button
                  onClick={() => handleApprove(request._id)}
                  className="approve-button"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDeny(request._id)}
                  className="deny-button"
                >
                  Deny
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdoptionRequests;
