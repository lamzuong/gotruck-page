import styles from './MyButtonAdd.module.scss';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ButtonAdd({ data, multi }) {
  return (
    <>
      {multi ? (
        <div className={cx('wrapper')}>
          <label htmlFor="file-upload" className={cx('custom-file-input')}>
            <FontAwesomeIcon icon={faCirclePlus} color={'#04af46'} />
            <div className={cx('txtAdd')}>Thêm ảnh</div>
          </label>
          <input
            id="file-upload"
            type="file"
            multiple
            onChange={(e) => {
              data(e.target.files);
            }}
            accept=".png, .jpeg, .jpg"
          />
        </div>
      ) : (
        <div className={cx('wrapper')}>
          <label htmlFor="file-upload-one" className={cx('custom-file-input')}>
            <FontAwesomeIcon icon={faCirclePlus} color={'#04af46'} />
            <div className={cx('txtAdd')}>Thêm ảnh</div>
          </label>

          <input
            id="file-upload-one"
            type="file"
            onChange={(e) => {
              data(e.target.files);
            }}
            accept=".png, .jpeg, .jpg"
          />
        </div>
      )}
    </>
  );
}

export default ButtonAdd;
