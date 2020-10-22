import React, {useState} from 'react';
import {useRouter} from 'next/router'
import BaseLayout from "../../../layouts/baseLayout";
import {useGetForumTopicsByCategory, useGetUser, useCreateTopic} from "../../../apollo/actions";
import withApollo from "../../../hoc/withApollo";
import {getDataFromTree} from "@apollo/client/react/ssr";
import Spinner from "react-bootstrap/Spinner";
import Replier from "../../../components/shared/replier";
import {toast} from "react-toastify";

const useInitialData = () => {
    const {data: {user} = {}} = useGetUser();
    const isAuthUser = !!user;
    const router = useRouter();
    const {slug} = router.query;
    const {data, loading, error} = useGetForumTopicsByCategory({variables: {category: slug}});
    const topics = data && data.topicsByCategory || [];

    return {topics, slug, isAuthUser, loading, router}
};

const Topics = () => {
    const [isReplyOpen, setIsReplyOpen] = useState(false);
    const [isAlreadyShown, setIsAlreadyShown] = useState(false);
    const [createTopic] = useCreateTopic();

    const {topics, slug, isAuthUser, loading, router} = useInitialData();

    const getToast = () => {
        if (!isAuthUser) {
            return toast.info("You have to be authorized to create a topic", {autoClose: 3000})
        }
    };

    const getToastOneTime = () => {
        if (!isAlreadyShown) {
            getToast();
            setIsAlreadyShown(true)
        }
    };

    const handleCreateTopic = (data, done) => {
        if (!data.title.trim()) {
            return toast.warning('Title field is required', {autoClose: 3000})
        }

        if (!data.content.trim()) {
            return toast.warning('Content field is required', {autoClose: 3000})
        }
        data.forumCategory = slug;

        if (data.title.trim() && data.content.trim()) {
            createTopic({variables: data})
                .then(() => {
                    setIsReplyOpen(false);
                    done()
                });
        }
    };

    const onBlurReplyerClose = () => {
        if (isReplyOpen) {
            setIsReplyOpen(false)
        }
    };

    const goToTopic = slug => router.push('/forum/topics/[slug]', `/forum/topics/${slug}`);

    if (loading || !topics || typeof window === 'undefined') {
        return (
            <BaseLayout>
                <Spinner className="spinner" size="lg" animation="border" variant="danger"/>
            </BaseLayout>
        )
    }

    return (
        <BaseLayout>
            <div onClick={onBlurReplyerClose}>
                <div className="container">
                    <section className="section-title">
                        <div className="px-2">
                            <div className="pt-5 pb-4">
                                <h1>Specific Category</h1>
                            </div>
                        </div>
                        <div className="d-inline-block"
                             onMouseOver={getToastOneTime}>
                            <button
                                disabled={!isAuthUser || isReplyOpen}
                                className="btn btn-primary mb-2"
                                onClick={() => setIsReplyOpen(true)}>
                                Create topic
                            </button>
                        </div>
                        {!isAuthUser && <i className="ml-2">Please log in to create topic</i>}

                    </section>
                    <section className="fj-topic-list">
                        <table className="table table-hover ">
                            <thead>
                            <tr>
                                <th scope="col">Topic</th>
                                <th scope="col">Category</th>
                                <th scope="col">Author</th>
                                <th scope="col">Replies</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                topics.map(topic =>
                                    <tr key={topic._id} onClick={() => goToTopic(topic.slug)}>
                                        <th>{topic.title}</th>
                                        <td className="category">{topic.forumCategory.title}</td>
                                        <td>{topic.user.username}</td>
                                        <td>2</td>
                                    </tr>
                                )
                            }

                            </tbody>
                        </table>
                    </section>
                </div>
            </div>
            <Replier replyTo={false} onSubmit={handleCreateTopic} isOpen={isReplyOpen}
                     setIsReplyOpen={setIsReplyOpen}/>
        </BaseLayout>
    )
};

export default withApollo(Topics, {getDataFromTree});
