"use client";

import ComboInput, { Option } from "@/components/custom/Overlay/ComboInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

type BaseField = {
  name: string;
  label: string;
  description: string;
  required: boolean;
};

type TextType = BaseField & {
  type: "text";
  defaultValue: string;
};

type NumberType = BaseField & {
  type: "number";
  options?: Option[];
  defaultUnit?: string;
  defaultValue: number;
  step?: number;
  min?: number;
  max?: number;
};

type SelectType = BaseField & {
  type: "select";
  options: Option[];
  defaultValue: string | number;
};

type CheckboxType = BaseField & {
  type: "checkbox";
  defaultValue: boolean;
};

type RadioType = BaseField & {
  type: "radio";
  options: Option[];
  defaultValue: string | number;
};

type DateType = BaseField & {
  type: "date";
  defaultValue: string;
};

type RangeType = BaseField & {
  type: "range";
  defaultValue: number;
  min: number;
  max: number;
  step: number;
};

type ComboType = BaseField & {
  type: "combo";
  options: Option[];
  defaultValue: string | number;
};

type SwitchType = BaseField & {
  type: "switch";
  defaultValue: boolean;
};

type Field =
  | TextType
  | NumberType
  | SelectType
  | CheckboxType
  | RadioType
  | DateType
  | RangeType
  | ComboType
  | SwitchType;

type Element = {
  mainType: "connector" | "component";
  subType: string;
  name: string;
  description: string;
  fields: Field[];
};

type FormData = Record<string, string | number | boolean>;

type DynamicSidebarProps = {
  data: Element[];
} & React.HTMLAttributes<HTMLDivElement>;

export const DynamicSidebar: React.FC<DynamicSidebarProps> = ({
  data,
  ...props
}) => {
  const initialFormData: FormData = data[0].fields.reduce(
    (acc, field) => ({
      ...acc,
      [field.name]: field.defaultValue,
    }),
    {}
  );

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputChange = (
    field: string,
    value: string | number | boolean
  ) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const renderField = (field: Field) => {
    switch (field.type) {
      case "text":
        return (
          <Input
            type="text"
            id={field.name}
            placeholder={field.label}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            value={formData[field.name] as string}
            required={field.required}
          />
        );
      case "number":
        return (
          <Input
            type="number"
            id={field.name}
            placeholder={field.label}
            value={formData[field.name] as number}
            step={field.step}
            min={field.min}
            max={field.max}
            onChange={(e) => handleInputChange(field.name, +e.target.value)}
            required={field.required}
          />
        );
      case "combo":
        return (
          <ComboInput
            options={field.options as Option[]}
            placeholder={field.label}
            onChange={(selectedValue) =>
              handleInputChange(field.name, selectedValue)
            }
            required={field.required}
          />
        );
      case "select":
        return (
          <Select
            value={formData[field.name] as string}
            required={field.required}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={field.label} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{field.label}</SelectLabel>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      case "checkbox":
        return (
          <Checkbox
            id={field.name}
            checked={formData[field.name] as boolean}
            onCheckedChange={(checked) =>
              handleInputChange(field.name, checked)
            }
            required={field.required}
          />
        );
      case "radio":
        return (
          <RadioGroup
            value={formData[field.name] as string}
            required={field.required}
          >
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      case "date":
        return (
          <input
            type="date"
            id={field.name}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
          />
        );
      case "range":
        return (
          <Slider
            value={[formData[field.name] as number]}
            min={field.min}
            max={field.max}
            step={field.step}
            onValueChange={(value) => handleInputChange(field.name, value[0])}
          />
        );
      case "switch":
        return (
          <Switch
            id={field.name}
            onCheckedChange={(checked) =>
              handleInputChange(field.name, checked)
            }
            checked={formData[field.name] as boolean}
            required={field.required}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    // Handle form submission with formData
    console.log("Form Data:", JSON.stringify(formData, null, 2));
  };

  return (
    <Card className={cn("w-fit flex flex-col", props.className)}>
      <CardHeader>
        <CardTitle>{data[0].name}</CardTitle>
        <CardDescription>{data[0].description}</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4 overflow-y-auto ">
        {data[0].fields.map((field, fieldIndex) => (
          <div
            key={fieldIndex}
            className="grid w-full max-w-sm items-center gap-1.5"
          >
            <Label htmlFor={field.name}>{field.label}</Label>
            {renderField(field)}
          </div>
        ))}
      </CardContent>

      {/* <CardFooter>
        <Button variant="default" onClick={handleSubmit}>
          Submit
        </Button>
      </CardFooter> */}
    </Card>
  );
};
