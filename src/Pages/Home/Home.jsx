import React from 'react'
import PostListing from '../../Components/Posts/PostListing'
import CreatePostForm from '../../Components/Posts/CreatePostForm'
import { HelmetProvider } from 'react-helmet-async';

export default function Home() {
    return (
        <>
            <div>
                <HelmetProvider>
                    <title>Kudo | Home</title>
                    <meta name="description" content="Kudo Posts Home Feed" />
                </HelmetProvider>
                <CreatePostForm queryKey="all-posts" />
                <PostListing />
            </div>
        </>
    )
}
