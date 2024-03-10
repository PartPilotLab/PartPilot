"use client";

import {
  Badge,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Title,
  Text,
  Card,
  Image,
  Space,
  Tooltip,
  ActionIcon,
} from "@mantine/core";
import classes from "./page.module.css";
import { PartState } from "@/lib/helper/part_state";
import { useRouter } from "next/navigation";
import { IconChevronLeft } from "@tabler/icons-react";

export default function CategoriesPage({
  catalogItems,
}: {
  catalogItems: PartState[];
}) {
  const router = useRouter();
  return (
    <Paper>
      <Tooltip label="Back">
        <ActionIcon
          variant="light"
          pos={"absolute"}
          style={{ zIndex: 3, top: 15, left: 5 }}
          onClick={() => {
            router.push("/");
          }}
        >
          <IconChevronLeft />
        </ActionIcon>
      </Tooltip>
      <Stack p={"lg"}>
        <Group justify="center">
          <Badge variant="filled" size="lg">
            Categories
          </Badge>
        </Group>
        <Title order={2} className={classes.title} ta="center" mt="sm">
          Directly Sort by Category
        </Title>

        <Text c="dimmed" className={classes.description} ta="center" mt="md">
          Click on a category to see all the products in that category
        </Text>
        <Space h="sm" />
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} p={"lg"}>
          {catalogItems.map((item) => (
            <Card
              key={item.parentCatalogName}
              shadow="md"
              radius="md"
              className={classes.card}
              padding="xl"
              onClick={() => {
                router.push(`/?catalog=${item.parentCatalogName}`);
              }}
            >
              <Card.Section>
                <Image
                  src={item.productImages[0] ?? "/images/image-bg.svg"}
                  height={160}
                  fit="cover"
                />
              </Card.Section>
              <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
                {item.parentCatalogName}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </Paper>
  );
}
