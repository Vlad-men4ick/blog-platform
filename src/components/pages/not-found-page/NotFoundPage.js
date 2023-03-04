import notFoundClass from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className={notFoundClass.container}>
      <div className={notFoundClass['no-found-page']}>Page is not found</div>
      <p>
        Back to sart page? <Link to="/"> Go</Link>
      </p>
    </div>
  );
}

export default NotFoundPage;
