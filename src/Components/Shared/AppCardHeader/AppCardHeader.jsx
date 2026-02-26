import React, { useContext, useState } from 'react';
import { Button, CardHeader, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Textarea } from '@heroui/react';
import { BsThreeDots } from "react-icons/bs"
import { FiDelete, FiEdit } from "react-icons/fi";
import defaultProfile from '../../../assets/504abbd5-e569-46bc-8128-2cfe6dcb92c6-default-profile.png'
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deletePost, updatePost } from '../../../Services/posts.service';
import { AuthContext } from "../../../Context/AuthContext";

function checkProfilePicture(image) {
    return image?.includes("undefined") ? defaultProfile : image;
}

export default function AppCardHeader({ user, isPost = false, postId, queryKey = "all-posts", postContent = "" }) {
    const queryClient = useQueryClient();
    const { userInfo } = useContext(AuthContext);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [editBody, setEditBody] = useState(postContent);

    const { mutate: handleDeletePost } = useMutation({
        mutationFn: () => deletePost(postId),
        onSuccess: (response) => {
            toast.success(response?.data?.data?.message || "Post deleted successfully!");
            if (queryKey) {
                queryClient.invalidateQueries({ queryKey: [queryKey] });
            }
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Failed to delete post");
        }
    });

    const { mutate: handleUpdatePost, isPending: isUpdating } = useMutation({
        mutationFn: (data) => updatePost(postId, data),
        onSuccess: (response) => {
            toast.success(response?.data?.data?.message || "Post updated successfully!");
            if (queryKey) {
                queryClient.invalidateQueries({ queryKey: [queryKey] });
            }
            onOpenChange(false);
        },
        onError: (error) => {
            console.error("Update Error:", error);
            toast.error(error?.response?.data?.message || "Failed to update post");
        }
    });

    const handleSaveUpdate = () => {
        if (!editBody.trim()) return;
        const formData = new FormData();
        formData.append("body", editBody);
        handleUpdatePost(formData);
    };

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
                            <DropdownItem key="edit" textValue="Edit Post" onClick={isPost ? onOpen : null}>
                                <div className='flex gap-2 items-center'>
                                    <FiEdit />
                                    Edit Post
                                </div>
                            </DropdownItem>
                            <DropdownItem key="delete" className="text-danger" color="danger" textValue={isPost ? "Delete Post" : "Delete Comment"} onClick={() => handleDeletePost()}>
                                <div className='flex gap-2 items-center'>
                                    <FiDelete />
                                    Delete Post
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