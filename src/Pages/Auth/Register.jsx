import React, { useState } from "react";
import { Button, Input, Radio, RadioGroup } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../Schema/register.schema";
import HeroUINavbar from "../../Components/Layout/Navbar";
import axios from "axios";

export default function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const { handleSubmit, register, control, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: { gender: "female" }
    });

    async function submitHandler(data) {
        setIsLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {

            const response = await axios.post("https://route-posts.routemisr.com/users/signup", data);

            if (response.data.message === "success") {
                setSuccessMessage("Account Created Successfully! 🎉");
                setTimeout(() => navigate("/auth/login"), 2000);
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.error || "Check your data and try again!");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <HeroUINavbar />
            <section className="py-20">
                <div className="max-w-md mx-auto">
                    <h1 className="text-center font-bold text-4xl mb-6">Register</h1>

                    <form onSubmit={handleSubmit(submitHandler)} className="p-10 bg-white shadow-xl rounded-xl flex flex-col gap-5">

                        {successMessage && <div className="p-3 bg-green-100 text-green-700 rounded-lg text-center font-bold border border-green-200">{successMessage}</div>}
                        {errorMessage && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-center font-bold border border-red-200">{errorMessage}</div>}

                        <Input label="Name" variant="bordered" {...register('name')} isInvalid={!!errors.name} errorMessage={errors.name?.message} />

                        <Input label="Email" type="email" variant="bordered" {...register('email')} isInvalid={!!errors.email} errorMessage={errors.email?.message} />

                        <Input label="Password" type="password" variant="bordered" {...register('password')} isInvalid={!!errors.password} errorMessage={errors.password?.message} />

                        <Input label="Confirm Password" type="password" variant="bordered" {...register('rePassword')} isInvalid={!!errors.rePassword} errorMessage={errors.rePassword?.message} />

                        <Input label="Date of Birth" type="date" variant="bordered" {...register('dateOfBirth')} isInvalid={!!errors.dateOfBirth} errorMessage={errors.dateOfBirth?.message} />

                        <Controller
                            name="gender"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup label="Gender" orientation="horizontal" value={field.value} onValueChange={field.onChange}>
                                    <Radio value="male">Male</Radio>
                                    <Radio value="female">Female</Radio>
                                </RadioGroup>
                            )}
                        />

                        <Button type="submit" color="primary" isLoading={isLoading} className="font-bold py-6 text-lg">
                            {isLoading ? "Wait a second..." : "Create Account"}
                        </Button>

                        <p className="text-center text-sm text-gray-500">
                            Already have an account? <Link className="text-blue-600 font-bold hover:underline" to="/auth/login">Login</Link>
                        </p>
                    </form>
                </div>
            </section>
        </>
    );
}