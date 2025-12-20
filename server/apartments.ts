"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

// Fetch apartments associated with the current user
// Used in profile page to list user apartments
export const getUserApartments = async () => {
  try {
    const requestedHeader = await headers();

    const session = await auth.api.getSession({
      headers: requestedHeader,
    });

    if (!session?.user) {
      return {
        success: false,
        error: "Utilisateur non authentifié.",
      };
    }

    // Fetch apartments and apartment members associated with the user
    const apartments = await prisma.apartmentMember.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        apartment: true,
      },
    });

    return {
      success: true,
      apartments,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      error: e.message,
    };
  }
};

// Create a new apartment and associate it with the owner
// Used when user creates a new apartment from profile page
export const createApartment = async (name: string) => {
  try {
    const requestedHeader = await headers();
    const ownerId = await auth.api
      .getSession({
        headers: requestedHeader,
      })
      .then((session) => session?.user.id);

    if (!ownerId) {
      return {
        success: false,
        error: "Utilisateur non authentifié.",
      };
    }
    // Create the apartment
    const apartment = await prisma.apartment.create({
      data: {
        name,
        ownerId,
      },
    });
    // Associate the owner as an apartment member
    const apartmentMember = await prisma.apartmentMember.create({
      data: {
        apartmentId: apartment.id,
        userId: ownerId,
        role: "owner",
      },
    });

    return {
      success: true,
      message: "Appartement créé avec succès.",
      apartment,
      apartmentMember,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      error: e.message,
    };
  }
};
