import { Box, Typography, useTheme, } from '@mui/material';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import MenuOpenSharpIcon from '@mui/icons-material/MenuOpenSharp';
import { createTheme, styled } from '@mui/material/styles';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const NAVIGATION: Navigation = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
]

const SidebarComp = () => {
  const { palette } = useTheme();
  const [isCollapse, setIsCollapse] = useState(false);
  const [selected, setSelected] = useState("dashboard");

  const Skeleton = styled('div')<{ height: number }>(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    height,
    content: '" "',
  }));


  return (
    <AppProvider
      navigation={NAVIGATION}
    >
      <DashboardLayout>
        <PageContainer>
          <Grid container spacing={ 1 }>
            <Grid size={5} />
            <Grid size={12}>
              <Skeleton height={14} />
            </Grid>
            <Grid size={12}>
              <Skeleton height={14} />
            </Grid>
          </Grid>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  )
}

export default SidebarComp;