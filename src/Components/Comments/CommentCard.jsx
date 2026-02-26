import React from 'react'
import { Card, CardBody, Divider } from '@heroui/react'
import AppCardHeader from '../Shared/AppCardHeader/AppCardHeader';

export default function CommentCard({ comment }) {

    return (
        <Card fullWidth={true}>
            <AppCardHeader
                user={{ ...comment.commentCreator, createdAt: comment.createdAt }}
            />
            <Divider />
            <CardBody>
                <p>{comment.content}</p>
            </CardBody>
        </Card>
    )
}