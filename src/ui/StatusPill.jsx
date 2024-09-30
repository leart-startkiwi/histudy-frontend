import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  removeActiveStatus,
  setActiveStatus,
  setActiveStatus as setActiveStatusRedux,
} from "../redux/activeStatusesSlice";
import { useSearchParams } from "react-router-dom";

function StatusPill({ status }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const activeStatuses = searchParams?.getAll("status");

  useEffect(function () {
    if (searchParams?.getAll("status").includes(status)) {
      dispatch(setActiveStatus(status));
    }
  }, []);

  return (
    <div
      role="button"
      onClick={() => {
        if (activeStatuses.includes(status)) {
          searchParams.delete("status", status);
          setSearchParams(searchParams);
          dispatch(removeActiveStatus(status));
        } else {
          searchParams.append("status", status);
          setSearchParams(searchParams);
          dispatch(setActiveStatusRedux(status));
        }
      }}
      className={`${activeStatuses.includes(status) && "border-blue-600 bg-blue-600 text-white"} rounded-full border-2 px-5 py-2 font-medium text-stone-500 hover:cursor-pointer hover:bg-blue-600 hover:text-white`}
    >
      {status}
    </div>
  );
}

export default StatusPill;
