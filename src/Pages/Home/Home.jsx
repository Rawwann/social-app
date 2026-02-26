import React from 'react'
import PostListing from '../../Components/Posts/PostListing'
import CreatePostForm from '../../Components/Posts/CreatePostForm'
import { Helmet } from "react-helmet";

export default function Home() {
    return (
        <>
            <div>
                <Helmet>
                    <title>Home - Kudo Posts</title>
                    <meta name="description" content="Welcome to your news feed on Kudo Posts" />
                </Helmet>
                <CreatePostForm queryKey="all-posts" />
                <PostListing />
            </div>
        </>
    )
}
