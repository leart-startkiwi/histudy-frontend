import { Link } from "react-router-dom";
import NavbarDropdownCourse from "../../ui/NavbarDropdownCourse";

function CartDropdown({ cart }) {
  const totalPrice = cart?.data?.reduce(
    (acc, sum) => acc + sum?.course?.price,
    0,
  );
  return (
    <div className="flex flex-col text-black">
      {cart?.results ? (
        <>
          {cart.data.map((cartItem) => (
            <NavbarDropdownCourse
              key={cartItem.id}
              course={cartItem.course}
              user={cartItem.user}
              cart={true}
            />
          ))}
          <p className="ms-12 mt-3 text-xl font-bold">Total: ${totalPrice}</p>
          <Link
            to="/cart"
            className="mx-auto mt-3 w-3/4 rounded-md border bg-gray-800 py-3 text-center font-semibold text-white hover:bg-gray-700 "
          >
            Go to cart
          </Link>
        </>
      ) : (
        <>
          <p className="text-center text-base text-gray-600">
            Your cart is empty.
          </p>
          <Link
            to="/courses"
            className="mt-3 text-center text-base font-semibold text-violet-700 hover:text-violet-900"
          >
            Keep shopping
          </Link>
        </>
      )}
    </div>
  );
}

export default CartDropdown;
