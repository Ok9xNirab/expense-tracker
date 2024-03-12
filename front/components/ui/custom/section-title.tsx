import { PropsWithChildren } from "react";

export default function SectionTitle({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <h3 className={`font-bold text-4xl text-zinc-200 ${className}`}>
      {children}
    </h3>
  );
}
