"use client";
import { Button, Group, Stack, Text } from "@mantine/core";
import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import onScan from "onscan.js";

declare global {
  interface Window {
    scan: any;
  }
}

export default function DashboardPage() {
  const [scannerInput, setScannerInput] = useState<string | null>();
  let code = "";
  let reading = false;

  // useEffect(() => {
  //   console.log("useEffect");
  //   if (onScan.isAttachedTo(document) == false) {
  //     console.log("attaching onScan");
  //     onScan.attachTo(document, {
  //       suffixKeyCodes: [13], // enter-key expected at the end of a scan
  //       reactToPaste: true, // Compatibility to built-in scanners in paste-mode (as opposed to keyboard-mode)
  //       timeBeforeScanTest: 3,
  //       avgTimeByChar: 1,
  //       scanButtonLongPressTime: 20,

  //       // onScan: function (sCode, iQty) {
  //       //   // Alternative to document.addEventListener('scan')
  //       //   console.log("SCANNED!!")
  //       //   console.log("Scanned: " + sCode);
  //       // },
  //       onScan: function (sCode, iQty) {
  //         // Alternative to document.addEventListener('scan')
  //         console.log("SCANNED!!");
  //         console.log("Scanned: " + sCode);
  //       },
  //       onKeyDetect: function (iKeyCode) {
  //         // output all potentially relevant key events - great for debugging!
  //         // console.log("Pressed: " + iKeyCode);
  //       },
  //     });
  //   } else {
  //     console.log("onScan already attached to document");
  //     onScan.setOptions(document, {
  //       suffixKeyCodes: [13], // enter-key expected at the end of a scan
  //       reactToPaste: true, // Compatibility to built-in scanners in paste-mode (as opposed to keyboard-mode)
  //       timeBeforeScanTest: 3,
  //       avgTimeByChar: 1,
  //       scanButtonLongPressTime: 20,

  //       // onScan: function (sCode, iQty) {
  //       //   // Alternative to document.addEventListener('scan')
  //       //   console.log("SCANNED!!")
  //       //   console.log("Scanned: " + sCode);
  //       // },
  //       onScan: function (sCode, iQty) {
  //         // Alternative to document.addEventListener('scan')
  //         console.log("SCANNED!!");
  //         console.log("Scanned: " + sCode);
  //       },
  //     });
  //   }

  // }, []);
  if (typeof document !== "undefined") {
    if (onScan.isAttachedTo(document) == false) {
      console.log("attaching onScan");
      onScan.attachTo(document, {
        suffixKeyCodes: [13], // enter-key expected at the end of a scan
        // reactToPaste: true, // Compatibility to built-in scanners in paste-mode (as opposed to keyboard-mode)
        // timeBeforeScanTest: 3,
        // avgTimeByChar: 1,
        // scanButtonLongPressTime: 20,

        // onScan: function (sCode, iQty) {
        //   // Alternative to document.addEventListener('scan')
        //   console.log("SCANNED!!")
        //   console.log("Scanned: " + sCode);
        // },
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
          // Alternative to document.addEventListener('scan') 
          console.log("SCANNED!!");
          console.log("Scanned: " + sCode + " " + iQty);
          setScannerInput(sCode);
        },
        onKeyDetect: function (iKeyCode, event) {
          // output all potentially relevant key events - great for debugging!
          console.log("Pressed: " + iKeyCode + " --.--" + event.key);
          // console.log(String.fromCharCode((96 <= iKeyCode && iKeyCode <= 105) ? iKeyCode-48 : iKeyCode)
          // );
        },
      });
    } else {
      console.log("onScan already attached to document");
      // onScan.setOptions(document, {
      //   suffixKeyCodes: [13], // enter-key expected at the end of a scan
      //   reactToPaste: true, // Compatibility to built-in scanners in paste-mode (as opposed to keyboard-mode)
      //   timeBeforeScanTest: 3,
      //   avgTimeByChar: 1,
      //   scanButtonLongPressTime: 20,

      //   // onScan: function (sCode, iQty) {
      //   //   // Alternative to document.addEventListener('scan')
      //   //   console.log("SCANNED!!")
      //   //   console.log("Scanned: " + sCode);
      //   // },
      //   onScan: function (sCode, iQty) {
      //     // Alternative to document.addEventListener('scan')
      //     console.log("SCANNED!!");
      //     console.log("Scanned: " + sCode);
      //   },
      // });
    }
  }
  // document.addEventListener("textInput", function (e) {
  //   //@ts-ignore
  //   if (e.data.length >= 6) {
  //     //@ts-ignore
  //     console.log("IR scan textInput", e.data);
  //     e.preventDefault();
  //   }
  // });

  // let UPC = "";
  // document.addEventListener("keydown", function (e) {
  //   console.log("keydown");
  //   const textInput = e.key || String.fromCharCode(e.keyCode);
  //   //@ts-ignore
  //   const targetName = e.target.localName;
  //   let newUPC = "";
  //   if (textInput && textInput.length === 1 && targetName !== "input") {
  //     UPC = UPC + textInput;

  //     if (newUPC.length >= 6) {
  //       console.log("barcode scanned:  ", newUPC);
  //     }
  //   }
  // });

  // //@ts-ignore
  // document.addEventListener("scan", function (sScancode, iQuantity) {
  //   console.log("Scanned from event: " + sScancode);
  //   console.log(sScancode)
  //   // alert(iQuantity + 'x ' + sScancode);
  //   // setScannerInput(sScancode);
  //   // alert(iQuantity + "x " + sScancode);
  // });

  // if(document) {
  //   //@ts-ignore
  //   document.addEventListener('scanComplete', function(e) { console.log(e.detail) })

  //   document.addEventListener('keydown', function(e) {
  //     // add scan property to window if it does not exist
  //     if(!window.hasOwnProperty('scan')) {
  //       window.scan = []
  //     }

  //     // if key stroke appears after 10 ms, empty scan array
  //     if(window.scan.length > 0 && (e.timeStamp - window.scan.slice(-1)[0].timeStamp) > 10) {
  //       window.scan = []
  //     }

  //     // if key store is enter and scan array contains keystrokes
  //     // dispatch `scanComplete` with keystrokes in detail property
  //     // empty scan array after dispatching event
  //     if(e.key === "Enter" && window.scan.length > 0) {
  //       //@ts-ignore
  //       let scannedString = window.scan.reduce(function(scannedString, entry) {
  //         return scannedString + entry.key
  //       }, "")
  //       window.scan = []
  //       return document.dispatchEvent(new CustomEvent('scanComplete', {detail: scannedString}))
  //     }

  //     // do not listen to shift event, since key for next keystroke already contains a capital letter
  //     // or to be specific the letter that appears when that key is pressed with shift key
  //     if(e.key !== "Shift") {
  //       // push `key`, `timeStamp` and calculated `timeStampDiff` to scan array
  //       let data = JSON.parse(JSON.stringify(e, ['key', 'timeStamp']))
  //       data.timeStampDiff = window.scan.length > 0 ? data.timeStamp - window.scan.slice(-1)[0].timeStamp : 0;

  //       window.scan.push(data)
  //     }
  //   })
  // }

  // if (typeof document === "undefined") {
  //   // during server evaluation
  // } else {
  //   if (onScan.isAttachedTo(document) == false) {
  //     onScan.attachTo(document, {
  //       suffixKeyCodes: [13], // enter-key expected at the end of a scan
  //       reactToPaste: true, // Compatibility to built-in scanners in paste-mode (as opposed to keyboard-mode)
  //       timeBeforeScanTest: 3,
  //       avgTimeByChar: 1,
  //       scanButtonLongPressTime: 20,

  //       onScan: function (sCode, iQty) {
  //         // Alternative to document.addEventListener('scan')
  //         console.log("SCANNED!!")
  //         console.log("Scanned: " + sCode);
  //       },
  //       onKeyDetect: function (iKeyCode) {
  //         // output all potentially relevant key events - great for debugging!
  //         console.log("Pressed: " + iKeyCode);
  //       },
  //     });
  //   }
  //   //@ts-ignore
  //   document.addEventListener("scan", function (sScancode, iQuantity) {
  //     console.log("Scanned: " + sScancode);
  //     setScannerInput(sScancode);
  //     // alert(iQuantity + "x " + sScancode);
  //   });
  //   // during client's browser evaluation
  //   // document.addEventListener("keypress", (e) => {
  //   //   //usually scanners throw an 'Enter' key at the end of read
  //   //   if (e.keyCode === 13) {
  //   //     console.log(code);
  //   //     /// code ready to use

  //   //     setScannerInput(code);
  //   //     code = "";
  //   //   } else {
  //   //     code += e.key; //while this is not an 'enter' it stores the every key
  //   //   }

  //   //   //run a timeout of 200ms at the first read and clear everything
  //   //   if (!reading) {
  //   //     reading = true;
  //   //     setTimeout(() => {
  //   //       code = "";
  //   //       reading = false;
  //   //     }, 1000); //200 works fine for me but you can adjust it
  //   //   }
  //   // });

  //   // document.addEventListener('textInput', function (e){
  //   //     //@ts-ignore
  //   //     if(e.data.length >= 6){
  //   //         //@ts-ignore
  //   //         console.log('IR scan textInput', e.data);
  //   //         //@ts-ignore
  //   //         setScannerInput(e.data);
  //   //         // document.querySelector("#scanner-input").innerHTML = "Scanned barcode: " + e.data;

  //   //         e.preventDefault();
  //   //     }
  //   // });
  // }

  // if (document) {

  //   document.addEventListener("keydown", function (e) {
  //       let barcode = ""
  //       let interval = setInterval(() => barcode = "", 20)
  //       // if(interval) clearInterval(interval)
  //       // if(e.code === "Enter") {
  //       //     if(barcode) {
  //       //         handleBarCode(barcode)
  //       //     }
  //       //     barcode = ""
  //       //     return
  //       // }

  //       // if(e.key !== "Shift") {
  //       //     barcode = barcode + e.key
  //       // }
  //       // console.log("keydown")
  //     if (e.key === "Enter") {
  //       console.log("Enter key pressed");
  //       let code = e.code;
  //       console.log(e.detail)
  //       console.log(e)
  //       console.log(code);
  //       // let barcode= String.fromCharCode(code);

  //     }
  //     //   add scan property to window if it does not exist
  //       if (!window.hasOwnProperty("scan")) {
  //         window.scan = [];
  //       }

  //       // if key stroke appears after 10 ms, empty scan array
  //       if (
  //         window.scan.length > 0 &&
  //         e.timeStamp - window.scan.slice(-1)[0].timeStamp > 10
  //       ) {
  //         window.scan = [];
  //       }

  //       // if key store is enter and scan array contains keystrokes
  //       // dispatch `scanComplete` with keystrokes in detail property
  //       // empty scan array after dispatching event
  //       if (e.key === "Enter" && window.scan.length > 0) {
  //         //@ts-ignore
  //         let scannedString = window.scan.reduce(function (scannedString, entry) {
  //           return scannedString + entry.key;
  //         }, "");
  //         window.scan = [];
  //         setScannerInput(scannedString);
  //         return document.dispatchEvent(
  //           new CustomEvent("scanComplete", { detail: scannedString })
  //         );
  //       }

  //       // do not listen to shift event, since key for next keystroke already contains a capital letter
  //       // or to be specific the letter that appears when that key is pressed with shift key
  //       if (e.key !== "Shift") {
  //         // push `key`, `timeStamp` and calculated `timeStampDiff` to scan array
  //         barcode = barcode + e.key
  //         let data = JSON.parse(JSON.stringify(e, ["key", "timeStamp"]));
  //         data.timeStampDiff =
  //           window.scan.length > 0
  //             ? data.timeStamp - window.scan.slice(-1)[0].timeStamp
  //             : 0;

  //         window.scan.push(data);
  //       }
  //       console.log(barcode)
  //   });
  //   document.addEventListener("scanComplete", function (e) {
  //     //@ts-ignore
  //     console.log(e.detail);
  //   });
  // }
  //   useEffect(() => {
  //     let scannedBarcode = '';
  //     if (window) {
  //       window.onkeyup = (e) => {
  //         let barcode = "";
  //         let code = e.keyCode ? e.keyCode : e.which;
  //         barcode = barcode + String.fromCharCode(code);
  //         if (code === ENTER_KEY) {
  //             console.log("DISPATCHING: " + barcode);
  //             scannedBarcode = barcode
  //             barcode = '';
  //           }
  //     };
  //     }
  //   }, []);

  return (
    <Stack gap={"sm"} style={{ overflowX: "hidden" }}>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
      ></motion.div>
      {/* <div id="scanner-input">Scanner input:</div> */}
      <Group>
        <Text>Input: </Text>
        <Text>{scannerInput}</Text>
      </Group>
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
