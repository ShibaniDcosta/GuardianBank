import React from 'react';
import { FaRegHandshake } from 'react-icons/fa';

const MerchantWelcomePage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.icon}>
        <FaRegHandshake size={100} />
      </div>
      <h1 style={styles.heading}>Welcome, Merchant</h1>
      <p style={styles.text}>We're glad to have you onboard. Enjoy our services!</p>
    </div>
  );
};

// Define CSS-in-JS style objects
const styles = {
  container: {
    display: 'flex',           // Use flex layout to align children vertically
    flexDirection: 'column',   // Stack children vertically
    alignItems: 'center',      // Center children horizontally
    justifyContent: 'center',  // Center children vertically
    height: '100vh',           // Use full view height to utilize all vertical space
    backgroundColor: '#e0e7ff', // A light grey background
    color: '#333',             // Darker text for better readability
    fontFamily: 'Arial, sans-serif', // A more common, readable font
    textAlign: 'center',       // Center text
    padding: '20px',           // Add padding to avoid touching the edges
  },
  icon: {
    color: 'green',            // Green color for the icon
    marginBottom: '20px',      // Space below the icon
  },
  heading: {
    fontSize: '2.5rem',        // Larger text for the heading
    color: '#2c3e50',          // A nice, dark shade of blue
  },
  text: {
    fontSize: '1.2rem',        // Slightly larger text size for the paragraph
    maxWidth: '600px',         // Max width for better readability
  }
};

export default MerchantWelcomePage;
