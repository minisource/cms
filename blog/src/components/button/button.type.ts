import { React } from "next/dist/server/route-modules/app-page/vendored/rsc/entrypoints";
import { JSX } from "react/jsx-runtime";

export type TButtonProps = {
  variant: "contained" | "outlined" | "icon" | "text";
  endIcon?: JSX.Element; //use icon name in svg component
  startIcon?: JSX.Element; //use icon name in svg component
  isLoading?: boolean;
} & React.ComponentProps<"button">;

// note we can use ButtonHTMLAttributes<HTMLButtonElement>
