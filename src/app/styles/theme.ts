import { createTheme } from '@mui/material/styles';
import { red, blue } from '@mui/material/colors';

// Define your custom palette options
const theme = createTheme({
    palette: {
        mode: 'dark',
        // Update the colors for dark mode
        primary: {
            main: '#1976d2', // Update to your desired primary color
        },
        secondary: {
            main: '#ffffff', // Update to your desired secondary color
        },
        // Update other colors such as error, success, etc.
    },
    typography: {
        fontFamily: 'Arial', // Update to your desired font family
    },
});



export default theme;
