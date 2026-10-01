import type { ReactNode } from "react";
import { AboutSubnav } from "@/components/about/about-subnav";
import { AboutAtmosphere } from "@/components/about/about-frame";

// Shared frame for the Who We Are pages: the home page's warm atmosphere
// behind the top, the About sub-navigation directly under the site header,
// then the page.
export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate flex flex-1 flex-col">
      <AboutAtmosphere />
      <AboutSubnav />
      {children}
    </div>
  );
}
