declare module "react-chrono" {
  import * as React from "react";

  type ChronoItem = {
    cardTitle?: string;
    cardSubtitle?: string;
  };

  type ChronoProps = {
    items: ChronoItem[];
    mode?: "HORIZONTAL" | "VERTICAL" | "VERTICAL_ALTERNATING";
    hideControls?: boolean;
    disableNavOnKey?: boolean;
    cardHeight: number;
    cardWidth: number;
  };

  export const Chrono: React.FC<ChronoProps>;
}
