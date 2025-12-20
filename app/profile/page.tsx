import { Typography, TypographyType } from '@/components/ui/typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getCurrentUser } from '@/server/users';
import { getUserApartments } from '@/server/apartments';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { HousePlus, PencilLine, Trash2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import ApartmentTable from '@/app/profile/apartment-table';

export default async function ProfilePage() {

    const currentUser = await getCurrentUser();
    const userApartmentsInfos = await getUserApartments();

    if (!currentUser) {
        return (
            <Typography type={TypographyType.P}>Utilisateur non authentifié.</Typography>
        )
    }
    if (!userApartmentsInfos.success) {
        return (
            <Typography type={TypographyType.P}>Erreur lors de la récupération des appartements : {userApartmentsInfos.error}</Typography>
        )
    }

    return (
        <>
            <div>
                <Typography type={TypographyType.H1}>Profil</Typography>
                <Typography type={TypographyType.P}>Gérez les informations de votre compte ici.</Typography>
            </div>
            <Separator className='my-4' />

            
            <div className='flex gap-1 flex-col'>
                <div className='flex gap-1'>
                    {/* USER NAME & AVATAR */}
                    <div className='w-1/3 border-[1] p-6 rounded-lg flex flex-col items-center justify-center relative'>
                        <Typography type={TypographyType.H4}>{currentUser.name}</Typography>
                        {currentUser.image ? (
                            <Avatar className='w-32 h-32 mt-4'>
                                <AvatarImage src={currentUser.image} alt={currentUser.name} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        ) : (
                            <Avatar className='w-32 h-32 mt-4'>
                                <AvatarFallback className='text-2xl font-semibold'>
                                    {currentUser.name?.slice(0,2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        )}
                        <div className='absolute top-1 right-1'>
                            <Button variant='secondary' disabled>
                                <PencilLine />
                                Changer l&apos;avatar
                            </Button>
                        </div>
                    </div>

                    {/* USER DETAILS */}
                    <div className='w-2/3 border-[1] p-6 rounded-lg relative flex flex-col gap-4'>
                        <div className='mb-4'>
                            <Typography type={TypographyType.H4}>Détails du compte</Typography>
                        </div>
                        <div>
                            <Typography type={TypographyType.P}>
                                <span className='font-semibold mr-2'>Nom :</span>
                                {currentUser.name}
                            </Typography>
                        </div>
                        <div className='flex'>
                            <Typography type={TypographyType.P}>
                                <span className='font-semibold mr-2'>Adresse email :</span>
                                {currentUser.email}
                            </Typography>
                        </div>
                        <div>
                            <Typography type={TypographyType.P}>
                                <span className='font-semibold mr-2'>Date de dernière mise à jour :</span>
                                {formatDate(new Date(currentUser.updatedAt))}
                            </Typography>
                        </div>
                        <div>
                            <Typography type={TypographyType.P}>
                                <span className='font-semibold mr-2'>Date de création :</span>
                                {formatDate(new Date(currentUser.createdAt))}
                            </Typography>
                        </div>
                        <div className='absolute right-1 top-1'>
                            <Button variant='destructive' disabled>
                                <Trash2 />
                                Supprimer le compte
                            </Button>
                        </div>
                    </div>
                </div>
                {/* APARTMENT MANAGEMENT */}
                <div className='w-full border-[1] p-6 rounded-lg relative'>
                    <Typography type={TypographyType.H4}>Vos appartements</Typography>
                    {/* Apartment list or message if none */}
                    {userApartmentsInfos.apartments?.length !== undefined ? (
                        <ApartmentTable userApartments={userApartmentsInfos.apartments} />
                    ) : (
                        <Typography type={TypographyType.P}>Vous n&apos;avez pas encore d&apos;appartements.</Typography>
                    )}
                    <div className='absolute top-1 right-1'>
                        <Link href="/profile/apartment">
                            <Button variant='default'>
                                <HousePlus />
                                Créer un appartement
                            </Button>
                        </Link>
                    </div>
                </div>

            </div>
        </>
    )
}