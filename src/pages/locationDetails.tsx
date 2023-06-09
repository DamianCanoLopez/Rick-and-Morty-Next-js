import H1 from "@/components/H1";
import H3Span from "@/components/H3";
import Slider from "@/components/Slider";
import { GetServerSidePropsContext } from "next";
import { 
    Result,
    getDetailsLocation,
    LocationResult,
    getMultiCharacters
} from "@/api/callApi";

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const param = (context.query.number as string) || "";

    let response = null;

    if(param !== ""){
        response = await getDetailsLocation(param);
    }

    const charactersIds = response?.residents.map((character) => {
        const textArr = character.split("/");
        const number = textArr[textArr.length - 1];
        return number;
    });

    const stringCharactersIds = charactersIds?.join();

    let characters = null;
    if(stringCharactersIds){
        characters = await getMultiCharacters(stringCharactersIds);
    }

    return { props: {response, characters} };
};

type Props = {response: LocationResult | null; characters: Result[] | null};

export default function LocationDetails(props: Props){
    const residents = props.characters?.map((character) => {
        return{
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
                    info="Dimension: "
                    data={props.response?.dimension}
                    classN="text-white"
                    classNh3="text-xl"
                />
                <H3Span
                    info="type: "
                    data={props.response?.type}
                    classN="text-white"
                    classNh3="text-xl"
                />

                <h3 className="text-cyan-300 text-xl mb-20">
                    <b>RESIDENTS</b>
                </h3>

                <Slider mount={3} imagenes={residents}/>
            </main>
        </div>
    )
}