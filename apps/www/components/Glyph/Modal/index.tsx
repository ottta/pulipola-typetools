import styles from "./modal.module.scss";
import type { Glyph } from "@pulipola/typetools";
import { useEffect, useRef, useState } from "react";
import { useTransition, animated } from "react-spring";
import { useGlyphDisplay } from "lib/context/ContextGlyphDisplay";

type GlyphInspectorProps = {
    glyph: Glyph;
};
type gridID = "baseline" | "ascender" | "descender" | "x-height" | "cap-height";

const GlyphInspector = ({ glyph }: GlyphInspectorProps) => {
    const refParent = useRef<HTMLDivElement>(null);
    const glyphIndex = glyph.glyph_id;
    const [glyphPath, setGlyphPath] = useState<string>();
    const [grid, setGrid] = useState<
        { id: gridID; name: string; yUnits: number; width: number; y: number }[]
    >([]);

    useEffect(() => {
        let glyphScale: number,
            glyphSize: number,
            glyphBaseline: number,
            glyphMargin: number = 64;

        if (!refParent.current) return;
        const parent = refParent.current;
        const parentWidth = parent.offsetWidth;
        const height = parent.offsetHeight;
        const font = glyph.open_type;
        const length = font.glyphs.length;
        const head = font.tables.head;
        const maxHeight = head.yMax - head.yMin;
        const glyphW = parentWidth - glyphMargin * 4;
        const glyphH = height - glyphMargin * 4;

        // glyphScale = Math.min(glyphW, glyphH / (maxHeight * 1.5));
        glyphScale = Math.min(glyphW, glyphH / (maxHeight * 1.3));
        glyphSize = glyphScale * font.unitsPerEm;
        glyphBaseline = glyphMargin + (glyphH * head.yMax) / maxHeight;

        const mantep = font.glyphs.get(
            glyphIndex > length - 1 ? 0 : glyphIndex
        );
        const FG = mantep.advanceWidth * glyphScale;
        const gW = glyphBaseline - 0 * glyphScale;
        const xmin = (parentWidth - FG) / 2; // Glyph position, divide by two mean horizontally centered from parent
        const x0 = xmin;
        const p = mantep.getPath(x0, gW, glyphSize);
        const paths = p.toPathData(0);
        setGlyphPath(paths);

        // Grid for glyph inspector
        const descender: number = font.tables.hhea.descender;
        const ascender: number = font.tables.hhea.ascender;
        const xHeight: number = font.tables.os2.sxHeight;
        const cHeight: number = font.tables.os2.sCapHeight;
        const baseLine: number = 0;
        const ypx = (val: number) => glyphBaseline - val * glyphScale;

        setGrid([
            {
                id: "ascender",
                name: "Ascender",
                yUnits: ypx(ascender),
                width: parentWidth,
                y: ascender,
            },
            {
                id: "cap-height",
                name: "Cap Height",
                yUnits: ypx(cHeight),
                width: parentWidth,
                y: cHeight,
            },
            {
                id: "x-height",
                name: "X-Height",
                yUnits: ypx(xHeight),
                width: parentWidth,
                y: xHeight,
            },
            {
                id: "baseline",
                name: "Baseline",
                yUnits: ypx(baseLine),
                width: parentWidth,
                y: baseLine,
            },
            {
                id: "descender",
                name: "Descender",
                yUnits: ypx(descender),
                width: parentWidth,
                y: descender,
            },
        ]);
    }, [refParent, glyph.glyph_id]);

    return (
        <div ref={refParent} className={styles.svg_container}>
            <svg>
                <g aria-label="glyph-grid">
                    {grid.length !== 0 &&
                        grid.map(({ id, yUnits, width, name, y }, key) => (
                            <g aria-label={id} key={key}>
                                <line
                                    x1="0"
                                    x2={width}
                                    y1={yUnits}
                                    y2={yUnits}
                                    data-id={id}
                                    stroke={
                                        id === "baseline" || id === "x-height"
                                            ? "red"
                                            : "var(--accents-4)"
                                    }
                                    strokeWidth="1"
                                    strokeDasharray={
                                        id === "baseline" || id === "x-height"
                                            ? "2 2"
                                            : "0"
                                    }
                                />
                                <text
                                    data-id={id}
                                    fontSize="var(--text-small)"
                                    fontFamily="var(--font-monospace)"
                                    fill={
                                        id === "baseline" || id === "x-height"
                                            ? "red"
                                            : "currentColor"
                                    }
                                >
                                    <tspan x="16" y={yUnits - 10}>
                                        {name}
                                    </tspan>
                                    <tspan x={width - 8} textAnchor="end">
                                        {y}
                                    </tspan>
                                </text>
                            </g>
                        ))}
                </g>
                {glyphPath && (
                    <g aria-label="glyph-display">
                        <path
                            d={glyphPath}
                            fillOpacity="1"
                            fill="currentColor"
                            // strokeWidth="0"
                            // stroke="var(--geist-pp-color)"
                        />
                    </g>
                )}
            </svg>
        </div>
    );
};

export const GlyphModal = () => {
    const { modal, setModal } = useGlyphDisplay();
    const transitions = useTransition(modal, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        update: { opacity: 1 },
        leave: { opacity: 0 },
        config: { mass: 5, tension: 2000, friction: 200 },
    });

    return (
        <>
            {transitions.map(
                ({ item, key, props }) =>
                    item && (
                        <animated.div
                            key={key}
                            onClick={() => setModal(undefined)}
                            className={styles.container}
                            style={{
                                ...props,
                            }}
                        >
                            <div>{item.name}</div>
                            <GlyphInspector glyph={item} />
                        </animated.div>
                    )
            )}
        </>
    );
};
