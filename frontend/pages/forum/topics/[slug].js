import React, {useState, useRef} from 'react';
import {useRouter} from 'next/router'
import BaseLayout from "../../../layouts/baseLayout";
import {useGetPostsByTopic, useGetTopicBySlug, useGetUser, useCreatePost} from "../../../apollo/actions";
import Spinner from "react-bootstrap/Spinner";
import withApollo from "../../../hoc/withApollo";
import {getDataFromTree} from "@apollo/client/react/ssr";
import PostItem from "../../../components/forum/postItem";
import Replier from "../../../components/shared/replier";
import {toast} from "react-toastify";

const Posts = () => {
    const router = useRouter();
    const {slug} = router.query;


    const {data, loading} = useGetTopicBySlug({variables: {slug}});
    const topic = data && data.topicBySlug || [];
    const {data: topicsFromServer, loading: {postsLoading}} = useGetPostsByTopic({variables: {slug}});
    const posts = topicsFromServer && topicsFromServer.postsByTopic || [];
    const {data: {user} = {}} = useGetUser();
    const isAuthUser = !!user;





    if (loading || postsLoading || !posts || !topic || typeof window === 'undefined') {
        return (
            <BaseLayout>
                <Spinner className="spinner" size="lg" animation="border" variant="danger"/>
            </BaseLayout>
        )
    }

    return (
        <BaseLayout>
            <div >
                <div className="container">
                    <section className="section-title">
                        <div className="px-2">
                            <div className="pt-5 pb-4">
                                <h1>{topic.title}</h1>
                            </div>
                        </div>
                    </section>
                    <PostList isAuthUser={isAuthUser} posts={posts} topic={topic}/>
                </div>
            </div>
        </BaseLayout>
    )
};

const PostList = ({topic, posts, isAuthUser}) => {
    const pageEnd = useRef();

    const [createPost, { error }] = useCreatePost();
    const [isAlreadyShown, setIsAlreadyShown] = useState(false);
    const [replyTo, setReplyTo] = useState(null);
    const [isReplyOpen, setIsReplyOpen] = useState(false);
    const onBlurReplyerClose = () => {
        if (isReplyOpen) {
            setIsReplyOpen(false)
        }
    };

    const scrollToBottom = () => pageEnd.current.scrollIntoView({behavior: 'smooth'});

    const handleCreatePost = async (reply, done) => {
        if (replyTo) {
            reply.parent = replyTo._id
        }

        reply.topic = topic._id;
        await createPost({variables: reply});
        done();
        setIsReplyOpen(false);
        toast.success('Post has been created!', {autoClose: 3000});
        scrollToBottom()
    };



    const getToast = () => {
        if (!isAuthUser) {
            return toast.info("You have to be authorized to create a post", {autoClose: 3000})
        }
    };

    const getToastOneTime = () => {
        if (!isAlreadyShown) {
            getToast();
            setIsAlreadyShown(true)
        }
    };



 return (
     <section>
         <div onClick={onBlurReplyerClose} className="fj-post-list">
             {
                 topic._id && <PostItem
                     className="topic-post-lead"
                     post={topic}/>
             }
             {
                 posts.map(post =>
                     <div key={post._id} className="row">
                         <div className="col-md-9">
                             <PostItem isAuthUser={isAuthUser}
                                       onReply={(reply) => {
                                           setReplyTo(reply);
                                        }}
                                       isReplyOpen={isReplyOpen}
                                       setIsReplyOpen={setIsReplyOpen}
                                       post={post}/>
                         </div>
                     </div>
                 )
             }

         </div>
         <div ref={pageEnd}></div>
         <div onClick={onBlurReplyerClose} className="d-flex justify-content-center">
             <div className="d-inline-block pt-4 pb-5"
                  onMouseOver={getToastOneTime}>
                 <button
                     disabled={!isAuthUser || isReplyOpen}
                     className="btn btn-lg btn-outline-primary mb-2"
                     onClick={() => {
                         setReplyTo(null);
                         setIsReplyOpen(true)
                     }}>
                     Create New Post
                 </button>
                 {!isAuthUser && <i className="ml-2">Please log in to create topic</i>}
             </div>

         </div>

         <Replier hasTitle={false} replyTo={(replyTo && replyTo.user.username) || topic.title} onSubmit={handleCreatePost} isOpen={isReplyOpen}
                  setIsReplyOpen={setIsReplyOpen}/>
     </section>
 )
};


export default withApollo(Posts, {getDataFromTree});