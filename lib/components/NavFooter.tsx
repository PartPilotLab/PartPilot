"use client";
import { Text, Container, ActionIcon, Group, rem, Image, ThemeIcon } from "@mantine/core";
import {
  IconBrandTwitter
} from "@tabler/icons-react";
import classes from "./NavFooter.module.css";
import Link from "next/link";
import { ReactNode } from "react";

const data = [
  {
    title: "Project",
    links: [
      // { label: "About Us", link: "/about", icon: undefined },
      { label: "GitHub", link: "https://github.com/LenniM/PartPilot", icon: undefined },
    ],
  },
  {
    title: 'Community',
    links: [
      // { label: 'Join Discord', link: '#', icon: <IconBrandDiscord/> },
      { label: 'Follow on Twitter/X', link: '#', icon: <IconBrandTwitter/> },
    ],
  },
] as {title: string, links: {label: string, link: string, icon: undefined | ReactNode}[]}[];

export default function NavFooter() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Link href={link.link} className={classes.link} key={link.link}>
        <Text
          key={index}
          className={classes.link}
        >
          {link.label}
        </Text>
      </Link>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Image
            src="/images/PartPilot-Logo.png"
            alt="image"
            h={100}
            fit="contain"
          />

        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2024 PartPilot. Built with ❤️ by Lenni and
          supporters.
        </Text>
      </Container>
    </footer>
  );
}
