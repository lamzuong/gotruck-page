import styles from './Register.module.scss';
import MyInput from '~/components/MyInput/MyInput';
import MyButtonAdd from '~/components/MyButtonAdd/MyButtonAdd';
import MyButton from '~/components/MyButton/MyButton';
import iconRemove from '~/assets/images/close.png';
import demonsImg from '~/assets/images/demons-img.jpg';
import { AlertContext } from '~/context/AlertContext';

import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert, Button } from 'reactstrap';
import ReactSelect from 'react-select';
import truckAPI from '~/api/truckAPI';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function SignUp() {
  const ctx = useContext(AlertContext);
  const useMessage = ctx.Message();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [cmnd, setCmnd] = useState('');

  const [nameTruck, setNameTruck] = useState('');
  const [weightTruck, setWeightTruck] = useState({ value: 1, label: 'Xe 1 tấn' });
  const [numberTruck, setNumberTruck] = useState('');

  const [data, setData] = useState([]);
  const [listImage, setListImage] = useState([]);
  const [listWeight, setListWeight] = useState([]);

  const [validName, setValidName] = useState(false);
  const [validPhone, setValidPhone] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validAddress, setValidAddress] = useState(false);
  const [validCmnd, setValidCmnd] = useState(false);
  const [validNameTruck, setValidNameTruck] = useState(false);
  const [validNumberTruck, setValidNumberTruck] = useState(false);
  const [hideErr, setHideErr] = useState(true);

  useEffect(() => {
    const getAllTruck = async () => {
      const res = await truckAPI.getTruckType();
      const resSort = res.sort((a, b) => a.name - b.name);
      const list = [];
      for (const item of resSort) {
        list.push({ value: item.name, label: 'Xe ' + item.name + ' tấn' });
      }
      setListWeight(list);
    };
    getAllTruck();
  }, []);
  useEffect(() => {
    setListImage([...listImage, ...data]);
  }, [data]);

  const handleRemove = (index) => {
    let listTemp = [...listImage];
    listTemp.splice(index, 1);
    setListImage(listTemp);
  };

  const handleSubmit = () => {
    if (
      !(
        validName &&
        validPhone &&
        validEmail &&
        validAddress &&
        validCmnd &&
        validNameTruck &&
        weightTruck !== null &&
        validNumberTruck &&
        listImage.length >= 4
      )
    ) {
      setHideErr(false);
      useMessage?.error('Vui lòng nhập chính xác và đầy đủ thông tin vào đơn đăng ký!', true, 1500);
    } else {
      console.log(1);
      toggle();
    }
  };

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div className={cx('wrapper')}>
      {/* Modal thông báo thành công */}
      {modal ? (
        <Modal isOpen={modal}>
          <ModalHeader>
            <h3>Chúc mừng bạn đã gửi yêu cầu đăng ký thành công !!</h3>
          </ModalHeader>
          <ModalBody>
            Cám ơn bạn đã tin tưởng GoTruck! GoTruck sẽ gọi điện thoại và gửi email cho bạn trong
            vài ngày tới nếu đơn của bạn được chấp thuận!
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => navigate('/')}>
              <h4>OK, Tôi đã hiểu</h4>
            </Button>
          </ModalFooter>
        </Modal>
      ) : null}

      {/* Form đăng ký */}
      <h1 style={{ fontWeight: 700 }}>Đăng ký để trở thành tài xế của GoTruck</h1>
      <h2 className={cx('title-header')}>Thông tin cá nhân</h2>
      <MyInput
        data={setName}
        valid={setValidName}
        placeholder="Họ tên"
        inputName={true}
        regex={/^[a-zA-Z ]{1,30}$/}
        error={'Họ tên không hợp lệ'}
        checkEmpty={true}
        hideErr={hideErr}
      />
      <MyInput
        data={setPhone}
        valid={setValidPhone}
        placeholder="Số điện thoại"
        regex={/^((09|03|07|08|05)([0-9]{8}))$/}
        error={'Số điện thoại không hợp lệ'}
        checkEmpty={true}
        hideErr={hideErr}
      />
      <MyInput
        data={setEmail}
        valid={setValidEmail}
        placeholder="Email"
        regex={/^[^@]{2,64}@[^.]{2,253}\.[0-9a-z-.]{2,63}$/}
        error={'Email không hợp lệ'}
        checkEmpty={true}
        hideErr={hideErr}
      />
      <MyInput
        data={setAddress}
        valid={setValidAddress}
        placeholder="Địa chỉ"
        checkEmpty={true}
        hideErr={hideErr}
      />
      <MyInput
        data={setCmnd}
        valid={setValidCmnd}
        placeholder="CMND/CCCD"
        regex={/^(\d{9}|\d{12})$/}
        error={'CMND/CCCD không hợp lệ'}
        checkEmpty={true}
        hideErr={hideErr}
      />
      <h2 className={cx('title-header')}>Thông tin phương tiện</h2>
      <MyInput
        data={setNameTruck}
        valid={setValidNameTruck}
        placeholder="Tên phương tiện"
        checkEmpty={true}
        hideErr={hideErr}
      />
      <ReactSelect
        defaultValue={weightTruck}
        options={listWeight}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? '#04af46' : 'grey',
            borderRadius: 10,
            width: 300,
            height: 45,
            margin: 10,
          }),
        }}
        onChange={setWeightTruck}
      />
      <div style={{ maxWidth: 300 }}>
        <i>
          Lưu ý: Chọn loại trọng tải bé hơn hoặc bằng trọng tải của phương tiện muốn đăng ký (Vd:
          Trọng tải 1 tấn hoặc 1.25 tấn =&#62; chọn 1 tấn)
        </i>
      </div>
      <MyInput
        data={setNumberTruck}
        valid={setValidNumberTruck}
        placeholder="Biển số xe - VD: 53K.12345"
        regex={/^(([1-9]{2}|([2-9][0-9]))([A-Z]).(\d{4}|\d{5}))$/}
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
          <MyButtonAdd data={setData} />
        </div>
        {hideErr || listImage.length >= 4 ? null : (
          <div className={cx('txt-error')}>Cần đủ 4 hình ảnh như ví dụ</div>
        )}
      </div>
      <div className={cx('item-input')}>
        <div className={cx('label')}>Ví dụ:</div>
      </div>
      <img src={demonsImg} className={cx('demons-img')} />
      <MyButton title={'Đăng ký'} action={handleSubmit} />
    </div>
  );
}

export default SignUp;
