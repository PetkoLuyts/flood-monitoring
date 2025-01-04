import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FloodMonitoring.css";

interface FloodData {
  id: string;
  description: string;
  eaAreaName: string;
  floodArea: {
    county: string;
    riverOrSea: string;
  };
  message: string;
  severity: string;
  severityLevel: number;
  timeMessageChanged: string;
}

const CACHE_KEY = "floodData";
const CACHE_TIMESTAMP_KEY = "floodDataTimestamp";
const CACHE_DURATION = 30 * 60 * 1000;

const FloodMonitoring: React.FC = () => {
  const [floodData, setFloodData] = useState<FloodData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://environment.data.gov.uk/flood-monitoring/id/floods"
      );

      const items = response.data.items.map((item: any) => ({
        id: item["@id"],
        description: item.description,
        eaAreaName: item.eaAreaName,
        floodArea: {
          county: item.floodArea?.county || "Unknown",
          riverOrSea: item.floodArea?.riverOrSea || "Unknown",
        },
        message: item.message,
        severity: item.severity,
        severityLevel: item.severityLevel,
        timeMessageChanged: item.timeMessageChanged,
      }));

      localStorage.setItem(CACHE_KEY, JSON.stringify(items));
      localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());

      setFloodData(items);
    } catch (err) {
      setError("Failed to load flood data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

    if (cachedData && cachedTimestamp) {
      const age = Date.now() - parseInt(cachedTimestamp, 10);
      if (age < CACHE_DURATION) {
        setFloodData(JSON.parse(cachedData));
        setLoading(false);
        return;
      }
    }

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, CACHE_DURATION);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="loading">Loading flood data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="flood-container">
      <h1>Flood Monitoring Data</h1>
      <table className="flood-table">
        <thead>
          <tr>
            <th>Region</th>
            <th>County</th>
            <th>River/Sea</th>
            <th>Description</th>
            <th>Severity</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {floodData.map((flood) => (
            <tr key={flood.id}>
              <td>{flood.eaAreaName}</td>
              <td>{flood.floodArea.county}</td>
              <td>{flood.floodArea.riverOrSea}</td>
              <td>{flood.description}</td>
              <td>
                <span className={`severity-level-${flood.severityLevel}`}>
                  {flood.severity}
                </span>
              </td>
              <td>{new Date(flood.timeMessageChanged).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FloodMonitoring;
