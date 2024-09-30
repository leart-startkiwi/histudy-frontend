import { useDispatch, useSelector } from "react-redux";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import SunEditor CSS
import {
  setChangeDescription,
  setCourseDescription,
} from "../../../redux/manageCourseSlice";
import { useCourse } from "../../../reactQuery/courses/useCourse";
import { useParams } from "react-router";
import { useEffect } from "react";

function DescriptionEditor() {
  const params = useParams();
  const dispatch = useDispatch();
  const { course } = useCourse(params.id);
  const { description } = useSelector((store) => store.manageCourse);

  useEffect(() => {
    if (course?.data?.description?.description !== description?.description) {
      dispatch(setChangeDescription());
    }
  }, [
    dispatch,
    course?.data?.description?.description,
    description?.description,
  ]);

  return (
    <SunEditor
      placeholder="Insert your course description."
      setContents={
        description?.description || course?.data?.description?.description
      }
      onChange={(content) => {
        dispatch(setCourseDescription({ description: content }));
      }}
      setOptions={{
        buttonList: [["bold", "italic"], ["list"]],
      }}
      autoFocus={false}
      height="150px"
    />
  );
}

export default DescriptionEditor;
