import errorClass from './Error.module.scss';
import { useNavigate } from 'react-router-dom';

function Error({ setError }) {
  const navigate = useNavigate();
  return (
    <div className={errorClass.wrapper}>
      <div className={errorClass.container}>
        <p className={errorClass.desription}>Что-то пошло не так. Попробовать снова?</p>
        <div className={errorClass.button_wrapper}>
          <button className={`${errorClass.btn} ${errorClass.btn_yes}`} type="button" onClick={() => setError(false)}>
            Да
          </button>
          <button className={`${errorClass.btn} ${errorClass.btn_cancel}`} type="button" onClick={() => navigate('/')}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}
export default Error;
