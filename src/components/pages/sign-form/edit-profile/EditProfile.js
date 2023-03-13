/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/alt-text */
import signFormClass from '../SignForm.module.scss';
import ErrorBlock from '../../../error/ErrorBlock';
import Error from '../../../error/Error';
import { updateUserInfo } from '../../../../service/services';
import { userData } from '../../../../redux/actions/actions';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

function EditProfile() {
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const [emailIsTaken, setemailIsTaken] = useState(false);
  const [usernamelIsTaken, setusernameIsTaken] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const [error, setError] = useState(false);

  const name = useSelector((state) => state.userData.username);
  const avatar = useSelector((state) => state.userData.image);
  const emailU = useSelector((state) => state.userData.email);

  const token = useSelector((state) => state.userData.token);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      email: emailU,
      username: name,
    },
  });

  const onSubmit = (reg) => {
    setSuccess(false);
    setemailIsTaken(false);
    setusernameIsTaken(false);
    setNotFound(false);
    setError(false);

    const img = reg.image === '' ? avatar : reg.image;
    const pass = reg.password === '' ? undefined : reg.password;
    updateUserInfo(token, reg.email, pass, reg.username, img)
      .then((res) => {
        if (res.errors) {
          if (res.errors.email === 'is already taken.') setemailIsTaken(true);
          if (res.errors.username === 'is already taken.') setusernameIsTaken(true);
          if (res.errors.message === 'Not Found') setNotFound(true);
        } else {
          dispatch(userData(res.user));
          setSuccess(true);
        }
      })
      .catch((e) => {
        console.log(e);
        setError(true);
      });
  };

  useEffect(() => {
    setValue('username', name);
    setValue('email', emailU);
  }, [setValue, name, emailU]);
  if (!token) {
    return <Navigate to="/" replace />;
  }
  if (success) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      {error ? <Error setError={setError} /> : null}
      {notFound ? (
        <ErrorBlock />
      ) : (
        <form className={signFormClass['sign-form']} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <h1>Edit Profile</h1>

          <div>
            <label htmlFor="username-input">
              Username
              <input
                {...register('username', {
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
              <div className={signFormClass['error-form']}>
                {errors?.username && <p>{errors?.username?.message || 'Error!'} </p>}
                {usernamelIsTaken ? <p>Username уже занят! Используйте другой username.</p> : null}
              </div>
            </label>
          </div>

          <div>
            <label htmlFor="email-input">
              Email address
              <input
                {...register('email', {
                  pattern: {
                    value: /^([^ ]+@[^ ]+\.[a-z]{2,6}|)$/,
                    message: 'Email должен соответствовать: xx...xx@xxxx.xx',
                  },
                })}
                id="email-input"
                name="email"
                type="text"
                placeholder="Email address"
              />
            </label>
            <div className={signFormClass['error-form']}>
              {errors?.email && <p>{errors?.email?.message || 'Error!'} </p>}
              {emailIsTaken ? <p>Email уже занят! Используйте другой email.</p> : null}
            </div>
          </div>

          <div>
            <label htmlFor="password-input">
              New password
              <input
                name="password"
                id="password-input"
                type="password"
                placeholder="New password"
                {...register('password', {
                  minLength: {
                    value: 6,
                    message: 'Минимум 6 символа',
                  },
                  maxLength: {
                    value: 40,
                    message: 'Максимум 40 символа',
                  },
                })}
              />
            </label>
            <div className={signFormClass['error-form']}>
              {errors?.password && <p>{errors?.password?.message || 'Error!'} </p>}
            </div>
          </div>

          <div>
            <label htmlFor="imgURL-input">
              Avatar image (url)
              <input
                {...register('image', {
                  pattern: {
                    value:
                      /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/,
                    message: 'URL не корректный',
                  },
                })}
                type="text"
                placeholder="Avatar image"
              />
            </label>
            <div className={signFormClass['error-form']}>
              {errors?.image && <p>{errors?.image?.message || 'Error!'} </p>}
            </div>
          </div>

          <input type="submit" value="Save" />
        </form>
      )}
    </>
  );
}

export default EditProfile;
