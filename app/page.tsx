import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <p>Homepage</p>
      <Link
        href={"/ownerpage"}
        className={buttonVariants({ variant: "default" })}
      >
        page Owner
      </Link>
    </>
  );
}
