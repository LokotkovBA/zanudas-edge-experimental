type BoostyLogoProps = {
    width: string;
    height: string;
    className?: string;
};
export function BoostyLogo({ width, height, className }: BoostyLogoProps) {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox="0 0 33 40"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient
                    x1="61.5370404%"
                    y1="13%"
                    x2="34.2376801%"
                    y2="129.365079%"
                    id="linearGradient-1"
                >
                    <stop stopColor="#EF7829" offset="0%" />
                    <stop stopColor="#F0692A" offset="28%" />
                    <stop stopColor="#F15E2C" offset="63%" />
                    <stop stopColor="#F15A2C" offset="100%" />
                </linearGradient>
            </defs>
            <g
                id="Symbols"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
            >
                <g
                    id="Blocks/Header_Unlogged"
                    transform="translate(-15.000000, -15.000000)"
                >
                    <g
                        id="icons/boosty_logo"
                        transform="translate(15.000000, 15.000000)"
                    >
                        <g id="Shape">
                            <path
                                d="M1.03841146,23.8920635 L7.81508464,0 L18.2158138,0 L16.1119922,7.40740741 C16.0897554,7.44994435 16.0716695,7.49460291 16.0579948,7.54074074 L10.5357227,27.1005291 L15.6903971,27.1005291 C13.537424,32.5848325 11.8524284,36.8846561 10.6354102,40 C1.12771484,39.8920635 -1.53892578,32.9481481 0.795423177,24.7322751 L1.03841146,23.8920635 Z M10.672793,40 L23.2084961,21.6 L17.8897526,21.6 L22.5169141,9.81375661 C30.4586849,10.6603175 34.1824284,17.0285714 31.993457,24.7301587 C29.6424935,33.015873 20.1285677,40 10.8659375,40 L10.672793,40 Z"
                                fill="url(#linearGradient-1)"
                                fillRule="nonzero"
                            />
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
}
