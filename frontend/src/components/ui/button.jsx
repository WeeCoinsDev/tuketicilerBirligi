import { cva } from "class-variance-authority";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] px-4 py-2 font-heading text-sm font-semibold transition",
  {
    variants: {
      variant: {
        primary:
          "bg-ink text-white shadow-soft hover:-translate-y-0.5 hover:bg-primary-dark",
        secondary:
          "bg-secondary text-ink hover:-translate-y-0.5 hover:bg-secondary-dark hover:text-white",
        outline:
          "border border-line bg-white text-ink hover:-translate-y-0.5 hover:border-primary-dark hover:text-primary-dark",
        ghost: "text-ink hover:bg-primary-soft"
      },
      size: {
        sm: "min-h-9 px-3 text-xs",
        md: "min-h-11 px-4 text-sm",
        lg: "min-h-12 px-5 text-base"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export function Button({ className, variant, size, href, ...props }) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (href) {
    return <Link className={classes} href={href} {...props} />;
  }

  return <button className={classes} {...props} />;
}

export { buttonVariants };
