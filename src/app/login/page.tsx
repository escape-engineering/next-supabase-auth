"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import browserClient from "../utils/supabase/client";

const signInSchema = z.object({
    email: z
        .string({
            message: "email required",
        })
        .min(1, { message: "minimum length is 1" })
        .max(10, { message: "maximum length is 10" })
        .email({ message: "invalid email" }),
    password: z.string(),
});

const LoginTest = () => {
    const { register, handleSubmit, formState } = useForm({
        mode: "onChange",
        defaultValues: {
            email: "test@test.com",
            password: "",
        },
        resolver: zodResolver(signInSchema),
    });

    const onSubmit = (value: FieldValues) => {
        console.log(signInSchema.parse(value));
    };

    const loginWithGithub = async () => {
        await browserClient.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: window.origin + "/auth/callback",
            },
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col justify-center items-center">
                    <div className="border border-solid border-black">
                        <label htmlFor="email">이메일</label>
                        <input id="email" type="text" {...register("email")} />
                        {formState.errors.email && <p>{formState.errors.email.message}</p>}
                    </div>
                    <div className="border border-solid border-black">
                        <label htmlFor="password">비밀번호</label>
                        <input id="password" type="password" {...register("password")} />
                    </div>
                    <button type="submit" className="border border-solid border-black" disabled={!formState.isValid}>
                        로그인
                    </button>
                </div>
                <button type="button" onClick={loginWithGithub}>
                    깃허브 로그인
                </button>
            </form>
        </>
    );
};

export default LoginTest;
