import { formatTimeNumber } from "@/utils/timeFormat";

interface CountdownProps {
  minutes: number;
  seconds: number;
  completed: boolean;
}

const ShowCountDown = ({ minutes, seconds, completed }: CountdownProps) => {
  if (completed) return;

  return (
    <span>
      {`Podrás recibir un nuevo correo en ${formatTimeNumber(
        minutes
      )}:${formatTimeNumber(seconds)}`}
    </span>
  );
};
export default ShowCountDown;
