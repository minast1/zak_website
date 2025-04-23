import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

type TProps = {
  value: string;
  onChange: (val: string) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">;

const DebouncedSearchInput = ({
  value: initialValue,
  onChange,
  debounce = 400,
  ...props
}: TProps) => {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [debounce, onChange, value]);

  return (
    // <input
    //   //{...props}
    //   value={value}
    //   onChange={(event) => setValue(event.target.value)}
    //   placeholder="Search Posts..."
    //   className="w-1/2 p-2 border border-gray-400 rounded-md focus:outline-gray-400 focus:ring-none focus:ring-transparent focus:border-transparent"
    // />
    <div className="relative flex-1 md:grow-0">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        value={value}
        type="search"
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search Posts..."
        className="w-full rounded-lg bg-background pl-8 md:w-[400px] lg:w-[500px]"
      />
    </div>
  );
};

export default DebouncedSearchInput;
