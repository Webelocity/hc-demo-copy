import Image from "next/image";

interface FallBackImageProps {

    className?: string;
}
export default function FallBackImage({ className }: FallBackImageProps) {
    return (
        <div className={`relative ${className}`}>
            <Image src="/assets/image/shared/logo.svg" alt="category" fill />
        </div>
    );
}
