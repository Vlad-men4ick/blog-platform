import successfullyClass from './Successfully.module.scss';
import { useNavigate } from 'react-router-dom';

function Successfully({ setStatusArticle, flag }) {
  const navigate = useNavigate();
  return (
    <div className={successfullyClass.wrapper}>
      <div className={successfullyClass.container}>
        {flag === 'createArtic' ? (
          <p className={successfullyClass.desription}>Статья успешно создана. Перейти на главную страницу?</p>
        ) : (
          <p className={successfullyClass.desription}>Статья успешно обновлена. Перейти на главную страницу?</p>
        )}
        <div className={successfullyClass.button_wrapper}>
          <button
            className={`${successfullyClass.btn} ${successfullyClass.btn_yes}`}
            type="button"
            onClick={() => navigate('/')}
          >
            Да
          </button>
          <button
            className={`${successfullyClass.btn} ${successfullyClass.btn_cancel}`}
            type="button"
            onClick={() => setStatusArticle(false)}
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}
export default Successfully;
