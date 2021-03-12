import { Grid } from "components/Layouts";
import { Header } from "./Header";
import { List } from "./List";

export const Glyph = () => {
    return (
        <Grid section="Glyphs" style={{ position: "relative" }}>
            <Header />
            <List />
        </Grid>
    );
};
