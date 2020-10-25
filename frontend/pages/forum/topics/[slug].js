import React, {useState, useRef, useEffect} from 'react';
import {useRouter} from 'next/router'
import BaseLayout from "../../../layouts/baseLayout";
import {useGetPostsByTopic, useGetTopicBySlug, useGetUser, useCreatePost} from "../../../apollo/actions";
import Spinner from "react-bootstrap/Spinner";
import withApollo from "../../../hoc/withApollo";
import {getDataFromTree} from "@apollo/client/react/ssr";
import PostItem from "../../../components/forum/postItem";
import Replier from "../../../components/shared/replier";
import {toast} from "react-toastify";
import AppPagination from "../../../components/shared/pagination";

const useInitialData = (slug, pagination) => {
    const {data, loading} = useGetTopicBySlug({variables: {slug}});
    const topic = data && data.topicBySlug || {};
    const {data: topicsFromServer, loading: {postsLoading}, fetchMore} = useGetPostsByTopic({
        variables: {slug, ...pagination},
        pollInterval: 20000,
    });
    const postsData = (topicsFromServer && topicsFromServer.postsByTopic) || {posts: [], count: 0};
    const {data: {user} = {}} = useGetUser();
    const isAuthUser = !!user;
    const {posts, count} = postsData;

    return {topic, loading, posts, count, postsLoading, fetchMore, isAuthUser}
};


const Posts = () => {
    const router = useRouter();
    const {slug, pageNum, pageSize} = router.query;

    const [pagination, setPagination] = useState({pageNum: 1, pageSize: 10});
    const {topic, loading, posts, count, postsLoading, fetchMore, isAuthUser} = useInitialData(slug, pagination);

    useEffect(() => {
        if (router.query.pageNum !== undefined && router.query.pageSize !== undefined) {
            setPagination({pageNum: parseInt(pageNum, 10), pageSize: parseInt(pageSize, 10)})
        }
    }, [pageSize, pageNum]);


    if ( loading || postsLoading || !posts || !topic || typeof window === 'undefined') {
        return (
            <BaseLayout>
                <Spinner className="spinner" size="lg" animation="border" variant="danger"/>
            </BaseLayout>
        )
    }

    return (
        <BaseLayout>
            <div>
                <div className="container">
                    <section className="section-title">
                        <div className="px-2">
                            <div className="pt-5 pb-4">
                                <h1>{topic.title}</h1>
                            </div>
                        </div>
                    </section>
                    <PostList pagination={pagination}
                              onPageChange={(pageNum, pageSize) => {
                                  router.push('/forum/topics/[slug]', `/forum/topics/${slug}?pageNum=${pageNum}&pageSize=${pageSize}`, {shallow: true});

                                  // router.push({
                                  //     pathname: '/forum/topics/[slug]',
                                  //     query: {
                                  //         pageNum,
                                  //         pageSize
                                  //     }
                                  // },
                                  //     `/forum/topics/${slug}`, {shallow: true});

                                  setPagination({pageNum, pageSize}
                                  )
                              }}
                              fetchMore={fetchMore}
                              isAuthUser={isAuthUser}
                              posts={posts}
                              count={count}
                              topic={topic}
                              router={router}
                              slug={slug}
                              setPagination={setPagination}
                    />
                </div>
            </div>
        </BaseLayout>
    )
};

const PostList = ({topic, isAuthUser, fetchMore, posts, count, pagination, onPageChange, router, slug, setPagination}) => {
    const pageEnd = useRef();
    const {pageSize, pageNum} = pagination;
    const [createPost, {error}] = useCreatePost();
    const [isAlreadyShown, setIsAlreadyShown] = useState(false);
    const [replyTo, setReplyTo] = useState(null);
    const [isReplyOpen, setIsReplyOpen] = useState(false);

    let lastPage = Math.ceil(count / pageSize);

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

        if (count === 0) { lastPage = 1 }
        lastPage === pageNum && await fetchMore({
            variables: {pageSize, pageNum: lastPage},
            updateQuery: (previousResult, {fetchMoreResult}) => {
                return Object.assign({}, previousResult, {
                    postsByTopic: {...fetchMoreResult.postsByTopic}
                })
            }
        });
        await cleanUpPost();
        done();

    };

    const cleanUpPost = async () => {
        await setIsReplyOpen(false);
        await setPagination({pageNum: lastPage, pageSize: pageSize});
        await router.push('/forum/topics/[slug]', `/forum/topics/${slug}?pageNum=${lastPage}&pageSize=${pageSize}`, {shallow: true});
        await scrollToBottom();
        toast.success('Post has been created!', {autoClose: 3000});
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
            <div onClick={onBlurReplyerClose} className="d-flex pt-4 justify-content-center">
                <div className="d-inline-block pb-4"
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

            <div className="d-flex pb-5 justify-content-center">
                <AppPagination pageSize={pagination.pageSize} pageNum={pagination.pageNum} onChange={onPageChange}
                               count={count}/>
            </div>

            <Replier hasTitle={false} replyTo={(replyTo && replyTo.user.username) || topic.title}
                     onSubmit={handleCreatePost} isOpen={isReplyOpen}
                     setIsReplyOpen={setIsReplyOpen}/>
        </section>
    )
};

export default withApollo(Posts, {getDataFromTree});
