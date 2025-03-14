import { fetchCuisineCategories } from "@/services/cuisineService";
import { insertDishItem } from "@/services/dishItemService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { AddMenuItemDrawerProps, DishItem } from "./AddMenuItemDrawer.types";
import DishForm from "./DishForm";

const formSchema = z.object({
  dish_name: z.string().nonempty("Dish name is required."),
  dish_image: z.string(),
  dish_recipe: z.string().nonempty("Dish recipe is required."),
  dish_calorie_count: z.string().nonempty("Calories is required."),
  dish_price: z.string().nonempty("Price is required."),
  dish_tags: z.array(z.string()).nonempty("Tags are required."),
  dish_category: z.string().nonempty("Dish category is required."),
  dish_type: z.string().nonempty("Dish type is required."),
  dish_occasion: z.string().nonempty("Dish occasion is required."),
  dish_dietary: z.string().nonempty("Dish dietary is required."),
  dish_cooking_methods: z
    .string()
    .nonempty("Dish cooking methods are required."),
  cuisine_type: z.string().nonempty("Cuisine type is required."),
  cuisine: z.string().nonempty("Cuisine is required."),
});

const AddMenuItemDrawer = ({
  isOpen,
  onClose,
  onAdd,
}: AddMenuItemDrawerProps) => {
  const [cuisineTypes, setCuisineTypes] = useState([]);
  const form = useForm<DishItem>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dish_name: "",
      dish_recipe: "",
      dish_calorie_count: "",
      dish_price: "",
      dish_tags: [],
      dish_image: "",
      dish_category: "",
      dish_type: "",
      dish_occasion: "",
      dish_dietary: "",
      dish_cooking_methods: "",
      cuisine_type: "",
      cuisine: "",
    },
  });

  useEffect(() => {
    const loadData = async () => {
      const cuisines = await fetchCuisineCategories();
      setCuisineTypes(cuisines);
    };
    loadData();
  }, []);

  const onSubmit = async (values: DishItem) => {
    try {
      await insertDishItem(values);
      toast.success("Dish item added successfully!");
      onAdd(values);
      form.reset();
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[70%]">
        <DialogHeader>
          <DialogTitle>Add Dish Item</DialogTitle>
        </DialogHeader>
        <DishForm
          form={form}
          onSubmit={onSubmit}
          cuisineTypes={cuisineTypes}
          dishDietaries={[]}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddMenuItemDrawer;
