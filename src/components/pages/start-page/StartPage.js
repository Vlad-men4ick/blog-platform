/* eslint-disable react/no-children-prop */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import startPage from './StartPage.module.scss';
import like from '../../../img/like.svg';
import myLike from '../../../img/myLike.svg';
import avatar from '../../../img/avatar.svg';
import Spinner from '../../spiner/spiner';
import ErrorBlock from '../../error/ErrorBlock';
import { likeArticle, unLikeArticle, getArticles } from '../../../service/services';
import { getDatePost } from '../../../utilities/getDatePost';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Pagination } from 'antd';

function StartPage() {
  const [onLoading, setOnLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(null);
  const [onError, setOnError] = useState(false);
  const disallowed = ['a'];
  const token = localStorage.getItem('token');

  useEffect(() => {
    setOnLoading(true);
    getArticles(page)
      .then((res) => {
        setPosts(res.articles);
        setTotalPages(res.articlesCount - 5);
        setOnLoading(false);
      })
      .catch(() => setOnError(true));
  }, [page]);

  const getPostTags = (post) =>
    post.tagList.map((tagList, idx) => {
      if (!tagList) return null;
      return (
        <div key={post.slug + post.createdAt + idx} className="post-tag">
          {tagList}
        </div>
      );
    });

  const paginationHandler = (num) => {
    if (num === 1) {
      setPage(0);
    } else {
      setPage(num * 5);
    }
  };

  const likeArticleHandler = (post) => {
    if (post.favorited) {
      unLikeArticle(token, post.slug).then((res) =>
        setPosts((prevState) => {
          const actPost = res.article;
          const index = posts.findIndex((item) => item.slug === actPost.slug);
          return [...prevState.slice(0, index), actPost, ...prevState.slice(index + 1)];
        })
      );
    } else {
      likeArticle(token, post.slug).then((res) =>
        setPosts((prevState) => {
          const actPost = res.article;
          const index = posts.findIndex((item) => item.slug === actPost.slug);
          return [...prevState.slice(0, index), actPost, ...prevState.slice(index + 1)];
        })
      );
    }
  };

  return (
    <div className={startPage['blog-page']}>
      {onLoading ? (
        onError ? (
          <ErrorBlock />
        ) : (
          <Spinner />
        )
      ) : (
        posts.map((post) => (
          <div key={post.slug + post.createdAt} className={startPage.post}>
            <div className={startPage['post-header']}>
              <div className={startPage['post-header__info']}>
                <div className={startPage['post-header__wrapper']}>
                  <Link to={`/posts/:${post.slug}`}>
                    <h1>{post.title}</h1>
                  </Link>
                  <div className={startPage['post-header__likes']}>
                    <button type="button" onClick={() => likeArticleHandler(post)}>
                      {post.favorited ? <img src={myLike} /> : <img src={like} />}
                    </button>
                    <span style={{ color: post.favorited ? 'red' : 'gray' }}>{post.favoritesCount}</span>
                  </div>
                </div>
                <div className={startPage['post-tag-list']}>{getPostTags(post)}</div>
              </div>
              <div className={startPage['post-header__user']}>
                <div>
                  <h4>{post.author.username}</h4>
                  <p>{getDatePost(post)}</p>
                </div>
                <div>
                  <img
                    src={post.author.image ? post.author.image : avatar}
                    alt="user img"
                    onError={(e) =>
                      e.target.setAttribute('src', 'https://cdn-icons-png.flaticon.com/512/147/147144.png')
                    }
                  />
                </div>
              </div>
            </div>
            <div className={startPage['post-text']}>
              <ReactMarkdown disallowedElements={disallowed} children={post.body} />
            </div>
          </div>
        ))
      )}
      <div className={startPage.pagination}>
        <Pagination
          onChange={(num) => paginationHandler(num)}
          showSizeChanger={false}
          defaultCurrent={page}
          total={totalPages}
          pageSize={5}
        />
      </div>
    </div>
  );
}

export default StartPage;
