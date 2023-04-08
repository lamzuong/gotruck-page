function navigateToPolicy(type) {
  if (type === 'customer') return { typePolicy: 'Customer', header: 'Điều khoản cho khách hàng' };
  else if (type === 'shipper') return { typePolicy: 'Shipper', header: 'Điều khoản cho tài xế' };
  else if (type === 'security') return { typePolicy: 'Security', header: 'Chính sách bảo mật' };
  else if (type === 'regulation')
    return { typePolicy: 'Regulation', header: 'Quy chế hoạt động của GoTruck' };
}
function navigateBackPolicy(type) {
  if (type === 'Customer') return 'customer';
  else if (type === 'Shipper') return 'shipper';
  else if (type === 'Security') return 'security';
  else if (type === 'Regulation') return 'regulation';
}

export { navigateToPolicy, navigateBackPolicy };
