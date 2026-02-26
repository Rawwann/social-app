import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaDribbble } from "react-icons/fa";

const KudoLogo = () => (
    <svg fill="none" height="32" viewBox="0 0 32 32" width="32" className="text-black-700">
        <path clipRule="evenodd" d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z" fill="currentColor" fillRule="evenodd" />
    </svg>
);

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-white p-4 sm:p-6 lg:p-8 border-t border-gray-100">

            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[15rem] font-black text-gray-500/5 select-none pointer-events-none z-0">
                KUDO
            </div>

            <div className="relative z-10 mx-auto max-w-screen-xl">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link to="/" className="flex items-center gap-3">
                            <KudoLogo />
                            <span className="self-center whitespace-nowrap text-2xl font-bold text-gray-900">Kudo</span>
                        </Link>
                        <p className="mt-4 max-w-xs text-sm text-gray-500">
                            Connect with friends and the world around you on Kudo.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900">About</h2>
                            <ul className="text-gray-600">
                                <li className="mb-4"><Link href="#" className="hover:underline">Kudo Tech</Link></li>
                                <li><Link href="#" className="hover:underline">Tailwind CSS</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900">Follow us</h2>
                            <ul className="text-gray-600">
                                <li className="mb-4"><Link href="#" className="hover:underline">Github</Link></li>
                                <li><Link href="#" className="hover:underline">Discord</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900">Legal</h2>
                            <ul className="text-gray-600">
                                <li className="mb-4"><Link href="#" className="hover:underline">Privacy Policy</Link></li>
                                <li><Link href="#" className="hover:underline">Terms &amp; Conditions</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />

                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center">
                        © {new Date().getFullYear()} <Link to="/" className="hover:underline">Kudo™</Link>. All Rights Reserved.
                    </span>
                    <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                        <Link to="#" className="text-gray-500 hover:text-blue-700 transition-colors">
                            <FaFacebook size={20} />
                        </Link>
                        <Link to="#" className="text-gray-500 hover:text-pink-600 transition-colors">
                            <FaInstagram size={20} />
                        </Link>
                        <Link to="#" className="text-gray-500 hover:text-sky-500 transition-colors">
                            <FaTwitter size={20} />
                        </Link>
                        <Link to="#" className="text-gray-500 hover:text-black transition-colors">
                            <FaGithub size={20} />
                        </Link>
                        <Link to="#" className="text-gray-500 hover:text-pink-400 transition-colors">
                            <FaDribbble size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}