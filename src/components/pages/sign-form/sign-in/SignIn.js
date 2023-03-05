/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-unescaped-entities */
import signFormClass from '../SignForm.module.scss';
import Error from '../../../error/Error';
import { logInUser, getUser } from '../../../../service/services';
import { userRegistered } from '../../../../redux/actions/actions';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

function SignIn() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.isLogin);
  const [errorValue, setErrorValue] = useState(false);

  const [error, setError] = useState(false);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (reg) => {
    setError(false);
    setErrorValue(false);
    logInUser(reg.email, reg.password)
      .then((res) => {
        if (res.errors) {
          if (res.errors) setErrorValue(true);
        } else {
          localStorage.setItem('token', res.user.token);
          dispatch(userRegistered);
          dispatch(getUser());
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
      <form className={signFormClass['sign-form']} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign In</h1>
        <div>
          <label htmlFor={signFormClass['email-input']}>
            Email address
            <input
              {...register('email', {
                required: 'Поле обязательно к заполнению!',
                pattern: {
                  value: /^([^ ]+@[^ ]+\.[a-z]{2,6}|)$/,
                  message: 'Email должен соответствовать: xx...xx@xxxx.xx',
                },
              })}
              type="text"
              placeholder="Email address"
            />
          </label>
          <div className={signFormClass['error-form']}>
            {errors?.email && <p>{errors?.email?.message || 'Error!'} </p>}
          </div>
        </div>

        <div>
          <label htmlFor={signFormClass['password-input']}>
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
              id="1"
              type="password"
              placeholder="Password"
            />
          </label>
          <div className={signFormClass['error-form']}>
            {errors?.password && <p>{errors?.password?.message || 'Error!'} </p>}
            {errorValue ? <p>Не верный email или password.</p> : null}
          </div>
        </div>

        <input type="submit" value="Create" disabled={!isValid} />
        <p>
          Don't have an account? <Link to="/create-account">Sign up</Link>
        </p>
      </form>
    </>
  );
}

export default SignIn;
