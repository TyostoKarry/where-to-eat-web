declare module "masonry-layout" {
  export default class Masonry {
    constructor(selector: string | Element, options?: any);
    layout(): void;
    destroy(): void;
  }
}
