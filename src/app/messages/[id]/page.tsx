import React from "react";
import MessagingPage from "../_components/MessagingPage";

export const metadata = {
  title: "Messages | Carefinder",
};

function page({ params }: { params: { id: string } }) {
  return <MessagingPage />;
}

export default page;
