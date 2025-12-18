import { Button } from '@/components/ui/button';
import { Typography, TypographyType } from '@/components/ui/typography';
import { prisma } from '@/lib/prisma';
import { HousePlus } from 'lucide-react';


export default async function DashboardPage() {

    // Fetch the list of apartments from the database using Prisma
    // If not apartments, show a message indicating no apartments are added yet
    const apartmentList = await prisma.apartment.findMany();

    return (
        <>
            <Typography type={TypographyType.H1}>Tableau de bord</Typography>
            <div>
                <div className='flex justify-between items-center'>
                    <Typography type={TypographyType.H2}>Vos logements</Typography>
                    <Button variant={'outline'}>
                        <HousePlus />
                        Ajouter un logement
                    </Button>
                </div>

                <div className='mt-4'>
                    {apartmentList.length === 0 ? (
                        <div className='flex flex-col gap-4 items-center justify-center p-10 border-dashed border-2 border-gray-300 rounded'>
                            <Typography type={TypographyType.P}>Vous n'avez aucun logement ajouté pour le moment.</Typography>
                            <Button>
                                <HousePlus />
                                Ajouter un logement
                            </Button>
                        </div>
                    ) : (
                        apartmentList.map((apartment) => (
                            <div key={apartment.id} className='p-4 mb-4 border rounded'>
                                <Typography type={TypographyType.H3}>{apartment.name}</Typography>
                                <Typography type={TypographyType.P}>{apartment.updatedAt.toString()}</Typography>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}