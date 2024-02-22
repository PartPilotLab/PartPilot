"use client";
import { Button, Group, Stack, Table, Text, TextInput } from "@mantine/core";
import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import onScan from "onscan.js";
import { PartState } from "@/lib/helper/part_state";

declare global {
  interface Window {
    scan: any;
  }
}

export interface ScannerPartState {
  pbn?: string;
  on?: string;
  pc: string;
  pm: string;
  qty: number;
  pdi?: string;
}

export default function DashboardPage({
  loadedParts,
}: {
  loadedParts: PartState[];
}) {
  const [scannerInput, setScannerInput] = useState<string | null>();
  const [manualScannerInput, setManualScannerInput] = useState<string>("");
  const [parts, setParts] = useState<PartState[]>(loadedParts);
  // const [partState, setPartState] = useState<PartState | null>();
  let code = "";
  let reading = false;

  if (typeof document !== "undefined") {
    if (onScan.isAttachedTo(document) == false) {
      console.log("attaching onScan");
      onScan.attachTo(document, {
        suffixKeyCodes: [13], // enter-key expected at the end of a scan
        // reactToPaste: true, // Compatibility to built-in scanners in paste-mode (as opposed to keyboard-mode)
        // timeBeforeScanTest: 3,
        // avgTimeByChar: 1,
        // scanButtonLongPressTime: 20,
        keyCodeMapper: function (oEvent) {
          if (oEvent.keyCode === 190) {
            return ":";
          }
          if (oEvent.keyCode === 188) {
            return ",";
          }
          return onScan.decodeKeyEvent(oEvent);
        },
        onScan: function (sCode, iQty) {
          setScannerInput(sCode);
        },
        onKeyDetect: function (iKeyCode, event) {
          // output all potentially relevant key events - great for debugging!
          console.log("Pressed: " + iKeyCode + " --.--" + event.key);
        },
      });
    } else {
      console.log("onScan already attached to document");
    }
  }
  function scannerInputToType(partScannerInput: string): ScannerPartState {
    var json = {} as { [key: string]: string };
    if (partScannerInput) {
      partScannerInput.split(",").forEach((item) => {
        var key = item.split(":")[0];
        var value = item.split(":")[1];
        json[key] = value;
        // json.push({[key]: value})
      });
      var pmVal = json.pm;
      var qtyVal = json.qty;
      var pdi = json.pdi;
      var pc = json.pc;
      var on = json.on;
      var pbn = json.pbn;

      return { pm: pmVal, qty: Number(qtyVal), pdi, pc, on, pbn };
    }
    return { pm: "", qty: 0, pc: "" };
  }

  async function getPartInfoFromLCSC(pc: string, quantity: number) {
    // fetch part info from LCSC
    // return part info
    try {
      const res = await fetch("/api/parts", {
        method: "POST",
        body: JSON.stringify({ pc: pc, quantity }),
      }).then((response) =>
        response
          .json()
          .then((data) => ({ status: response.status, body: data }))
      );
      if (res.status !== 200) {
        throw new Error(res.body.message);
      }
      console.log(res.body);
    } catch (e: ErrorCallback | any) {
      console.error(e.message);
    }
  }

  const formatVoltage = (voltage: any) => `${voltage} V`;
  const formatResistance = (resistance: any) => `${resistance} Ω`;
  const formatPower = (power: any) => `${power} W`;
  const formatCurrent = (current: any) => `${current} A`;
  const formatFrequency = (frequency: any) => `${frequency} Hz`;
  const formatCapacitance = (capacitance: any) => `${capacitance} F`;

  useEffect(() => {
    if (scannerInput) {
      let scanJson = JSON.parse(JSON.stringify(scannerInput));
      if (scanJson) {
        let partInfo = scannerInputToType(scanJson);

        getPartInfoFromLCSC(partInfo.pc, partInfo.qty);
      }
    }
  }, [scannerInput]);

  return (
    <Stack gap={"sm"} style={{ overflowX: "hidden" }}>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
      ></motion.div>
      {/* <div id="scanner-input">Scanner input:</div> */}
      <Group>
      <TextInput placeholder="Manual input" onChange={(event) => {setManualScannerInput(event.currentTarget.value)}} value={manualScannerInput}/>
        <Button onClick={() => {
           if (manualScannerInput) {
            let scanJson = JSON.parse(JSON.stringify(manualScannerInput));
            if (scanJson) {
              let partInfo = scannerInputToType(scanJson);
      
              getPartInfoFromLCSC(partInfo.pc, partInfo.qty);
            }
            setManualScannerInput("");
          }
        }}>Manual Add</Button>
        <Text>Input: </Text>
        <Text>{scannerInput}</Text>
        
      </Group>
      {parts && (
          <Table.ScrollContainer minWidth={500}>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Image</Table.Th>
                  <Table.Th>ID</Table.Th>
                  <Table.Th>Title</Table.Th>
                  <Table.Th>ProductCode</Table.Th>
                  <Table.Th>Quantity</Table.Th>
                  <Table.Th>ProductID</Table.Th>
                  <Table.Th>ProductModel</Table.Th>
                  <Table.Th>ProductDescription</Table.Th>
                  <Table.Th>ParentCatalogName</Table.Th>
                  <Table.Th>CatalogName</Table.Th>
                  <Table.Th>BrandName</Table.Th>
                  <Table.Th>EncapStandard</Table.Th>
                  {/* <Table.Th>ProductImages</Table.Th> */}
                  <Table.Th>PdfLink</Table.Th>
                  <Table.Th>ProductLink</Table.Th>
                  {/* <Table.Th>Prices</Table.Th> */}
                  <Table.Th>Price</Table.Th>
                  <Table.Th>Voltage</Table.Th>
                  <Table.Th>Resistance</Table.Th>
                  <Table.Th>Power</Table.Th>
                  <Table.Th>Current</Table.Th>
                  <Table.Th>Tolerance</Table.Th>
                  <Table.Th>Frequency</Table.Th>
                  <Table.Th>Capacitance</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {parts.map((element) => (
                  <Table.Tr key={element.id}>
                    <Table.Td>
                      <img
                        src={element.productImages[0]}
                        alt={element.title}
                        width="100"
                        height="100"
                      />
                    </Table.Td>
                    <Table.Td>{element.id}</Table.Td>
                    <Table.Td>{element.title}</Table.Td>
                    <Table.Td>{element.productCode}</Table.Td>
                    <Table.Td>{element.quantity}</Table.Td>
                    <Table.Td>{element.productId}</Table.Td>
                    <Table.Td>{element.productModel}</Table.Td>
                    <Table.Td>{element.productDescription}</Table.Td>
                    <Table.Td>{element.parentCatalogName}</Table.Td>
                    <Table.Td>{element.catalogName}</Table.Td>
                    <Table.Td>{element.brandName}</Table.Td>
                    <Table.Td>{element.encapStandard}</Table.Td>
                    {/* <Table.Td>{element.productImages.join(", ")}</Table.Td> */}
                    <Table.Td>{element.pdfLink}</Table.Td>
                    <Table.Td>{element.productLink}</Table.Td>
                    {/* <Table.Td>
                    {element.prices
                      .map((price) => `${price.ladder}: ${price.price}`)
                      .join(", ")}
                  </Table.Td> */}
                    <Table.Td>{element.prices.at(0)?.price}</Table.Td>
                    <Table.Td>{formatVoltage(element.voltage)}</Table.Td>
                    <Table.Td>{formatResistance(element.resistance)}</Table.Td>
                    <Table.Td>{formatPower(element.power)}</Table.Td>
                    <Table.Td>{formatCurrent(element.current)}</Table.Td>
                    <Table.Td>{element.tolerance}</Table.Td>
                    <Table.Td>{formatFrequency(element.frequency)}</Table.Td>
                    <Table.Td>
                      {formatCapacitance(element.capacitance)}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        )}
      <Button
        onClick={() => {
          onScan.simulate(document, "1234567890123");
        }}
      >
        Test it
      </Button>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.6 }}
      ></motion.div>
    </Stack>
  );
}
