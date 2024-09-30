import { loadStripe } from "@stripe/stripe-js";
import CartCourse from "../features/Cart/CartCourse";
import { useCart } from "../reactQuery/cart/useCart";
import { useCourses } from "../reactQuery/useCourses";
import { createPaymentSession } from "../services/apiPayment";

function CartPage() {
  const { cart } = useCart();
  const courseIds = cart?.data?.map((cart) => cart.course_id);
  const { courses } = useCourses({
    courseIds,
  });

  const totalPrice = cart?.data?.reduce(
    (acc, sum) => acc + sum?.course?.price,
    0,
  );

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51PzQHZDpaV13eo6WbFbwKMr1GMDjtF132kfv4YTVRzgfwu5jtORUcgQS4k3ZPMg2qWRSyE26XOj69OTzFPquNobU00TNMAD8jI",
    );

    const session = await createPaymentSession({ products: cart?.data });

    stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <div className="mx-auto my-10 w-3/4 pt-10">
      <div className="flex gap-x-16">
        <div className="w-3/4">
          <h2 className="mb-10 text-4xl font-bold">Shopping Cart</h2>
          <p className="mb-2 font-semibold">
            {cart?.results === 1
              ? "1 Course in Cart"
              : `${cart?.results || 0} Courses in Cart`}
          </p>
          {cart?.results ? (
            courses?.data?.courses?.map((course) => (
              <CartCourse
                key={course?.id}
                course={course}
                cartItem={cart?.data?.find(
                  (cart) => cart?.course_id === course?.id,
                )}
              />
            ))
          ) : (
            <p>Your cart is empty. Keep shopping to find a course!</p>
          )}
        </div>
        {cart?.results ? (
          <div className="mt-20 flex w-1/4 flex-col gap-y-3">
            <p className="font-semibold">Total:</p>
            <p className="text-3xl font-bold">${totalPrice}</p>
            <button
              onClick={() => makePayment()}
              className="w-full bg-purple-500 py-3 font-semibold text-white hover:bg-purple-600"
            >
              Checkout
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default CartPage;
