import NextHead from "next/head";
import { useFont } from "@pulipola/typetools";
import { Main } from "components/Layouts";
import { Glyph } from "components/Glyph";
import { GlyphModal } from "components/Glyph/Modal";

export default function Page() {
    const { font } = useFont();
    return (
        <>
            <NextHead>
                <title>Glyphs {`| ${font ? font.name : "Loading..."}`}</title>
            </NextHead>
            <Main>
                <Glyph />
            </Main>
            <GlyphModal />
        </>
    );
}
