import styles from './Home.module.scss';
import banner from '~/assets/images/banner-page.jpg';
import iconPay from '~/assets/images/icon-payments.png';
import iconSafety from '~/assets/images/icon-safety.png';
import iconTime from '~/assets/images/icon-shorter_time.png';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Home() {
  return (
    <div>
      <img src={banner} className={cx('banner')} />
      <div className={cx('wrapper-item')}>
        <h1>Người tiêu dùng - Tại sao nên sử dụng dịch vụ GoTruck Giao Hàng?</h1>
        <div className={cx('item-list')}>
          <img src={iconPay} className={cx('icon-item')} />
          <div className={cx('content-item')}>
            <h2>Chi phí hợp lí</h2>
            <p>
              Giá tiền cuốc xe hiển thị ngay trên ứng dụng, bạn chỉ việc trả đúng số tiền này và an
              tâm món hàng sẽ đến tay người nhận trong thời gian sớm nhất.
            </p>
          </div>
        </div>
        <div className={cx('item-list')}>
          <img src={iconTime} className={cx('icon-item')} />
          <div className={cx('content-item')}>
            <h2>Dịch vụ nhanh chóng</h2>
            <p>
              Giao và nhận kiện hàng của bạn chưa bao giờ nhanh và dễ dàng đến vậy. Chỉ trong vài
              cái chạm tay!
            </p>
          </div>
        </div>
        <div className={cx('item-list')}>
          <img src={iconSafety} className={cx('icon-item')} />
          <div className={cx('content-item')}>
            <h2>An tâm tuyệt đối</h2>
            <p>
              Tài xế GoTruck được đào tạo bài bản trong phong cách phục vụ và giao nhận an toàn.
            </p>
          </div>
        </div>
      </div>
      <div className={cx('wrapper-item')}>
        <h1>Đối tác tài xế - Giao hàng ở GoTruck có những phúc lợi gì?</h1>
        <div className={cx('item-list')}>
          <img src={iconTime} className={cx('icon-item')} />
          <div className={cx('content-item')}>
            <h2>Tự do và tự chủ về thời gian</h2>
            <p>
              Thời gian linh động, bạn hoàn toàn có thể chủ động quyết định thời gian làm việc của
              mình
            </p>
          </div>
        </div>
        <div className={cx('item-list')}>
          <img src={iconPay} className={cx('icon-item')} />
          <div className={cx('content-item')}>
            <h2>Thu nhập tin cậy</h2>
            <p>
              Có bảng sao kê thu nhập trực tuyến cũng như các lần rút tiền trên ứng dụng giúp bạn
              quản lý tài chính của mình tốt hơn
            </p>
          </div>
        </div>
        <div className={cx('item-list')}>
          <img src={iconSafety} className={cx('icon-item')} />
          <div className={cx('content-item')}>
            <h2>Bộ công cụ bảo vệ an toàn cho Đối tác Tài xế</h2>
            <p>
              Giúp bạn thực hiện cuộc gọi khẩn cấp nhanh nhất có thể, phát kèm vị trí chính xác của
              bạn, đồng thời thông báo cho người thân, chính quyền địa phương hoặc cơ quan công an.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
