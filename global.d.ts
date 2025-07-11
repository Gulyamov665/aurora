declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}
declare module "*.css" {
  const value: string;
  export default value;
}

declare module "*/css" {
  const value: string;
  export default value;
}

declare module "swiper/css/pagination" {
  const value: string;
  export default value;
}

declare module "*.lottie" {
  const src: string;
  export default src;
}

declare module "@vercel/analytics/react" {
  export const Analytics: any;
}
