import * as postAPI from '../api/posts'; // api/posts
import * as postsAPI from '../api/posts'; // api/posts 안의 함수 모두 불러오기
import { createPromiseThunk, reducerUtils } from '../lib/asyncUtils';

/* 액션 타입 */

// 포스트 여러개 조회하기
const GET_POSTS = 'GET_POSTS'; // 요청 시작
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'; // 요청 성공
const GET_POSTS_ERROR = 'GET_POSTS_ERROR'; // 요청 실패

// 포스트 하나 조회하기
const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

// 중복되는 부분 있어서 createPromiseThunk함수로 묶음!
// export const getPosts = () => async (dispatch) => {
//   dispatch({ type: GET_POSTS }); // 요청이 시작됨
//   try {
//     const posts = await postsAPI.getPosts(); // API 호출
//     dispatch({ type: GET_POSTS_SUCCESS, posts }); // 성공
//   } catch (e) {
//     dispatch({ type: GET_POSTS_ERROR, error: e }); // 실패
//   }
// };
// // thunk 함수에서도 파라미터를 받아와서 사용 할 수 있습니다.
// export const getPost = (id) => async (dispatch) => {
//   dispatch({ type: GET_POST }); // 요청이 시작됨
//   try {
//     const post = await postsAPI.getPostById(id); // API 호출
//     dispatch({ type: GET_POST_SUCCESS, post }); // 성공
//   } catch (e) {
//     dispatch({ type: GET_POST_ERROR, error: e }); // 실패
//   }
// };

// 아주 쉽게 thunk 함수를 만들 수 있게 되었습니다. (중복되는 코드 createPromiseThunk로 함수로 묶음)
export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById);

//중복되는 코드 initial()로 묶음=
// const initialState = {
//   posts: {
//     loading: false,
//     data: null,
//     error: null,
//   },
//   post: {
//     loading: false,
//     data: null,
//     error: null,
//   },
// };

// initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링.
const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial(),
};

// 중복되는 부분 함수로 묶음
// export default function posts(state = initialState, action) {
//   switch (action.type) {
//     case GET_POSTS:
//       return {
//         ...state,
//         posts: {
//           loading: true,
//           data: null,
//           error: null,
//         },
//       };
//     case GET_POSTS_SUCCESS:
//       return {
//         ...state,
//         posts: {
//           loading: true,
//           data: action.posts,
//           error: null,
//         },
//       };
//     case GET_POSTS_ERROR:
//       return {
//         ...state,
//         posts: {
//           loading: true,
//           data: null,
//           error: action.error,
//         },
//       };
//     case GET_POST:
//       return {
//         ...state,
//         post: {
//           loading: true,
//           data: null,
//           error: null,
//         },
//       };
//     case GET_POST_SUCCESS:
//       return {
//         ...state,
//         post: {
//           loading: true,
//           data: action.post,
//           error: null,
//         },
//       };
//     case GET_POST_ERROR:
//       return {
//         ...state,
//         post: {
//           loading: true,
//           data: null,
//           error: action.error,
//         },
//       };
//     default:
//       return state;
//   }
// }

// reducerUtils로 함수화함. (리팩토링)
export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: reducerUtils.loading(),
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: reducerUtils.success(action.payload), // action.posts -> action.payload 로 변경됐습니다.
      };
    case GET_POSTS_ERROR:
      return {
        ...state,
        posts: reducerUtils.error(action.error),
      };
    case GET_POST:
      return {
        ...state,
        post: reducerUtils.loading(),
      };
    case GET_POST_SUCCESS:
      return {
        ...state,
        post: reducerUtils.success(action.payload), // action.post -> action.payload 로 변경됐습니다.
      };
    case GET_POST_ERROR:
      return {
        ...state,
        post: reducerUtils.error(action.error),
      };
    default:
      return state;
  }
}
