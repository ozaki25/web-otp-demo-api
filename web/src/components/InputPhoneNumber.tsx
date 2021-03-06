import React, { ChangeEvent, MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectPhoneNumber,
  setPhoneNumber,
  sendPhoneNumber,
} from '../store/otpSlice';

function InputPhoneNumber() {
  const history = useHistory();
  const phoneNumber = useSelector(selectPhoneNumber);
  const dispatch = useDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPhoneNumber(e.target.value));
  };

  const onSuccess = () => {
    history.push('/otp');
  };

  const onClickSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(sendPhoneNumber(onSuccess));
  };

  return (
    <div>
      <label>電話番号</label>
      <br />
      <input name="phone" onChange={onChange} value={phoneNumber} />
      <br />
      <button onClick={onClickSubmit}>送信</button>
    </div>
  );
}

export default InputPhoneNumber;
