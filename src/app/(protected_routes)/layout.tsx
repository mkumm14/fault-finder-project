import { notFound } from "next/navigation"

import { dashboardConfig } from "@/config/dashboard"
import { MainNav } from "@/components/main-nav"
import { DashboardNav } from "@/components/sidebar-nav"
import { UserAccountNav } from "@/components/user-account-nav"
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {ModeToggle} from "@/components/mode-toggle";


interface DashboardLayoutProps {
    children?: React.ReactNode
}

export default async function DashboardLayout({
                                                  children,
                                              }: DashboardLayoutProps) {

    const supabase = createServerComponentClient({cookies})


    const {data, error} = await supabase.auth.getUser()

    const {user} = data

    const { data: profileData, error: profileError } = await supabase.from('profiles').select().eq('id', user?.id).single()




    return (
        <div className="flex min-h-screen flex-col space-y-6">
            <header className="sticky top-0 z-40 border-b bg-background">
                <div className="container flex h-16 items-center justify-between py-4">
                    <MainNav items={dashboardConfig.sidebarNav} />

                    <div className={'flex items-center space-x-5'}>
                    <ModeToggle/>
                    <UserAccountNav
                        user={{
                            name: profileData?.username,
                            image: null,
                            email: user?.email,
                        }}
                    />
                    </div>
                </div>
            </header>
            <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
                <aside className="hidden w-[200px] flex-col md:flex">
                    <DashboardNav items={dashboardConfig.sidebarNav} />
                </aside>
                <main className="flex w-full flex-1 flex-col overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    )
}