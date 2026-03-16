import type { Route } from "./+types/login";
import { Game } from "../pages/game";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Game" },
    { name: "description", content: "Game of higher-lower!" },
  ];
}

export default function GameRoute() {
  return <Game/>;
}
