"use client";
import FaqHome from "@/lib/components/FaqHome";
import { FeaturesCardHome } from "@/lib/components/FeaturesHome";

import { Stack } from "@mantine/core";
import { motion, useScroll } from "framer-motion";

import { useDisclosure } from "@mantine/hooks";
import HeroHome from "@/lib/components/HeroHome";

export default function Home() {
  const [opened, { toggle }] = useDisclosure();
  const { scrollYProgress } = useScroll();

  return (
    <Stack gap={"sm"} style={{overflowX: "hidden"}}>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
      >
        <HeroHome />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.6 }}
      >
        <FeaturesCardHome />
      </motion.div>
      <FaqHome />
    </Stack>
  );
}
