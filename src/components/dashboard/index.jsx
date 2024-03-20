export function Dashboard() {
  return (
    <div>
      <div className="mt-[100px] text-center">
        <h1 className="text-customPurple text-6xl ml-[100px]">Welcome!</h1>
        <h1 className="text-customPurple text-4xl ml-[100px]">
          Time to get swole.
        </h1>
      </div>
      <div className="fixed bottom-0 left-0 z-[-1] w-full bg-transparent ">
        <img
          src="../src/assets/samsulek.png"
          alt="samsulek"
          className="w-3/5 mx-auto animate-pulse select-none "
        />
      </div>
    </div>
  );
}
