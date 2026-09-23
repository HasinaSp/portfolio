import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { contactSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = contactSchema.safeParse(body);
    
    if (!result.success) {
    console.error(
        "Erreur de validation contact :",
        result.error.flatten().fieldErrors
    );

    return NextResponse.json(
        {
        success: false,
        message: "Les informations envoyées sont invalides.",
        errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
    );
    }
    // if (!result.success) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message:
    //         "Les informations envoyées sont invalides.",
    //       errors: result.error.flatten().fieldErrors,
    //     },
    //     { status: 400 }
    //   );
    // }

    const data = result.data;

    const contactRequest =
      await prisma.contactRequest.create({
        data: {
          name: data.name,
          email: data.email,
          company: data.company || null,
          service: data.service,
          budget: data.budget || null,
          message: data.message,
        },
      });

    return NextResponse.json(
      {
        success: true,
        message: "Votre demande a bien été reçue.",
        id: contactRequest.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Erreur lors de la création de la demande :",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Une erreur est survenue lors de l'envoi de votre demande.",
      },
      { status: 500 }
    );
  }
}