import React from "react";
import AdminSettingsPage from "./_components/AdminSettingsPage";

export const metadata = {
  title: "Settings | Admin",
};
function page() {
  return (
    <div>
      {" "}
      <AdminSettingsPage />
    </div>
  );
}

export default page;
