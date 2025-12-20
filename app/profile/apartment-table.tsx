import { Badge } from "@/components/ui/badge";
import { Typography, TypographyType } from "@/components/ui/typography";
import { formatDate } from "@/lib/utils";
import { ApartmentRole } from "../generated/prisma/browser";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function ApartmentTable(
    { userApartments }:
    { userApartments: ({
        apartment: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            ownerId: string;
        };
    } & {
        id: string;
        userId: string;
        apartmentId: string;
        role: ApartmentRole;
        joinedAt: Date;
    })[]
}) {
    return (
        <Table>
            <TableCaption>Liste des appartements</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[300px]">Nom</TableHead>
                    <TableHead className="w-[300px]">Date d&apos;adhésion</TableHead>
                    <TableHead className="w-[300px]">Date de création</TableHead>
                    <TableHead className="w-[300px]">Date de dernière mise à jour</TableHead>
                    <TableHead className="text-right">role</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {userApartments.map(({ apartment, role, joinedAt }) => (
                    <TableRow key={apartment.id}>
                        <TableCell className="font-medium">{apartment.name}</TableCell>
                        <TableCell>{formatDate(new Date(joinedAt))}</TableCell>
                        <TableCell>{formatDate(new Date(apartment.createdAt))}</TableCell>
                        <TableCell>{formatDate(new Date(apartment.updatedAt))}</TableCell>
                        <TableCell className="text-right">
                            <Badge variant="outline">
                                {role}
                            </Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}