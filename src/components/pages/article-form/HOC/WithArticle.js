// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable import/prefer-default-export */
// /* eslint-disable consistent-return */
// /* eslint-disable quotes */
// import { createArticle, updateArticle } from '../../../../service/services';
// import { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// export const WithArticle = (Component) => {
//   function ArticleBase() {
//     const isLogin = useSelector((state) => state.isLogin);
//     const navigate = useNavigate();
//     const { slug } = useParams();
//     const token = localStorage.getItem('token');
//     console.log(slug);

//     useEffect(() => {
//       if (!slug) return;
//       if (slug && isLogin) {
//         return navigate('/sign-in');
//       }
//       fetch(`https://blog.kata.academy/api/articles/${slug.slice(1)}`)
//         .then((res) => res.json())
//         .then((post) => {
//           const { article } = post;
//           setTitle(article.title);
//           setDesc(article.description);
//           setText(article.body);
//           setTagList(article.tagList);
//         });
//     }, [slug]);

//     const [title, setTitle] = useState('');
//     const [desc, setDesc] = useState('');
//     const [text, setText] = useState('');
//     const [tagList, setTagList] = useState([]);

//     const [titleDirty, setTitleDirty] = useState(false);
//     const [descDirty, setDescDirty] = useState(false);
//     const [textDirty, setTextDirty] = useState(false);

//     const [titleError, setTitleError] = useState("Title shouldn't be empty");
//     const [descError, setDescError] = useState("Description shouldn't be empty");
//     const [textError, setTextError] = useState("Text shouldn't be empty");

//     const [tagError, setTagError] = useState(false);
//     console.log(tagList);
//     const blurHandler = (e) => {
//       switch (e.target.name) {
//         case 'title':
//           setTitleDirty(true);
//           break;
//         case 'desc':
//           setDescDirty(true);
//           break;
//         case 'text':
//           setTextDirty(true);
//           break;
//         default:
//       }
//     };

//     const onTitleChange = (e) => {
//       setTitle(e.target.value);
//       if (!e.target.value) {
//         setTitleError("Title shouldn't be empty");
//       } else {
//         setTitleError('');
//       }
//     };

//     const onDescChange = (e) => {
//       setDesc(e.target.value);
//       if (!e.target.value) {
//         setDescError("Description shouldn't be empty");
//       } else {
//         setDescError('');
//       }
//     };

//     const onTextChange = (e) => {
//       setText(e.target.value);
//       if (!e.target.value) {
//         setTextError("Text shouldn't be empty");
//       } else {
//         setTextError('');
//       }
//     };

//     const onSubmitCreate = (e) => {
//       e.preventDefault();
//       if (tagList.includes('')) {
//         setTagError(true);
//       } else if (!title) {
//         setTitleError("Title shouldn't be empty");
//         setTitleDirty(true);
//       } else if (!desc) {
//         setDescError("Title shouldn't be empty");
//         setDescDirty(true);
//       } else if (!text) {
//         setTextError("Title shouldn't be empty");
//         setTextDirty(true);
//       } else {
//         setTagError(false);
//         createArticle(title, desc, text, tagList, token).then((res) => console.log(res));
//         return navigate('/');
//       }
//     };

//     const onSubmitEdit = (e) => {
//       e.preventDefault();
//       if (tagList.includes('')) {
//         setTagError(true);
//       } else {
//         setTagError(false);
//         updateArticle(title, desc, text, tagList, token, slug).then((res) => console.log(res));
//         return navigate('/');
//       }
//     };

//     const onChangeTagValue = (event, index) => {
//       const tempTagList = [...tagList];
//       tempTagList[index] = event.target.value;
//       setTagList(tempTagList);
//     };

//     const onDeleteTag = (index) => {
//       const tempTagList = [...tagList];
//       tempTagList.splice(index, 1);
//       setTagList(tempTagList);
//     };

//     const addTag = () => {
//       const tempTagList = [...tagList];
//       tempTagList.push('');
//       setTagList(tempTagList);
//     };

//     return (
//       <Component
//         addTag={addTag}
//         onDeleteTag={onDeleteTag}
//         onChangeTagValue={onChangeTagValue}
//         onSubmitCreate={onSubmitCreate}
//         onSubmitEdit={onSubmitEdit}
//         onTextChange={onTextChange}
//         onDescChange={onDescChange}
//         onTitleChange={onTitleChange}
//         blurHandler={blurHandler}
//         title={title}
//         desc={desc}
//         text={text}
//         tagList={tagList}
//         titleDirty={titleDirty}
//         descDirty={descDirty}
//         textDirty={textDirty}
//         titleError={titleError}
//         descError={descError}
//         textError={textError}
//         tagError={tagError}
//         // isUserLoggedIn={isUserL}
//       />
//     );
//   }

//   return ArticleBase;
// };

// // export default WithArticle;
