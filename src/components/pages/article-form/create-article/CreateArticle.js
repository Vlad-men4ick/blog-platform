import ArticleForm from '../ArticleForm';
import articleFormClass from '../ArticleForm.module.scss';

function CreateArticlePage() {
  const flag = 'createArtic';

  return (
    <div>
      <h2 className={articleFormClass.header}>Create new article</h2>
      <ArticleForm flag={flag} />
    </div>
  );
}

export default CreateArticlePage;
