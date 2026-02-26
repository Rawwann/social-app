import React, { useContext, useState } from "react";
import { Button, Input } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../Schema/login.schema";
import HeroUINavbar from "../../Components/Layout/Navbar";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

export default function Login() {

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema)
    });
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState("");
    const { saveUserToken } = useContext(AuthContext);
    const navigate = useNavigate();

    async function submitHandler(data) {
        setIsLoading(true);
        setServerError("");
        try {
            const res = await axios.post("https://route-posts.routemisr.com/users/signin", data);


            if (res.data.success === true) {
                saveUserToken(res.data.data.token);
                navigate("/");
            } else {
                setServerError("Login failed, please try again.");
            }
        } catch (error) {
            setServerError(error.response?.data?.message || "Invalid email or password");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <HeroUINavbar />
            <section className="py-20">
                <div className="max-w-md mx-auto">
                    <h1 className="text-center font-bold text-4xl mb-6">Login</h1>

                    <form onSubmit={handleSubmit(submitHandler)} className="p-12 bg-white shadow-lg rounded flex flex-col gap-6">
                        {serverError && <p className="text-red-500 text-center font-semibold bg-red-50 p-2 rounded">{serverError}</p>}

                        <div>
                            <Input
                                label="Email"
                                type="email"
                                variant="bordered"
                                {...register('email')}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        {/* --- Password Input --- */}
                        <div>
                            <Input
                                label="Password"
                                type="password"
                                variant="bordered"
                                {...register('password')}
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>

                        {/* --- Submit Button --- */}
                        <Button type="submit" color="primary" className="font-bold text-lg">
                            Login
                        </Button>

                        {/* --- Toggle Link (Go to Register) --- */}
                        <div className="text-center mt-2">
                            <span className="text-gray-500 text-sm">Don't have an account? </span>
                            <Link className="text-blue-700 font-semibold text-sm hover:underline" to="/auth/register">
                                Create new account
                            </Link>
                        </div>

                    </form>
                </div>
            </section>
        </>
    );
}