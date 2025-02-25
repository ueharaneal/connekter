import { listings } from "@/server/db/schema";
import db from "@/server/db";
import { eq } from "drizzle-orm";

export async function getListingById(id: number) {
  try {
    const listing = await db.query.listings.findFirst({
      where: eq(listings.id, id),
      with: {
        provider: true,
      },
    });

    if (listing) {
      return { success: true, statusCode: 200, listing: listing };
    } else {
      return {
        success: false,
        statusCode: 404, // Not Found status
        error: { message: `Listing with id ${id} not found` },
      };
    }
  } catch (error) {
    console.error("Error fetching listing:", error);
    return {
      success: false,
      statusCode: 500,
      error: { message: "Could not get listing due to a server error" },
    };
  }
}
