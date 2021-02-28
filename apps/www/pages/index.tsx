import NextHead from "next/head";
import { Typetester } from "components/Typetester";

export default function Page() {
    return (
        <>
            <NextHead>
                <title>Typetools by Pulipola</title>
                <meta
                    name="description"
                    // @TODO should be improve soon
                    content="Typetools is a bla bla bla..."
                />
            </NextHead>

            <main
                style={{
                    color: "var(--accents-16)",
                    display: "grid",
                    gap: "var(--grid-gap)",
                }}
            >
                <Typetester />
                <div style={{ height: "100vh" }} />
            </main>
        </>
    );
}
