import React from 'react'
import { useParams } from 'react-router-dom'
import { getSinglePost, getPostComments } from '../../Services/posts.service'
import { useQuery } from '@tanstack/react-query'
import Loader from '../../Components/Shared/loader'
import PostCard from '../../Components/Posts/PostCard'
import { Alert } from '@heroui/react'

export default function PostDetails() {
    const { id } = useParams()

    const { data: post, isLoading: postLoading, isError: postError, error: postErrorMsg } = useQuery({
        queryKey: ['single-post', id],
        queryFn: () => getSinglePost(id),
        select: (res) => res.data.data.post
    })

    const { data: comments, isLoading: commentsLoading } = useQuery({
        queryKey: ['post-comments', id],
        queryFn: () => getPostComments(id),
        select: (res) => res.data.data.comments || [],
        enabled: !!id
    })

    if (postLoading || commentsLoading) return <Loader />
    if (postError) return <Alert color="danger" title={postErrorMsg.message} />
    if (!post) return null

    return (
        <section className="py-12">
            <div className='w-full max-w-100 md:max-w-1/2 mx-auto'>
                <PostCard
                    post={{ ...post, comments }}
                    isDetails={true}
                />
            </div>
        </section>
    )
}