import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CallIcon from '@mui/icons-material/Call';
import SettingsIcon from '@mui/icons-material/Settings';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AddchartIcon from '@mui/icons-material/Addchart';
import ListAltIcon from '@mui/icons-material/ListAlt';

const drawerWidth = 240;

const Layout = () => {
    const navigate = useNavigate();
  const [bottomNav, setBottomNav] = useState<number>(0);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // md = 960px+

  const Sidebar = (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <List>
        <ListItem >
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="Chats" />
        </ListItem>
        <ListItem >
          <ListItemIcon>
            <QrCodeScannerIcon />
          </ListItemIcon>
          <ListItemText primary="Scan" />
        </ListItem>
        <ListItem >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Drawer>
  );

  const navigateToPage = (path: string) => {
    navigate(path);
  }
  return (
    <Box display="flex" height="100vh" overflow="hidden">
      {/* Side nav for desktop */}
      {isDesktop && Sidebar}

      {/* Main content */}
      <Box
        flexGrow={1}
        display="flex"
        flexDirection="column"
        sx={{
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: isDesktop ? 0 : 'env(safe-area-inset-bottom)',
        }}
      >
        {/* Top App Bar */}
        <AppBar position="fixed" color="default" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
              <Box display="flex" color={'rgb(103, 58, 183)'} alignItems="center" gap={1}>
                <ReceiptIcon />
                <Typography variant="h6" fontWeight="bold">
                  Bilkart
                </Typography>
              </Box>
              <NotificationsIcon sx={{color: 'rgb(33 150 243)'}} />
            </Box>
          </Toolbar>
        </AppBar>

        {/* Spacer */}
        <Toolbar />

        {/* Scrollable Middle Content */}
        <Box
           flexGrow={1}
           overflow="auto"
           p={2}
           sx={{
             paddingBottom: isDesktop ? 0 : 'calc(56px + env(safe-area-inset-bottom))', // 56px is default BottomNavigation height
           }}
        >
          <Outlet></Outlet>
        </Box>

        {/* Bottom Navigation only for mobile/tablet */}
        {!isDesktop && (
         <BottomNavigation
         value={bottomNav}
         onChange={(_e, newValue: number) => setBottomNav(newValue)}
         sx={{
           position: 'fixed',
           bottom: 0,
           width: '100%',
           height: 56,
           borderTop: '1px solid #ccc',
           zIndex: 1100,
           backgroundColor: '#fff',
         }}
       >
         <BottomNavigationAction onClick={() => navigateToPage('/products')} label="Products" icon={<ListAltIcon />} />
         <BottomNavigationAction onClick={() => navigateToPage('/add-product')} label="Add" icon={<AddchartIcon />} />
         <BottomNavigationAction onClick={() => navigateToPage('/scan')}  label="Scan" icon={<QrCodeScannerIcon />} />
       </BottomNavigation>
        )}
      </Box>
    </Box>
  );
};

export default Layout;
