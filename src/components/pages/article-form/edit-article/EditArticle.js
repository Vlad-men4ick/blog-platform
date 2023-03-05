import ArticleForm from '../ArticleForm';
import articleFormClass from '../ArticleForm.module.scss';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function EditArticle() {
  const flag = 'editArtic';

  const isLogin = useSelector((state) => state.isLogin);
  if (!isLogin) {
    return <Navigate to="/" replace />;
  }
  return (
    <div>
      <h2 className={articleFormClass.header}>Edit article</h2>
      <ArticleForm flag={flag} />
    </div>
  );
}

export default EditArticle;
