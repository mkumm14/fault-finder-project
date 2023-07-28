import SignOut from "@/components/signout";


export default function MainLayout(
    {
        children,
    }: {
    children: React.ReactNode
}) {
    return (
        <>
            <div></div>
            {children}
            <SignOut/>
        </>

    )
}