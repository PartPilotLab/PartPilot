"use client";

import { Avatar, Button, Menu, Stack, Tabs, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import classes from "./UserAvatar.module.css";

type Props = {
  styles?: string;
};

export default function UserAvatar({ styles }: Props) {
  const session = useSession();
  const router = useRouter();

  const handleRegistration = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    }).then((res) => res.json());
    if (response.error) {
      console.error(response.error);
      notifications.show({
        title: "Error",
        message: response.error,
        color: "red",
      });
    } else {
      //Sign user in when registration is successful
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      }).then(({ ok }) => {
        if (ok) {
          notifications.show({
            title: "Success",
            message: "Registered and logged in successfully!",
            color: "green",
          });
          router.refresh();
        } else {
          notifications.show({
            title: "Error",
            message:
              "Something went wrong while logging in. Try to login again.",
            color: "red",
          });
        }
      });
    }
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    }).then(({ ok, error }) => {
      //Check if the login was successful
      if (ok) {
        notifications.show({
          title: "Success",
          message: "Logged in successfully!",
          color: "green",
        });
        router.refresh();
      } else {
        notifications.show({
          title: "Error",
          message: "You have entered an invalid email or password.",
          color: "red",
        });
      }
    });
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <Menu>
      <Menu.Target>
        <Stack className={styles}>
          {session.data?.user?.email ? (
            <Avatar color="cyan" radius="xl" className={classes.avatar}>
              {session.data.user.name.slice(0, 2)}
            </Avatar>
          ) : (
            <Avatar radius="xl" className={classes.avatar} />
          )}
        </Stack>
      </Menu.Target>
      <Menu.Dropdown className={classes.menu}>
        {session.data?.user?.email ? (
          <div className={classes.form}>
            <Menu.Label>User Account</Menu.Label>
            <Menu.Item disabled>{session.data.user.name}</Menu.Item>
            <Menu.Item disabled>{session.data.user.email}</Menu.Item>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          <Tabs defaultValue="login">
            <Tabs.List>
              <Tabs.Tab value="login">Login</Tabs.Tab>
              <Tabs.Tab value="signup">Signup</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="login">
              <form className={classes.form} onSubmit={handleLogin}>
                <TextInput
                  label="Email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  required
                />
                <TextInput
                  name="password"
                  label="Password"
                  placeholder="Password"
                  type="password"
                  required
                />
                <Button type="submit">Login</Button>
              </form>
            </Tabs.Panel>
            <Tabs.Panel value="signup">
              <form className={classes.form} onSubmit={handleRegistration}>
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
              </form>
            </Tabs.Panel>
          </Tabs>
        )}
      </Menu.Dropdown>
    </Menu>
  );
}
