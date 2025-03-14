import { z } from "zod";

export type DishItem = z.infer<typeof formSchema>;

export type AddMenuItemDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: DishItem) => void;
};
