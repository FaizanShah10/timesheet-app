export default function Spinner({
  size = 20,
}: {
  size?: number;
}) {
  return (
    <span
      className="inline-block animate-spin rounded-full border-2 border-white border-t-transparent"
      style={{
        width: size,
        height: size,
      }}
    />
  );
}
