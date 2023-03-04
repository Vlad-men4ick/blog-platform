import ArticleForm from '../ArticleForm';

function CreateArticlePage() {
  const flag = 'createArtic';

  return (
    <div className="create-article-page">
      <h2>Create new article</h2>
      <ArticleForm flag={flag} />
    </div>
  );
}

// eslint-disable-next-line new-cap
export default CreateArticlePage;
