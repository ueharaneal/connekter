import AFHInfoCard from "./_components/afhInfoCard";

export default function AFHInfoPage() {
  return (
    <div className="relative min-h-screen bg-background flex">
      {/* Centering Wrapper */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AFHInfoCard
          licenseNumber="3948530"
          afhName="Above Woodinville"
          yearLicensed="1998"
          address={{
            street: "14906 NE Woodinville Duvall Road",
            cityStateZip: "98072 Woodinville, WA",
          }}
        />
      </div>
    </div>
  );
}
