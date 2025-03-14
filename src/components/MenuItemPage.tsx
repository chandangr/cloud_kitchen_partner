import NoDataIcon from "@/components/icons/NoDataIcon";
import { Button } from "@/components/ui/button";
import { fetchDishItems, insertDishItem } from "@/services/dishItemService";
import { useEffect, useState } from "react";
import AddMenuItemDrawer, { DishItem } from "./AddMenuItemDrawer";
import { ThreeDCard } from "./ThreeDCard";

const MenuItemPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<DishItem[]>([]);

  const handleAddMenuItem = async (newItem: DishItem) => {
    await insertDishItem(newItem);
    const items = await fetchDishItems();
    setMenuItems(items);
  };

  useEffect(() => {
    const fetchItems = async () => {
      const items = await fetchDishItems();
      setMenuItems(items);
    };
    fetchItems();
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center mb-4 justify-between">
        <h1 className="text-2xl font-bold">Menu Items</h1>
        <Button onClick={() => setIsDrawerOpen(true)}>Add Menu Item</Button>
      </div>
      {menuItems.length === 0 ? (
        <div className="h-[calc(100vh-150px)] flex flex-col items-center justify-center">
          <NoDataIcon />
          <div className="ant-empty-description">No data</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item, index) => (
            <ThreeDCard
              key={index}
              title={item?.dish_name}
              titleBadge={item.dish_category}
              tags={item.dish_tags}
              description={item.dish_recipe}
              imageUrl="https://www.livofy.com/health/wp-content/uploads/2023/05/Add-a-heading-6.png"
              buttonText={item.dish_price}
              descriptionList={[
                { title: "Price", value: `${item.dish_price} rs` },
                { title: "Calorie Count", value: item.dish_calorie_count },
              ]}
            />
          ))}
        </div>
      )}
      <AddMenuItemDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onAdd={handleAddMenuItem}
      />
    </div>
  );
};

export default MenuItemPage;
