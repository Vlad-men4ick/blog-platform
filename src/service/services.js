import { userRegistered, userData } from '../redux/actions/actions';

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
      Authorization: `Token ${sessionStorage.getItem('token')}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      dispatch(userData(res.user));
      // const { username, email, image } = res.user;

      // dispatch(userName({ username }));
      // dispatch(userEmail({ email }));
      // dispatch(userAvatar({ image }));
      dispatch(userRegistered);
    });
};

export const getArticles = async (page, token) => {
  const URL_getArticles = new URL('articles', _baseURL);
  URL_getArticles.searchParams.set('limit', 5);
  URL_getArticles.searchParams.set('offset', page);
  const res = await fetch(URL_getArticles, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
  });
  const result = await res.json();
  return result;
};

export const likeArticle = async (token, slug) => {
  const URL_likeArticle = new URL(`articles/${slug}/favorite`, _baseURL);
  const res = await fetch(URL_likeArticle, {
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
  const URL_unLikeArticle = new URL(`articles/${slug}/favorite`, _baseURL);
  const res = await fetch(URL_unLikeArticle, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
  });
  const result = await res.json();
  return result;
};

export const updateUserInfo = async (token, email, password, username, image) => {
  const URL_updateUserInfo = new URL('user', _baseURL);
  const res = await fetch(URL_updateUserInfo, {
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
  const URL_createArticle = new URL('articles', _baseURL);
  const res = await fetch(URL_createArticle, {
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
  const URL_updateArticle = new URL(`articles/${slug.slice(1)}`, _baseURL);
  const res = await fetch(URL_updateArticle, {
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

export const getArticle = async (slug, token) => {
  const URL_getArticle = new URL(`articles/${slug.slice(1)}`, _baseURL);
  const res = await fetch(URL_getArticle, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
  });
  const result = await res.json();
  return result;
};

export const deleteArticle = async (token, slug) => {
  const URL_getArticle = new URL(`articles/${slug}`, _baseURL);
  const res = await fetch(URL_getArticle, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
  });
  return res;
};
