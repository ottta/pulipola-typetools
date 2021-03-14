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
            {character && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                    }}
                >
                    <div
                        style={{
                            width: 0,
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            left: "50%",
                            transform: "translateX(-50%)",
                            borderRight: "1px dotted",
                        }}
                    />
                    <div
                        style={{
                            width: "100%",
                            height: 0,
                            position: "absolute",
                            top: "50%",
                            left: 0,
                            transform: "translateY(-50%)",
                            borderBottom: "1px dotted",
                        }}
                    />
                </div>
            )}

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

            <div className={styles.name}>{name}</div>

            <div className={styles.info}>
                {unicode && (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "var(--grid-gap)",
                        }}
                    >
                        <span
                            style={{
                                border: "1px solid",
                                padding: "0 var(--grid-gap)",
                                borderRadius: "5rem",
                                cursor: "pointer",
                            }}
                        >
                            {unicode && `U+${unicode.slice(2).toUpperCase()}`}
                        </span>
                        <span
                            style={{
                                border: "1px solid",
                                padding: "0 var(--grid-gap)",
                                borderRadius: "5rem",
                                cursor: "pointer",
                            }}
                        >
                            {html_code}
                        </span>
                    </div>
                )}
            </div>
        </li>
    );
};
