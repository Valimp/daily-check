import { Typography, TypographyType } from '@/components/ui/typography';


export default async function DashboardPage() {

    // Fetch the list of apartments from the database using Prisma
    // If not apartments, show a message indicating no apartments are added yet

    return (
        <>
            <Typography type={TypographyType.H1}>Tableau de bord</Typography>
        </>
    )
}