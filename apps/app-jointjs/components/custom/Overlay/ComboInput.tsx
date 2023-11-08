import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  MouseEvent,
} from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Option {
  value: string;
  label: string;
}

interface ComboInputProps {
  options: Option[];
  defaultValue?: string;
  onChange: (selectedValue: string) => void;
  placeholder?: string;
  clearable?: boolean;
  required?: boolean;
}

const ComboInput: React.FC<ComboInputProps> = ({
  options,
  defaultValue,
  onChange,
  placeholder = "Select an option...",
  clearable = false,
  required = false,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setOpen(false);
  };

  const handleClear = (e: MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setOpen(false);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
          onClick={() => setOpen(!open)}
        >
          {defaultValue ? (
            <div className="flex items-center">
              {options.find((option) => option.value === defaultValue)?.label}
              {clearable && (
                <button onClick={handleClear}>
                  <X className="w-4 h-4 ml-2 opacity-50 cursor-pointer" />
                </button>
              )}
            </div>
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            ref={inputRef}
            placeholder="Search..."
            value={search}
            onValueChange={(value) => setSearch(value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setOpen(false);
              } else if (e.key === "Enter") {
                if (filteredOptions.length === 1) {
                  handleSelect(filteredOptions[0].value);
                }
              }
            }}
            required={required}
          />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandGroup>
            {filteredOptions.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => handleSelect(option.value)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    defaultValue === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboInput;

export type { ComboInputProps, Option };
