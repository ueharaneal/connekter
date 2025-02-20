import KeepTrackPage from "./_components/KeepTrackPage";
import db from "@/server/db";
import { eq } from "drizzle-orm";
import { rooms } from "@/server/db/schema/tables/rooms";
import { careLevels, CareLevelT } from "@/server/db/schema";
export default async function Page({ params }: { params: { "listing-id": string } }) {
  const currentListingId = params["listing-id"];

  const listingRooms = await db.query.rooms.findMany({
    where: eq(rooms.listingId, currentListingId),
  });

  const listingCareLevels = [] as CareLevelT[];
  for (const room of listingRooms) {
    const listingCareLevel = await db.query.careLevels.findMany({
      where: eq(careLevels.roomId, room.id),
    });
    listingCareLevels.push(...listingCareLevel);
  }

  return (
    <>
      <KeepTrackPage listingRooms={listingRooms} listingCareLevels={listingCareLevels} />
    </>
  );
}
