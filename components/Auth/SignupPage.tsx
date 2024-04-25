'use client';

import { Button, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { signIn } from "next-auth/react";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import AuthFormContainer from "./AuthFormContainer";

export default function SignupPage() {
    const router = useRouter();

    const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const response = await fetch('/api/auth/register', {
            method: "POST",
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password'),
            })
        }).then(res => res.json())
        if (response.error) {
            console.error(response.error)
            notifications.show({ title: "Error", message: response.error, color: "red" })
        } else {
            //Sign user in when registration is successful
            await signIn('credentials', {
                email: formData.get('email'),
                password: formData.get('password'),
                redirect: false
            }).then(({ ok }) => {
                if (ok) {
                    router.push('/')
                    notifications.show({ title: "Success", message: "Registered and logged in successfully!", color: "green" })
                } else {
                    notifications.show({ title: "Error", message: "Something went wrong while logging in. Try to login again.", color: "red" })
                }
            });
        }
    }

    return (
        <AuthFormContainer handleSubmit={handleSignup}>
            <TextInput
                label="Name"
                name="name"
                placeholder="User Name"
                type="text"
                required
            />
            <TextInput
                label="Email"
                name="email"
                placeholder="Email"
                type="email"
                required
            />
            <TextInput
                label="Password"
                name="password"
                placeholder="Password"
                type="password"
                required
            />
            <Button type="submit">Sign Up</Button>
        </AuthFormContainer >
    )
}
