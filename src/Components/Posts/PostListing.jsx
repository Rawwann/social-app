import React, { useContext } from 'react'
import PostCard from './PostCard'
import { AuthContext } from '../../Context/AuthContext'
import Loader from '../Shared/loader';
import { Alert } from '@heroui/react';
import { useQuery } from '@tanstack/react-query'
import { getAllPosts } from '../../Services/posts.service';
import getUserPosts from '../../Services/profile.service';
import { useParams } from 'react-router-dom';


export default function PostListing({ isHome = true }) {
    const { userId: profileUserId } = useParams()
    const { userId: loggedInUserId } = useContext(AuthContext)
    const { userToken, userId } = useContext(AuthContext);

    const { data, isError, error, isLoading } = useQuery({
        queryKey: isHome ? ['all-posts'] : ['user-posts', profileUserId],
        queryFn: isHome ? getAllPosts : () => getUserPosts(profileUserId),
        select: (res) => res.data.data.posts,
        enabled: !!profileUserId || isHome
    });

    if (isLoading && !data) return <Loader />;
    if (error) return <Alert color="danger" title={`Error: ${error.message}`} />;

    return (
        <section className="py-12">
            <div className='w-full max-w-100 md:max-w-1/2 mx-auto space-y-4'>
                {data?.map((post) => (
                    <PostCard key={post._id} post={post} isDetails={false} />
                ))}
            </div>
        </section>
    )
}