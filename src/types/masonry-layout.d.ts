declare module "masonry-layout" {
  interface MasonryOptions {
    itemSelector?: string;
    columnWidth?: number | string;
    gutter?: number;
    percentPosition?: boolean;
    horizontalOrder?: boolean;
    fitWidth?: boolean;
    originLeft?: boolean;
    originTop?: boolean;
    stamp?: string;
    transitionDuration?: string | number;
    stagger?: string | number;
    resize?: boolean;
  }

  class Masonry {
    constructor(element: Element | string, options?: MasonryOptions);
    layout(): void;
    reloadItems(): void;
    destroy(): void;
  }

  export = Masonry;
}
