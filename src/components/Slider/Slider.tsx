import Style from "./S.module.css";
import Link from "next/link";
import { useState } from "react";
import HoverEffect from "../HoverEffect";

type Prosp = {
    imagenes: { src: string; href: string; nameCharacter: string }[] | undefined;
    mount?: number;
};

export default function Slider({imagenes, mount = 5}: Prosp){
    const [imgCurrent, setImgCurrent] = useState<number>(0);
    const amount = imagenes?.length || 0;

    if (!Array.isArray(imagenes) || amount < 1){
        return null;
    }

    const nextImg = () => {
        if(imgCurrent === amount -1){
            setImgCurrent(0);
        }else{
            setImgCurrent(imgCurrent + 1);
        }
    };

    const previousImg = () => {
        if(imgCurrent === 0){
            setImgCurrent(amount - mount);
        }else{
            setImgCurrent(imgCurrent - 1);
        }
    };

    return (
        <div className={Style.container}>
            <button 
                className="text-white me-10 text-6xl hover:text-cyan-300"
                onClick={previousImg}>
                {"<"}
            </button>
            {imagenes.map((imagen, i: number) => {
                return (
                    <div key={i}>
                        {i >= imgCurrent && i < imgCurrent + mount && (
                            <HoverEffect
                                linkHref={imagen.href}
                                imgSrc={imagen.src}
                                characterName={imagen.nameCharacter}
                            />
                        )}
                    </div>
                );
            })}
            <button
                className="text-white ms-10 text-6xl hover:text-cyan-300"
                onClick={nextImg}>
                {">"}
            </button>
        </div>
    )
}