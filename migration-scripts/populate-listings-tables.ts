import db from "@/server/db";
import { listings } from "@/server/db/schema";
import { eq, isNull } from "drizzle-orm";
import { createLatLngGISPoint } from "@/server/server-utils";

const randomImageUrlsArrays = [
  [
    "https://a0.muscache.com/im/pictures/miso/Hosting-762632213174916471/original/5d19ef9f-c2d9-479d-9a22-3b6a12a9850d.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-762632213174916471/original/5d19ef9f-c2d9-479d-9a22-3b6a12a9850d.jpeg?im_w=1200https://a0.muscache.com/im/pictures/miso/Hosting-762632213174916471/original/5d19ef9f-c2d9-479d-9a22-3b6a12a9850d.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-762632213174916471/original/5d19ef9f-c2d9-479d-9a22-3b6a12a9850d.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-762632213174916471/original/5d19ef9f-c2d9-479d-9a22-3b6a12a9850d.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-762632213174916471/original/5d19ef9f-c2d9-479d-9a22-3b6a12a9850d.jpeg?im_w=1200",
  ],
  [
    "https://images.rezfusion.com?optimize=true&rotate=true&quality=70&width=2048&source=https%3A//img.trackhs.com/x/https%3A//track-pm.s3.amazonaws.com/cbislandvacations/image/2e544f4a-512b-4b5a-b1ec-3795f349c69e&settings=default",
    "https://images.rezfusion.com?optimize=true&rotate=true&quality=70&width=2048&source=https%3A//img.trackhs.com/x/https%3A//track-pm.s3.amazonaws.com/cbislandvacations/image/e1c1f0ee-8f5d-4f1e-bb5d-773e1310cf9a&settings=default",
    "https://images.rezfusion.com?optimize=true&rotate=true&quality=70&width=2048&source=https%3A//img.trackhs.com/x/https%3A//track-pm.s3.amazonaws.com/cbislandvacations/image/5c1b871b-b75d-4e5c-a890-f7a26a62f8da&settings=default",
    "https://images.rezfusion.com?optimize=true&rotate=true&quality=70&width=2048&source=https%3A//img.trackhs.com/x/https%3A//track-pm.s3.amazonaws.com/cbislandvacations/image/c4a30ca6-47db-498f-975d-3874f0747e09&settings=default",
    "https://images.rezfusion.com?optimize=true&rotate=true&quality=70&width=2048&source=https%3A//img.trackhs.com/x/https%3A//track-pm.s3.amazonaws.com/cbislandvacations/image/6feed749-9da2-4322-917f-366549daf93e&settings=default",
    "https://images.rezfusion.com?optimize=true&rotate=true&quality=70&width=2048&source=https%3A//img.trackhs.com/x/https%3A//track-pm.s3.amazonaws.com/cbislandvacations/image/a1dfd08e-2926-44ce-8a54-3547c867d6f8&settings=default",
    "https://images.rezfusion.com?optimize=true&rotate=true&quality=70&width=2048&source=https%3A//img.trackhs.com/x/https%3A//track-pm.s3.amazonaws.com/cbislandvacations/image/eda6ec53-b64b-4ac4-8741-f1011965cc5f&settings=default",
    "https://images.rezfusion.com?optimize=true&rotate=true&quality=70&width=2048&source=https%3A//img.trackhs.com/x/https%3A//track-pm.s3.amazonaws.com/cbislandvacations/image/fc8347d1-afb7-4ff2-9c04-8ceedff3b208&settings=default",
    "https://images.rezfusion.com?optimize=true&rotate=true&quality=70&width=2048&source=https%3A//img.trackhs.com/x/https%3A//track-pm.s3.amazonaws.com/cbislandvacations/image/feb3bc09-7df6-4d70-8bf9-717d40224f6a&settings=default",
    "https://images.rezfusion.com?optimize=true&rotate=true&quality=70&width=2048&source=https%3A//img.trackhs.com/x/https%3A//track-pm.s3.amazonaws.com/cbislandvacations/image/228f10cb-896b-4a8c-969b-d3a6d473713f&settings=default",
    "https://images.rezfusion.com?optimize=true&rotate=true&quality=70&width=2048&source=https%3A//img.trackhs.com/x/https%3A//track-pm.s3.amazonaws.com/cbislandvacations/image/50e8088e-ab68-453f-9a61-a30d19ac7c23&settings=default",
    "https://images.rezfusion.com?optimize=true&rotate=true&quality=70&width=2048&source=https%3A//img.trackhs.com/x/https%3A//track-pm.s3.amazonaws.com/cbislandvacations/image/36ff826a-8c9e-4d4b-ac3a-cf1bbbef4873&settings=default",
    "https://images.rezfusion.com?optimize=true&rotate=true&quality=70&width=2048&source=https%3A//img.trackhs.com/x/https%3A//track-pm.s3.amazonaws.com/cbislandvacations/image/366b7c0b-b2b7-4ec4-a0f1-6681941d72f8&settings=default",
    "https://images.rezfusion.com?optimize=true&rotate=true&quality=70&width=2048&source=https%3A//img.trackhs.com/x/https%3A//track-pm.s3.amazonaws.com/cbislandvacations/image/ecf3ceae-179f-4c19-b78e-f1f9ecf478b6&settings=default",
    "https://images.rezfusion.com?optimize=true&rotate=true&quality=70&width=2048&source=https%3A//img.trackhs.com/x/https%3A//track-pm.s3.amazonaws.com/cbislandvacations/image/6055cb09-94f6-433f-978a-2702af3e625b&settings=default",
    "https://images.rezfusion.com?optimize=true&rotate=true&quality=70&width=2048&source=https%3A//img.trackhs.com/x/https%3A//track-pm.s3.amazonaws.com/cbislandvacations/image/99caeb33-a53f-4f8c-a558-7be6f116333d&settings=default",
    "https://images.rezfusion.com?optimize=true&rotate=true&quality=70&width=2048&source=https%3A//img.trackhs.com/x/https%3A//track-pm.s3.amazonaws.com/cbislandvacations/image/10595bf6-c4ee-4095-a7c8-08b0ff71e1de&settings=default",
    "https://images.rezfusion.com?optimize=true&rotate=true&quality=70&width=2048&source=https%3A//img.trackhs.com/x/https%3A//track-pm.s3.amazonaws.com/cbislandvacations/image/62d3a991-ee7d-423b-bf54-bd4804d55ee9&settings=default",
    "https://images.rezfusion.com?optimize=true&rotate=true&quality=70&width=2048&source=https%3A//img.trackhs.com/x/https%3A//track-pm.s3.amazonaws.com/cbislandvacations/image/d40ea459-fcea-4d9c-843e-681db7298780&settings=default",
    "https://images.rezfusion.com?optimize=true&rotate=true&quality=70&width=2048&source=https%3A//img.trackhs.com/x/https%3A//track-pm.s3.amazonaws.com/cbislandvacations/image/8c4509e8-4e59-4880-a74f-703376b73cda&settings=default",
    "https://images.rezfusion.com?optimize=true&rotate=true&quality=70&width=2048&source=https%3A//img.trackhs.com/x/https%3A//track-pm.s3.amazonaws.com/cbislandvacations/image/3766b21d-0734-44ed-a2cf-2c937af7a7ff&settings=default",
    "https://images.rezfusion.com?optimize=true&rotate=true&quality=70&width=2048&source=https%3A//img.trackhs.com/x/https%3A//track-pm.s3.amazonaws.com/cbislandvacations/image/5c557ada-a19c-4584-be41-d22417946725&settings=default",
    "https://images.rezfusion.com?optimize=true&rotate=true&quality=70&width=2048&source=https%3A//img.trackhs.com/x/https%3A//track-pm.s3.amazonaws.com/cbislandvacations/image/638d7104-2adc-4eea-9254-1029926d89ae&settings=default",
    "https://images.rezfusion.com?optimize=true&rotate=true&quality=70&width=2048&source=https%3A//img.trackhs.com/x/https%3A//track-pm.s3.amazonaws.com/cbislandvacations/image/1095f383-50c0-4997-bc46-534c222ebbec&settings=default",
    "https://images.rezfusion.com?optimize=true&rotate=true&quality=70&width=2048&source=https%3A//img.trackhs.com/x/https%3A//track-pm.s3.amazonaws.com/cbislandvacations/image/f4af0cff-e148-471a-81d3-611f5b25bc9c&settings=default",
    "https://images.rezfusion.com?optimize=true&rotate=true&quality=70&width=2048&source=https%3A//img.trackhs.com/x/https%3A//track-pm.s3.amazonaws.com/cbislandvacations/image/4c787fa9-1e65-468b-8d18-10f4a2aaf722&settings=default",
    "https://images.rezfusion.com?optimize=true&rotate=true&quality=70&width=768&source=https%3A//img.trackhs.com/x/https%3A//track-pm.s3.amazonaws.com/cbislandvacations/image/2e544f4a-512b-4b5a-b1ec-3795f349c69e&settings=default",
  ],
  [
    "https://gallery.streamlinevrs.com/units-gallery/00/08/FC/image_163710533.jpeg",
    "https://gallery.streamlinevrs.com/units-gallery/00/08/FC/image_163710532.jpeg",
    "https://gallery.streamlinevrs.com/units-gallery/00/08/FC/image_163710534.jpeg",
    "https://gallery.streamlinevrs.com/units-gallery/00/08/FC/image_163710521.jpeg",
  ],
  [
    "https://gallery.streamlinevrs.com/units-gallery/00/08/FB/image_163964227.jpeg",
    "https://gallery.streamlinevrs.com/units-gallery/00/08/FB/image_163964214.jpeg",
    "https://gallery.streamlinevrs.com/units-gallery/00/08/FB/image_163964221.jpeg",
    "https://gallery.streamlinevrs.com/units-gallery/00/08/FB/image_163964216.jpeg",
  ],
  [
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/509848/images/main/a0FPl0000016uQMMAY",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/509848/images/main/a0FPl00000175yVMAQ",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/509848/images/main/a0FPl00000170VrMAI",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/509848/images/main/a0FPl00000179h7MAA",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/509848/images/main/a0FPl00000172R9MAI",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/509848/images/main/a0FPl0000016rKUMAY",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/509848/images/main/a0FPl00000179kLMAQ",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/509848/images/main/a0FPl0000021TN3MAM",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/509848/images/main/a0FPl0000016pP9MAI",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/509848/images/main/a0FPl00000179nZMAQ",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/509848/images/main/a0FPl00000178wNMAQ",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/509848/images/main/a0FPl0000017AA9MAM",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/509848/images/main/a0FPl0000017ABlMAM",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/509848/images/main/a0FPl0000016vEPMAY",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/509848/images/main/a0FPl0000017ALRMA2",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/509848/images/main/a0FPl00000179xFMAQ",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/509848/images/main/a0FPl00000178UwMAI",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/509848/images/main/a0FPl0000016yVbMAI",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/509848/images/main/a0FPl0000016udJMAQ",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/509848/images/main/a0FPl00000170xGMAQ",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/509848/images/main/a0FPl0000017A8XMAU",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/509848/images/main/a0FPl0000017A6vMAE",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/509848/images/main/a0FPl000001kENaMAM",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/509848/images/main/a0FPl0000016x1eMAA",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/509848/images/main/a0FPl0000016yDvMAI",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/509848/images/main/a0FPl0000017AbZMAU",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/509848/images/main/a0FPl0000016vsgMAA",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/509848/images/main/a0FPl00000171GbMAI",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/509848/images/main/a0FPl000001792pMAA",
  ],
  [
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/516619/images/main/a0FPl000004MRGzMAO",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/516619/images/main/a0FPl000004M89aMAC",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/516619/images/main/a0FPl000004MRyXMAW",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/516619/images/main/a0FPl000004MEtKMAW",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/516619/images/main/a0FPl000004MQb5MAG",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/516619/images/main/a0FPl000004MRKDMA4",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/516619/images/main/a0FPl000004M8hOMAS",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/516619/images/main/a0FPl000004MQspMAG",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/516619/images/main/a0FPl000004MRQfMAO",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/516619/images/main/a0FPl000004M9s3MAC",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/516619/images/main/a0FPl000004MRSHMA4",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/516619/images/main/a0FPl000004MRVVMA4",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/516619/images/main/a0FPl000004MRYjMAO",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/516619/images/main/a0FPl000004M9vDMAS",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/516619/images/main/a0FPl000004MRfBMAW",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/516619/images/main/a0FPl000004MRnFMAW",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/516619/images/main/a0FPl000004MRk1MAG",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/516619/images/main/a0FPl000004MRaLMAW",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/516619/images/main/a0FPl000004M5wSMAS",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/516619/images/main/a0FPl000004MAg8MAG",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/516619/images/main/a0FPl000004M3RdMAK",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/516619/images/main/a0FPl000004MS1lMAG",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/516619/images/main/a0FPl000004MJJSMA4",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/516619/images/main/a0FPl000004MS4zMAG",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/516619/images/main/a0FPl000004MS6bMAG",
  ],
  [
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/510003/images/main/a0F4P00000QEkplUAD",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/510003/images/main/a0FPl000000nhGmMAI",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/510003/images/main/a0F4P00000QEcvnUAD",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/510003/images/main/a0F4P00000QEcvlUAD",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/510003/images/main/a0F4P00000QEcvmUAD",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/510003/images/main/a0F4P00000QEcvgUAD",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/510003/images/main/a0F4P00000QEcvqUAD",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/510003/images/main/a0F4P00000QEcvxUAD",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/510003/images/main/a0F4P00000QEcvwUAD",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/510003/images/main/a0F4P00000QEcw2UAD",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/510003/images/main/a0F4P00000QEcw1UAD",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/510003/images/main/a0F4P00000QEcw4UAD",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/510003/images/main/a0F4P00000QEcwGUAT",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/510003/images/main/a0F4P00000QEcvpUAD",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/510003/images/main/a0F4P00000QEcvrUAD",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/510003/images/main/a0F4P00000QEcwAUAT",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/510003/images/main/a0F4P00000QEcw7UAD",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/510003/images/main/a0FPl000000ngR8MAI",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/510003/images/main/a0F4P00000QEapDUAT",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/510003/images/main/a0FPl000000ncYrMAI",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/510003/images/main/a0FPl000000nQB5MAM",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/510003/images/main/a0FPl000000nkT7MAI",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/510003/images/main/a0FPl000000neluMAA",
    "https://res.cloudinary.com/evolve-vacation-rental-network/image/upload/f_auto,c_limit,w_3840,q_auto/listings_s3//listings/510003/images/main/a0FPl000000nkPtMAI",
  ],
];

