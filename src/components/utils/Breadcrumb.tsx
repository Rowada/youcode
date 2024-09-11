"use client";

import { useIsClient } from "@/hooks/useIsClient";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import Link from "next/link";
import { Slash } from "lucide-react";

export const BreadcrumbComponent = () => {
  const pathname = usePathname();
  const paths = pathname?.split("/").filter(Boolean) ?? [];

  const isClient = useIsClient();

  if (!isClient) return;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((item, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink asChild>
              <Link href={`/${paths.slice(0, index + 1).join("/")}`}>
                {isPrimaId(item) ? formId(item) : item}
              </Link>
            </BreadcrumbLink>
            {index !== paths.length - 1 && (
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const isPrimaId = (id: string): boolean => {
  const regex = /^[\w-]{25}$/;
  return regex.test(id);
};

const formId = (id: string) => {
  if (id.length <= 4) {
    return id;
  }
  return `${id.slice(0, 2)}...${id.slice(-2)}`;
};
