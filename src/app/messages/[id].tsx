import React from "react";

function page({ params }: { params: { id: string } }) {
  return <div>conversation id {params.id}</div>;
}

export default page;
