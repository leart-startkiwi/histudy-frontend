import { useAnnouncementComments } from "../../../reactQuery/announcements/useAnnouncementComments";
import AnnouncementComment from "./AnnouncementComment";

function AnnouncementComments({
  announcementId,
  setShowComments,
  setJustAdded,
  itemsCount,
}) {
  const { announcementComments } = useAnnouncementComments(announcementId);
  return (
    <div className="mt-5 flex flex-col gap-y-3">
      {announcementComments?.data?.map((item) => (
        <AnnouncementComment key={item._id} item={item} />
      ))}
      {itemsCount > 0 && (
        <p
          role="button"
          onClick={() => {
            setShowComments(false);
            setJustAdded(null);
          }}
          className="mt-5 font-bold underline underline-offset-[6px] hover:text-gray-700"
        >
          Hide comments
        </p>
      )}
    </div>
  );
}

export default AnnouncementComments;
