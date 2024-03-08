"use client";
import { PartState } from "@/lib/helper/part_state";
import { Carousel } from "@mantine/carousel";
export const dynamic = "force-dynamic";
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
  Grid,
  SimpleGrid,
  Flex,
  LoadingOverlay,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconChevronLeft, IconEdit, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import classes from "./page.module.css";
const units = {
  voltage: "V",
  resistance: "Ω",
  power: "W",
  current: "A",
  frequency: "Hz",
  capacitance: "nF",
};

export default function PartPage({ part }: { part: PartState }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  

  const form = useForm({
    initialValues: {
      title: part.title || undefined,
      quantity: part.quantity || undefined,
      productId: part.productId || undefined,
      productCode: part.productCode || undefined,
      productModel: part.productModel || undefined,
      productDescription: part.productDescription || undefined,
      parentCatalogName: part.parentCatalogName || undefined,
      catalogName: part.catalogName || undefined,
      brandName: part.brandName || undefined,
      encapStandard: part.encapStandard || undefined,
      productImages: part.productImages || undefined,
      pdfLink: part.pdfLink || undefined,
      productLink: part.productLink || undefined,
      tolerance: part.tolerance || undefined,
      voltage: part.voltage || undefined,
      resistance: part.resistance || undefined,
      power: part.power || undefined,
      current: part.current || undefined,
      frequency: part.frequency || undefined,
      capacitance: part.capacitance || undefined,
      prices:
      part.prices ||
        ([] as {
          ladder: string;
          price: number;
        }[]),
    },
    validate: {
      productCode: (value) =>
        value.length > 0 ? null : "Product Code is required",
    },
  });
  async function updatePart() {
    form.validate();
    if (form.isValid()) {
      setIsLoading(true);
      const response = await fetch("/api/parts/update", {
        method: "POST",
        body: JSON.stringify({ ...form.values, id: part.id }),
      }).then((response) =>
        response
          .json()
          .then((data) => ({ status: response.status, body: data }))
      );
      if (response.status == 200) {
        notifications.show({
          title: "Part Update Successful",
          message: `The part ${form.values.productCode} was updated.`,
        });
        // form.reset();
      } else {
        if (response.status == 500) {
          if (response.body.error == "Part already exists") {
            notifications.show({
              title: "Part Update Failed",
              message: `The part ${form.values.productCode} already exists.`,
            });
          } else {
            notifications.show({
              title: "Part Update Failed",
              message: `The part could not be updated. Please try again.`,
            });
          }
        } else {
          notifications.show({
            title: "Part Update Failed",
            message: `The part could not be updated. Please try again.`,
          });
        }
      }
    } else {
      notifications.show({
        title: "Part Update Failed",
        message: `Please fill out all required fields.`,
      });
    }
    setIsLoading(false);
  }

  return (
    <Paper >
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
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ blur: 5, opacity: 0.5 }}
      />
      <SimpleGrid cols={{sm: 1, md: 2}}>
        <Carousel withIndicators height={"100%"}>
          {form.values.productImages.length == 0 ? (
            <Carousel.Slide>
              <Image
                p={"lg"}
                src={"/images/image-bg.svg"}
                alt="Product Images"
                fit="contain"
              />
            </Carousel.Slide>
          ) : (
            form.values.productImages.map((image, index) => (
              <Carousel.Slide key={index}>
                <Image src={image} alt="Product Images" fit="contain" />
              </Carousel.Slide>
            ))
          )}
        </Carousel>
        <Paper p={"sm"}>
          <Stack p={"sm"}>
            <form
              onSubmit={form.onSubmit(async (values) => await updatePart())}
            >
              <Grid gutter={4} className={classes.grid}>
                <Grid.Col span={12}>
                  <Paper shadow="sm" p={"sm"}>
                    <Title>Update Part</Title>
                  </Paper>
                </Grid.Col>
                {Object.keys(form.values).map((value) =>
                  value == "quantity" ? (
                    <Grid.Col span={6} key={value}>
                      <NumberInput
                        description={
                          value.charAt(0).toUpperCase() + value.slice(1)
                        }
                        placeholder={
                          value.charAt(0).toUpperCase() + value.slice(1)
                        }
                        min={0}
                        {...form.getInputProps(value)}
                      />
                    </Grid.Col>
                  ) : value == "prices" ? (
                    <Grid.Col span={12} key={value}>
                      <Paper withBorder w={"100%"}>
                        <Text c={"dimmed"}>Prices:</Text>
                        <Flex
                          justify="flex-start"
                          align="center"
                          direction="row"
                          style={{ overflowX: "scroll" }}
                          wrap="nowrap"
                          gap="sm"
                        >
                          {Object.entries(form.values.prices).map(
                            ([_, price], index) => (
                              <div key={index}>
                                <Paper
                                  radius={"xl"}
                                  withBorder
                                  shadow="sm"
                                  w={200}
                                >
                                  <Group pl={"sm"} pr={"sm"} w={"100%"} gap={0}>
                                    <Tooltip label="Quantity">
                                      <TextInput
                                        value={price.ladder}
                                        variant="unstyled"
                                        w={"50%"}
                                        p={0}
                                        onChange={(value) => {
                                          let newPrices = [
                                            ...form.values.prices,
                                          ];
                                          newPrices[index] = {
                                            ...newPrices[index],
                                            ladder: value.currentTarget.value,
                                          };
                                          form.setFieldValue(
                                            "prices",
                                            newPrices
                                          );
                                        }}
                                      />
                                    </Tooltip>
                                    <Tooltip label="Price">
                                      <NumberInput
                                        value={price.price}
                                        min={0}
                                        p={0}
                                        w={"50%"}
                                        step={0.1}
                                        prefix="$"
                                        variant="unstyled"
                                        // description="Price"
                                        onChange={(value) => {
                                          let newPrices = [
                                            ...form.values.prices,
                                          ];
                                          newPrices[index] = {
                                            ...newPrices[index],
                                            price:
                                              Math.round(Number(value) * 100) /
                                              100,
                                          };
                                          form.setFieldValue(
                                            "prices",
                                            newPrices
                                          );
                                        }}
                                      />
                                    </Tooltip>
                                  </Group>
                                </Paper>
                              </div>
                            )
                          )}
                          <ActionIcon
                            onClick={() =>
                              form.setFieldValue("prices", [
                                ...form.values.prices,
                                { ladder: "", price: 0 },
                              ])
                            }
                          >
                            <IconPlus />
                          </ActionIcon>
                        </Flex>
                      </Paper>
                    </Grid.Col>
                  ) : (
                    <Grid.Col span={6} key={value}>
                      <TextInput
                        // key={key}
                        description={
                          value.charAt(0).toUpperCase() + value.slice(1)
                        }
                        placeholder={
                          value.charAt(0).toUpperCase() + value.slice(1)
                        }
                        {...form.getInputProps(value)}
                        rightSection={
                          <Text c={"dimmed"}>
                            {units[value as keyof typeof units] || ""}
                          </Text>
                        }
                      />
                    </Grid.Col>
                  )
                )}

                <Grid.Col span={12}>
                  <Button
                    type="submit"
                    w={"100%"}
                    leftSection={
                      <ThemeIcon>
                        <IconEdit />
                      </ThemeIcon>
                    }
                  >
                    Update Part
                  </Button>
                </Grid.Col>
              </Grid>
            </form>
          </Stack>
        </Paper>
      </SimpleGrid>{" "}
    </Paper>
  );
}
