// delete and update comment
import { useState } from 'react';
import { Button, Input } from '@heroui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment, updateComment } from '../../Services/comments.service';


export default function CommentItem({ comment, queryKey, postId }) {
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);
    const [newContent, setNewContent] = useState(comment.content);
    const commentId = comment?._id;

    const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
        mutationFn: () => deleteComment(postId, commentId),
        onSuccess: () => {
            alert("Comment deleted!");
            queryClient.invalidateQueries({ queryKey });
        },
        onError: (error) => {
            alert("delete fail: " + error.message);
        }
    });

    const { mutate: updateMutate, isPending: isUpdating } = useMutation({
        mutationFn: () => {
            const formData = new FormData();
            formData.append('content', newContent);
            return updateComment(postId, commentId, formData);
        },
        onSuccess: () => {
            alert("Comment updated!");
            setIsEditing(false);
            queryClient.invalidateQueries({ queryKey });
        },
        onError: (error) => {
            alert("update fail: " + error.message);
        }
    });

    console.log("CommentItem received comment:", comment);
    console.log("deleteComment function imported:", deleteComment);
    console.log("updateComment function imported:", updateComment);
    console.log("deleteComment source:", deleteComment.toString());

    return (
        <div div className="p-3 border-b border-gray-100 flex flex-col gap-2" >
            {
                isEditing ? (
                    <div className="flex flex-col gap-2" >
                        <Input value={newContent} onValueChange={setNewContent} />
                        <div className="flex gap-2">
                            <Button size="sm" color="primary" isLoading={isUpdating} onClick={() => updateMutate()}>Save</Button>
                            <Button size="sm" variant="flat" onClick={() => { console.log('Cancel button clicked'); setIsEditing(false); }}>Cancel</Button>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-between items-center">
                        <p className="text-sm">{comment.content}</p>
                        <div className="flex gap-1">
                            <Button size="sm" variant="light" onClick={() => setIsEditing(true)}>Edit</Button>
                            <Button onClick={() => deleteMutate(commentId)}>Delete</Button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}