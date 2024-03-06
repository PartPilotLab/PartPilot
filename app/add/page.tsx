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
} from "@mantine/core";
import { useRef, useState } from "react";
import { scannerInputToType } from "../dashboardPage";
import { notifications } from "@mantine/notifications";
import { PartState } from "@/lib/helper/part_state";

export default function Add() {
  const [formData, setFormData] = useState<PartState>();
  const inputRefs = {
    scannerInput: useRef<HTMLInputElement>(null),
    productCode: useRef<HTMLInputElement>(null),
    title: useRef<any>(null),
    // Add more refs as needed
  };
  function setInputRefs() {
    inputRefs.title.current = formData?.title ?? null;
  }
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
        setFormData(response.body.body);
        setInputRefs();
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

  return (
    <Paper>
      <SimpleGrid cols={2}>
        <Paper>
          <Center>
            <h2>Image</h2>
          </Center>
        </Paper>
        <Paper p={"sm"}>
          <Tabs defaultValue={"automatic"}>
            <Tabs.List>
              <Tabs.Tab value="automatic">Automatic</Tabs.Tab>
              <Tabs.Tab value="manual">Manual</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="automatic">
              <Stack p={"sm"}>
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
                  <Grid.Col span={6}>
                    <TextInput placeholder="Title" ref={inputRefs.title} />
                  </Grid.Col>
                </Grid>
              </Stack>
            </Tabs.Panel>
            <Tabs.Panel value="manual">
              <Text>Manual</Text>
            </Tabs.Panel>
          </Tabs>
        </Paper>
      </SimpleGrid>{" "}
    </Paper>
  );
}
