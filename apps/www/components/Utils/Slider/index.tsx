import styles from "./slider.module.scss";
import { CSSProperties } from "react";
import { SVGAction } from "../SVG";

interface SliderProps {
    tag?: string;
    name: string;
    defaultValue: number;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (v: number) => void;
    onDoubleClick: (v: number) => void;
    style?: CSSProperties;
    className?: string;
}

export const Slider = (props: SliderProps) => {
    const {
        tag,
        name,
        min,
        max,
        step,
        value,
        defaultValue,
        onChange,
        onDoubleClick,
        className,
    } = props;

    return (
        <div
            className={`${className} ${styles.container}`}
            data-change={value !== defaultValue}
        >
            <label
                className="label"
                // htmlFor={`controller-${name}`}
                // htmlFor={`input-number-${name}`}
                data-change={value !== defaultValue}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <span>{name}</span>
                <span>
                    {tag && <span>'{tag}'</span>}

                    <input
                        id={`input-number-${name}`}
                        type="number"
                        min={min}
                        max={max}
                        step={step}
                        value={value}
                        onChange={(e) => onChange(e.target.valueAsNumber)}
                        style={{ background: "none", color: "currentcolor" }}
                    />
                </span>
            </label>

            <label
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1rem",
                    alignItems: "center",
                    gap: "var(--grid-gap)",
                }}
            >
                <input
                    data-change={value !== defaultValue}
                    data-range="typetester-controller"
                    type="range"
                    id={`controller-${name}`}
                    name={name}
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    style={{
                        // @ts-ignore Custom css variable
                        "--range-val": value,
                        // @ts-ignore Custom css variable
                        "--range-min": min,
                        // @ts-ignore Custom css variable
                        "--range-max": max,
                    }}
                    onDoubleClick={() => onDoubleClick(defaultValue)}
                    onChange={(e) => onChange(e.target.valueAsNumber)}
                />
                <button
                    onClick={() => onChange(defaultValue)}
                    disabled={value === defaultValue}
                    className={styles.reset}
                    title={`Reset ${name}`}
                    style={{
                        padding: 0,
                        margin: 0,
                        borderRadius: "100%",
                        flexShrink: 0,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <SVGAction type="reset" />
                </button>
            </label>
        </div>
    );
};
