import styles from './Shipper.module.scss';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faMessage } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Shipper() {
  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>
        <FontAwesomeIcon icon={faCommentDots} color={'#04af46'} /> Liên hệ GoTruck thông qua ứng
        dụng GoTruck Driver
      </h1>
      <div className={cx('wrapper-step')}>
        <div className={cx('step')}>
          <div className={cx('title-step')}>Bước 1</div>
          <div className={cx('content-step')}>
            Chọn <b>Tài khoản</b> chọn <b>Hỗ trợ</b> trên ứng dụng GoTruck
          </div>
          <div className={cx('wrapper-image')}>
            <img src={require('~/assets/images/help/shipper-step1.png')} className={cx('image')} />
          </div>
        </div>
        <div className={cx('step')}>
          <div className={cx('title-step')}>Bước 2</div>
          <div className={cx('content-step')}>
            Chọn <b>Trợ giúp</b>, kéo xuống và chọn <b>Gọi đến tổng đài GoTruck</b>
          </div>
          <div className={cx('wrapper-image')}>
            <img src={require('~/assets/images/help/shipper-step2.png')} className={cx('image')} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shipper;
