import ArticleForm from '../ArticleForm';
import articleFormClass from '../ArticleForm.module.scss';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function CreateArticlePage() {
  const token = useSelector((state) => state.userData.token);
  const flag = 'createArtic';
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return (
    <div>
      <h2 className={articleFormClass.header}>Create new article</h2>
      <ArticleForm flag={flag} />
    </div>
  );
}

export default CreateArticlePage;
