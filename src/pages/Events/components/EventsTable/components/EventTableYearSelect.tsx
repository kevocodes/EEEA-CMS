import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEvents } from "@/stores/events.store";
import dayjs from "dayjs";

function EventTableYearSelect() {
  const year = dayjs().year();
  const yearSelection = useEvents((state) => state.yearFilter);
  const setYearSelection = useEvents((state) => state.setYearFilter);

  return (
    <Select onValueChange={setYearSelection} defaultValue={yearSelection}>
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

export default EventTableYearSelect;
