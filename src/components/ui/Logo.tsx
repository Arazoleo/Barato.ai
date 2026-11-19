import { ShoppingCart } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <ShoppingCart className="size-9 text-accent-500" strokeWidth={2.2} aria-hidden />
      <div className="leading-tight text-white">
        <span className="block text-base font-medium">Grupo</span>
        <span className="block text-xl font-bold">
          Barato<span className="text-accent-500">.ai</span>
        </span>
      </div>
    </div>
  );
}
