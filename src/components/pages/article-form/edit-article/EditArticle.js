import ArticleForm from '../ArticleForm';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function EditArticle() {
  const flag = 'editArtic';

  const isLogin = useSelector((state) => state.isLogin);
  if (!isLogin) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="create-article-page">
      <h2>Edit article</h2>
      <ArticleForm flag={flag} />
    </div>
  );
}

export default EditArticle;
