/* eslint-disable consistent-return */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-children-prop */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import viewPostClass from './ViewPost.module.scss';
import Spinner from '../../spiner/spiner';
import like from '../../../img/like.svg';
import myLike from '../../../img/myLike.svg';
import { unLikeArticle, likeArticle, deleteArticle } from '../../../service/services';
import { getDatePost } from '../../../utilities/getDatePost';
import { Suspense, useState, useEffect } from 'react';
import { Await, defer, Link, useLoaderData, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { Modal } from 'antd';

const { confirm } = Modal;

function ViewPost() {
  const userName = useSelector((state) => state.userData.username);
  const token = useSelector((state) => state.userData.token);
  const { post } = useLoaderData();
  const navigate = useNavigate();

  const [isPostFavorited, setPostFavorited] = useState();
  const [favoritesCount, setFavoritesCount] = useState();

  const showPromiseConfirm = (pos) => {
    confirm({
      title: 'Are you sure to delete this article??',
      content: 'Really?',
      onOk() {
        return new Promise((resolve, reject) => {
          deleteArticle(token, pos.slug).then((res) => {
            res.ok ? resolve() : reject();
            return navigate('/');
          });
        }).catch((e) => console.log(e));
      },
      onCancel() {},
    });
  };

  const getPostTags = (pos) =>
    pos.tagList.map((tagList) => {
      if (!tagList) return null;

      return (
        <div key={pos.createdAt + tagList} className={viewPostClass['post-tag']}>
          {tagList}
        </div>
      );
    });

  const likeArticleHandler = (pos) => {
    if (isPostFavorited) {
      unLikeArticle(token, pos.slug)
        .then((res) => {
          setPostFavorited(false);
          setFavoritesCount(res.article.favoritesCount);
        })
        .catch((e) => {
          console.log(e);
          alert('Что-то пошло не так попробуйте снова.');
        });
    } else {
      likeArticle(token, pos.slug)
        .then((res) => {
          setPostFavorited(true);
          setFavoritesCount(res.article.favoritesCount);
        })
        .catch((e) => {
          console.log(e);
          alert('Что-то пошло не так попробуйте снова.');
        });
    }
  };

  useEffect(() => {
    if (!token) {
      return navigate('/sign-in');
    }
    post.then((pos) => {
      setPostFavorited(pos.article.favorited);
      setFavoritesCount(pos.article.favoritesCount);
    });
  }, [token, navigate, post]);

  return (
    <div className={viewPostClass['single-blog-page']}>
      <Suspense fallback={<Spinner />}>
        <Await resolve={post}>
          {(resolvedPost) => (
            <div className={viewPostClass.post}>
              <div className={viewPostClass['post-header']}>
                <div className={viewPostClass['post-header__info']}>
                  <div className={viewPostClass['post-header__wrapper']}>
                    <h1>{resolvedPost.article.title}</h1>
                    <div className={viewPostClass['post-header__likes']}>
                      <button type="button" onClick={() => likeArticleHandler(resolvedPost.article)}>
                        {isPostFavorited ? <img src={myLike} /> : <img src={like} />}
                      </button>
                      <span style={{ color: isPostFavorited ? 'red' : 'gray' }}>{favoritesCount}</span>
                    </div>
                  </div>

                  <div className={viewPostClass['post-tag-list']}>{getPostTags(resolvedPost.article)}</div>
                </div>
                <div className={viewPostClass['post-header_user_info']}>
                  <div className={viewPostClass['post-header_user']}>
                    <div>
                      <h4 className={viewPostClass['post-header_user_name']}>{resolvedPost.article.author.username}</h4>
                      <p className={viewPostClass['post-header_user_craeteArt']}>{getDatePost(resolvedPost.article)}</p>
                    </div>
                    <div>
                      <img
                        src={resolvedPost.article.author.image}
                        alt="user img"
                        onError={(e) =>
                          e.target.setAttribute('src', 'https://static.productionready.io/images/smiley-cyrus.jpg')
                        }
                      />
                    </div>
                  </div>
                  {token && resolvedPost.article.author.username === userName ? (
                    <div>
                      <button
                        type="button"
                        className={viewPostClass['delete-btn']}
                        onClick={() => showPromiseConfirm(resolvedPost.article)}
                      >
                        Delete
                      </button>

                      <Link to="edit-article">
                        <button type="button" className={viewPostClass['edit-btn']}>
                          Edit
                        </button>
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className={viewPostClass['post-description']}>
                <ReactMarkdown children={resolvedPost.article.description} />
              </div>
              <div className={viewPostClass['post-text']}>
                <ReactMarkdown children={resolvedPost.article.body} />
              </div>
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  );
}

export default ViewPost;

async function getSinglePost(params) {
  const res = await fetch(`https://blog.kata.academy/api/articles/${params.slice(1)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${localStorage.getItem('token')}`,
    },
  });
  return res.json();
}

export const singlePostLoader = async ({ params }) =>
  defer({
    post: getSinglePost(params.slug),
  });
