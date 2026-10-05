import type { ComponentPropsWithRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { fieldControlClass } from "./Input";

interface SelectProps extends ComponentPropsWithRef<"select"> {
  options: readonly string[];
  placeholder: string;
}

/** Native select styled like the inputs, with a Lucide chevron. */
export function Select({ options, placeholder, className, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select className={cn(fieldControlClass, "appearance-none pr-10", className)} {...props}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        size={18}
        className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-ink-400"
        aria-hidden="true"
      />
    </div>
  );
}
