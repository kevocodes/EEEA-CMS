import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActivities } from "@/stores/activities.store";
import dayjs from "dayjs";

function ActivityTableYearSelect() {
  const year = dayjs().year();
  const yearSelection = useActivities((state) => state.yearFilter);
  const setYearSelection = useActivities((state) => state.setYearFilter);

  return (
    <Select onValueChange={setYearSelection} value={yearSelection}>
      <SelectTrigger className="h-8 w-full sm:max-w-[250px] bg-background">
        <SelectValue placeholder="Selecciona un año" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Año</SelectLabel>
          {[year + 1, year, year - 1].map((year) => (
            <SelectItem key={year} value={String(year)}>
              {year}
            </SelectItem>
          ))}
          <SelectItem value="all">Todos</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default ActivityTableYearSelect;
