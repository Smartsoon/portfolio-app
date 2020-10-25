import {gql} from "@apollo/client";


const topicResponse = `
                _id
                title
                content
                forumCategory {
                    _id
                    slug
                    title
                }
                user {
                    username
                    avatar
                }
                slug
                createdAt
`;

const postResponse = `
    _id
    content
    slug
    createdAt
    topic {
        slug
    }
    user {
        username
        avatar
    }
    parent {
         _id
        content
        slug
        user {
            avatar
            username
        }
    }
`;

const forumQueries = {
    GET_FORUM_CATEGORIES: gql`
        query ForumCategories {
            forumCategories {
                _id
                title
                subTitle
                slug
                createdAt
            }
        }
    `,

    GET_TOPICS_BY_CATEGORY: gql`
        query TopicsByCategory($category: String) {
            topicsByCategory(category: $category){
                ${topicResponse}
            }
        }
    `,

    GET_TOPIC_BY_SLUG: gql`
        query TopicBySlug($slug: String) {
            topicBySlug(slug: $slug){
                ${topicResponse}
            }
        }
    `,

    GET_POSTS_BY_TOPIC: gql`
        query PostsByTopic($slug: String, $pageNum: Int, $pageSize: Int) {
            postsByTopic(
                slug: $slug
                pageNum: $pageNum
                pageSize: $pageSize
            ) {
                posts {
                    ${postResponse}
                }
                count
            }
        }
    `
};

export default forumQueries;
