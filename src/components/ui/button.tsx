import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group inline-flex h-12 items-center justify-center gap-2 rounded-full border px-5 text-sm font-medium transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14f195] disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        primary:
          "border-[#14f195]/40 bg-[#14f195] text-black shadow-[0_0_40px_rgba(20,241,149,0.24)] hover:bg-[#7df9ff]",
        ghost:
          "border-white/12 bg-white/[0.04] text-white hover:border-[#7df9ff]/40 hover:bg-white/[0.08]",
        bare: "h-auto border-transparent bg-transparent px-0 text-white hover:text-[#14f195]"
      }
    },
    defaultVariants: {
      variant: "primary"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  showArrow?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, showArrow = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp className={cn(buttonVariants({ variant, className }))} ref={ref} {...props}>
        <Slottable>{children}</Slottable>
        {showArrow ? (
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        ) : null}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
