"use client";
export const dynamic = "force-dynamic";
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
  LoadingOverlay,
  Select,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { scannerInputToType } from "../dashboardPage";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { IconChevronLeft, IconInfoCircle, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Carousel } from "@mantine/carousel";
import UnitForm, { UnitFormRef } from "@/lib/components/unit/UnitForm";

export default function Add() {
  const [isLoading, setLoading] = useState(false);
  //TODO: integrate the UnitForm more efficiently by directly changing the form value from UnitForm
  const form = useForm({
    initialValues: {
      title: undefined,
      quantity: 1,
      productId: undefined,
      productCode: undefined,
      productModel: undefined,
      productDescription: undefined,
      parentCatalogName: undefined,
      catalogName: undefined,
      brandName: undefined,
      encapStandard: undefined,
      productImages: [],
      pdfLink: undefined,
      productLink: undefined,
      tolerance: undefined,
      voltage: undefined,
      resistance: undefined,
      power: undefined,
      current: undefined,
      frequency: undefined,
      capacitance: undefined,
      inductance: undefined,
      prices: [] as {
        ladder: string;
        price: number;
      }[],
    },
    validate: {
      productCode: (value) =>
        value && value.length > 0 ? null : "Product Code is required",
    },
  });

  const [scannerInput, setScannerInput] = useState("");
  const [productCode, setProductCode] = useState("");
  const [provider, setProvider] = useState<string | null>("LCSC");
  const [availableProviders, setAvailableProviders] = useState<string[]>(["LCSC"]);

  useEffect(() => {
    fetch("/api/providers")
      .then((res) => res.json())
      .then((data) => {
        setAvailableProviders(data);
      })
      .catch((e) => console.error(e));
  }, []);

  //When the user presses the Autocomplete Button
  async function handleAutocomplete() {
    //Firstly checking of there is a valid input by the scanner form
    const partInfoFromScanner = scannerInputToType(
      JSON.parse(JSON.stringify(scannerInput)) ?? ""
    );
    const validScannerInput =
      partInfoFromScanner.pc != "" && partInfoFromScanner.pc;
    //Checking of there is a valid input
    if (productCode != "" || validScannerInput) {
      //Using the scanner product code if both are given
      let productCodeInternal = partInfoFromScanner.pc
        ? partInfoFromScanner.pc
        : productCode;
      setLoading(true);

      const response = await fetch("/api/parts/autocomplete", {
        method: "POST",
        body: JSON.stringify({
          productCode: productCodeInternal,
          provider: provider,
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
              if (key == "quantity") {
                //If quantity is received from the scanner
                if (partInfoFromScanner.qty) {
                  form.setFieldValue(key, partInfoFromScanner.qty);
                }
                //If I receive a quantity, but not from the scanner --> do nothing
              } else if (refMapping.hasOwnProperty(key)) {
                // If the key corresponds to a ref, update the value of the corresponding UnitForm
                if (key == "capacitance") {
                  refMapping[key].current.setValue(
                    response.body.body[key],
                    "pF"
                  );
                } else if (key == "inductance") {
                  refMapping[key].current.setValue(
                    response.body.body[key],
                    "mH"
                  );
                } else {
                  refMapping[key].current.setValue(response.body.body[key]);
                }
              } else {
                form.setFieldValue(key, response.body.body[key]);
              }
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
    setLoading(false);
  }

  async function addPart() {
    //If the user presses on add part: check if from is valid
    form.validate();
    setLoading(true);
    if (form.isValid()) {
      //Making an object ob the form (to then update it later)
      let currentPartInfo = form.values || ({} as any);
      if (currentPartInfo) {
        currentPartInfo.voltage =
          voltageFormRef.current?.getSearchParameters().value;
        currentPartInfo.resistance =
          resistanceFormRef.current?.getSearchParameters().value;
        currentPartInfo.power =
          powerFormRef.current?.getSearchParameters().value;
        currentPartInfo.current =
          currentFormRef.current?.getSearchParameters().value;
        currentPartInfo.frequency =
          frequencyFormRef.current?.getSearchParameters().value;
        currentPartInfo.capacitance =
          capacitanceFormRef.current?.getSearchParameters().value;
        currentPartInfo.inductance =
          inductanceFormRef.current?.getSearchParameters().value;
      }
      const response = await fetch("/api/parts/create", {
        method: "POST",
        body: JSON.stringify(form.values),
      }).then((response) =>
        response
          .json()
          .then((data) => ({ status: response.status, body: data }))
      );
      console.log(response);
      if (response.status == 200) {
        notifications.show({
          title: "Part Add Successful",
          message: `The part ${form.values.productCode} was added.`,
          color: "green",
        });
        form.reset();
      } else {
        if (response.status == 500) {
          notifications.show({
            title: "Part Add Failed",
            message: `The part could not be added. Please try again.`,
            color: "red",
          });
        } else if (response.status == 409) {
          notifications.show({
            title: "Part Add Failed",
            message: `The part ${form.values.productCode} already exists.`,
            color: "red",
          });
        } else {
          notifications.show({
            title: "Part Add Failed",
            message: `The part could not be added. Please try again.`,
            color: "red",
          });
        }
      }
    } else {
      notifications.show({
        title: "Part Add Failed",
        message: `Please fill out all required fields.`,
      });
    }
    setLoading(false);
  }

  const router = useRouter();
  const units = {
    voltage: "V",
    resistance: "Ω",
    power: "W",
    current: "A",
    frequency: "Hz",
    capacitance: "nF",
    inductance: "uH",
  };
  // A ref for every unit input to keep track of its state and have the possiblity to get its contents when pressing on add part
  const voltageFormRef = useRef<UnitFormRef>(null);
  const resistanceFormRef = useRef<UnitFormRef>(null);
  const powerFormRef = useRef<UnitFormRef>(null);
  const currentFormRef = useRef<UnitFormRef>(null);
  const frequencyFormRef = useRef<UnitFormRef>(null);
  const capacitanceFormRef = useRef<UnitFormRef>(null);
  const inductanceFormRef = useRef<UnitFormRef>(null);
  const refMapping = {
    voltage: voltageFormRef,
    resistance: resistanceFormRef,
    power: powerFormRef,
    current: currentFormRef,
    frequency: frequencyFormRef,
    capacitance: capacitanceFormRef,
    inductance: inductanceFormRef,
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
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ blur: 5, opacity: 0.5 }}
      />
      <SimpleGrid cols={{ sm: 1, md: 2 }}>
        <Carousel withIndicators height={"100%"}>
          {form.values.productImages.length == 0 ? (
            <Carousel.Slide>
              <Image
                p={"lg"}
                src={"/images/image-add.svg"}
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
            <form onSubmit={form.onSubmit(async (values) => await addPart())}>
              <Grid gutter={4}>
                <Grid.Col span={12}>
                  <Paper p={"sm"} shadow="sm">
                    <Group justify="space-between" pb={4}>
                      <Text>Autocomplete: </Text>
                      <Tooltip label={`Autocomplete For ${provider}`}>
                        <ThemeIcon>
                          <IconInfoCircle />
                        </ThemeIcon>
                      </Tooltip>
                    </Group>
                    <Grid>
                      <Grid.Col span={12}>
                        <Select
                          data={availableProviders}
                          value={provider}
                          onChange={setProvider}
                          allowDeselect={false}
                          placeholder="Provider"
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <TextInput
                          placeholder="Scanner Input"
                          value={scannerInput ?? ""}
                          onChange={(event) => {
                            setScannerInput(event.currentTarget.value);
                          }}
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <TextInput
                          placeholder="Product Code"
                          value={productCode ?? ""}
                          onChange={(event) => {
                            setProductCode(event.currentTarget.value);
                          }}
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
                                        value={price.ladder ?? ""}
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
                                        value={price.price ?? ""}
                                        min={0}
                                        p={0}
                                        w={"50%"}
                                        step={0.1}
                                        prefix="$"
                                        variant="unstyled"
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
                  ) : value == "productId" ? (
                    <Grid.Col span={6} key={value}>
                      <NumberInput
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
                  ) : units[value as keyof typeof units] ? (
                    <Grid.Col span={6} key={value}>
                      <UnitForm
                        valueType={value as keyof typeof units}
                        ref={refMapping[value]}
                      />
                    </Grid.Col>
                  ) : (
                    <Grid.Col span={6} key={value}>
                      <TextInput
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
