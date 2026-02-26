import React, { useState, useRef, useContext } from "react";
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button, Textarea, Divider } from "@heroui/react";
import { FaGlobeAmericas, FaChevronDown, FaImage, FaPaperPlane, FaTimes } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../Services/posts.service";
import { toast } from "react-toastify";

export default function CreatePostForm({ queryKey }) {
    const { userInfo } = useContext(AuthContext);
    const [postContent, setPostContent] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (formData) => createPost(formData),
        onSuccess: () => {
            toast.success("Post created successfully!");
            setPostContent("");
            setImagePreview(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            if (queryKey) {
                queryClient.invalidateQueries({ queryKey: [queryKey] });
            }
        },
        onError: (error) => {
            toast.error("Failed to create post!");
            console.error("Error creating post:", error);
        }
    });

    const handlePost = () => {
        if (!postContent.trim() && !imagePreview) return;

        const formData = new FormData();

        if (postContent.trim()) {
            formData.append("body", postContent);
        }

        if (fileInputRef.current && fileInputRef.current.files[0]) {
            formData.append("image", fileInputRef.current.files[0]);
        }

        mutate(formData);
    };

    const handlePhotoClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = () => {
        const file = fileInputRef.current.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImagePreview(imageURL);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <Card className="max-w-2xl mx-auto mt-6 p-2 shadow-sm border border-default-200">
            <CardHeader className="flex gap-3 items-start px-4 pt-4">
                <Avatar
                    src={userInfo?.photo}
                    size="md"
                />
                <div className="flex flex-col items-start justify-center">
                    <h4 className="text-small font-bold leading-none text-default-900">
                        {userInfo?.name}
                    </h4>
                    <Button
                        size="sm"
                        variant="flat"
                        className="h-6 px-2 mt-1.5 bg-default-100 text-default-600 text-tiny font-medium rounded-md"
                        startContent={<FaGlobeAmericas size={12} />}
                        endContent={<FaChevronDown size={10} />}
                    >
                        Public
                    </Button>
                </div>
            </CardHeader>

            <CardBody className="px-4 py-2">
                <Textarea
                    placeholder={`What's on your mind, ${userInfo?.name || 'there'}?`}
                    value={postContent}
                    onValueChange={setPostContent}
                    minRows={3}
                    disabled={isPending}
                    classNames={{
                        input: "resize-y min-h-[80px] text-medium text-default-700 placeholder:text-default-400 disabled:opacity-50",
                        inputWrapper: "bg-transparent shadow-none hover:bg-transparent focus-within:bg-transparent !cursor-text border-none p-0",
                    }}
                />

                {imagePreview && (
                    <div className="relative mt-3">
                        <img
                            src={imagePreview}
                            alt="Post preview"
                            className={`w-full max-h-[400px] object-cover rounded-xl border border-default-200 ${isPending ? 'opacity-50' : ''}`}
                        />
                        {!isPending && (
                            <Button
                                isIconOnly
                                size="sm"
                                color="danger"
                                variant="flat"
                                className="absolute top-2 right-2 rounded-full z-10 backdrop-blur-md bg-white/50 hover:bg-white/80"
                                onClick={handleRemoveImage}
                            >
                                <FaTimes size={14} />
                            </Button>
                        )}
                    </div>
                )}
            </CardBody>

            <div className="px-4">
                <Divider className="my-2" />
            </div>

            <CardFooter className="flex justify-between items-center px-4 pb-4 pt-2">
                <div className="flex gap-2">
                    <Button
                        variant="light"
                        onClick={handlePhotoClick}
                        disabled={isPending}
                        startContent={<FaImage size={20} className="text-green-600" />}
                        className="text-default-600 font-semibold"
                    >
                        Photo/video
                    </Button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*,video/*"
                        disabled={isPending}
                    />
                </div>

                <Button
                    color="primary"
                    endContent={!isPending && <FaPaperPlane size={14} />}
                    isDisabled={(!postContent.trim() && !imagePreview) || isPending}
                    isLoading={isPending}
                    onClick={handlePost}
                    className="font-semibold px-6 bg-blue-500 data-[disabled=true]:opacity-50 data-[disabled=true]:bg-blue-500"
                >
                    {isPending ? "Posting..." : "Post"}
                </Button>
            </CardFooter>
        </Card>
    );
}