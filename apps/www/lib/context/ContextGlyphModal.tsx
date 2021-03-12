import type { Glyph } from "@pulipola/typetools";
import {
    createContext,
    Dispatch,
    FC,
    SetStateAction,
    useContext,
    useState,
} from "react";

type ContextGlyphModalProps = {
    glyph?: Glyph | undefined;
    setGlyph: Dispatch<SetStateAction<Glyph | undefined>>;
};

const init: ContextGlyphModalProps = {
    glyph: undefined,
    setGlyph: (val) => val,
};

const ContextGlyphModal = createContext<ContextGlyphModalProps>(init);
export const useGlyphModal = () => useContext(ContextGlyphModal);

export const ProviderGlyphModal: FC = ({ children }) => {
    const [glyph, setGlyph] = useState<Glyph | undefined>(undefined);
    return (
        <ContextGlyphModal.Provider value={{ glyph, setGlyph }}>
            {children}
        </ContextGlyphModal.Provider>
    );
};
