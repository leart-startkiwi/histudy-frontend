import { useEffect, useState } from "react";
import { usePrices } from "../../reactQuery/constants/usePrices";
import GeneralDropdownContainer from "./GeneralDropdownContainer";
import { useUpdateCourse } from "../../reactQuery/useUpdateCourse";
import { useParams } from "react-router";
import { useCourse } from "../../reactQuery/courses/useCourse";

function Pricing() {
  const params = useParams();
  const { prices } = usePrices();
  const { updateCourse } = useUpdateCourse();
  const { course } = useCourse(params.id);

  const [showPricesDropdown, setShowPricesDropdown] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("Select");

  const priceData =
    selectedPrice === "Free" ? 0 : selectedPrice?.split(" ")?.at(0)?.slice(1);

  console.log(course?.data?.price !== 0);

  useEffect(() => {
    if (course?.data?.price) {
      if (course?.data?.price == 0) {
        setSelectedPrice("Free");
      } else {
        const price = prices?.data?.find((price) =>
          price?.name?.includes(course?.data?.price),
        );
        setSelectedPrice(price?.name);
      }
    }
  }, [course?.data?.price, prices?.data]);

  return (
    <div>
      <h3 className="font-bold">Set a price for your course</h3>
      <p className="mb-5">
        Please select the the price tier for your course. If you’d like to offer
        your course for free, it must have a total video length of less than 2
        hours. Also, courses with practice tests can not be free.
      </p>
      <label className="font-bold">Price tier</label>
      <div className="mt-2 flex items-start gap-x-5">
        <GeneralDropdownContainer
          chosen={selectedPrice}
          placeholder={selectedPrice}
          showDropdown={showPricesDropdown}
          setShowDropdown={setShowPricesDropdown}
          width="w-1/3"
          customFn={(item) => {
            setShowPricesDropdown(false);
            setSelectedPrice(item.name);
          }}
          data={prices?.data}
        />
      </div>
      <button
        onClick={() =>
          updateCourse({
            id: params.id,
            updateCourseObj: { price: priceData },
          })
        }
        className="mt-5 border border-black bg-gray-800 px-5 py-2 text-base font-semibold text-white hover:bg-gray-700"
      >
        Save
      </button>
    </div>
  );
}

export default Pricing;
