import styles from './Register.module.scss';
import MyInput from '~/components/MyInput/MyInput';
import MyButtonAdd from '~/components/MyButtonAdd/MyButtonAdd';
import MyButton from '~/components/MyButton/MyButton';
import iconRemove from '~/assets/images/close.png';
import demonsImg from '~/assets/images/demons-img.jpg';
import { AlertContext } from '~/context/AlertContext';

import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Spinner } from 'reactstrap';
import ReactSelect from 'react-select';
import { truckAPI, registerAPI } from '~/api/pageAPI';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';

import storage from '../../firebase/firebaseConfig';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

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
  const [weightTruck, setWeightTruck] = useState('');
  const [numberTruck, setNumberTruck] = useState('');

  const [data, setData] = useState([]);
  const [listImage, setListImage] = useState([]);

  const [avatar, setAvatar] = useState([]);
  const [avatarData, setAvatarData] = useState([]);

  const [listVehicleRegistration, setListVehicleRegistration] = useState([]);
  const [dataVehicleRegistration, setDataVehicleRegistration] = useState([]);

  const [listWeight, setListWeight] = useState([]);

  const [validName, setValidName] = useState(false);
  const [validPhone, setValidPhone] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validAddress, setValidAddress] = useState(false);
  const [validCmnd, setValidCmnd] = useState(false);
  const [validNameTruck, setValidNameTruck] = useState(false);
  const [validNumberTruck, setValidNumberTruck] = useState(false);

  const [listTruck, setListTruck] = useState([]);
  const [hideErr, setHideErr] = useState(true);
  const [validAvatar, setValidAvatar] = useState(true);
  const [validImageTruck, setValidImageTruck] = useState(true);
  const [validVehicleRegistration, setValidVehicleRegistration] = useState(true);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleRemove = (index) => {
    let listTemp = [...listImage];
    listTemp.splice(index, 1);
    setListImage(listTemp);
  };

  const handleRemoveAvatar = (index) => {
    let listTemp = [...avatar];
    listTemp.splice(index, 1);
    setAvatar(listTemp);
  };

  const handleRemoveVehicleRegistration = (index) => {
    let listTemp = [...listVehicleRegistration];
    listTemp.splice(index, 1);
    setListVehicleRegistration(listTemp);
  };

  const getIdTruck = (value) => {
    const id = listTruck.find((tr) => tr.name === value);
    if (id) return id;
    return null;
  };

  const handleSubmit = async () => {
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
        avatar.length > 0 &&
        listImage.length >= 4 &&
        listVehicleRegistration.length >= 4
      )
    ) {
      if (avatar.length === 0) {
        setValidAvatar(false);
      } else if (listImage.length < 4) {
        setValidImageTruck(false);
      } else if (listVehicleRegistration.length < 4) {
        setValidVehicleRegistration(false);
      }
      useMessage?.error('Vui lòng nhập chính xác và đầy đủ thông tin vào đơn đăng ký!', true, 1500);
    } else {
      const idTruck = getIdTruck(weightTruck.value);

      const listURLTruck = await uploadImage(listImage);
      const listURLVehicleRegistration = await uploadImage(listVehicleRegistration);
      const avatarURLres = await uploadImage(avatar);
      const avatarURL = avatarURLres[0];

      const dataSend = {
        shipper: {
          name: name,
          phone: phone,
          email: email,
          address: address,
          avatar: avatarURL,
          status: 'Chưa duyệt',
          deleted: false,
          block: false,
          cmnd: cmnd,
          balance: 0,
        },
        truck: {
          license_plate: numberTruck,
          name: nameTruck,
          type_truck: idTruck,
          list_image_info: listURLTruck,
          status: 'Chưa duyệt',
          default: true,
          deleted: false,
          list_vehicle_registration: listURLVehicleRegistration,
        },
      };
      const resRegister = await registerAPI.postRegister(dataSend);
      if (resRegister.status === 'error') {
        useMessage?.error(resRegister.message, true, 2500);
        return;
      } else {
        toggle();
      }
    }
  };
  const uploadImage = async (imageFileList) => {
    const imagesUrlArray = [];
    for (let i = 0; i < imageFileList.length; i++) {
      const storageRef = ref(storage, uuid());
      const uploadTask = await uploadBytesResumable(storageRef, imageFileList[i]);
      const imageUrl = await getDownloadURL(storageRef);
      imagesUrlArray.push(imageUrl);
    }
    return imagesUrlArray;
  };

  useEffect(() => {
    if (avatar.length === 0) {
      setValidAvatar(false);
    } else {
      setValidAvatar(true);
    }

    if (listImage.length < 4) {
      setValidImageTruck(false);
    } else {
      setValidImageTruck(true);
    }

    if (listVehicleRegistration.length < 4) {
      setValidVehicleRegistration(false);
    } else {
      setValidVehicleRegistration(true);
    }
  }, [listImage, avatar, listVehicleRegistration]);

  useEffect(() => {
    const getAllTruck = async () => {
      const res = await truckAPI.getTruckType();
      const list = [];
      for (const item of res) {
        list.push({ value: item.name, label: 'Xe ' + item.name + ' tấn' });
      }
      setWeightTruck(list[0]);
      setListTruck([...res]);
      setListWeight(list);
    };
    getAllTruck();
  }, []);

  useEffect(() => {
    setListImage([...listImage, ...data]);
  }, [data]);

  useEffect(() => {
    setAvatar([...avatar, ...avatarData]);
  }, [avatarData]);

  useEffect(() => {
    setListVehicleRegistration([...listVehicleRegistration, ...dataVehicleRegistration]);
  }, [dataVehicleRegistration]);

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
        <div className={cx('label')}>Ảnh khuôn mặt (1 ảnh):</div>
        <div className={cx('view-images')}>
          {Array.from(avatar).map((e, i) => (
            <div style={{ display: 'flex' }} key={i}>
              <img src={URL.createObjectURL(e)} alt="" className={cx('image')} />
              <img
                src={iconRemove}
                className={cx('icon-remove')}
                onClick={() => handleRemoveAvatar(i)}
              />
            </div>
          ))}
          {avatar.length === 0 && <MyButtonAdd data={setAvatarData} type={'avatar'} />}
        </div>
        {validAvatar ? null : <div className={cx('txt-error')}>Cần đủ 1 hình ảnh </div>}
      </div>

      <div className={cx('item-input')}>
        <div className={cx('label')}>Hình ảnh xe (tối thiểu 4 ảnh):</div>
        <div div className={cx('view-images')}>
          {Array.from(listImage).map((e, i) => (
            <div style={{ display: 'flex' }} key={i}>
              <img src={URL.createObjectURL(e)} alt="" className={cx('image')} />
              <img src={iconRemove} className={cx('icon-remove')} onClick={() => handleRemove(i)} />
            </div>
          ))}

          <MyButtonAdd data={setData} multi={true} type={'truck'} />
        </div>
        {validImageTruck ? null : <div className={cx('txt-error')}>Cần đủ 4 hình ảnh</div>}
      </div>

      <div className={cx('item-input')}>
        <div className={cx('label')}>Hình ảnh giấy tờ (tối thiểu 4 ảnh):</div>
        <div div className={cx('view-images')}>
          {Array.from(listVehicleRegistration).map((e, i) => (
            <div style={{ display: 'flex' }} key={i}>
              <img src={URL.createObjectURL(e)} alt="" className={cx('image')} />
              <img
                src={iconRemove}
                className={cx('icon-remove')}
                onClick={() => handleRemoveVehicleRegistration(i)}
              />
            </div>
          ))}

          <MyButtonAdd
            data={setDataVehicleRegistration}
            multi={true}
            type={'vehicleRegistration'}
          />
        </div>
        {validVehicleRegistration ? null : (
          <div className={cx('txt-error')}>Cần đủ 4 hình ảnh như ví dụ</div>
        )}
      </div>

      <div className={cx('item-input')}>
        <div className={cx('label')}>Ví dụ:</div>
        <div className={cx('label')}>
          - Ảnh khuôn mặt: Ảnh chụp trong 6 tháng gần đây, đầu và vai thẳng để khuôn mặt chiếm
          70-80% ảnh.
        </div>
        <div className={cx('label')}>
          - Ảnh xe: Ảnh chụp phải rõ ràng và chụp đủ phía trước, sau và 2 mặt bên của xe
        </div>
        <div className={cx('label')}>- Ảnh giấy tờ:</div>
      </div>
      <img src={demonsImg} className={cx('demons-img')} />
      <MyButton title={'Đăng ký'} action={handleSubmit} />
    </div>
  );
}

export default SignUp;
