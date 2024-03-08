"use client";

import {
  Burger,
  Button,
  Center,
  Container,
  Group,
  Menu,
  Image,
  Box,
  Drawer,
  ScrollArea,
  Divider,
  rem,
  Stack,
} from "@mantine/core";
import classes from "./NavHeader.module.css";
import { IconChevronDown, IconPlayerPlay, IconPlus } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import onScan from "onscan.js";
import { useDisclosure } from "@mantine/hooks";

const links = [
  { link: "/", label: "Dashboard" },
  { link: "/categories", label: "Categories" },
  // { link: "/about", label: "About Us" },
] as {
  link: string;
  label: string;
  links?: { link: string; label: string }[];
}[];

export default function NavHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

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
          if (link.link === "/") {
            if (pathname !== link.link) {
              router.push(link.link);
            } else {
              window.location.href = "/";
            }
          } else {
            if (pathname !== link.link) {
              if (
                typeof document !== "undefined" &&
                typeof onScan !== "undefined"
              ) {
                if (onScan.isAttachedTo(document)) {
                  onScan.detachFrom(document);
                }
              }
            }
            router.push(link.link);
          }
          closeDrawer();
        }}
      >
        {link.label}
      </a>
    );
  });

  return (
    <Box>
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
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="sm"
              c={"gray"}
            />
            {
              <Button
                rightSection={<IconPlus />}
                onClick={() => {
                  if (
                    typeof document !== "undefined" &&
                    typeof onScan !== "undefined"
                  ) {
                    if (onScan.isAttachedTo(document)) {
                      onScan.detachFrom(document);
                    }
                  }
                  router.push("/add");
                }}
              >
                Add Part
              </Button>
            }
          </Group>
        </Container>
      </header>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="70%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my={"sm"} />
          <Stack>{items}</Stack>
          <Divider my={"sm"} />

          <Group justify="center" grow pb="xl" px="md">
            <Button
              rightSection={<IconPlus />}
              onClick={() => {
                if (
                  typeof document !== "undefined" &&
                  typeof onScan !== "undefined"
                ) {
                  if (onScan.isAttachedTo(document)) {
                    onScan.detachFrom(document);
                  }
                }
                router.push("/add");
              }}
            >
              Add Part
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
