import Home from '~/pages/Home/Home';
import Register from '~/pages/Register/Register';
import Support from '~/pages/Support/Support';
import Policy from '~/pages/Policy/Policy';

// Không cần đăng nhập
const publicRoutes = [
  { path: '/', component: Home },
  { path: '/register', component: Register },
  { path: '/support', component: Support },
  { path: '/policy', component: Policy },
];
// Đăng nhập để xem được
const privateRoutes = [];
export { publicRoutes, privateRoutes };
