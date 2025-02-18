import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';

const NavBar = ({ title, showBack = true, onBack, action }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        bgcolor: 'rgba(26, 27, 30, 0.95)',
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        px: 2,
        py: 1.5,
        minHeight: '56px'
      }}>
        {showBack && (
          <IconButton 
            onClick={handleBack}
            sx={{ 
              mr: 2,
              color: 'white',
              padding: '8px',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <ArrowBackIcon sx={{ fontSize: '24px' }} />
          </IconButton>
        )}
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            color: 'white',
            fontWeight: 500,
            fontSize: '1.125rem'
          }}
        >
          {title}
        </Typography>
        {action && (
          <Box sx={{ ml: 2 }}>
            {action}
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default NavBar; 