import { image } from "../assets/images";

function ComingSoon() {
  return (
    <div className="w-full mt-10">
      <p className="text-5xl">Coming Soon!!!!!</p>
      <div className="flex flex-col mt-2 items-center">
        <img src={image.dainozuk} className="w-96 h-96" />
        <p className="font-lavishly text-4xl">DaiNo Labs</p>
      </div>
    </div>
  );
}

export default ComingSoon;
