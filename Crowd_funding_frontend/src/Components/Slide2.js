import React from "react";
import {
  FaHandHoldingUsd,
  FaUsers,
  FaCheckDouble,
  FaGlobeAsia,
  FaClock,
  FaPhoneAlt,
} from "react-icons/fa";

const Slide2 = () => {
  const stats = [
    {
      icon: <FaHandHoldingUsd size={50} color="#2e7d32" />,
      value: "₹10Cr+",
      description: "Funds Raised",
    },
    {
      icon: <FaUsers size={50} color="#2e7d32" />,
      value: "1L+",
      description: "Donors Participated",
    },
    {
      icon: <FaCheckDouble size={50} color="#2e7d32" />,
      value: "8K+",
      description: "Successful Campaigns",
    },
    {
      icon: <FaGlobeAsia size={50} color="#2e7d32" />,
      value: "30+",
      description: "States Reached",
    },
    {
      icon: <FaClock size={50} color="#2e7d32" />,
      value: "24x7",
      description: "Support Available",
    },
    {
      icon: <FaPhoneAlt size={50} color="#2e7d32" />,
      value: "Helpline",
      description: "1800-123-456",
    },
  ];

  return (
    <div className="stats-container">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="icon">{stat.icon}</div>
          <h1 className="value">{stat.value}</h1>
          <p className="description">{stat.description}</p>
        </div>
      ))}

      <style jsx>{`
        .stats-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 80px;
          margin: 40px auto;
          padding: 0 20px;
          max-width: 1200px;
        }
        .stat-card {
          flex: 1 1 calc(33.333% - 40px);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 12px;
          border: 2px solid #2e7d32;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
          max-width: 300px;
        }
        .icon {
          margin-bottom: 10px;
        }
        .value {
          font-size: 2.2rem;
          color: #2e7d32;
          font-weight: 700;
          margin: 10px 0;
        }
        .description {
          font-size: 1rem;
          color: #555;
        }
        @media (max-width: 768px) {
          .stat-card {
            flex: 1 1 calc(50% - 20px);
          }
        }
        @media (max-width: 480px) {
          .stat-card {
            flex: 1 1 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Slide2;
