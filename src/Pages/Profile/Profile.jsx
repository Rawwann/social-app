import React, { useContext } from 'react';
import { Avatar, Card, CardBody, Button, Tabs, Tab, Chip } from "@heroui/react";
import { FaEnvelope, FaUserCheck, FaRegBookmark, FaUsers, FaUserPlus } from "react-icons/fa";
import { AuthContext } from '../../Context/AuthContext';
import PostListing from '../../Components/Posts/PostListing';
import CreatePostForm from '../../Components/Posts/CreatePostForm';
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet-async";


export default function Profile() {
    const { userId: loggedInUserId, userInfo } = useContext(AuthContext);
    const { userId: profileUserId } = useParams();


    return (
        <>
            <Helmet>
                <title>Kudo | {userInfo?.name ? userInfo.name : "Profile"}</title>
                <meta name="description" content={`View the profile of ${userInfo?.name}`} />
            </Helmet>

            <div className="max-w-6xl mx-auto px-4 pt-0 pb-8">
                {/* Profile Header Section */}
                <Card className="mb-6 shadow-none border-none bg-transparent">
                    <CardBody className="p-0 overflow-visible">
                        <div className="h-48 w-full bg-gradient-to-r from-blue-100 via-blue-400 to-blue-900 rounded-t-3xl"></div>

                        <div className="flex flex-col md:flex-row items-end px-8 -mt-12 gap-6 pb-6 bg-white rounded-b-3xl shadow-sm border border-gray-100">
                            <Avatar
                                src={userInfo?.photo}
                                className="w-32 h-32 text-large border-4 border-white shadow-lg"
                                isBordered
                                color="primary"
                            />
                            <div className="flex-1 pb-2">
                                <h1 className="text-3xl font-bold text-gray-800">{userInfo?.name || "User Name"}</h1>
                                <p className="text-gray-500">@{userInfo?.username || "username"}</p>
                                <Chip size="sm" variant="flat" color="primary" startContent={<FaUserCheck size={12} />} className="mt-2">
                                    Kudo Posts member
                                </Chip>
                            </div>

                            <div className="flex gap-4 pb-4">
                                <StatCard label="FOLLOWERS" count="0" icon={<FaUsers />} />
                                <StatCard label="FOLLOWING" count="1" icon={<FaUserPlus />} />
                                <StatCard label="BOOKMARKS" count="0" icon={<FaRegBookmark />} />
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Profile Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Sidebar Column */}
                    <div className="space-y-6">
                        <Card className="shadow-sm border border-gray-100">
                            <CardBody className="p-6">
                                <h3 className="font-bold text-lg mb-4">About</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <FaEnvelope className="text-blue-500" />
                                        <span className="text-sm">{userInfo?.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <FaUserCheck className="text-green-500" />
                                        <span className="text-sm">Active on Kudo Posts</span>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        <Card className="shadow-sm border border-gray-100 bg-blue-50/30">
                            <CardBody className="p-4 flex justify-between items-center">
                                <span className="font-bold text-blue-800 text-sm uppercase">My Posts</span>
                                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs">0</span>
                            </CardBody>
                        </Card>
                    </div>

                    {/* Feed Column */}
                    <div className="md:col-span-2">
                        <Tabs variant="underlined" color="primary" aria-label="Profile Tabs" className="mb-4">
                            <Tab key="my-posts" title={<div className="flex items-center gap-2 font-bold"><FaUserCheck /> My Posts</div>}>

                                {/* Create Post Form */}
                                <div className="mb-6">
                                    {loggedInUserId === profileUserId && <CreatePostForm queryKey={['user-posts', profileUserId]} />}                            </div>

                                {/* Post Listing */}
                                <PostListing isHome={false} />

                            </Tab>
                            <Tab key="saved" title={<div className="flex items-center gap-2 font-bold"><FaRegBookmark /> Saved</div>}>
                                <p className="text-center py-10 text-gray-400">You have not saved any posts yet.</p>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    );
}

function StatCard({ label, count, icon }) {
    return (
        <Card className="shadow-none border border-gray-100 px-4 py-2 text-center min-w-[100px]">
            <div className="flex justify-center text-blue-500 mb-1 text-lg">
                {icon}
            </div>
            <p className="text-[10px] text-gray-400 font-bold mb-1 uppercase">{label}</p>
            <p className="text-xl font-black text-gray-800">{count}</p>
        </Card>
    );
}