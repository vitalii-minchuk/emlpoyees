import prisma from "@/app/libs/prismadb";
import getSession from "@/app/actions/getSession";

export default async function getCurrentUser() {
  try {
    const session = await getSession()

    if (!session?.user?.email) {
      return null
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email
      }
    })

    if (!currentUser) {
      return null
    }

    return currentUser

  } catch (error: unknown) {
    return null
  }
}
