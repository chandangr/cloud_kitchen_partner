import { zodResolver } from "@hookform/resolvers/zod";
import console from "console";
import { CloudUpload, Paperclip } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "./ui/file-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { TagsInput } from "./ui/tags-input";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  food_name: z.string().nonempty("Food name is required."),
  food_image: z.string(),
  food_recipe: z.string().nonempty("Food recipe is required."),
  food_items: z.string().nonempty("Food items is required."),
  food_calorie_count: z.string().nonempty("Calories is required."),
  food_price: z.string().nonempty("Price is required."),
  food_category: z.string().nonempty("Category is required."),
  food_tags: z.array(z.string()).nonempty("Tags is required."),
});

const foodCategoryItems = [
  {
    label: "Burger",
    value: "burger",
  },
  {
    label: "Pizza",
    value: "pizza",
  },
  {
    label: "Pasta",
    value: "pasta",
  },
  {
    label: "Beverages",
    value: "beverages",
  },
  {
    label: "Desserts",
    value: "desserts",
  },
  {
    label: "Salads",
    value: "salads",
  },
  {
    label: "Sandwiches",
    value: "sandwiches",
  },
  {
    label: "Soups",
    value: "soups",
  },
  {
    label: "Starters",
    value: "starters",
  },
  {
    label: "Main Course",
    value: "main course",
  },
  {
    label: "Breakfast",
    value: "breakfast",
  },
  {
    label: "Lunch",
    value: "lunch",
  },
  {
    label: "Dinner",
    value: "dinner",
  },
  {
    label: "Snacks",
    value: "snacks",
  },
  {
    label: "Appetizers",
    value: "appetizers",
  },
  {
    label: "Sides",
    value: "sides",
  },
  {
    label: "Curry",
    value: "curry",
  },
];

export type FoodItem = z.infer<typeof formSchema>;

export type AddMenuItemDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: FoodItem) => void;
};

const AddMenuItemDrawer = ({
  isOpen,
  onClose,
  onAdd,
}: AddMenuItemDrawerProps) => {
  const [files, setFiles] = useState<File[] | null>(null);

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      food_name: "",
      food_recipe: "",
      food_items: "",
      food_category: "",
      food_calorie_count: "",
      food_price: "",
      food_tags: [],
      food_image: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
      onClose();
      onAdd(values);
      form.reset();
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Food Item</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-h-[calc(100vh-200px)] overflow-auto"
          >
            <div>
              <div>
                <FormField
                  control={form.control}
                  name="food_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Food Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter name of your food."
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="food_category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Food Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Enter you food category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {foodCategoryItems?.map((item, index) => (
                        <SelectItem key={index} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="food_tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add tags</FormLabel>
                  <FormControl>
                    <TagsInput
                      value={field.value}
                      onValueChange={(tags) => {
                        // @ts-expect-error -- commented out because of the error
                        form.setValue("food_tags", tags);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="food_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter price"
                          type="number"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="food_calorie_count"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Calorie Count</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter food calorie count"
                          type="number"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="food_recipe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Food Recipe (Summary)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter food recipe (Summary)"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="food_items"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Food items</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter food items used."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="food_image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Food Image</FormLabel>
                  <FormControl>
                    <FileUploader
                      value={files}
                      onValueChange={setFiles}
                      dropzoneOptions={dropZoneConfig}
                      className="relative bg-background rounded-lg p-2"
                    >
                      <FileInput
                        id="fileInput"
                        className="outline-dashed outline-1 outline-slate-500"
                        {...field}
                      >
                        <div className="flex items-center justify-center flex-col p-8 w-full ">
                          <CloudUpload className="text-gray-500 w-10 h-10" />
                          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>
                            &nbsp; or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF
                          </p>
                        </div>
                      </FileInput>
                      <FileUploaderContent>
                        {files &&
                          files.length > 0 &&
                          files.map((file, i) => (
                            <FileUploaderItem key={i} index={i}>
                              <Paperclip className="h-4 w-4 stroke-current" />
                              <span>{file.name}</span>
                            </FileUploaderItem>
                          ))}
                      </FileUploaderContent>
                    </FileUploader>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMenuItemDrawer;
