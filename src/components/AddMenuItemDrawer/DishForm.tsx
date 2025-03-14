import { Form } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { TagsInput } from "../ui/tags-input";
import { Textarea } from "../ui/textarea";

const DishForm = ({ form, onSubmit, cuisineTypes, dishDietaries }) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 p-1 max-h-[calc(100vh-200px)] overflow-auto"
      >
        <Input
          {...form.register("dish_name")}
          placeholder="Enter name of your dish."
        />
        <Input
          {...form.register("dish_calorie_count")}
          placeholder="Enter dish calorie count"
          type="number"
        />
        <Input
          {...form.register("dish_price")}
          placeholder="Enter price"
          type="number"
        />
        <Select {...form.register("cuisine")}>
          <SelectTrigger>
            <SelectValue placeholder="Select cuisine" />
          </SelectTrigger>
          <SelectContent>
            {cuisineTypes.map((cuisine) => (
              <SelectItem key={cuisine.id} value={cuisine.name}>
                {cuisine.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select {...form.register("dish_dietary")}>
          <SelectTrigger>
            <SelectValue placeholder="Select dietary options" />
          </SelectTrigger>
          <SelectContent>
            {dishDietaries.map((dietary) => (
              <SelectItem key={dietary.id} value={dietary.name}>
                {dietary.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <TagsInput
          value={form.getValues("dish_tags")}
          onValueChange={(tags) => form.setValue("dish_tags", tags)}
        />
        <Textarea
          {...form.register("dish_recipe")}
          placeholder="Enter dish recipe (Summary)"
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default DishForm;
