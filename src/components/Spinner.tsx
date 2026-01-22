// src/components/Spinner.tsx
import { ThreeDots } from "react-loader-spinner";

const Spinner = () => {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <ThreeDots
                visible={true}
                height="20"
                width="80"
                color="#fff" // indigo (Tailwind primary style)
                radius="9"
                ariaLabel="three-dots-loading"
            />
        </div>
    );
};

export default Spinner;
