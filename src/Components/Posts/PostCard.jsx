import React from 'react'
import { Button, Card, CardBody, CardFooter, Divider, Image } from "@heroui/react";
import { FaComment, FaShare, FaThumbsUp } from "react-icons/fa";
import CommentCard from '../Comments/CommentCard';
import AppCardHeader from '../Shared/AppCardHeader/AppCardHeader';
import { Link } from 'react-router-dom';
import CommentForm from '../Comments/CommentForm';

export default function PostCard({ post, isDetails = false }) {

    const commentsToDisplay = isDetails
        ? (post.comments || (post.topComment ? [post.topComment] : []))
        : (post.topComment ? [post.topComment] : []);


    return (
        <Card className="max-w-2xl mx-auto -mt-6 p-2 shadow-sm border border-default-200">
            <AppCardHeader
                user={{ ...post.user, createdAt: post.createdAt }}
                isPost={true}
                itemId={post._id}
                postId={post._id}
                postContent={post.body}
            />
            <Divider />
            <CardBody className="py-4">
                <p className="mb-4 text-gray-800">{post.body}</p>
                {post?.image && <Image alt={post.body} src={post.image} width={"100%"} className='object-cover rounded-xl' />}
            </CardBody>
            <Divider />
            <CardFooter className='flex justify-around py-2'>
                <button className='flex flex-col items-center gap-1 text-gray-600'><FaThumbsUp /> <span className="text-xs">Like</span></button>
                <button className='flex flex-col items-center gap-1 text-gray-600'><FaComment /> <span className="text-xs">Comment</span></button>
                <button className='flex flex-col items-center gap-1 text-gray-600'><FaShare /> <span className="text-xs">Share</span></button>
            </CardFooter>

            <div className="bg-gray-50/50 p-4 rounded-b-2xl space-y-4" >
                {commentsToDisplay.length > 0 ? (
                    commentsToDisplay.map((comment) => (
                        <CommentCard key={comment._id} comment={comment} postId={post._id} />
                    ))
                ) : (
                    isDetails && <p className="text-gray-400 text-sm text-center py-2">No comments found for this post.</p>
                )}

                {!isDetails && post.commentsCount > 0 && (
                    <Link to={`/post-details/${post._id}`} className="text-blue-600 font-semibold text-xs p-2 block text-center hover:underline">
                        View all {post.commentsCount} comments
                    </Link>
                )}

                <CommentForm
                    postId={post._id} queryKey={isDetails ? ['single-post', post._id] : ['all-posts']}
                />
            </div>
        </Card>
    );
}