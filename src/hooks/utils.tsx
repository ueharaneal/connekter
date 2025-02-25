
import { useWindowSize } from "@uidotdev/usehooks";

const useScreenWidth = () => useWindowSize().width ?? 0;

export const useIsXs = () => useScreenWidth() < 640;
/**
 * screen width >= 640 (same as tailwind `sm:`)
 */
export const useIsSm = () => useScreenWidth() >= 640;

/**
 * screen width >= 768 (same as tailwind `md:`)
 */
export const useIsMd = () => useScreenWidth() >= 768;

/**
 * for screen w md Screens
 */

export const useIsOnlyMd = () => {
  const screenWidth = useScreenWidth();
  return screenWidth >= 768 && screenWidth < 1024;
};
/**
 * screen width >= 1024 (same as tailwind `lg:`))
 */
export const useIsLg = () => useScreenWidth() >= 1024;

/**
 * screen width >= 1280 (same as tailwind `xl:`))
 */
export const useIsXl = () => useScreenWidth() >= 1280;
