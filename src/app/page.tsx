"use client";

import { FieldValues, useForm } from "react-hook-form";

const LoginTest = () => {
    const { register, handleSubmit, formState } = useForm({
        mode: "onChange",
        defaultValues: {
            email: "test@test.com",
            password: "",
        },
    });

    const onSubmit = (value: FieldValues) => {};

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col justify-center items-center">
                <div className="border border-solid border-black">
                    <label htmlFor="email">이메일</label>
                    <input
                        id="email"
                        type="text"
                        {...register("email", {
                            required: true,
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email address",
                            },
                        })}
                    />
                </div>
                <div className="border border-solid border-black">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        id="password"
                        type="password"
                        {...register("password", {
                            required: true,
                        })}
                    />
                </div>
                <button type="submit" className="border border-solid border-black">
                    로그인
                </button>
            </div>
        </form>
    );
};

export default LoginTest;
