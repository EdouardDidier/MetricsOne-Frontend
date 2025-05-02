import Image from "next/image";
import Link from "next/link";

export default function NavHome() {
  return (
    <Link className="navbar-link" href="/">
      <Image
        src="/logo.png"
        width={1128}
        height={320}
        alt="Metrics One"
        className="w-24"
      />
    </Link>
  );
}
