import { InferQueryModel } from "@/server/db";
import { type Listing, Provider } from "@/server/db/schema";

export type ListingWProvider = InferQueryModel<
  "listings",
  {
    with: {
      provider: true;
    };
  }
>;
