import { useEffect } from "react";

const DEFAULT_TITLE = "EEEA CMS";

export function useTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
  }, [title]);
}
