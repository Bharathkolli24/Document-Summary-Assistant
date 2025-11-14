import Link from "next/link";
import { BrainCircuit } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 cursor-pointer">
      <BrainCircuit className="h-10 w-10 text-primary" />
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        Document Summary Assistant
      </h1>
    </Link>
  );
}
