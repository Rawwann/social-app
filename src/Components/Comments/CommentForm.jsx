// create comment
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewComment } from '../../Services/comments.service';
import { Button, Input } from '@heroui/react';
import { FaPaperPlane } from 'react-icons/fa';

export default function CommentForm({ postId, queryKey }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: { content: "" }
    });

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (content) => addNewComment(postId, content),
        onSuccess: () => {
            reset();
            queryClient.invalidateQueries({ queryKey });
        }
    });

    const createComment = (data) => mutate(data.content);

    return (
        <form onSubmit={handleSubmit(createComment)} className="flex gap-2 p-4">
            <Input
                {...register("content", { required: "Comment required" })}
                placeholder="Write a comment..."
                fullWidth
            />
            <Button type="submit" isIconOnly isLoading={isPending}>
                <FaPaperPlane />
            </Button>
        </form>
    );
}