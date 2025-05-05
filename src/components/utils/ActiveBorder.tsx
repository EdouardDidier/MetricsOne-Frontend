"use client";

import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";

interface HoverBorderProps {
  hoverColour: string;
  children: ReactNode;
  currentPath: string;
  className?: string;
}

export default function ActiveBorder({
  hoverColour,
  children,
  currentPath,
  className,
}: HoverBorderProps) {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div
      className={className}
      onMouseDown={() => setIsHovered(true)}
      onMouseUp={() => setIsHovered(false)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderColor: pathname == currentPath || isHovered ? hoverColour : "",
      }}
    >
      {children}
    </div>
  );
}
