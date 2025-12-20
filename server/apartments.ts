import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export const getUserApartments = async () => {
  const requestedHeader = await headers();

  const session = await auth.api.getSession({
    headers: requestedHeader,
  });

  const apartments = await prisma.apartmentMember.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return apartments;
};
