import styles from "./list.module.scss";
import { useFont } from "@pulipola/typetools";
import { useGlyphDisplay } from "lib/context/ContextGlyphDisplay";
import { ListItem } from "./ListItem";

export const List = () => {
    const { font } = useFont();
    const {
        pagination: { data },
    } = useGlyphDisplay();
    const { setModal } = useGlyphDisplay();

    if (!font) {
        return <div style={{ padding: "var(--grid-gap)" }}>Loading...</div>;
    }
    if (data.length === 0) {
        return (
            <div style={{ padding: "var(--grid-gap)" }}>No result found...</div>
        );
    }

    // @TODO
    // const newRef = useRef<HTMLUListElement>(null);
    // const { targetX, targetWidth, targetY, targetHeight } = useMousePosition(
    //     newRef
    // );
    // const min = 100;
    // const transform = Math.round(((targetX + min) / targetWidth) * (700 - min));
    // const newX = targetX + 100;
    // const transform = Math.round((targetX / targetWidth) * 600);

    // const hasWeight = axes && axes.filter((item) => item.tag === "wght");
    // const isWeight =
    //     hasWeight && hasWeight.length !== 0 && (hasWeight[0] as Axes);
    // const weight = isWeight as Axes;
    // const ngews = x - w;
    // const maxWidth = Math.round((x / w) * (700 - min));
    // const minWidth = x / 100;
    // const memoizedX = useMemo(() => x, [x]);
    // console.log(maxWidth);
    // console.log(transform);
    // useEffect(() => {
    //     if (transform < 0) return;
    //     if (transform === Infinity) return;
    //     // if (!weight) return;
    //     setAxes("wght", transform + 100);
    // }, [transform]);

    return (
        <div>
            <ul
                // ref={newRef}
                className={styles.container}
                onMouseLeave={() => setModal(undefined)}
            >
                {data.map((props, i) => (
                    <ListItem key={i} item={props} />
                ))}
            </ul>
        </div>
    );
};
