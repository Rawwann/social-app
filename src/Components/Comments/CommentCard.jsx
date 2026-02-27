import React from 'react'
import { Card, CardBody, Divider } from '@heroui/react'
import AppCardHeader from '../Shared/AppCardHeader/AppCardHeader';


export default function CommentCard({ comment, postId }) {
    return (
        <Card fullWidth={true}>
            <AppCardHeader
                user={{ ...comment.commentCreator, createdAt: comment.createdAt }}
                isPost={false}
                itemId={comment?._id}
                postId={postId}
                queryKey={['post-comments', postId]} />
            <Divider />
            <CardBody>
                <p>{comment.content}</p>
            </CardBody>
        </Card>
    )
}