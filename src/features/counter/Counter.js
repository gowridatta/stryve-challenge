import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {editPost, fetchComments, fetchPosts, remove, selectComments, selectPosts} from "./counterSlice";

export function Counter() {
    const posts = useSelector(selectPosts);
    const comment = useSelector(selectComments);
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [commentsPage, setCommentsPage] = useState(0);
    const [editing, setEditing] = useState(undefined);

    useEffect(() => {
        dispatch(fetchPosts())
    }, []);

    return (
        <div>
            <h1>Posts</h1>
            {page > 0 && <button onClick={() => setPage(page - 1)}> Back </button>}
            Current page: {page + 1}
            {(page + 1) * 10 < posts.length && <button onClick={() => setPage(page + 1)}>Next</button>}
            <table>
                <tr>
                    <td>Delete</td>
                    <td></td>
                    <td>Title</td>
                    <td>Body</td>
                </tr>
                {posts.slice(page * 10, (page + 1) * 10).map(p => (
                    <tr>
                        <td>
                            <button
                                aria-label="Remove"
                                onClick={() => dispatch(remove(p.id))}
                            >
                                x
                            </button>
                        </td>
                        <td><button onClick={() => dispatch(fetchComments(p.id))}>Comments</button> </td>
                        {editing === p.id ? <>
                            <td><input placeholder={"Title"} value={p.title} onChange={e => dispatch(editPost(p.id, e.target.value, p.body))}/></td>
                            <td><input placeholder={"Body"} value={p.body} onChange={e => dispatch(editPost(p.id, p.title, e.target.value))}/></td>
                            <td>
                                <button onClick={() => setEditing(undefined)}>Done</button>
                            </td>
                        </> : <>
                            <td>{p.title}</td>
                            <td>{p.body}</td>
                            <td>
                                {editing === undefined && <button onClick={() => setEditing(p.id)}>Edit</button>}
                            </td>
                        </>
                        }
                    </tr>
                ))}
            </table>
            {comment.postId !== undefined &&
                <>
                <h1>Comments for post {comment.postId}</h1>
                    {commentsPage > 0 && <button onClick={() => setCommentsPage(commentsPage - 1)}> Back </button>}
                    Current commentsPage: {commentsPage + 1}
                    {(commentsPage + 1) * 10 < comment.comments.length && <button onClick={() => setCommentsPage(commentsPage + 1)}>Next</button>}
                    <table>
                    {comment.comments.slice(commentsPage * 10, (commentsPage + 1) * 10).map(c => <tr>
                        <td>{c.name}</td>
                        <td>{c.email}</td>
                        <td>{c.body}</td>
                    </tr>)}
                </table>
                </>
            }
        </div>
    );
}