const locations = [
  // // Los Angeles Area
  { name: "Santa Monica", area: "Los Angeles", lat: 34.0195, lng: -118.4912 },
  { name: "Venice Beach", area: "Los Angeles", lat: 33.985, lng: -118.4695 },
  { name: "Beverly Hills", area: "Los Angeles", lat: 34.0736, lng: -118.4004 },
  {
    name: "Manhattan Beach",
    area: "Los Angeles",
    lat: 33.8847,
    lng: -118.4109,
  },
  { name: "Silver Lake", area: "Los Angeles", lat: 34.087, lng: -118.2702 },
  { name: "Echo Park", area: "Los Angeles", lat: 34.0782, lng: -118.2606 },
  { name: "Downtown LA", area: "Los Angeles", lat: 34.0407, lng: -118.2468 },
  { name: "Culver City", area: "Los Angeles", lat: 34.0211, lng: -118.3965 },
  { name: "Marina Del Rey", area: "Los Angeles", lat: 33.9802, lng: -118.4517 },
  { name: "Playa Vista", area: "Los Angeles", lat: 33.974, lng: -118.4282 },
  { name: "Brentwood", area: "Los Angeles", lat: 34.052, lng: -118.4726 },
  {
    name: "Pacific Palisades",
    area: "Los Angeles",
    lat: 34.0359,
    lng: -118.5264,
  },
  { name: "Westwood", area: "Los Angeles", lat: 34.0633, lng: -118.4383 },
  { name: "Hollywood", area: "Los Angeles", lat: 34.0928, lng: -118.3287 },
  { name: "Los Feliz", area: "Los Angeles", lat: 34.1088, lng: -118.2922 },
  { name: "Malibu", area: "Los Angeles", lat: 34.0259, lng: -118.7798 },
  { name: "Hermosa Beach", area: "Los Angeles", lat: 33.8622, lng: -118.3995 },
  { name: "Redondo Beach", area: "Los Angeles", lat: 33.8492, lng: -118.3884 },
  { name: "Pasadena", area: "Los Angeles", lat: 34.1478, lng: -118.1445 },

  // San Francisco Bay Area
  { name: "Hayes Valley", area: "San Francisco", lat: 37.7759, lng: -122.4245 },
  { name: "North Beach", area: "San Francisco", lat: 37.7997, lng: -122.4078 },
  {
    name: "Pacific Heights",
    area: "San Francisco",
    lat: 37.7925,
    lng: -122.4382,
  },
  {
    name: "Marina District",
    area: "San Francisco",
    lat: 37.8015,
    lng: -122.4368,
  },
  { name: "Noe Valley", area: "San Francisco", lat: 37.7502, lng: -122.4337 },

  // San Diego Area
  { name: "Capitol Hill", area: "Seattle", lat: 47.6253, lng: -122.3222 },
  { name: "Ballard", area: "Seattle", lat: 47.6677, lng: -122.3847 },
  { name: "Queen Anne", area: "Seattle", lat: 47.6324, lng: -122.3571 },
  { name: "Fremont", area: "Seattle", lat: 47.6504, lng: -122.3502 },
  { name: "West Seattle", area: "Seattle", lat: 47.5667, lng: -122.3875 },
  { name: "South Lake Union", area: "Seattle", lat: 47.6264, lng: -122.3331 },
  { name: "Pioneer Square", area: "Seattle", lat: 47.6015, lng: -122.3343 },
  { name: "Belltown", area: "Seattle", lat: 47.6139, lng: -122.3458 },
  {
    name: "University District",
    area: "Seattle",
    lat: 47.6608,
    lng: -122.3152,
  },
  { name: "Green Lake", area: "Seattle", lat: 47.6805, lng: -122.3273 },
  { name: "Madison Park", area: "Seattle", lat: 47.6324, lng: -122.2773 },
  { name: "Alki Beach", area: "Seattle", lat: 47.5814, lng: -122.4077 },
  { name: "Columbia City", area: "Seattle", lat: 47.5595, lng: -122.2867 },
  { name: "Wallingford", area: "Seattle", lat: 47.6615, lng: -122.3239 },
  { name: "Beacon Hill", area: "Seattle", lat: 47.5841, lng: -122.3129 },
  { name: "Magnolia", area: "Seattle", lat: 47.6404, lng: -122.3982 },
  { name: "Ravenna", area: "Seattle", lat: 47.6751, lng: -122.3027 },
  { name: "First Hill", area: "Seattle", lat: 47.6087, lng: -122.3227 },
  {
    name: "International District",
    area: "Seattle",
    lat: 47.5987,
    lng: -122.3272,
  },
  { name: "Mount Baker", area: "Seattle", lat: 47.5788, lng: -122.2925 },

  // // Seattle Area
  { name: "Capitol Hill", area: "Seattle", lat: 47.6253, lng: -122.3222 },
  { name: "Ballard", area: "Seattle", lat: 47.6677, lng: -122.3847 },
  { name: "Queen Anne", area: "Seattle", lat: 47.6324, lng: -122.3571 },
  { name: "Fremont", area: "Seattle", lat: 47.6504, lng: -122.3502 },
  { name: "West Seattle", area: "Seattle", lat: 47.5667, lng: -122.3875 },
  { name: "South Lake Union", area: "Seattle", lat: 47.6264, lng: -122.3331 },
  { name: "Pioneer Square", area: "Seattle", lat: 47.6015, lng: -122.3343 },
  { name: "Belltown", area: "Seattle", lat: 47.6139, lng: -122.3458 },
  {
    name: "University District",
    area: "Seattle",
    lat: 47.6608,
    lng: -122.3152,
  },
  { name: "Green Lake", area: "Seattle", lat: 47.6805, lng: -122.3273 },
  { name: "Madison Park", area: "Seattle", lat: 47.6324, lng: -122.2773 },
  { name: "Alki Beach", area: "Seattle", lat: 47.5814, lng: -122.4077 },
  { name: "Columbia City", area: "Seattle", lat: 47.5595, lng: -122.2867 },
  { name: "Wallingford", area: "Seattle", lat: 47.6615, lng: -122.3239 },
  { name: "Beacon Hill", area: "Seattle", lat: 47.5841, lng: -122.3129 },
  { name: "Magnolia", area: "Seattle", lat: 47.6404, lng: -122.3982 },
  { name: "Ravenna", area: "Seattle", lat: 47.6751, lng: -122.3027 },
  { name: "First Hill", area: "Seattle", lat: 47.6087, lng: -122.3227 },
  {
    name: "International District",
    area: "Seattle",
    lat: 47.5987,
    lng: -122.3272,
  },
  { name: "Mount Baker", area: "Seattle", lat: 47.5788, lng: -122.2925 },

  //orange county
  {
    name: "Newport Beach",
    area: "Orange County",
    lat: 33.6189,
    lng: -117.9289,
  },
  { name: "Laguna Beach", area: "Orange County", lat: 33.5427, lng: -117.7854 },
  {
    name: "Huntington Beach",
    area: "Orange County",
    lat: 33.6595,
    lng: -118.0007,
  },
  {
    name: "Corona Del Mar",
    area: "Orange County",
    lat: 33.5975,
    lng: -117.8729,
  },
  { name: "Crystal Cove", area: "Orange County", lat: 33.5745, lng: -117.84 },
  {
    name: "Balboa Island",
    area: "Orange County",
    lat: 33.6053,
    lng: -117.8927,
  },
  { name: "Costa Mesa", area: "Orange County", lat: 33.6411, lng: -117.9187 },
  { name: "Irvine", area: "Orange County", lat: 33.6846, lng: -117.8265 },
  { name: "Dana Point", area: "Orange County", lat: 33.4669, lng: -117.6981 },
  { name: "San Clemente", area: "Orange County", lat: 33.4269, lng: -117.6119 },
  { name: "Seal Beach", area: "Orange County", lat: 33.7414, lng: -118.1048 },
  { name: "Sunset Beach", area: "Orange County", lat: 33.7178, lng: -118.0745 },
  { name: "Anaheim", area: "Orange County", lat: 33.8366, lng: -117.9143 },
  { name: "Orange", area: "Orange County", lat: 33.7879, lng: -117.8531 },
  { name: "Tustin", area: "Orange County", lat: 33.7458, lng: -117.8262 },
  {
    name: "Monarch Beach",
    area: "Orange County",
    lat: 33.4847,
    lng: -117.7117,
  },
  {
    name: "Laguna Niguel",
    area: "Orange County",
    lat: 33.5225,
    lng: -117.7076,
  },
  {
    name: "San Juan Capistrano",
    area: "Orange County",
    lat: 33.5017,
    lng: -117.6626,
  },
  { name: "Aliso Viejo", area: "Orange County", lat: 33.5767, lng: -117.7256 },
  { name: "Mission Viejo", area: "Orange County", lat: 33.6, lng: -117.672 },
  { name: "Laguna Hills", area: "Orange County", lat: 33.5963, lng: -117.7178 },
  {
    name: "Newport Coast",
    area: "Orange County",
    lat: 33.5969,
    lng: -117.8394,
  },
  {
    name: "Balboa Peninsula",
    area: "Orange County",
    lat: 33.6027,
    lng: -117.9037,
  },
  {
    name: "Fashion Island",
    area: "Orange County",
    lat: 33.615,
    lng: -117.8755,
  },
  {
    name: "South Coast Plaza",
    area: "Orange County",
    lat: 33.6889,
    lng: -117.8867,
  },
];

