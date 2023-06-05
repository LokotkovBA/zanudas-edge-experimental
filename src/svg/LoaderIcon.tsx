type LoaderIconProps = {
    size: string;
    className: string;
};

export function LoaderIcon({ size, className }: LoaderIconProps) {
    return (
        <svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 1C12.5523 1 13 1.44772 13 2V6C13 6.55228 12.5523 7 12 7C11.4477 7 11 6.55228 11 6V2C11 1.44772 11.4477 1 12 1Z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 17C12.5523 17 13 17.4477 13 18V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V18C11 17.4477 11.4477 17 12 17Z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.22289 4.22295C4.61342 3.83242 5.24658 3.83242 5.63711 4.22295L8.46711 7.05295C8.85763 7.44347 8.85763 8.07664 8.46711 8.46716C8.07658 8.85769 7.44342 8.85769 7.05289 8.46716L4.22289 5.63716C3.83237 5.24664 3.83237 4.61347 4.22289 4.22295Z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.5329 15.5329C15.9234 15.1424 16.5566 15.1424 16.9471 15.5329L19.7771 18.3629C20.1676 18.7534 20.1676 19.3866 19.7771 19.7771C19.3866 20.1676 18.7534 20.1676 18.3629 19.7771L15.5329 16.9471C15.1424 16.5566 15.1424 15.9234 15.5329 15.5329Z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1 12C1 11.4477 1.44772 11 2 11H6C6.55228 11 7 11.4477 7 12C7 12.5523 6.55228 13 6 13H2C1.44772 13 1 12.5523 1 12Z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17 12C17 11.4477 17.4477 11 18 11H22C22.5523 11 23 11.4477 23 12C23 12.5523 22.5523 13 22 13H18C17.4477 13 17 12.5523 17 12Z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.46711 15.5329C8.85763 15.9234 8.85763 16.5566 8.46711 16.9471L5.63711 19.7771C5.24658 20.1676 4.61342 20.1676 4.22289 19.7771C3.83237 19.3866 3.83237 18.7534 4.22289 18.3629L7.05289 15.5329C7.44342 15.1424 8.07658 15.1424 8.46711 15.5329Z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.7771 4.22295C20.1676 4.61347 20.1676 5.24664 19.7771 5.63716L16.9471 8.46716C16.5566 8.85769 15.9234 8.85769 15.5329 8.46716C15.1424 8.07664 15.1424 7.44347 15.5329 7.05295L18.3629 4.22295C18.7534 3.83242 19.3866 3.83242 19.7771 4.22295Z"
            />
        </svg>
    );
}