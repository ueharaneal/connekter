// import db from "@/server/db";
// import { rooms } from "@/server/db/schema/tables/rooms";
// import { careLevels } from "@/server/db/schema/tables/rooms";
// async function addRoom() {
//   const room = {
//     name: "Room 2",
//     isAvailable: true,
//     listingId: 642,
//     roomPhotos: ["https://via.placeholder.com/150", "https://via.placeholder.com/150"],
//     roomType: "single",
//     roomSize: "large",
//     roomPrice: 1000,
//     roomDescription: "Room 2 Description",
//     roomProperties: ["private room", "shared bathroom"],
//     availableTo: "Private Pay",
//   };
//   console.log(room);
//   try {
//     console.log("Inserting room");
//     await db.insert(rooms).values(room);
//   } catch (error) {
//     console.error(error);
//   }
// }

// void addRoom().then(() => {
//   console.log("Room added");
//   process.exit(0);
// });