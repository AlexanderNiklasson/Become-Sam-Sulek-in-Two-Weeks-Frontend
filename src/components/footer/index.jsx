export function Footer() {
  return (
    <footer className="bg-customDarkblue text-white text-center p-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-2">
          <div className="text-left">
            <p>Left Column Text</p>
          </div>
          <div className="text-right">
            <p>Right Column Text</p>
          </div>
        </div>
        <p>&copy; 2021 Samsulek</p>
      </div>
    </footer>
  );
}
