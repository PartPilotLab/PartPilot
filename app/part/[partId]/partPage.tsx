"use client";
import { PartState } from "@/lib/helper/part_state";
import { Carousel } from "@mantine/carousel";
import {
  Paper,
  Group,
  Center,
  Stack,
  Text,
  Image,
  ActionIcon,
  Tooltip,
  Title,
  TextInput,
  NumberInput,
  Button,
} from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PartPage({ part }: { part: PartState }) {
  const router = useRouter()
  const [editPart, setEditPart] = useState<PartState>(part)
  return (
    <Paper p={0}>
      <Tooltip label="Back">
      <ActionIcon variant="light" pos={"absolute"} style={{zIndex: 3, top: 15, left: 5}} onClick={() => {router.push("/")}}>
        <IconChevronLeft />
      </ActionIcon>
      </Tooltip>
      <Group gap={0}>
        <Paper w={"50%"} h={"100%"} display={"flex"}>
          <Carousel withIndicators height={"100%"}>
            {part.productImages.map((image, index) => (
              <Carousel.Slide key={index}>
                <Image src={image} alt={part.catalogName} fit="contain" />
              </Carousel.Slide>
            ))}
            {/* <Carousel.Slide>1</Carousel.Slide>
            <Carousel.Slide>2</Carousel.Slide>
            <Carousel.Slide>3</Carousel.Slide> */}
          </Carousel>
        </Paper>
        <Paper w={"50%"}>
          <Stack p={"sm"}>
            <Title>{part.title}</Title>
            <TextInput variant="unstyled" defaultValue={part.title} size="xl"/>
            <NumberInput variant="unstyled" defaultValue={part.quantity}/>
            <Text>{part.catalogName}</Text>
            <Text>{part.productCode}</Text>
            <Text>{part.productDescription}</Text>
            <Button>Bearbeiten</Button>
          </Stack>
        </Paper>
      </Group>
    </Paper>
  );
}
