/* eslint-disable consistent-return */
/* eslint-disable no-useless-escape */
import signUpClass from './SignUp.module.scss';
import signFormClass from '../SignForm.module.scss';
import avatar from '../../../../img/avatar.svg';
import Error from '../../../error/Error';
import { userRegistered, userName, userEmail, userAvatar } from '../../../../redux/actions/actions';
import { registerUser } from '../../../../service/services';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function SignUp() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.isLogin);
  const [emailIsTaken, setemailIsTaken] = useState(false);
  const [usernamelIsTaken, setusernameIsTaken] = useState(false);

  const [error, setError] = useState(false);

  const {
    watch,
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  });
  const onSubmit = (reg) => {
    setError(false);
    setemailIsTaken(false);
    setusernameIsTaken(false);
    registerUser(reg.username, reg.email, reg.password)
      .then((res) => {
        if (res.errors) {
          if (res.errors.email === 'is already taken.') setemailIsTaken(true);
          if (res.errors.username === 'is already taken.') setusernameIsTaken(true);
        } else {
          const { username, email } = { ...reg };
          localStorage.setItem('token', res.user.token);
          dispatch(userRegistered);
          dispatch(userName({ username }));
          dispatch(userEmail({ email }));
          dispatch(userAvatar({ avatar }));
          reset();
        }
      })
      .catch((e) => {
        console.log(e);
        setError(true);
      });
  };
  if (localStorage.getItem('token') !== undefined && isLogin) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      {error ? <Error setError={setError} /> : null}
      <form className={signFormClass['sign-form']} onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <h1>Create new account</h1>
        <div>
          <label htmlFor="username-input">
            Username
            <input
              {...register('username', {
                required: 'Поле обязательно к заполнению!',
                minLength: {
                  value: 3,
                  message: 'Минимум 3 символа',
                },
                maxLength: {
                  value: 20,
                  message: 'Максимум 20 символа',
                },
              })}
              name="username"
              id="username-input"
              type="text"
              placeholder="Username"
            />
          </label>
          <div className={signFormClass['error-form']}>
            {errors?.username && <p>{errors?.username?.message || 'Error!'} </p>}
            {usernamelIsTaken ? <p>Username уже занят! Используйте другой username.</p> : null}
          </div>
        </div>
        <div>
          <label htmlFor="email-input">
            Email
            <input
              {...register('email', {
                required: 'Поле обязательно к заполнению!',
                pattern: {
                  value: /^([^ ]+@[^ ]+\.[a-z]{2,6}|)$/,
                  message: 'Email должен соответствовать: xx...xx@xxxx.xx',
                },
              })}
              id="email-input"
              type="email"
              placeholder="Email"
            />
          </label>
          <div className={signFormClass['error-form']}>
            {errors?.email && <p>{errors?.email?.message || 'Error!'} </p>}
            {emailIsTaken ? <p>Email уже занят! Используйте другой email.</p> : null}
          </div>
        </div>

        <div>
          <label htmlFor="password-input">
            Password
            <input
              {...register('password', {
                required: 'Поле обязательно к заполнению!',
                minLength: {
                  value: 6,
                  message: 'Минимум 6 символа',
                },
                maxLength: {
                  value: 40,
                  message: 'Максимум 40 символа',
                },
              })}
              name="password"
              autoComplete="false"
              id="password-input"
              type="password"
              placeholder="Password"
            />
          </label>
          <div className={signFormClass['error-form']}>
            {errors?.password && <p>{errors?.password?.message || 'Error!'} </p>}
          </div>
        </div>

        <div>
          <label htmlFor="repeat-password-input">
            Repeat Password
            <input
              {...register('repeatPassword', {
                required: 'Поле обязательно к заполнению!',
                validate: (val) => {
                  if (watch('password') !== val) {
                    return 'Ваши пароли не совпадают';
                  }
                },
              })}
              name="repeatPassword"
              id="repeat-password-input"
              type="password"
              placeholder="Password"
            />
          </label>
          <div className={signFormClass['error-form']}>
            {errors?.repeatPassword && <p>{errors?.repeatPassword?.message || 'Error!'} </p>}
          </div>
        </div>

        <hr />
        <label className={signUpClass['agree-box']}>
          <input
            {...register('agree', {
              required: 'Необходимо дать согласие на обработку персональных данных!',
            })}
            type="checkbox"
            className={signUpClass['agree-checkbox']}
            id="agree-checkbox"
          />
        </label>
        <p className={signUpClass['agree-label']}>I agree to the processing of my personal information</p>
        <div className={signFormClass['error-form']}>
          {errors?.agree && <p>{errors?.agree?.message || 'Error!'} </p>}
        </div>

        <input type="submit" value="Create" disabled={!isValid} />
        <p>
          Already have an account? <Link to="/sign-in">Sign in</Link>.
        </p>
      </form>
    </>
  );
}

export default SignUp;
