import { Paper, Group, NumberInput, Select } from "@mantine/core";
import { unit } from "mathjs";
import { useState, forwardRef, useImperativeHandle } from "react";

import { create, all } from "mathjs";

const math = create(all);
interface ValueSearchProps {
  valueType: ValueType;
}
type UnitPrefixes =
  | "p"
  | "n"
  // | "μ"
  | "u"
  | "m"
  | ""
  | "k"
  | "M"
  | "G"
  | "T"
  | "P"
  | "E"
  | "Z"
  | "Y";
type ValueType =
  | "voltage"
  | "current"
  | "resistance"
  | "power"
  | "frequency"
  | "capacitance"
  | "inductance"; // Add more value types here

const prefixes: UnitPrefixes[] = [
  "p",
  "n",
  // "μ",
  "u",
  "m",
  "",
  "k",
  "M",
  "G",
  "T",
  "P",
  "E",
  "Z",
  "Y",
];
const baseUnits: Record<ValueType, string> = {
  voltage: "V",
  current: "A",
  resistance: "Ω",
  power: "W",
  frequency: "Hz",
  capacitance: "F",
  inductance: "H",
};

const units: Record<ValueType, string[]> = Object.keys(baseUnits).reduce(
  (acc, key) => {
    acc[key as ValueType] = prefixes.map(
      (prefix) => prefix + baseUnits[key as ValueType]
    );
    return acc;
  },
  {} as Record<ValueType, string[]>
);

const operations = ["=", "<", ">", "<=", ">="];

export interface ValueSearchRef {
  getSearchParameters: () => { value: number | null; operation: string | null };
  clear: () => void;
}

const ValueSearch = forwardRef<ValueSearchRef, ValueSearchProps>(
  ({ valueType }, ref) => {
    const [value, setValue] = useState<number | null>(null);
    const [unit, setUnit] = useState<string | null>(baseUnits[valueType]);
    const [operation, setOperation] = useState<string | null>(operations[0]);

    useImperativeHandle(ref, () => ({
      getSearchParameters: () => {
        let siValue = value;
        if (value !== null && unit !== null && valueType !== "capacitance") {
          let adjustedUnit = unit;
          if (unit === "Ω") {
            adjustedUnit = "ohm";
          }
          siValue = math.unit(value, adjustedUnit).toSI().value;
        }
        if (valueType === "capacitance" && value !== null && unit !== null) {
          siValue = math.unit(value, unit).toNumber("pF");
        }
        if (valueType === "inductance" && value !== null && unit !== null) {
          siValue = math.unit(value, unit).toNumber("uH");
        }
        return { value: siValue, operation };
      },
      clear: () => {
        setValue(null);
        setUnit(baseUnits[valueType]);
        setOperation(operations[0]);
      },
    }));

    return (
      <Paper withBorder>
        <Group gap={0}>
          <Select
            data={operations}
            value={operation}
            onChange={setOperation}
            w={"20%"}
            size="sm"
            radius={0}
            rightSection={<></>}
            rightSectionWidth={0}
            rightSectionPointerEvents="none"
          />
          <NumberInput
            placeholder={valueType.charAt(0).toUpperCase() + valueType.slice(1)}
            value={value ?? ""}
            onChange={(value) => setValue(Number(value))}
            w={"55%"}
            size="sm"
            radius={0}
          />
          <Select
            data={units[valueType]}
            value={unit}
            onChange={setUnit}
            w={"25%"}
            size="sm"
            radius={0}
            rightSection={<></>}
            rightSectionWidth={0}
            rightSectionPointerEvents="none"
          />
        </Group>
      </Paper>
    );
  }
);
ValueSearch.displayName = "ValueSearch";
export default ValueSearch;
