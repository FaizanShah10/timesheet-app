type Props = {
  status: "COMPLETED" | "INCOMPLETE" | "MISSING";
};

const STYLES = {
  COMPLETED: "bg-green-100 text-green-700",
  INCOMPLETE: "bg-yellow-100 text-yellow-700",
  MISSING: "bg-pink-100 text-pink-700",
};

export default function StatusBadge({ status }: Props) {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-md text-xs inter-medium ${STYLES[status]}`}
    >
      {status}
    </span>
  );
}
