import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './features/cart/CartContext';
import { AuthProvider } from './features/auth/AuthContext';
import { WishlistProvider } from './features/wishlist/WishlistContext';
import { AddressProvider } from './features/address/AddressContext';
import RequireAuth from './features/auth/RequireAuth';
import LoginScreen from './features/auth/LoginScreen';
import OtpScreen from './features/auth/OtpScreen';
import RegisterScreen from './features/auth/RegisterScreen';
import SplashScreen from './features/splash/SplashScreen';
import HomeScreen from './features/splash/home/HomeScreen';
import CategoryScreen from './features/splash/home/category/CategoryScreen';
import CategoriesScreen from './features/categories/CategoriesScreen';
import ProductDetailScreen from './features/product/ProductDetailScreen';
import CartScreen from './features/cart/CartScreen';
import CheckoutScreen from './features/checkout/CheckoutScreen';
import SelectAddressScreen from './features/address/SelectAddressScreen';
import OrderConfirmedScreen from './features/order/OrderConfirmedScreen';
import OrderTrackingScreen from './features/tracking/OrderTrackingScreen';
import OrderDetailScreen from './features/orderdetail/OrderDetailScreen';
import ProfileScreen from './features/profile/ProfileScreen';
import SupportScreen from './features/support/SupportScreen';
import BottomNav from './components/BottomNav';
import CartIcon from './components/CartIcon';
import SellerDashboardScreen from './features/seller/SellerDashboardScreen';
import RiderTasksScreen from './features/rider/RiderTasksScreen';
import RiderTaskDetailScreen from './features/rider/RiderTaskDetailScreen';
import RiderEarningsScreen from './features/rider/RiderEarningsScreen';
import RiderWalletScreen from './features/rider/RiderWalletScreen';
import RiderProfileScreen from './features/rider/RiderProfileScreen';
import HubDashboardScreen from './features/hub/HubDashboardScreen';
import SellerAddProductScreen from './features/seller/SellerAddProductScreen';
import SellerOrdersScreen from './features/seller/SellerOrdersScreen';
import SellerProductsScreen from './features/seller/SellerProductsScreen';
import SellerEarningsScreen from './features/seller/SellerEarningsScreen';
import SellerProfileScreen from './features/seller/SellerProfileScreen';
import SellerInventoryScreen from './features/seller/SellerInventoryScreen';
import SellerReportsScreen from './features/seller/SellerReportsScreen';
import HubInventoryScreen from './features/hub/HubInventoryScreen';
import HubOrdersScreen from './features/hub/HubOrdersScreen';
import HubReportsScreen from './features/hub/HubReportsScreen';
import HubMoreScreen from './features/hub/HubMoreScreen';
import HubIncomingScreen from './features/hub/HubIncomingScreen';
import HubQcCheckScreen from './features/hub/HubQcCheckScreen';
import HubStorageScreen from './features/hub/HubStorageScreen';
import HubDispatchScreen from './features/hub/HubDispatchScreen';
import OrdersListScreen from './features/order/OrdersListScreen';
import WishlistScreen from './features/wishlist/WishlistScreen';
import { WardProvider } from './features/address/WardContext';
import SelectWardScreen from './features/address/SelectWardScreen';

function AppLayout() {
  const location = useLocation();
  const staffPrefixes = ['/seller', '/rider', '/hub'];
  const authRoutes = ['/login', '/otp', '/register'];
  const isStaffRoute = staffPrefixes.some((prefix) => location.pathname.startsWith(prefix));
  const isAuthRoute = authRoutes.includes(location.pathname);
  const hideNavOn = ['/'];
  const showNav = !hideNavOn.includes(location.pathname) && !isStaffRoute && !isAuthRoute;
  const showCart = !isStaffRoute && !isAuthRoute;

  return (
    <div className="relative min-h-screen">
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/otp" element={<OtpScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/categories" element={<CategoriesScreen />} />
        <Route path="/category/:categoryName" element={<CategoryScreen />} />
        <Route path="/product/:productId" element={<ProductDetailScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <CheckoutScreen />
            </RequireAuth>
          }
        />
        <Route
          path="/select-address"
          element={
            <RequireAuth>
              <SelectAddressScreen />
            </RequireAuth>
          }
        />
        <Route path="/order-confirmed" element={<OrderConfirmedScreen />} />
        <Route path="/tracking" element={<OrderTrackingScreen />} />
        <Route path="/order-detail" element={<OrderDetailScreen />} />
        <Route path="/select-ward" element={<SelectWardScreen />} />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <ProfileScreen />
            </RequireAuth>
          }
        />
        <Route path="/support" element={<SupportScreen />} />
        <Route path="/seller/dashboard" element={<SellerDashboardScreen />} />
        <Route path="/rider/tasks" element={<RiderTasksScreen />} />
        <Route path="/rider/tasks/:taskId" element={<RiderTaskDetailScreen />} />
        <Route path="/rider/earnings" element={<RiderEarningsScreen />} />
        <Route path="/rider/wallet" element={<RiderWalletScreen />} />
        <Route path="/rider/profile" element={<RiderProfileScreen />} />
        <Route path="/hub/dashboard" element={<HubDashboardScreen />} />
        <Route path="/seller/add-product" element={<SellerAddProductScreen />} />
        <Route path="/seller/orders" element={<SellerOrdersScreen />} />
        <Route path="/seller/products" element={<SellerProductsScreen />} />
        <Route path="/seller/earnings" element={<SellerEarningsScreen />} />
        <Route path="/seller/profile" element={<SellerProfileScreen />} />
        <Route path="/seller/inventory" element={<SellerInventoryScreen />} />
        <Route path="/seller/reports" element={<SellerReportsScreen />} />
        <Route path="/hub/inventory" element={<HubInventoryScreen />} />
        <Route path="/hub/orders" element={<HubOrdersScreen />} />
        <Route path="/hub/reports" element={<HubReportsScreen />} />
        <Route path="/hub/more" element={<HubMoreScreen />} />
        <Route path="/hub/qc-check" element={<HubQcCheckScreen />} />
        <Route path="/hub/incoming" element={<HubIncomingScreen />} />
        <Route path="/hub/storage" element={<HubStorageScreen />} />
        <Route path="/hub/dispatch" element={<HubDispatchScreen />} />
        <Route path="/orders" element={<OrdersListScreen />} />
        <Route path="/wishlist" element={<WishlistScreen />} />
      </Routes>
      {showNav && <BottomNav />}
      {showCart && <CartIcon />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <AddressProvider>
          <WardProvider>
            <CartProvider>
              <BrowserRouter basename={import.meta.env.BASE_URL}>
                <div className="min-h-screen w-full bg-gray-200 flex justify-center">
                  <div className="w-full max-w-md min-h-screen bg-[#FDF6F0] shadow-2xl relative overflow-hidden">
                    <AppLayout />
                  </div>
                </div>
              </BrowserRouter>
            </CartProvider>
          </WardProvider>
        </AddressProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;