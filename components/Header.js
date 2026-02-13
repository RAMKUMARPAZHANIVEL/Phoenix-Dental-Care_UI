import MobileMenu from "./mobileMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <div className="flex gap-5">
          <img src="../images/Logo.jpeg" className="w-12"/>
          <h1 className="text-xl font-bold text-primary my-auto mr-5">Dr Divya's Phoenix Dental Care</h1>
        </div>
        <nav className="space-x-6 hidden md:block">
          <a href="#about" className="hover:text-primary transition font-medium">About</a>
          <a href="#treatments" className="hover:text-primary transition font-medium">Treatments</a>
          <a href="#contact" className="hover:text-primary transition font-medium">Contact</a>
        </nav>
        <MobileMenu />
      </div>
    </header>
  );
}