// Property styles for name generation
const propertyStyles = [
  "Modern",
  "Coastal",
  "Urban",
  "Contemporary",
  "Traditional",
  "Mediterranean",
  "Craftsman",
  "Mid-Century",
  "Victorian",
  "Industrial",
];

// Property types
const propertyTypes = [
  "Apartment",
  "Condo",
  "Loft",
  "House",
  "Studio",
  "Villa",
  "Townhouse",
  "Penthouse",
  "Suite",
  "Cottage",
];

// View types for name generation
const viewTypes = [
  "Ocean View",
  "City View",
  "Mountain View",
  "Bay View",
  "Lake View",
  "Park View",
  "Garden View",
  "Harbor View",
  "Skyline View",
  "Beach View",
];

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Generate more realistic property names based on location
function generatePropertyName(location: (typeof locations)[0]): string {
  const style = getRandomItem(propertyStyles);
  const type = getRandomItem(propertyTypes);
  const view = Math.random() > 0.5 ? ` with ${getRandomItem(viewTypes)}` : "";

  return `${style} ${location.name} ${type}${view}`;
}

// Generate realistic addresses based on location
function generateAddress(location: (typeof locations)[0]): string {
  const number = Math.floor(Math.random() * 9999) + 1;
  const streets = [
    "Ocean",
    "Park",
    "Lake",
    "Beach",
    "Harbor",
    "Bay",
    "Mountain",
    "Sunset",
    "Coast",
    "Valley",
  ];
  const types = ["Avenue", "Boulevard", "Drive", "Street", "Road"];
  return `${number} ${getRandomItem(streets)} ${getRandomItem(types)}, ${location.name}, ${location.area}`;
}

