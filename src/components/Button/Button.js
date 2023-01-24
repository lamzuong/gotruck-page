import styles from './Button.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Button({ action, title }) {
  return (
    <div className={cx('wrapper')}>
      <button className={cx('my-button')} onClick={action}>
        <div className={cx('txt-button')}>{title}</div>
      </button>
    </div>
  );
}

export default Button;
