import { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Box, CssBaseline, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Menu as MenuIcon, Home as HomeIcon, AccountCircle as AccountCircleIcon, Settings as SettingsIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/roboto';

// Mock pages
const LoginPage: React.FC = () => <Box sx={{ p: 2 }}>Login Page</Box>;
const HomePage: React.FC = () => <Box sx={{ p: 2 }}>Home Page</Box>;
const ProfilePage: React.FC = () => <Box sx={{ p: 2 }}>Profile Page</Box>;
const SettingsPage: React.FC = () => <Box sx={{ p: 2 }}>Settings Page</Box>;

// Theme
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    background: { default: '#f5f5f5' },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 240,
          '@media (max-width: 600px)': { width: '100%' },
        },
      },
    },
  },
});

// Layout component
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [bottomNavValue, setBottomNavValue] = useState<number>(0);

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <List>
      {[
        { text: 'Home', icon: <HomeIcon />, path: '/home' },
        { text: 'Profile', icon: <AccountCircleIcon />, path: '/profile' },
        { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
      ].map((item) => (
        <ListItem  key={item.text} component="a" href={item.path}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      {/* Header */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          marginTop: 'env(safe-area-inset-top)', // Offset from status bar/notch
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, fontWeight: 'bold' }}>My App</Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box component="nav" sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box' },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              top: `calc(64px + env(safe-area-inset-top))`, // Account for AppBar height + safe area
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: `calc(64px + env(safe-area-inset-top))`, // Offset for AppBar + safe area
          mb: `calc(56px + env(safe-area-inset-bottom))`, // Offset for BottomNavigation + safe area
          width: { sm: `calc(100% - 240px)` },
          backgroundColor: theme.palette.background.default,
          minHeight: `calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))`, // Ensure full height
        }}
      >
        {children}
      </Box>

      {/* Bottom Navigation */}
      <BottomNavigation
        value={bottomNavValue}
        onChange={(event, newValue: number) => setBottomNavValue(newValue)}
        showLabels
        sx={{
          position: 'fixed',
          bottom: 'env(safe-area-inset-bottom)', // Offset from device navigation bar
          width: '100%',
          display: { sm: 'none' },
          boxShadow: '0px -2px 4px rgba(0,0,0,0.1)', // Optional: Add shadow for visibility
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} href="/home" />
        <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} href="/profile" />
        <BottomNavigationAction label="Settings" icon={<SettingsIcon />} href="/settings" />
      </BottomNavigation>
    </Box>
  );
};

// Private Route Wrapper
interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated: boolean = true; // Replace with actual auth logic
  return isAuthenticated ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

// Main App
const App: React.FC = () => {
  const location = useLocation();
  const isLoginPage: boolean = location.pathname === '/login';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)',
        }}
      >
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/settings" />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
};

export default App;