"use client";

import ComboInput, { Option } from "@/components/custom/ComboInput";
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
import { ScrollArea } from "@/components/ui/scroll-area";

type Field = {
  name: string;
  label: string;
  description: string;
  type:
    | "text"
    | "number"
    | "select"
    | "checkbox"
    | "radio"
    | "date"
    | "range"
    | "combo"
    | "switch";
  options?: Option[];
  defaultUnit?: string;
  defaultValue: number | string | boolean;
  step?: number;
  min?: number;
  max?: number;
  required: boolean;
};

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

const DynamicSidebar: React.FC<DynamicSidebarProps> = ({ data, ...props }) => {
  const [formData, setFormData] = useState<FormData>(
    data[0].fields.reduce((acc, field) => {
      acc[field.name] = field.defaultValue;
      return acc;
    }, {} as FormData)
  );

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
          //   <input
          //     type="text"
          //     id={field.name}
          //     onChange={(e) => handleInputChange(field.name, e.target.value)}
          //   />
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
          //   <input
          //     type="number"
          //     id={field.name}
          //     defaultValue={field.defaultValue as number}
          //     step={field.step}
          //     min={field.min}
          //     max={field.max}
          //     onChange={(e) => handleInputChange(field.name, +e.target.value)}
          //   />
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
          //   <input
          //     type="checkbox"
          //     id={field.name}
          //     onChange={(e) => handleInputChange(field.name, e.target.checked)}
          //   />
          // <Checkbox
          //                     checked={field.value?.includes(item.id)}
          //                     onCheckedChange=
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
          //   <div>
          //     <input
          //       type="radio"
          //       id={field.name}
          //       value={field.defaultValue as string}
          //       name={field.name}
          //       onChange={(e) => handleInputChange(field.name, e.target.value)}
          //     />
          //     <label htmlFor={field.name}>{field.label}</label>
          //   </div>

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
          //   <input
          //     type="range"
          //     id={field.name}
          //     defaultValue={field.defaultValue as number}
          //     step={field.step}
          //     min={field.min}
          //     max={field.max}
          //     onChange={(e) => handleInputChange(field.name, +e.target.value)}
          //   />
          //   <Slider
          //     defaultValue={[50]}
          //     max={100}
          //     step={1}
          //     className={cn("w-[60%]", className)}
          //     {...props}
          //   />
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
    <Card className={cn("w-fit", props.className)}>
      <CardHeader>
        <CardTitle>{data[0].name}</CardTitle>
        <CardDescription>{data[0].description}</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4 overflow-y-auto">
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

      <CardFooter>
        <Button variant="default" onClick={handleSubmit}>
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DynamicSidebar;
