/**
 * Flexibly combine class names with conditional logic
 * @param classes Array of class names or conditional class objects
 * @returns Combined class string
 */
export function cx(
  ...classes: (
    | string
    | undefined
    | null
    | boolean
    | { [key: string]: boolean }
  )[]
) {
  return classes.reduce<string>((acc, cls) => {
    if (cls === null || cls === undefined || cls === false) return acc;

    if (typeof cls === "string") {
      return acc ? `${acc} ${cls}` : cls;
    }

    if (typeof cls === "object") {
      const conditionalClasses = Object.entries(cls)
        .filter(([, condition]) => condition)
        .map(([className]) => className);

      // Replace with:
      return Array.from(
        new Set([...acc.split(" "), ...conditionalClasses]),
      ).join(" ");
    }

    return acc;
  }, "");
}
