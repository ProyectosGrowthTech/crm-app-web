'use client';
import React, { useState } from 'react';
import { Typography, ThemeProvider, createTheme } from '@mui/material';
import YourAppBar from '../components/appBar';

// Define your custom theme
const theme = createTheme();

const Page = () => {
  const [activeSection, setActiveSection] = useState('home');

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };



  return (
    <ThemeProvider theme={theme}>
      <YourAppBar handleSectionChange={handleSectionChange} activeSection={activeSection} />

      <main style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column', alignItems: 'flex-start', padding: 0 }}>
        <div style={{ margin: '0 auto', marginTop: 0 }}>
        </div>
      </main>
    </ThemeProvider>
  );
};

export default Page;
