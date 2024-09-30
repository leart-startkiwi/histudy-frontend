import { useParams } from "react-router";
import { useAnnouncements } from "../../../reactQuery/announcements/useAnnouncements";
import Announcement from "./Announcement";

function Announcements() {
  const params = useParams();
  const { announcements } = useAnnouncements(params?.id);

  return (
    <div className="flex flex-col gap-y-5">
      {announcements?.data?.map((item) => (
        <Announcement key={item?._id} item={item} />
      ))}
    </div>
  );
}

export default Announcements;
