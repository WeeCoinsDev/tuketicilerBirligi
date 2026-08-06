import { MainLogo } from "@/components/common/mainLogo";

export function LoadingScreen({ label = "Yükleniyor" }) {
  return (
    <div className="grid min-h-[45vh] place-items-center bg-white px-6 py-16">
      <div className="grid justify-items-center gap-5 text-center">
        {/* drawOnMount kullanma: loading SSR/Suspense'ta JS hydrate olmadan
            motion initial=hidden ile logo görünmez kalır. */}
        <MainLogo className="size-24 animate-pulse sm:size-28 md:size-32" />
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted">{label}</p>
      </div>
    </div>
  );
}
