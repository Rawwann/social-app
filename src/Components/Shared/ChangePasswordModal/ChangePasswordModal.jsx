import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@heroui/react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { changePassword } from '../../../Services/auth.service';

export default function ChangePasswordModal({ isOpen, onOpenChange }) {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const { mutate, isPending } = useMutation({
        mutationFn: (values) => changePassword(values),
        onSuccess: () => {
            toast.success("Password changed successfully! 🚀");
            setPassword('');
            setNewPassword('');
            onOpenChange(false);
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Failed to change password");
        }
    });

    const handleSubmit = () => {
        if (!password || !newPassword) return toast.error("Please fill all fields");
        mutate({ password, newPassword });
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>Change Your Password</ModalHeader>
                        <ModalBody>
                            <Input
                                label="Current Password"
                                type="password"
                                variant="bordered"
                                value={password}
                                onValueChange={setPassword}
                            />
                            <Input
                                label="New Password"
                                type="password"
                                variant="bordered"
                                value={newPassword}
                                onValueChange={setNewPassword}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>Cancel</Button>
                            <Button color="primary" onPress={handleSubmit} isLoading={isPending}>Update</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}