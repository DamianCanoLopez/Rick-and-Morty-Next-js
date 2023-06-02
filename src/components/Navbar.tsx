import Link from "next/link";

export default function Navbar(){
    return (
        <nav className="text-white py-4 mx-auto text-2xl flex justify-center gap-4 bg-violet-900">
            <Link href="/">
                <i className="fa-sharp fa-solid fa-house" ></i>
            </Link>
            <Link href="https://github.com/DamianCanoLopez" target="_blank">
                <i className="fa-brands fa-github"></i>
            </Link>
            <Link href="https://www.linkedin.com/in/carlos-damian-cano-lopez-399812260/" target="_blank">
                <i className="fa-solid fa-user"></i>
            </Link>
            <Link href="https://damiancanolopez.vercel.app/" target="_blank">
                <i className="fa-sharp fa-solid fa-folder-open"></i>
            </Link>
        </nav>
    );
}