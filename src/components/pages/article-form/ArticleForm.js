/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unescaped-entities */
import articleFormClass from './ArticleForm.module.scss';
import { createArticle, getArticle, updateArticle } from '../../../service/services';
import Error from '../../error/Error';
import Successfully from '../../successfully/Successfully';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import { useParams, Navigate } from 'react-router-dom';

function ArticleForm({ flag }) {
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [text, setText] = useState('');
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(false);
  const [statusArticle, setStatusArticle] = useState(false);

  const { slug } = useParams();

  // const isLogin = useSelector((state) => state.isLogin);
  const token = useSelector((state) => state.userData.token);

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (flag === 'editArtic') {
      getArticle(slug, token).then((res) => {
        setTitle(res.article.title);
        setDesc(res.article.description);
        setText(res.article.body);
        const obj = res.article.tagList.map((el) => ({ name: el }));
        setTags(obj);
      });
    }
  }, [flag, slug]);

  useEffect(() => {
    setStatusArticle(false);
    setError(false);
    setValue('title', title);
    setValue('desc', description);
    setValue('text', text);
    setValue('tags', [...tags]);
  }, [text, description, tags, title, setValue]);

  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
  });

  if (!token) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = (reg) => {
    const arrTags = reg.tags.map((el) => el.name);
    if (flag === 'createArtic') {
      createArticle(reg.title, reg.desc, reg.text, arrTags, token).then((res) => {
        if (res.errors) {
          setError(true);
        }
        setStatusArticle(true);
      });
    }
    if (flag === 'editArtic') {
      updateArticle(reg.title, reg.desc, reg.text, arrTags, token, slug).then((res) => {
        if (res.errors) {
          setError(true);
        }
        setStatusArticle(true);
      });
    }
  };

  return (
    <>
      {error ? <Error setError={setError} /> : null}
      {statusArticle ? <Successfully setStatusArticle={setStatusArticle} flag={flag} /> : null}
      <form className={articleFormClass['create-article-form']} onSubmit={handleSubmit(onSubmit)}>
        <div className={articleFormClass['title-block']}>
          <label htmlFor="title">
            Title
            <input
              className={articleFormClass['title-input']}
              {...register('title', {
                required: 'Поле обязательно к заполнению!',
                minLength: {
                  value: 3,
                  message: 'Минимум 3 символа!',
                },
                maxLength: {
                  value: 60,
                  message: 'Максимум 60 символов',
                },
              })}
              name="title"
              placeholder="Title"
              type="text"
            />
          </label>
          <div className={articleFormClass['error-form']}>
            {errors?.title && <p>{errors?.title?.message || 'Error!'} </p>}
          </div>
        </div>

        <div className={articleFormClass['desc-block']}>
          <label htmlFor="desc">
            Short description
            <input
              className={articleFormClass['desc-input']}
              {...register('desc', {
                required: 'Поле обязательно к заполнению!',
                minLength: {
                  value: 6,
                  message: 'Минимум 6 символов!',
                },
              })}
              placeholder="Description"
              type="text"
            />
          </label>
          <div className={articleFormClass['error-form']}>
            {errors?.desc && <p>{errors?.desc?.message || 'Error!'} </p>}
          </div>
        </div>

        <div className={articleFormClass['text-block']}>
          <label htmlFor="text">
            Text
            <textarea
              className={articleFormClass['text-input']}
              {...register('text', {
                required: 'Поле обязательно к заполнению!',
                minLength: {
                  value: 6,
                  message: 'Минимум 6 символов!',
                },
              })}
              placeholder="Text"
            />
          </label>
          <div className={articleFormClass['error-form']}>
            {errors?.text && <p>{errors?.text?.message || 'Error!'} </p>}
          </div>
        </div>

        <div className={articleFormClass['create-tags-block']}>
          <h4 className={articleFormClass['header-tags']}>Tags</h4>

          <div className={articleFormClass['tags-container']}>
            {fields.map((field, index) => (
              <section key={field.id}>
                <label>
                  <input {...register(`tags.${index}.name`)} className={articleFormClass['tag-input']} />
                </label>
                <button className={articleFormClass['delete-tag']} type="button" onClick={() => remove(index)}>
                  Delete
                </button>
              </section>
            ))}
            <button
              className={articleFormClass['add-tag']}
              type="button"
              onClick={() => {
                append({});
              }}
            >
              Add tag
            </button>
          </div>
        </div>
        <input type="submit" value="Send" className={articleFormClass.send} />
      </form>
    </>
  );
}

export default ArticleForm;
