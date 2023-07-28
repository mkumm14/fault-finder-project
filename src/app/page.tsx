import Image from 'next/image'
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
      <div>

          <div>Welcome to Fault Finder</div>
          <Button asChild>
          <Link href={'/dashboard'}>Get Started</Link>
          </Button>
      </div>
  )
}
