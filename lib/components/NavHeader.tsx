"use client";

import {
  Burger,
  Button,
  Center,
  Container,
  Group,
  Menu,
  Image,
} from "@mantine/core";
import classes from "./NavHeader.module.css";
import { IconChevronDown, IconPlayerPlay } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const links = [
  { link: "/categories", label: "Categories" },
  { link: "/about", label: "About Us" },
] as {
  link: string;
  label: string;
  links?: { link: string; label: string }[];
}[];

export default function NavHeader() {
  const router = useRouter();

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => {
          event.preventDefault();
          router.push(link.link);
        }}
      >
        {link.label}
      </a>
    );
  });

  return (
    <header className={classes.header}>
      <Container size={"md"} p={"sm"} h={60}>
        <Group justify="space-between">
          <Image
            src="/images/rederadar-logo.png"
            alt="Logo"
            h={40}
            fit="contain"
            w="auto"
            onClick={() => {
              router.push("/");
            }}
            style={{ cursor: "pointer" }}
          />
          <Group gap={5} visibleFrom="sm">
            {items}
          </Group>
          {
            <Button
              rightSection={<IconPlayerPlay />}
              onClick={() =>
                router.push("/add")
              }
            >
              Add Part
            </Button>
          }
        </Group>
      </Container>
    </header>
  );
}
