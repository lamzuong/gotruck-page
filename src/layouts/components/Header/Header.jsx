import styles from './Header.module.scss';
import logo from '~/assets/images/logo-name-green.png';

import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { faHeadset, faShieldHalved, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function Header() {
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Link to={'/'}>
          <img src={logo} alt="GoTruck" className={cx('logo')} />
        </Link>
        <div className={cx('list-header-items')}>
          <Link to={'/register'} className={cx('header-item')}>
            <FontAwesomeIcon icon={faTruckFast} />
            <div className={cx('item-title')}>Trở thành Đối tác của GoTruck</div>
          </Link>
          <Link to={'/support'} className={cx('header-item')}>
            <FontAwesomeIcon icon={faHeadset} />
            <div className={cx('item-title')}>Trung tâm hỗ trợ</div>
          </Link>
          <Link to={'/policy'} className={cx('header-item')}>
            <FontAwesomeIcon icon={faShieldHalved} />
            <div className={cx('item-title')}>Điều khoản và Chính sách</div>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
