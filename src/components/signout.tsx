"use client"

import {Button} from "@/components/ui/button";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/navigation";

export default function SignOut()
{
    const supabase= createClientComponentClient();
    const router = useRouter()
    async function handleSignOut() {
        await supabase.auth.signOut()

        router.refresh()

    }

    return (
        <Button onClick={handleSignOut}>Sign Out</Button>
    )
}