import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Separator } from "@/components/ui/separator";
import ActivityTableYearSelect from "./ActivityTableYearSelect";
import { useActivities } from "@/stores/activities.store";
import dayjs from "dayjs";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function ActivityTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const setYearFilter = useActivities((state) => state.setYearFilter);
  const yearFilter = useActivities((state) => state.yearFilter);

  const isFiltered = table.getState().columnFilters.length > 0 || yearFilter !== dayjs().year().toString();

  const handleResetFilters = () => {
    table.resetColumnFilters();
    setYearFilter(dayjs().year().toString());
  }

  return (
    <div className="flex flex-col sm:flex-row flex-1 items-center gap-2">
      <ActivityTableYearSelect />

      <Separator orientation="vertical" className="hidden sm:block h-4" />
      <Separator orientation="horizontal" className="sm:hidden block w-full" />

      <Input
        placeholder="Filtrar por titulo..."
        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("title")?.setFilterValue(event.target.value)
        }
        className="h-8 w-full sm:max-w-[250px] bg-background"
      />

      <div className="flex items-center justify-center gap-2 self-start">
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={handleResetFilters}
            className="h-8 px-2 lg:px-3"
          >
            Reiniciar
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
