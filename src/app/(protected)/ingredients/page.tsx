import PageContent from "@/components/common/page-content";
import IngredientsTable from "@/components/UI/tables/ingredients";
import IngredientForm from "@/forms/ingredients.from";

export default function IngredientsPage() {
  return (
    <div>
      <PageContent />
      <IngredientForm />
      <IngredientsTable />
    </div>
  );
}
