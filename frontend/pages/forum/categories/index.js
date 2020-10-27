import React from 'react';
import BaseLayout from "../../../layouts/BaseLayout";
import {useGetForumCategories} from "../../../apollo/actions";
import Spinner from "react-bootstrap/Spinner";
import withApollo from "../../../hoc/withApollo";
import {getDataFromTree} from "@apollo/client/react/ssr";
import Link from "next/link";

const Categories = () => {
    const {data, loading, error} = useGetForumCategories();
    const categories = data && data.forumCategories || [];


    if (loading || !categories || typeof window === 'undefined') {
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
                                <h1>Categories</h1>
                            </div>
                        </div>
                    </section>
                    <section className="fj-category-list">
                        <div className="row">
                            {
                                categories.map(category =>
                                    <div key={category.slug} className="col-md-4">
                                        <div className="fj-category-container">
                                            <Link
                                                href="/forum/categories/[slug]"
                                                as={`/forum/categories/${category.slug}`}
                                            >
                                                <a className="fj-category subtle-shadow no-border">
                                                    <div className="category-information">
                                                        <div className="heading gray-90">
                                                            {category.title}
                                                        </div>
                                                        <div className="description">
                                                            {category.subTitle}
                                                        </div>
                                                    </div>
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </section>
                </div>
            </div>
        </BaseLayout>
    )
};

export default withApollo(Categories, {getDataFromTree});
