import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addNewComment } from '../../Services/comments.service'
import { Button, Input } from '@heroui/react'
import { FaPaperPlane } from 'react-icons/fa'

export default function CommentForm({ postId, queryKey }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: { content: "" }
    })

    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: (content) => addNewComment(postId, content),
        onSuccess: () => {
            alert("Comment added!")
            reset()
            queryClient.invalidateQueries({ queryKey: queryKey })
        },
        onError: (error) => {
            console.error(error)
        }
    })

    function createComment(data) {
        mutate(data.content)
    }

    return (
        <form onSubmit={handleSubmit(createComment)} className="flex gap-2 p-4">
            <Input
                {...register("content", {
                    required: "Comment required",
                    maxLength: { value: 255, message: "Max 255 chars" }
                })}
                placeholder="Enter your comment"
                fullWidth
            />
            {errors.content && <p className="text-red-500 text-xs">{errors.content.message}</p>}

            <Button type="submit" isIconOnly disabled={isPending}>
                {isPending ? "..." : <FaPaperPlane />}
            </Button>
        </form>
    )
}