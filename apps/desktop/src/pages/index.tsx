import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import Image from "next/image";
import reactLogo from "../assets/react.svg";
import tauriLogo from "../assets/tauri.svg";
import nextLogo from "../assets/next.svg";
import { Nav, Canvas } from "../../../../libs/ui/src/index";

import { useResizeDetector } from 'react-resize-detector';

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  const { width, height, ref } = useResizeDetector();

  return (
    <div className="container" ref={ref}>
      <Nav />
      <Canvas height={height} width={width} />
    </div>
  );
}

export default App;
