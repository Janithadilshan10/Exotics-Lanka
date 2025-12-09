import { featuredCars } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";

const Inventory = () => {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="font-display text-2xl font-bold">Inventory</h2>
          <p className="text-sm text-muted-foreground">{featuredCars.length} vehicles in stock</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Vehicle
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search inventory..." className="pl-10 bg-muted/20 border-border" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Inventory Table */}
      <div className="glass-dark rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr className="text-left">
                <th className="p-4 text-sm font-medium text-muted-foreground">Vehicle</th>
                <th className="p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Price</th>
                <th className="p-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">Health</th>
                <th className="p-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">Status</th>
                <th className="p-4 text-sm font-medium text-muted-foreground hidden xl:table-cell">Views</th>
                <th className="p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {featuredCars.map((car) => (
                <tr key={car.id} className="border-b border-border/50 hover:bg-muted/10 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={car.image}
                        alt={car.title}
                        className="w-16 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium text-sm">{car.title}</p>
                        <p className="text-xs text-muted-foreground">{car.year} • {car.mileage.toLocaleString()} km</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <p className="font-semibold">LKR {(car.price / 1000000).toFixed(1)}M</p>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          car.healthScore >= 80
                            ? "bg-emerald-500/20 text-emerald-500"
                            : car.healthScore >= 60
                            ? "bg-amber-500/20 text-amber-500"
                            : "bg-rose-500/20 text-rose-500"
                        }`}
                      >
                        {car.healthScore}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    <Badge variant={car.isNew ? "success" : "secondary"}>
                      {car.isNew ? "New" : "Active"}
                    </Badge>
                  </td>
                  <td className="p-4 hidden xl:table-cell">
                    <p className="text-sm">{car.views.toLocaleString()}</p>
                  </td>
                  <td className="p-4">
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
