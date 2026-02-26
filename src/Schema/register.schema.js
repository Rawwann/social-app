import * as z from "zod";

export const registerSchema = z
    .object({
        name: z
            .string()
            .nonempty("Name Required")
            .min(3, "Min 3 chars")
            .max(15, "Max 15 chars"),

        email: z.string().email("Invalid email"),

        password: z
            .string()
            .regex(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                "Invalid Password"
            ),

        rePassword: z
            .string()
            .regex(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                "Invalid Password"
            ),

        dateOfBirth: z.coerce
            .date()
            .refine(function (val) {
                return new Date().getFullYear() - val.getFullYear() >= 16
                    ? true
                    : false;
            }, "Age must be above 16")
            .transform(function (date) {
                return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
            }),

        gender: z.enum(["male", "female"], "Gender is Required"),
    })
    .refine(
        function (data) {
            return data.password === data.rePassword ? true : false;
        },
        { message: "Passwords are not match", path: ["rePassword"] }
    );