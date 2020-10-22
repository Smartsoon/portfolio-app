import {gql} from "@apollo/client";

const forumMutations = {
    CREATE_TOPIC: gql`
        mutation createTopic (
            $title: String!
            $content: String!
            $forumCategory: String
        ) {
            createTopic(input:{
                title: $title
                content: $content
                forumCategory: $forumCategory
            }) {
                _id
                title
                content
                slug
                user {
                    username
                    avatar
                }
                forumCategory {
                    _id
                    slug
                    title
                }
                createdAt
            }
        }
    `,

    CREATE_POST: gql`
        mutation CreatePost (
            $content: String
            $topic: String
            $parent: String
        ) {
            createPost(input:{
                content: $content
                topic: $topic
                parent: $parent
            }) {
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
            }
        }
    `,
};

export default forumMutations;
