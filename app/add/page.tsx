"use client";
import {
  Paper,
  Group,
  Center,
  Tabs,
  Text,
  Stack,
  TextInput,
  Button,
  SimpleGrid,
  Grid,
  NumberInput,
  ActionIcon,
  Tooltip,
  Flex,
  Image,
  ThemeIcon,
} from "@mantine/core";
import { useRef, useState } from "react";
import { scannerInputToType } from "../dashboardPage";
import { notifications } from "@mantine/notifications";
import { PartState } from "@/lib/helper/part_state";
import { useForm } from "@mantine/form";
import { IconChevronLeft, IconInfoCircle, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Carousel } from "@mantine/carousel";

export default function Add() {
  const form = useForm({
    initialValues: {
      title: "",
      quantity: undefined,
      productId: undefined,
      productCode: "",
      productModel: "",
      productDescription: "",
      parentCatalogName: "",
      catalogName: "",
      brandName: "",
      encapStandard: "",
      productImages: [],
      pdfLink: "",
      productLink: undefined,
      tolerance: undefined,
      voltage: undefined,
      resistance: undefined,
      power: undefined,
      current: undefined,
      frequency: undefined,
      capacitance: undefined,
      prices: [] as {
        ladder: string;
        price: number;
      }[],
    },
    validate: {
      productCode: (value) => value.length > 0,
    },
  });

  const inputRefs = {
    scannerInput: useRef<HTMLInputElement>(null),
    productCode: useRef<HTMLInputElement>(null),
    // Add more refs as needed
  };

  async function handleAutocomplete() {
    const scannerInput = inputRefs.scannerInput.current?.value;
    const productCode = inputRefs.productCode.current?.value;
    const partInfoFromScanner = scannerInputToType(scannerInput ?? "");
    const validScannerInput =
      partInfoFromScanner.pc != "" && partInfoFromScanner.pc;

    if (productCode != "" || validScannerInput) {
      let productCodeInternal = productCode ?? partInfoFromScanner.pc;
      let quantity = partInfoFromScanner.qty;

      const response = await fetch("/api/parts/autocomplete", {
        method: "POST",
        body: JSON.stringify({
          productCode: productCodeInternal,
          quantity: quantity,
        }),
      }).then((response) =>
        response
          .json()
          .then((data) => ({ status: response.status, body: data }))
      );
      if (response.body.status == 200) {
        notifications.show({
          title: "Autocomplete Successful",
          message: `The product code ${productCodeInternal} was found.`,
        });
        console.log(response.body.body);
        if (response.body.body) {
          Object.keys(response.body.body).forEach((key) => {
            //check if exists, otherwise dont create
            if (form.values.hasOwnProperty(key)) {
              form.setFieldValue(key, response.body.body[key]);
            }
          });
        }
      } else {
        notifications.show({
          title: "Autocomplete Failed",
          message: `The product code ${productCodeInternal} was not found. Please enter a valid product code or scanner input`,
        });
      }
    } else {
      notifications.show({
        title: "Autocomplete Failed",
        message: `Please enter a valid scanner input or product code.`,
      });
      return;
    }
    // const response = await fetch("/api/parts/autocomplete", {
    //   method: "POST",
    //   body: JSON.stringify({ scannerInput, productCode }),
    // });
    // const data = await response.json();
    // setFormData(data);
  }
  const router = useRouter();
  const units = {
    voltage: "V",
    resistance: "Ω",
    power: "W",
    current: "A",
    frequency: "Hz",
    capacitance: "nF",
  };

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
      <SimpleGrid cols={2}>
        <Carousel withIndicators height={"100%"}>
          {form.values.productImages.map((image, index) => (
            <Carousel.Slide key={index}>
              <Image src={image} alt="Product Images" fit="contain" />
            </Carousel.Slide>
          ))}
          {/* <Carousel.Slide>1</Carousel.Slide>
            <Carousel.Slide>2</Carousel.Slide>
            <Carousel.Slide>3</Carousel.Slide> */}
        </Carousel>
        <Paper p={"sm"}>
          <Stack p={"sm"}>
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
              <Grid gutter={4}>
                <Grid.Col span={12}>
                  <Paper p={"sm"} shadow="sm">
                    <Group justify="space-between"  pb={4}>
                      <Text>Autocomplete: </Text>
                      <Tooltip label="Autocomple For LCSC">
                      <ThemeIcon>
                        <IconInfoCircle />
                      </ThemeIcon></Tooltip>
                    </Group>
                    <Grid>
                      <Grid.Col span={6}>
                        <TextInput
                          placeholder="Scanner Input"
                          ref={inputRefs.scannerInput}
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <TextInput
                          placeholder="Product Code"
                          ref={inputRefs.productCode}
                        />
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <Button
                          w={"100%"}
                          onClick={() => {
                            handleAutocomplete();
                          }}
                        >
                          Autocomplete
                        </Button>
                      </Grid.Col>
                    </Grid>
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
                          {/* {Object.entries(form.values.prices).map((value) => {return (<Text>{value}</Text>)})} */}
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
                                {/* <Text>
                                    Ladder: {price.ladder}, price: {price.price}
                                  </Text> */}
                                {/* <button onClick={() => deletePrice(ladder)}>Delete</button> */}
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
                  <Button type="submit" w={"100%"}>
                    Add Part
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
