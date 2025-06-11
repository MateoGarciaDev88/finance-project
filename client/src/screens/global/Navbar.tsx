import { useState, useContext } from 'react';
import { Box, Typography, useTheme, Button } from '@mui/material';
import FitbitIcon from '@mui/icons-material/Fitbit';
import LogoutIcon from '@mui/icons-material/Logout';
import FlexBetween from '../../components/FlexBetween';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { palette } = useTheme();
  const [select, setSelect] = useState('dashboard');
  // const { user, logout } = useContext(AuthContext)!;

  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
      <FlexBetween gap="0.75rem">
        <FitbitIcon sx={{ fontSize: "28px" }} />
        <Typography variant='h4' fontSize="16px">
          Finanzas Personales
        </Typography>
      </FlexBetween>

      <FlexBetween gap="2rem">
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link 
            to="/" 
            onClick={() => setSelect("dashboard")}
            style={{ 
              color: select === "dashboard" ? "inherit" : palette.grey[700], 
              textDecoration: "inherit" 
            }}
          >
            Dashboard
          </Link>
        </Box>
        
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link 
            to="/movements" 
            onClick={() => setSelect("movimientos")}
            style={{ 
              color: select === "movimientos" ? "inherit" : palette.grey[700], 
              textDecoration: "inherit" 
            }}
          >
            Movimientos
          </Link>
        </Box>
        
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link 
            to="/categories" 
            onClick={() => setSelect("categorias")}
            style={{ 
              color: select === "categorias" ? "inherit" : palette.grey[700], 
              textDecoration: "inherit" 
            }}
          >
            Categorías
          </Link>
        </Box>

        {/* Usuario y logout */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Typography variant="body2" color={palette.grey[100]}>
            {/* Hola, {user?.usuario || user?.nombre_completo} */}
          </Typography>
          <Button
            // onClick={logout}
            startIcon={<LogoutIcon />}
            size="small"
            sx={{ 
              color: palette.grey[300],
              '&:hover': { color: palette.primary[100] }
            }}
          >
            Salir
          </Button>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;