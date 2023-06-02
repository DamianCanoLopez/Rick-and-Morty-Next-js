import H1 from "@/components/H1";
import HoverEffect from "@/components/HoverEffect";
import { Button } from "@/components/u-i/button";
import { RootObject, getFigures } from "@/api/callApi";
import { useState } from "react";

export const getServerSideProps = async () => {
  type UrlsT = string;
  const BaseUrl: UrlsT = "https://rickandmortyapi.com/api/character";
  const response = await getFigures(BaseUrl);
  return { props: {response} };
};

type PropsT = { response?: RootObject};

export default function Home(props: PropsT) {
  const [charactersData, setCharactersData] = useState<
    RootObject["results"] | undefined
  >(props.response?.results);

  const [nextPage, setNextPage] = useState<string | undefined>(
    props.response?.info?.next
  );

  const [prevPage, setPrevPage] = useState<string | null>(
    props.response?.info?.prev
  );

  const characters = charactersData?.map((character) => {
    return (
      <HoverEffect
        key={character.id}
        linkHref={`/details?idCharacter=${character.id}`}
        imgSrc={character.image}
        characterName={character.name}
      />
    );
  });

  return (
    <>
      <H1 title="RICK AND MORTY" />

      <main className="flex flex-col min-h-screen max-w-4xl mx-auto px-4" >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 w-full">{characters}</div>

        <div className="flex flex-col sm:flex-row gap-4 pt-10 mx-auto">
          {prevPage && (
            <Button
              size="lg"
              variant="default"
              onClick={async () => {
                if(prevPage){
                  const response = await getFigures(prevPage);
                  setCharactersData(response?.results);
                  setNextPage(response?.info.next);
                  setPrevPage(response?.info.prev)
                }
              }}
            >
              Prev
            </Button>
          )}
          {nextPage && (
            <Button
              size="lg"
              variant="default"
              onClick={async () => {
                const response = await getFigures(nextPage);
                setCharactersData(response?.results);
                setNextPage(response?.info.next);
                setPrevPage(response?.info.prev)
              }}>
              Next
            </Button>
          )}
        </div>
      </main>
    </>
  )
}