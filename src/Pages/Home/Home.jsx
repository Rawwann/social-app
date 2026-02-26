import React from 'react'
import PostListing from '../../Components/Posts/PostListing'
import CreatePostForm from '../../Components/Posts/CreatePostForm'

export default function Home() {
    return (
        <>
            <CreatePostForm queryKey="all-posts" />
            <PostListing />
        </>
    )
}
