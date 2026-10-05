import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/** The site's centred 1180px content column. */
export function Container({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("container-site", className)} {...props} />;
}
