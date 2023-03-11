/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/alt-text */
import headerClass from './Header.module.scss';
// import { userNoregistered, userAvatar, userName, userEmail } from '../../redux/actions/actions';
import { userNoregistered, userData } from '../../redux/actions/actions';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Header() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.isLogin);
  const name = useSelector((state) => state.userData.username);
  const userImage = useSelector((state) => state.userData.image);
  if (isLogin) {
    return (
      <header className={headerClass.header}>
        <Link className={headerClass.realworld_logo} to="/">
          Realworld Blog
        </Link>
        <div className={headerClass.account_auth}>
          <Link to="/create-article" className={headerClass.sign_up_btn}>
            Create article
          </Link>
          <Link to="/edit-profile" className={headerClass.sign_in_btn}>
            <div className={headerClass.user_data_wrapper}>
              <p>{name}</p>
              {userImage === undefined ? (
                <img className={headerClass.avatar} src="https://static.productionready.io/images/smiley-cyrus.jpg" />
              ) : (
                <img
                  className={headerClass.avatar}
                  src={userImage}
                  onError={(e) =>
                    e.target.setAttribute('src', 'https://static.productionready.io/images/smiley-cyrus.jpg')
                  }
                />
              )}
            </div>
          </Link>
          <Link
            to="/"
            onClick={() => {
              dispatch(userNoregistered);
              sessionStorage.removeItem('token');
              dispatch(userData());
            }}
            className={headerClass.sign_in_btn}
          >
            Log Out
          </Link>
        </div>
      </header>
    );
  }
  return (
    <header className={headerClass.header}>
      <Link className={headerClass.realworld_logo} to="/">
        Realworld Blog
      </Link>
      <div className={headerClass.account_auth}>
        <Link to="/sign-in" className={headerClass.sign_in_btn}>
          Sign In
        </Link>
        <Link to="/create-account" className={headerClass.sign_up_btn}>
          Sign Up
        </Link>
      </div>
    </header>
  );
}

export default Header;
