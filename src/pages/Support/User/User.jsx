import styles from './User.module.scss';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneVolume } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function User() {
  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>
        <FontAwesomeIcon icon={faPhoneVolume} color={'#04af46'} /> Cần hỗ trợ thêm, vui lòng liên hệ
        tổng đài tại mục Hỗ Trợ
      </h1>
      <div className={cx('wrapper-step')}>
        <div className={cx('step')}>
          <div className={cx('title-step')}>Bước 1</div>
          <div className={cx('content-step')}>
            Chọn <b>Tài khoản</b> chọn <b>Hỗ trợ</b> trên ứng dụng GoTruck
          </div>
          <div className={cx('wrapper-image')}>
            <img src={require('~/assets/images/help/customer-step1.png')} className={cx('image')} />
          </div>
        </div>
        <div className={cx('step')}>
          <div className={cx('title-step')}>Bước 2</div>
          <div className={cx('content-step')}>
            Chọn <b>Trợ giúp</b>, kéo xuống và chọn <b>Gọi đến tổng đài GoTruck</b>
          </div>
          <div className={cx('wrapper-image')}>
            <img src={require('~/assets/images/help/customer-step2.png')} className={cx('image')} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
