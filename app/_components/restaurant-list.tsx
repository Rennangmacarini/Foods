import { db } from "../_lib/prisma";
import RestaurantItem from "./restaurant-item";


const RestaurantList = async () => {
    const restaurants = await db.restaurant.findMany({take:10})
    return ( 
        <div>
 <div className="flex gap-4 overflow-x-scroll px-5 lg:justify-center [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <RestaurantItem key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
        </div>
     );
}
 
export default RestaurantList;