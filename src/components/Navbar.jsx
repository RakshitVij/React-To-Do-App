const Navbar = () => {
  return (
    <nav className="flex justify-between text-white py-2 bg-slate-800">
      <div className="logo">
        <span className="font-bold text-xl mx-9">Task-O-Mania</span>
      </div>
      <ul className="flex gap-8 mx-9">
        <li className="cursor-pointer hover:font-bold transition-all">Home</li>
        <li className="cursor-pointer hover:font-bold transition-all">Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar