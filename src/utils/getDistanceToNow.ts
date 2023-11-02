import { differenceInHours, formatDistanceToNow, isToday } from "date-fns";
import { ptBR } from "date-fns/locale";

export function getDistanceToNow(date: string) {
  const now = new Date();
  const dateInstance = new Date(date);

  if (isToday(dateInstance)) {
    return "Hoje";
  } else if (differenceInHours(now, dateInstance) < 24) {
    return "Ontem";
  }

  return formatDistanceToNow(dateInstance, { addSuffix: true, locale: ptBR });
}
