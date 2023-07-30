"use client"

import Link from "next/link"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"

import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {useForm} from "react-hook-form";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";

const formSchema = z.object({
    email: z.string().nonempty({
        message: 'This is required'
    }).email({
        message: "Invalid email"
    }),
    password: z.string().nonempty({
        message: 'This is required'
    })
})

export default function LoginPage() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const supabase = createClientComponentClient()
    const {toast} = useToast()

    const router = useRouter()

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        const {email, password} = values

        const {data, error} = await supabase.auth.signInWithPassword(
            {
                email: email,
                password: password
            }
        )
        if (error) {
            console.log(error.message)
            toast({
                description: `${error.message}`,
                variant: "destructive",
            })
        } else {
            toast({
                description: "successfully signed in."
            })

            router.refresh()
        }

    }

    return (

        <>

            <div className={'flex justify-end items-center m-5 space-x-3'}>
                <p className={''}>Already have an account?</p>
                <Button asChild>
                    <Link href={'/auth/signup'}>Sign up</Link>
                </Button>
            </div>

            <div className="flex items-center justify-center flex-col mt-10 mb-10 md:mb-0">
                <p className={'text-2xl mb-5 font-bold underline'}>Login</p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-64">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="password" type={'password'} {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </>
    )
}