// Slightly vary coordinates within a realistic walking distance
function varyCoordinates(
  lat: number,
  lng: number,
): { lat: number; lng: number } {
  // Vary by max of ~2-3 blocks (about 0.003 degrees)
  const latVariance = (Math.random() - 0.5) * 0.006;
  const lngVariance = (Math.random() - 0.5) * 0.006;
  return {
    lat: lat + latVariance,
    lng: lng + lngVariance,
  };
}

async function populateListingsTable() {
  try {
    const listingsToInsert = [];

    const providerIdArray = [
      "17ea8b14-30a9-41cd-9744-c8b9ae7dada7",
      "1932eadf-8d1e-4cac-a2a8-389fa3a455dd",
      "3d9adcc0-df50-4b0d-af41-5607dd41bcab",
      "e2c88b4b-4d3a-403f-98a1-489ca32b0c3c",
    ];

    // Create 3 properties for each location
    for (const location of locations) {
      for (let i = 0; i < 10; i++) {
        const coordinates = varyCoordinates(location.lat, location.lng);
        const imageUrlsArray = getRandomItem(randomImageUrlsArrays);
        const randomProviderId = getRandomItem(providerIdArray);

        listingsToInsert.push({
          name: generatePropertyName(location),
          imageUrls: imageUrlsArray,
          address: generateAddress(location),
          providerId: randomProviderId,
          latLngPoint: createLatLngGISPoint({
            lat: coordinates.lat,
            lng: coordinates.lng,
          }),
          isActive: true,
        });
      }
    }

    console.log(`Inserting ${listingsToInsert.length} listings...`);
    const insertedRows = await db.insert(listings).values(listingsToInsert);
    console.log("Successfully populated listings table!");
    return insertedRows;
  } catch (error) {
    console.error("Error populating listings table:", error);
    throw error;
  }
}

// Execute the population script
populateListingsTable()
  .then(() => {
    console.log("Script completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Script failed:", error);
    process.exit(1);
  });
