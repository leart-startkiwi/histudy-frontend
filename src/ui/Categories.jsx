import HomeSectionIntro from "./HomeSectionIntro";
import { useCategories } from "../reactQuery/useCategories";
import CategoryCard from "./CategoryCard";

function Categories({ from }) {
  const { categories } = useCategories();

  return (
    <section className="mt-36">
      <HomeSectionIntro section="Categories" />

      {from != "admin" && (
        <h2 className="mt-5 text-center text-4xl font-semibold">
          Explore Top Courses Categories That Will Change You
        </h2>
      )}

      <div className="mx-auto mt-10 flex flex-col gap-y-6 px-3 md:w-[90%] md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-x-4">
        {categories?.data?.map((category) => (
          <CategoryCard key={category.id} category={category} from={from} />
        ))}
      </div>
    </section>
  );
}

export default Categories;
