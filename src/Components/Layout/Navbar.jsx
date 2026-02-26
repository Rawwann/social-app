import React, { useContext } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Avatar,
    link
} from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export const KudoLogo = () => (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
        <path clipRule="evenodd" d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z" fill="currentColor" fillRule="evenodd" />
    </svg>
);

export default function HeroUINavbar() {
    const { userToken, removeUserToken, userInfo, isLoading } = useContext(AuthContext);
    const navigate = useNavigate();

    function logOut() {
        removeUserToken();
        navigate("/auth/login");
    }

    return (
        <Navbar isBordered>
            <NavbarBrand as={Link} to="/">
                <KudoLogo />
                <span className="font-bold text-inherit ml-2">Kudo</span>
            </NavbarBrand>

            <NavbarContent justify="end">
                {!userToken ? (
                    <>
                        <NavbarItem>
                            <Link className="text-blue-700 font-semibold" to="/auth/login">Login</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Button as={Link} color="primary" to="/auth/register" variant="flat">
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </>
                ) : (
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                name="Roro"
                                size="sm"
                                src={userInfo?.photo}
                            />
                        </DropdownTrigger>

                        <DropdownMenu aria-label="Profile Actions" variant="flat">

                            {!isLoading && userInfo ? (
                                <>
                                    <DropdownItem key="profile" className="h-14 gap-2">
                                        <p className="font-semibold">Signed in as</p>
                                        <p className="font-semibold">{userInfo.email}</p>
                                    </DropdownItem>
                                    <DropdownItem key="user_profile" as={Link} to={`/profile/${userInfo._id}`}>
                                        My Profile
                                    </DropdownItem>
                                </>
                            ) : (
                                <DropdownItem key="loading">Loading...</DropdownItem>
                            )}

                            <DropdownItem key="logout" color="danger" onClick={logOut}>
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                )}
            </NavbarContent>
        </Navbar >
    );
}