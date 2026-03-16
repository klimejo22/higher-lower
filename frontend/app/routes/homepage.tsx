import type { Route } from "./+types/homepage";
import { HomePage } from "~/pages/homepage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Higher-Lower" },
    { name: "description", content: "Game about guessing the popularity of frameworks" },
  ];
}

export default function HomepageRoute() {
  return <HomePage />;
}