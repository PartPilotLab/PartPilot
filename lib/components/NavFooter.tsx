"use client";
import { Text, Container, ActionIcon, Group, rem, Image } from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
import classes from "./NavFooter.module.css";
import Link from "next/link";

const data = [
  {
    title: "Allgemein",
    links: [
      { label: "Impressum", link: "/impressum" },
      { label: "Datenschutz", link: "/datenschutz" },
    ],
  },
  {
    title: "Projekt",
    links: [
      { label: "Präsentationen", link: "/presentation" },
      { label: "Über Uns", link: "/about" },
    ],
  },
  // {
  //   title: 'Community',
  //   links: [
  //     { label: 'Join Discord', link: '#' },
  //     { label: 'Follow on Twitter', link: '#' },
  //     { label: 'Email newsletter', link: '#' },
  //     { label: 'GitHub discussions', link: '#' },
  //   ],
  // },
];

export default function NavFooter() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Link href={link.link} className={classes.link} key={link.link}>
        <Text
          key={index}
          className={classes.link}
          // href={link.link}
          // onClick={(event) => event.preventDefault()}
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
          {/* <MantineLogo size={30} /> */}
          <Image
            src="/images/rederadar-logo.png"
            alt="image"
            h={100}
            fit="contain"
          />
          {/* <Text size="xs" c="dimmed" className={classes.description}>
            Build fully functional accessible web applications faster than ever
          </Text> */}
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2024 RedeRadar.de. All rights reserved. Built with ❤️ by Lenni and
          supporters.
        </Text>

        {/* <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group> */}
      </Container>
    </footer>
  );
}
