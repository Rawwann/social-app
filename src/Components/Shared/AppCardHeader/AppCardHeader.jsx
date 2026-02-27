import React, { useContext, useState } from 'react';
import { Button, CardHeader, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Textarea } from '@heroui/react';
import { BsThreeDots } from "react-icons/bs"
import { FiDelete, FiEdit } from "react-icons/fi";
import defaultProfile from '../../../assets/504abbd5-e569-46bc-8128-2cfe6dcb92c6-default-profile.png'
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deletePost, updatePost } from '../../../Services/posts.service';
import { deleteComment, updateComment } from '../../../Services/comments.service';
import { AuthContext } from "../../../Context/AuthContext";

function checkProfilePicture(image) {
    return image?.includes("undefined") ? defaultProfile : image;
}

export default function AppCardHeader({ user, isPost = false, itemId, postId, queryKey = "all-posts", postContent = "" }) {

    const queryClient = useQueryClient();
    const { userInfo } = useContext(AuthContext);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [editBody, setEditBody] = useState(postContent);

    const deleteMutation = useMutation({
        mutationFn: () => {
            if (!itemId) {
                return Promise.reject("itemId is missing");
            }
            if (isPost) {
                return deletePost(itemId);
            } else {
                return deleteComment(postId, itemId);
            }
        },
        onSuccess: (response) => {
            toast.success(response?.data?.data?.message || (isPost ? "Post deleted successfully!" : "Comment deleted successfully!"));
            if (queryKey) {
                queryClient.invalidateQueries({ queryKey: Array.isArray(queryKey) ? queryKey : [queryKey] });
            }
        },
        onError: (error) => {
            console.error("Delete error details:", error);
            toast.error(error?.response?.data?.message || (isPost ? "Failed to delete post" : "Failed to delete comment"));
        }
    });

    const { mutate: handleDelete } = deleteMutation;


    const handleSaveUpdate = () => {
        if (!editBody.trim()) return;
        const formData = new FormData();
        formData.append(isPost ? "body" : "content", editBody);
        handleUpdate(formData);
    };

    const updateMutation = useMutation({
        mutationFn: (data) => {
            if (!itemId) return Promise.reject("itemId is missing");
            if (isPost) {
                return updatePost(itemId, data);
            } else {
                return updateComment(postId, itemId, data);
            }
        },
        onSuccess: (response) => {
            toast.success(response?.data?.data?.message || (isPost ? "Post updated successfully!" : "Comment updated successfully!"));
            if (queryKey) {
                queryClient.invalidateQueries({ queryKey: Array.isArray(queryKey) ? queryKey : [queryKey] });
            }
            onOpenChange(false);
        },
        onError: (error) => {
            console.error("Update Error:", error);
            toast.error(error?.response?.data?.message || (isPost ? "Failed to update post" : "Failed to update comment"));
        }
    });

    const { mutate: handleUpdate, isPending: isUpdating } = updateMutation;

    return (
        <>
            <CardHeader className="flex gap-3 justify-between">
                <div className="flex gap-3 items-center">
                    <Image
                        alt={user?.name}
                        height={isPost ? 80 : 40}
                        width={isPost ? 80 : 40}
                        radius="full"
                        src={checkProfilePicture(user?.photo)}
                        fallbackSrc={defaultProfile}
                    />
                    <div className="flex flex-col">
                        <Link to={`/profile/${user?._id}`}>
                            <p className={`${isPost ? "text-large font-bold" : "text-medium"} capitalize hover:underline cursor-pointer`}>
                                {user?.name}
                            </p>
                        </Link>
                        <p className="text-small text-default-500">
                            {user?.createdAt?.split("T")[0]}
                        </p>
                    </div>
                </div>
                {userInfo?._id === user?._id && (
                    <Dropdown>
                        <DropdownTrigger>
                            <Button className="capitalize" color="default" variant="light">
                                <BsThreeDots />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Dropdown Variants" color="default" variant="light">
                            <DropdownItem
                                key="edit"
                                textValue={isPost ? "Edit Post" : "Edit Comment"}
                                onClick={isPost ? onOpen : () => {
                                    onOpen();
                                }}
                            >
                                <div className='flex gap-2 items-center'>
                                    <FiEdit />
                                    {isPost ? "Edit Post" : "Edit Comment"}
                                </div>
                            </DropdownItem>
                            <DropdownItem
                                key="delete"
                                className="text-danger"
                                color="danger"
                                textValue={isPost ? "Delete Post" : "Delete Comment"}
                                onClick={() => handleDelete()}
                            >
                                <div className='flex gap-2 items-center'>
                                    <FiDelete />
                                    {isPost ? "Delete Post" : "Delete Comment"}
                                </div>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown >
                )}
            </CardHeader >

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Edit Post</ModalHeader>
                            <ModalBody>
                                <Textarea
                                    autoFocus
                                    label="Post Content"
                                    placeholder="What's on your mind?"
                                    variant="bordered"
                                    value={editBody}
                                    onValueChange={setEditBody}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose} isDisabled={isUpdating}>
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={handleSaveUpdate} isLoading={isUpdating}>
                                    Save Changes
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}