import Image from "next/image";
import { Link } from "@/i18n/navigation";

export function HeaderBrand({ shortName, tagline }) {
  return (
    <Link className="focus-ring flex min-w-0 items-center gap-3 rounded-[8px]" href="/">
      <Image
        alt=""
        className="size-12 shrink-0 rounded-[14px] object-contain"
        height={48}
        priority
        src="/logo.svg"
        width={48}
      />
      <span className="grid min-w-0">
        <span className="truncate font-heading text-base font-semibold leading-tight tracking-tight text-ink md:text-lg">
          {shortName}
        </span>
        <span className="truncate text-xs font-medium text-muted">{tagline}</span>
      </span>
    </Link>
  );
}
