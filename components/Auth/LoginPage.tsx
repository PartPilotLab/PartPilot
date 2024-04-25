'use client';

import { Button, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { signIn } from "next-auth/react";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import AuthFormContainer from "./AuthFormContainer";

export default function LoginPage() {
    const router = useRouter();

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        await signIn('credentials', {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false
        }).then(({ ok }) => {
            //Check if the login was successful
            if (ok) {
                notifications.show({ title: "Success", message: "Logged in successfully!", color: "green" })
                router.push("/");
            } else {
                notifications.show({ title: "Error", message: "You have entered an invalid email or password.", color: "red" })
            }
        })
    }

    return (
        <AuthFormContainer handleSubmit={handleLogin}>
            <TextInput
                label="Email"
                name='email'
                placeholder="Email"
                type="email"
                required
            />
            <TextInput
                name='password'
                label="Password"
                placeholder="Password"
                type="password"
                required
            />
            <Button type="submit">Login</Button>

        </AuthFormContainer>
    )
}
