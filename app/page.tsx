"use client";


import { Stack } from "@mantine/core";
import { motion, useScroll } from "framer-motion";

import { useDisclosure } from "@mantine/hooks";

export interface PartState {
  id: string;
  title: string;
  
  imageLink: string;
  productLink: string;
  package: string;
  quantity: number;
  manufacturer: string;

  prices: {ladder: string, price: number}[];
  description: string;
  createdAt: Date;
  updatedAt: Date;

  voltageRated?: number;

  minBuyQuantity?: number;
  
}

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
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.6 }}
      >
      </motion.div>
    </Stack>
  );
}
