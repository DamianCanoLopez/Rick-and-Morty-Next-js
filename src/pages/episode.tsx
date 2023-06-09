import H1 from "@/components/H1";
import H3Span from "@/components/H3";
import Slider from "@/components/Slider";
import { GetServerSidePropsContext } from "next";
import { 
    Result,
    getEpisodeDetails,
    EpisodeResult,
    getMultiCharacters
} from "@/api/callApi";

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const param = (context.query.number as string) || "";

    let response = null;
    if(param !== ""){
        response = await getEpisodeDetails(param);
    };

    const charactersIds = response?.characters.map((character) => {
        const textArr = character.split("/");
        const number = textArr[textArr.length - 1];
        return number;
    });

    const stringCharactersIds = charactersIds?.join(",");

    let characters = null;
    if(stringCharactersIds){
        characters = await getMultiCharacters(stringCharactersIds);
    }

    return {props: {response, characters} };
}

type Props = { response: EpisodeResult | null; characters: Result[] | null};

export default function Episode(props: Props){
    const charactersImg = props.characters?.map((character) => {
        return {
            src: character.image,
            href: `/details?idCharacter=${character.id}`,
            nameCharacter: character.name,
        };
    });

    return (
        <div className="h-screen flex flex-col">
            <H1 title={props.response?.name}/>

            <main className="flex flex-col flex-1 items-center max-w-6xl mx-auto">
                <H3Span
                    info="Air Date: "
                    data={props.response?.air_date}
                    classN="text-white"
                />

                <h3 className="text-cyan-300 text-xl mb-20">
                    <b>CHARACTERS</b>
                </h3>

                <Slider mount={3} imagenes={charactersImg}/>
            </main>
        </div>
    )
}
