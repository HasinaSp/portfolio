type ClassValue =
  | string
  | false
  | null
  | undefined
  | Record<string, boolean>;

export function cn(...classes: ClassValue[]) {
  return classes
    .flatMap((value) => {
      if (!value) return [];

      if (typeof value === "string") {
        return [value];
      }

      return Object.entries(value)
        .filter(([, condition]) => condition)
        .map(([className]) => className);
    })
    .join(" ");
}