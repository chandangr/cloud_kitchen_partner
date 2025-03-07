import { SidebarProvider } from "@/components/ui/sidebar";
import React, { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AppSidebar } from "./components/app-sidebar";

const Dashboard = lazy(() => import('@/components/Dashboard'));
const MenuItem = lazy(() => import('@/components/MenuItem'));
const Orders = lazy(() => import('@/components/Orders'));
const WebsiteBuilder = lazy(() => import('@/components/WebsiteBuilder'));

function App() {
  const defaultProps = {
    subtitle: 'Innovate, grow, and make an impact',
    title: 'Build the Future of Real Estate with Bayut KSA',
    description: 'Join a team redefining real estate in Saudi Arabia. Whether in tech, marketing, or sales, your next opportunity starts here.',
    introTitle: 'INTRODUCTION',
    introDescription: 'Butthi Cloud Kitchen is more than just a food delivery service; we are a brand driven by a passion for healthy living. Our mission is to make nutritious eating accessible, delicious, and hassle-free for everyone. We believe that a balanced diet is the cornerstone of a healthy lifestyle, and our thoughtfully curated meals reflect this belief. By blending fresh, high-quality ingredients with innovative recipes, we provide flavorful, nutrient-rich meals delivered right to your doorstep.',
    featuredTitle: 'OUR FEATURED MENU',
    featuredDescription: 'At Butthi Cloud Kitchen, we bring you a curated selection of wholesome and flavorful options to fuel your day!',
    location: '',
    instagram: '',
    facebook: '',
    companyLogo: '/src/assets/react.svg',
    headerBackground: '/src/assets/react.svg',
    introMedia: '/src/assets/react.svg',
    introImage: '/src/assets/react.svg',
    featuredImage: '/src/assets/react.svg'
  };

  return (
  <React.StrictMode>
    <Router>
      <SidebarProvider>
        <AppSidebar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/menu-item" element={<MenuItem />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/website-builder" element={<WebsiteBuilder {...defaultProps} />} />
          </Routes>
        </Suspense>
      </SidebarProvider>
    </Router>
  </React.StrictMode>
  );
}

export default App;
