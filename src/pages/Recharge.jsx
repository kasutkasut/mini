import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Card,
  Button,
  Chip,
  Grid,
} from '@mui/material';
import NavBar from '../components/NavBar';

const PACKAGES = [
  {
    id: 'basic',
    price: 9.9,
    coins: 28000,
    label: 'Basic Package',
    isPopular: false,
    bonus: 'Original price 28000🪙, no extra bonus'
  },
  {
    id: 'starter',
    price: 15.9,
    coins: 45000,
    label: 'Starter Package',
    isPopular: false,
    bonus: 'Original price 45000🪙, no extra bonus'
  },
  {
    id: 'value',
    price: 28.9,
    coins: 90000,
    label: 'Value Package',
    isPopular: true,
    bonus: 'Original price 90000🪙, no extra bonus'
  },
  {
    id: 'premium',
    price: 45.9,
    coins: 150000,
    label: 'Premium Package',
    isPopular: false,
    bonus: 'Charge 150000🪙'
  },
  {
    id: 'deluxe',
    price: 68.9,
    coins: 230000,
    label: 'Deluxe Package',
    isPopular: false,
    bonus: 'Charge 230000🪙'
  },
  {
    id: 'supreme',
    price: 95.9,
    coins: 320000,
    label: 'Supreme Package',
    isPopular: false,
    bonus: 'Charge 320000🪙'
  },
  {
    id: 'ultimate',
    price: 188.9,
    coins: 680000,
    label: 'Ultimate Package',
    isPopular: false,
    bonus: 'Charge 680000🪙'
  }
];

const PAYMENT_METHODS = [
  {
    id: 'alipay',
    label: 'ALIPAY (DIRECT TOP-UP)',
    color: '#1677FF'
  },
  {
    id: 'wechat',
    label: 'WECHAT PAY (DIRECT TOP-UP)',
    color: '#07C160'
  },
  {
    id: 'paypal',
    label: 'PAYPAL PAYMENT',
    color: '#003087'
  },
  {
    id: 'usdt',
    label: 'USDT PAYMENT',
    color: '#26A17B'
  }
];

const Recharge = () => {
  const { t } = useTranslation();
  const [selectedPackage, setSelectedPackage] = useState(null);

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: '#1A1B1E',
      color: 'white',
      pb: 4
    }}>
      <NavBar title={t('nav.recharge')} />

      {/* Balance Display */}
      <Container maxWidth="sm" sx={{ pt: 2 }}>
        <Card sx={{ 
          p: 2, 
          mb: 3, 
          bgcolor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: 2
        }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Box>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Current Balance
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6">
                  100 ��
                </Typography>
              </Box>
            </Box>
          </Box>
        </Card>

        {/* Packages Grid */}
        <Grid container spacing={2}>
          {PACKAGES.map((pkg) => (
            <Grid item xs={12} key={pkg.id}>
              <Card 
                onClick={() => setSelectedPackage(pkg.id)}
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  bgcolor: selectedPackage === pkg.id 
                    ? 'rgba(124, 58, 237, 0.2)' 
                    : 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 2,
                  border: selectedPackage === pkg.id 
                    ? '2px solid #7C3AED' 
                    : '2px solid transparent',
                  transition: 'all 0.2s',
                  position: 'relative',
                  '&:hover': {
                    bgcolor: 'rgba(124, 58, 237, 0.15)'
                  }
                }}
              >
                {pkg.isPopular && (
                  <Chip
                    label="Most Popular"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: '#7C3AED',
                      color: 'white'
                    }}
                  />
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="h6">
                      USD {pkg.price}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      {pkg.bonus}
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ color: '#7C3AED' }}>
                    {pkg.coins}🪙
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Payment Methods */}
        {selectedPackage && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Payment Method
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {PAYMENT_METHODS.map((method) => (
                <Button
                  key={method.id}
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: method.color,
                    color: 'white',
                    py: 2,
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    '&:hover': {
                      bgcolor: method.color,
                      opacity: 0.9
                    }
                  }}
                >
                  {method.label}
                </Button>
              ))}
            </Box>
          </Box>
        )}

        {/* Notes */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Notes:
          </Typography>
          <Typography variant="caption" component="div" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            1. Do not fill in any notes during payment, it will affect the account;
          </Typography>
          <Typography variant="caption" component="div" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            2. For PayPal payments, please ensure your PayPal account is verified;
          </Typography>
          <Typography variant="caption" component="div" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            3. All purchases are final and non-refundable;
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Recharge; 