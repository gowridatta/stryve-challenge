import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    posts: [],
    comment: {
      postId: undefined,
      comments: []
    }
  },
  reducers: {
    add: (state, action) => {
      state.posts = action.payload
    },
    remove: (state, action) => {
      state.posts = state.posts.filter(p => p.id !== action.payload);
    },
    edit: (state, action) => {
      const post = state.posts.find(p => p.id === action.payload.id)
      if (post === undefined) {
        return;
      }

      post.title = action.payload.title;
      post.body = action.payload.body;
    },
    addComments: (state, action) => {
      state.comment.postId = state.posts.find(p => p.id === action.payload.postId).title
      state.comment.comments = action.payload.comments;
    }
  },
});

export const { add, remove, edit, addComments } = counterSlice.actions;

export const fetchPosts = () => async dispatch => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  if (res.status === 200) {
    dispatch(add(data))
  }
};

export const fetchComments = (id) => async dispatch => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
  const data = await res.json();
  if (res.status === 200) {
    dispatch(addComments({postId: id, comments: data}));
  }
};

export const editPost = (id, title, body) => dispatch => {
  dispatch(edit({id, title, body}));
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectPosts = state => state.counter.posts;
export const selectComments = state => state.counter.comment;

export default counterSlice.reducer;
