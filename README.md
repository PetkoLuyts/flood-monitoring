# Flood Monitoring Dashboard

This project is a **React + TypeScript** application that fetches and displays real-time flood monitoring data from the [Environment Agency Flood Monitoring API](https://environment.data.gov.uk/flood-monitoring/doc/reference) for the UK. The application includes a user-friendly interface and caches data locally to improve performance and reduce API calls.

---

## Features

### 🌟 Key Features:
1. **Real-Time Flood Data**: Displays up-to-date information about floods, including:
   - Region
   - County
   - River/Sea name
   - Severity level
   - Description of the flood alert/warning
   - Last updated time
2. **Local Data Caching**:
   - Data is cached in `localStorage` for 30 minutes.
   - Reduces unnecessary API calls and ensures faster page reloads.
3. **Automated Refresh**:
   - Data refreshes automatically every 30 minutes.
4. **Responsive Design**:
   - Works seamlessly on desktop and mobile devices.
5. **Error Handling**:
   - Displays user-friendly error messages if the API call fails.

---

## Getting Started

### 🛠️ Prerequisites
- **Node.js** (version 14 or higher)
- **npm** or **yarn**

### 📦 Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/flood-monitoring-dashboard.git
   ```
2. Navigate to the project directory:
   ```bash
   cd flood-monitoring-dashboard
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### 🚀 Running the Application
1. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Usage

### 🖥️ How It Works:
- The app fetches flood monitoring data from the following API:
  ```
  https://environment.data.gov.uk/flood-monitoring/id/floods
  ```
- Data is displayed in a table with details such as the region, county, river/sea name, severity, and updated time.
- Data is refreshed automatically every 30 minutes and cached locally to improve performance.

---

## Project Structure

```
src/
├── components/
│   └── FloodMonitoring.tsx  # Main component handling data fetch and UI
├── styles/
│   └── FloodMonitoring.css  # Styling for the FloodMonitoring component
│── types/
    └── FloodData.ts  # FloodData type
├── App.tsx                  # Root component
├── index.tsx                # App entry point

```

---

## API Details

This project uses the [Flood Monitoring API](https://environment.data.gov.uk/flood-monitoring/doc/reference) provided by the **Environment Agency**.

### Example API Response:
```json
{
    "items": [
        {
            "@id": "http://environment.data.gov.uk/flood-monitoring/id/floods/034WAB424",
            "description": "River Trent from Cromwell Weir to Gainsborough",
            "eaAreaName": "East Midlands",
            "floodArea": {
                "county": "Lincolnshire, Nottinghamshire",
                "riverOrSea": "River Trent, River Idle"
            },
            "severity": "Warning no longer in force",
            "severityLevel": 4,
            "timeMessageChanged": "2025-01-04T10:28:00"
        }
    ]
}
```

---

## Customization

### Change Cache Duration
The cache duration is set to 30 minutes by default. You can modify it in the `FloodMonitoring.tsx` file:

```typescript
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
```

---

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For type safety and enhanced code quality.
- **Axios**: For making HTTP requests.
- **CSS**: For styling the components.

---

## Screenshots

### Table View
<img width="1358" alt="Screenshot 2025-01-04 at 20 52 07" src="https://github.com/user-attachments/assets/b2b16c84-25eb-407b-bee0-7f67eef5e46d" />

---

## License

This project is licensed under the [MIT License](./LICENSE).

---

## Acknowledgments

- [Environment Agency](https://www.gov.uk/government/organisations/environment-agency) for providing the flood monitoring API.

---
