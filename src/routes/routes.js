import Home from '~/pages/Home/Home';
import Register from '~/pages/Register/Register';
import Support from '~/pages/Support/Support';
import Policy from '~/pages/Policy/Policy';
import DetailPolicy from '~/pages/Policy/DetailPolicy/DetailPolicy';

// Không cần đăng nhập
const publicRoutes = [
  { path: '/', component: Home },
  { path: '/register', component: Register },
  { path: '/support', component: Support },

  { path: '/policy', component: Policy },
  { path: '/policy/customer', component: DetailPolicy },
  { path: '/policy/shipper', component: DetailPolicy },
  { path: '/policy/security', component: DetailPolicy },
  { path: '/policy/regulation', component: DetailPolicy },
];
// Đăng nhập để xem được
const privateRoutes = [];
export { publicRoutes, privateRoutes };
