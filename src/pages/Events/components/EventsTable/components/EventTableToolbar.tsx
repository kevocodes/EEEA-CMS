import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { statuses } from "../constants/status";
import { EventTableFacetedCompletedFilter } from "./EventTableFacetedCompletedFilter";
import EventTableYearSelect from "./EventTableYearSelect";
import { Separator } from "@/components/ui/separator";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function EventTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
      <div className="flex flex-col sm:flex-row flex-1 items-center gap-2">
        <EventTableYearSelect />
        
        <Separator orientation="vertical" className="hidden sm:block h-4"/>
        <Separator orientation="horizontal" className="sm:hidden block w-full"/>
        
        <Input
          placeholder="Filtrar por titulo..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-full sm:max-w-[250px] bg-background"
        />

        <div className="flex items-center justify-center gap-2 self-start">
          {table.getColumn("completed") && (
            <EventTableFacetedCompletedFilter
              column={table.getColumn("completed")}
              title="Estado"
              options={statuses}
            />
          )}

          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
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
