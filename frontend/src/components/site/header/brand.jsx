import Image from "next/image";
import { Link } from "@/i18n/navigation";

export function HeaderBrand({ shortName, tagline }) {
  return (
    <Link className="focus-ring flex min-w-0 items-center gap-3 rounded-[8px]" href="/">
      <Image alt="" className="size-16 shrink-0 rounded-[14px] object-contain" height={100} priority src="/logo.svg" width={100} />
      <span className="grid min-w-0">
        <span className="truncate font-heading text-base font-medium leading-tight tracking-tight text-ink md:text-lg">{shortName}</span>
      </span>
    </Link>
  );
}
