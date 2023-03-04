/* eslint-disable jsx-a11y/alt-text */
import headerClass from './Header.module.scss';
import avatar from '../../img/avatar.svg';
import { userNoregistered, userAvatar, userName, userEmail } from '../../redux/actions/actions';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Header() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.isLogin);
  const name = useSelector((state) => state.userName.username);
  const userImage = useSelector((state) => state.userAvatar.image);
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
              {userImage ? <img className={headerClass.avatar} src={userImage} /> : <img src={avatar} />}
            </div>
          </Link>
          <Link
            to="/"
            onClick={() => {
              dispatch(userNoregistered);
              localStorage.removeItem('token');
              localStorage.removeItem('pass');
              dispatch(userAvatar());
              dispatch(userName());
              dispatch(userEmail());
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
