'use client';
import React, { useState } from 'react';
import { Typography, ThemeProvider, createTheme } from '@mui/material';
import YourAppBar from '../components/appBar';

// Define your custom theme
const theme = createTheme();

const Page = () => {
  return (
    <ThemeProvider theme={theme}>
      <YourAppBar />

      <main style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column', alignItems: 'flex-start', padding: 0 }}>
        <div style={{ margin: '0 auto', marginTop: 0 }}>
        </div>
      </main>
    </ThemeProvider>
  );
};

export default Page;
