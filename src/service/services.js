/* eslint-disable consistent-return */
/* eslint-disable react-hooks/rules-of-hooks */
import { userRegistered, userName, userEmail, userAvatar } from '../redux/actions/actions';

const _baseURL = new URL('https://blog.kata.academy/api/');

export const registerUser = async (username, email, password) => {
  const URL_registerUser = new URL('users', _baseURL);
  const res = await fetch(URL_registerUser, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      user: {
        username,
        email,
        password,
      },
    }),
  });
  const result = await res.json();
  return result;
};

export const logInUser = async (email, password) => {
  const URL_logInUser = new URL('users/login', _baseURL);
  const res = await fetch(URL_logInUser, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      user: {
        email,
        password,
      },
    }),
  });
  const result = await res.json();
  return result;
};

export const getUser = () => (dispatch) => {
  const URL_getUser = new URL('user', _baseURL);
  fetch(URL_getUser, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${localStorage.getItem('token')}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      const { username, email, image } = res.user;

      dispatch(userName({ username }));
      dispatch(userEmail({ email }));
      dispatch(userAvatar({ image }));
      dispatch(userRegistered);
    });
};

export const getArticles = async (page) => {
  const URL_getArticles = new URL('articles', _baseURL);
  URL_getArticles.searchParams.set('limit', 5);
  URL_getArticles.searchParams.set('offset', page);
  const res = await fetch(URL_getArticles, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${localStorage.getItem('token')}`,
    },
  });
  const result = await res.json();
  return result;
};

export const likeArticle = async (token, slug) => {
  const res = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
  });
  const result = await res.json();
  return result;
};

export const unLikeArticle = async (token, slug) => {
  const res = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
  });
  const result = await res.json();
  return result;
};

// export const getSinglArticles = async (slug) => {
//   const res = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`);
//   const result = await res.json();
//   return result;
// };

export const updateUserInfo = async (token, email, password, username, image) => {
  const res = await fetch('https://blog.kata.academy/api/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      user: {
        email,
        password,
        username,
        image,
      },
    }),
  });
  const result = await res.json();
  return result;
};

export const createArticle = async (title, description, body, tagList, token) => {
  const res = await fetch('https://blog.kata.academy/api/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      article: {
        title,
        description,
        body,
        tagList,
      },
    }),
  });
  const result = await res.json();
  return result;
};

export const updateArticle = async (title, description, body, tagList, token, slug) => {
  const res = await fetch(`https://blog.kata.academy/api/articles/${slug.slice(1)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      article: {
        title,
        description,
        body,
        tagList,
      },
    }),
  });
  const result = await res.json();
  return result;
};

export const getArticle = async (slug) => {
  const res = await fetch(`https://blog.kata.academy/api/articles/${slug.slice(1)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${localStorage.getItem('token')}`,
    },
  });
  const result = await res.json();
  return result;
};

export const deleteArticle = async (token, slug) => {
  const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
  });
  return res;
};
