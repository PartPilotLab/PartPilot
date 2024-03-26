import { Paper, Group, NumberInput, Select } from "@mantine/core";
import { unit } from "mathjs";
import { useState, forwardRef, useImperativeHandle } from "react";

import { create, all } from "mathjs";
//Todos: pay attention to nF; get initial value from autocomplete (and type in case of capacitance); 

const math = create(all);
interface UnitFormProps {
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
  | "capacitance"; // Add more value types here

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


export interface UnitFormRef {
  getSearchParameters: () => { value: number | null };
  setValue: (value: number | null, unit?: string) => void;
  clear: () => void;
}

const UnitForm = forwardRef<UnitFormRef, UnitFormProps>(
  ({ valueType }, ref) => {
    const [value, setValue] = useState<number | null>(null);
    const [unit, setUnit] = useState<string | null>(baseUnits[valueType]);

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
        return { value: siValue };
      },
      setValue: (value: number | null, unit?: string) => {
        if(unit) {
          setUnit(unit)
        }
        setValue(value)
      },
      clear: () => {
        setValue(null);
        setUnit(baseUnits[valueType]);
      },
    }));

    return (
      <Paper withBorder>
        <Group gap={0}>
          <NumberInput
            placeholder={valueType.charAt(0).toUpperCase() + valueType.slice(1)}
            value={value ?? ""}
            onChange={(value) => setValue(Number(value))}
            w={"75%"}
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
            rightSection={null}
          />
        </Group>
      </Paper>
    );
  }
);
UnitForm.displayName = "UnitForm";
export default UnitForm;
