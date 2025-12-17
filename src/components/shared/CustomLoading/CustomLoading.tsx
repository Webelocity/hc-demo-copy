import styles from "./CustomLoading.module.scss";

interface CustomLoadingProps {
  fullScreen?: boolean;
  size?: "small" | "medium" | "large";
  dotCount?: number;
}

export default function CustomLoading({
  fullScreen = false,
  size = "medium",
  dotCount = 3,
}: CustomLoadingProps) {
  const dots = Array.from({ length: dotCount }, (_, i) => i);

  return (
    <div
      className={`${styles.loadingContainer} ${fullScreen ? styles.fullScreen : ""
        }`}
    >
      <div className={`${styles.dotsLoader} ${styles[size]}`}>
        {dots.map((dot) => (
          <div
            key={dot}
            className={styles.dot}
            style={{ backgroundColor: "var(--primary-500-main)" }}
          />
        ))}
      </div>
    </div>
  );
}
