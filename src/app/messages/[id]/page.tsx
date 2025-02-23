import React from "react";
import MessagingPage from "../_components/MessagingPage";

function page({ params }: { params: { id: string } }) {
  return <MessagingPage />;
}

export default page;
