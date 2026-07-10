import { LoaderCircle } from "lucide-react";

type LoaderProps = {
  size?: number;
  label?: string;
  className?: string;
};

export default function Loader({
  size = 32,
  label = "Loading...",
  className = "",
}: LoaderProps) {
  return (
    <div role="status" className={className}>
      <LoaderCircle
        className="animate-spin text-neutral-tertiary"
        size={size}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}