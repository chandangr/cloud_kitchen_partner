import NoDataIcon from "@/components/icons/NoDataIcon";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AddMenuItemDrawer, { FoodItem } from "./AddMenuItemDrawer";
import { ThreeDCard } from "./ThreeDCard";

const MenuItemPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<FoodItem[]>([]);

  const handleAddMenuItem = (newItem: FoodItem) => {
    setMenuItems((prevItems) => [...prevItems, newItem]);
  };

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
              title={item?.food_name}
              titleBadge={item.food_category}
              tags={item.food_tags}
              description={item.food_recipe}
              imageUrl="https://www.livofy.com/health/wp-content/uploads/2023/05/Add-a-heading-6.png"
              buttonText={item.food_price}
              descriptionList={[
                { title: "Price", value: `${item.food_price} rs` },
                { title: "Calorie Count", value: item.food_calorie_count },
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
