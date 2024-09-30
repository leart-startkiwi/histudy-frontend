import OverviewBulletPoint from "./OverviewBulletPoint";

function CourseBulletPoints({ requirements, outcomes }) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex w-[40%] flex-col gap-y-3">
        {requirements?.map((requirement) => (
          <OverviewBulletPoint key={requirement?.id} text={requirement.value} />
        ))}
      </div>
      <div className="flex w-[40%] flex-col gap-y-3">
        {outcomes?.map((outcome) => (
          <OverviewBulletPoint key={outcome?.id} text={outcome.value} />
        ))}
      </div>
    </div>
  );
}

export default CourseBulletPoints;
