/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-return */
import appClass from './App.module.scss';
import Layout from '../layout/Layout';
import StartPage from '../pages/start-page/StartPage';
import SignUp from '../pages/sign-form/sign-up/SignUp';
import SignIn from '../pages/sign-form/sign-in/SignIn';
import EditProfile from '../pages/sign-form/edit-profile/EditProfile';
import CreateArticlePage from '../pages/article-form/create-article/CreateArticle';
import EditArticle from '../pages/article-form/edit-article/EditArticle';
import NotFoundPage from '../pages/not-found-page/NotFoundPage';
import { getUser } from '../../service/services';
import ViewPost, { singlePostLoader } from '../pages/view-post/ViewPost';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem('token')) return;
    dispatch(getUser());
  }, [dispatch]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<StartPage />} />
        <Route path="posts/:slug" element={<ViewPost />} loader={singlePostLoader} />
        <Route path="posts/:slug/edit-article" element={<EditArticle />} />
        <Route path="create-account" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="edit-profile" element={<EditProfile />} />

        <Route path="create-article" element={<CreateArticlePage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );
  return (
    <div className={appClass.app}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
