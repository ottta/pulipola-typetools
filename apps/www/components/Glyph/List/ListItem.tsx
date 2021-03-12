import styles from "./list.module.scss";
import type { Glyph } from "@pulipola/typetools";
import { useVariable, useTypetester, useFont } from "@pulipola/typetools";
import { useGlyphDisplay } from "lib/context/ContextGlyphDisplay";

type ListItemProps = {
    item: Glyph;
};
export const ListItem = ({ item }: ListItemProps) => {
    const { font } = useFont();
    const { state } = useTypetester();
    const { fontOutline } = state;
    const { generateVariationStyle } = useVariable();

    const { setModal, modal } = useGlyphDisplay();
    const { character, name, unicode, html_code } = item;

    return (
        <li
            onClick={() => setModal(item)}
            onMouseOver={() => setModal(item)}
            className={styles.item}
            data-active={modal && modal === item}
        >
            <div className={styles.name}>{name}</div>
            {character ? (
                <div
                    data-character={true}
                    data-outline={fontOutline}
                    className={styles.character}
                    style={{
                        // @ts-ignore
                        "--font-family": `${font.name}`,
                        ...generateVariationStyle(),
                    }}
                >
                    {character}
                </div>
            ) : (
                <div
                    data-character={false}
                    data-outline={fontOutline}
                    className={styles.character}
                    style={{
                        // @ts-ignore
                        "--font-family": `${font.name}`,
                    }}
                >
                    unicode
                </div>
            )}
            <div
                style={{
                    position: "absolute",
                    bottom: "0.5rem",
                    fontSize: 10,
                    color: "var(--accents-6)",
                }}
            >
                {unicode?.slice(2).toUpperCase()} - {html_code}
            </div>
        </li>
    );
};
