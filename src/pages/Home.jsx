import Aside from "../components/Aside";
import Main from "../components/Main";

export default function Home() {
  return (
    <div className="home w-home-width h-home-height rounded-lg text-txt-color relative flex overflow-hidden">
      
      <Aside />
      <Main />
    </div>
  );
}
