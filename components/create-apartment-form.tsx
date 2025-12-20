"use client";

import { cn } from "@/lib/utils"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createApartment } from "@/server/apartments";
import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

const createApartmentSchema = z.object({
    name: z.string().min(3).max(30),
})

export function CreateApartmentForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    const router = useRouter();
    const form = useForm<z.infer<typeof createApartmentSchema>>({
        resolver: zodResolver(createApartmentSchema),
        defaultValues: {
            name: "",
        },
    })
    async function onSubmit(values: z.infer<typeof createApartmentSchema>) {
        console.log("Submitting apartment creation form with values:", values);
        const response = await createApartment(values.name);

        if (response.success) {
        toast.success(response.message as string);
        router.push("/profile");
        } else {
        toast.error(response.error as string);
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FieldGroup>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Nom de l&apos;appartement</FormLabel>
                                <FormControl>
                                    <Input placeholder="Mon appartement" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Field>
                            <Button type="submit">Créer</Button>
                            <FieldDescription className="text-center">
                                Après la création, vous serez redirigé vers votre page de profil.
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                </form>
            </Form>
        </div>
  )
}