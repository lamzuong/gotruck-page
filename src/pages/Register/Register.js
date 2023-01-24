import styles from './Register.module.scss';
import Input from '~/components/Input/Input';
import ButtonAdd from '~/components/ButtonAdd/ButtonAdd';
import iconRemove from '~/assets/images/close.png';
import demonsImg from '~/assets/images/demons-img.jpg';
import Button from '~/components/Button/Button';
import { AlertContext } from '~/context/AlertContext';

import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function SignUp() {
  const ctx = useContext(AlertContext);
  const useMessage = ctx.Message();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [numberTruck, setNumberTruck] = useState('');

  const [data, setData] = useState([]);
  const [listImage, setListImage] = useState([]);

  const [validName, setValidName] = useState(false);
  const [validPhone, setValidPhone] = useState(false);
  const [validAddress, setValidAddress] = useState(false);
  const [validNumberTruck, setValidNumberTruck] = useState(false);
  const [hideErr, setHideErr] = useState(true);

  useEffect(() => {
    setListImage([...listImage, ...data]);
  }, [data]);

  const handleRemove = (index) => {
    let listTemp = [...listImage];
    listTemp.splice(index, 1);
    setListImage(listTemp);
  };

  const handleSubmit = () => {
    if (!(validName && validPhone && validAddress && validNumberTruck && listImage.length >= 4)) {
      setHideErr(false);
      useMessage?.error('Vui lòng nhập chính xác và đầy đủ thông tin vào đơn đăng ký!', true, 1500);
    } else console.log(1);
  };

  return (
    <div className={cx('wrapper')}>
      <h1>Đăng ký để trở thành tài xế của GoTruck</h1>
      <Input
        data={setName}
        valid={setValidName}
        placeholder="Họ tên"
        inputName={true}
        regex={/^[a-zA-Z ]{1,30}$/}
        error={'Họ tên không hợp lệ'}
        checkEmpty={true}
        hideErr={hideErr}
      />
      <Input
        data={setPhone}
        valid={setValidPhone}
        placeholder="Số điện thoại"
        regex={/^((09|03|07|08|05)([0-9]{8}))$/}
        error={'Số điện thoại không hợp lệ'}
        checkEmpty={true}
        hideErr={hideErr}
      />
      {/* Thêm email */}
      <Input
        data={setAddress}
        valid={setValidAddress}
        placeholder="Địa chỉ"
        checkEmpty={true}
        hideErr={hideErr}
      />
      <Input
        data={setNumberTruck}
        valid={setValidNumberTruck}
        placeholder="Biển số xe - VD: 53-K2.12345"
        regex={/^(([1-9]{2}|([2-9][0-9]))-([A-Z][1-9]).(\d{4}|\d{5}))$/}
        error={'Biển số xe không hợp lệ'}
        checkEmpty={true}
        hideErr={hideErr}
      />
      <div className={cx('item-input')}>
        <div className={cx('label')}>Hình ảnh minh chứng:</div>
        <div className={cx('view-images')}>
          {Array.from(listImage).map((e, i) => (
            <div style={{ display: 'flex' }} key={i}>
              <img src={URL.createObjectURL(e)} alt="" className={cx('image')} />
              <img src={iconRemove} className={cx('icon-remove')} onClick={() => handleRemove(i)} />
            </div>
          ))}
          <ButtonAdd data={setData} />
        </div>
        {hideErr || listImage.length >= 4 ? null : (
          <div className={cx('txt-error')}>Cần đủ 4 hình ảnh như ví dụ</div>
        )}
      </div>
      <div className={cx('item-input')}>
        <div className={cx('label')}>Ví dụ:</div>
      </div>
      <img src={demonsImg} className={cx('demons-img')} />
      <Button
        title={'Đăng ký'}
        action={() => {
          handleSubmit();
        }}
      />
    </div>
  );
}

export default SignUp;
