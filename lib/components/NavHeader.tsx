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
// import { signIn, signOut, useSession } from "next-auth/react";
import classes from "./NavHeader.module.css";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconPlayerPlay } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const links = [
  //   { link: "/about", label: "Features" },
  //   {
  //     link: "#1",
  //     label: "Learn",
  //     links: [
  //       { link: "/docs", label: "Documentation" },
  //       { link: "/resources", label: "Resources" },
  //       { link: "/community", label: "Community" },
  //       { link: "/blog", label: "Blog" },
  //     ],
  //   },
  { link: "/presentation", label: "Präsentationen" },
  { link: "/about", label: "Über uns" },
  // { link: "/contact", label: "Kontaktieren" },
  // {
  //   link: "#2",
  //   label: "Support",
  //   links: [
  //     { link: "/faq", label: "FAQ" },
  //     { link: "/demo", label: "Book a demo" },
  //     { link: "/forums", label: "Forums" },
  //   ],
  // },
] as {
  link: string;
  label: string;
  links?: { link: string; label: string }[];
}[];

export default function NavHeader() {
  // const { data: session } = useSession();
  const [opened, { toggle }] = useDisclosure(false);
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
                // router.push("/presentation?playRandom=true")
                router.push("/presentation")
              }
            >
              Spielen
            </Button>
          }
          {/* {session ? (
            <Group>
              <Button
                onClick={() => {
                  signOut();
                }}
              >
                Log out
              </Button>
            </Group>
          ) : (
            <Group>
              <Button
                variant="default"
                onClick={() => {
                  signIn();
                }}
              >
                Log in
              </Button>
              <Button onClick={() => {}}>Sign up</Button>
            </Group>
          )} */}
        </Group>
      </Container>
    </header>
  );
}
