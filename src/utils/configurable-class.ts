export type Class = string | undefined | null;
export type ClassModifierFn = (classes: string[]) => Class | Class[];
export type ConfigurableClass = Class | ClassModifierFn;

/**
 * Utility for wrapping class strings in a component,
 * such that they can be easily extended and ergonomically modified
 * by the consumer of the component.
 *
 * How to use in your component:
 * 1. In the component's props, accept an argument of type {@link ConfigurableClass}.
 * 2. Call {@link cc} with (or without) a default class string. It returns another
 *    function to which you should feed the prop's value from step 1.
 * 3. Use the resulting string in your component. The consumers of your component
 *    will be able to extend and modify the default class string you provide.
 * 4. The consumer of your class can pass a string to your prop. This string
 *    will be appended the the default class string.
 *    They can also pass a function to your prop. The input of that function is
 *    an array of class names, which they can manipulate using
 *    {@link Array.filter} and {@link Array.concat}, or ignored entirely.
 *
 * NOTE: having a prop called "class" on an interface is fine, but in JS "class"
 *       is a reserved word in the context of variable names, so you need to
 *       use syntax like `const { class: clx } = Astro.props;` when destructuring.
 *
 * Refer to {@link ./configurable-class.test.ts} for an overview of
 * the arguments and the outputs.
 */
export const parseConfigurableClass =
  (defaultClass: Class) =>
  (cc: Class | ClassModifierFn): Class => {
    if (typeof cc === "function") {
      // calculate class string using user-defined function
      const input = (defaultClass ?? "").split(" ").filter((clx) => clx !== "");
      const output = cc(input);
      if (typeof output === "string") {
        return output;
      } else if (Array.isArray(output)) {
        return output.join(" ");
      } else {
        return "";
      }
    } else {
      // append user-defined class string to default class string
      return [defaultClass, cc].filter((val) => !!val).join(" ");
    }
  };

export const cc = parseConfigurableClass;
