import { CreateApartmentForm } from "@/components/create-apartment-form";
import { Typography, TypographyType } from "@/components/ui/typography";

export default function DashboardPage() {
    return (
        <>
            <Typography type={TypographyType.H1}>Créer un appartement</Typography>
            <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
                <div className="flex w-full max-w-sm flex-col gap-6">
                    <CreateApartmentForm />
                </div>
            </div>
        </>
    )
}