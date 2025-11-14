"use client";

interface Props {
  selected: "short" | "medium" | "long";
  onSelect: (value: "short" | "medium" | "long") => void;
}

export default function SummaryOptions({ selected, onSelect }: Props) {
  return (
    <div className="flex flex-col items-start gap-4 mb-6">
      <h2 className="text-lg font-semibold">Summary Length</h2>

      <div className="flex gap-3">
        <button
          onClick={() => onSelect("short")}
          className={`px-4 py-2 rounded-md border 
            ${selected === "short" ? "bg-blue-600 text-white" : "bg-white"}
          `}
        >
          Short
        </button>

        <button
          onClick={() => onSelect("medium")}
          className={`px-4 py-2 rounded-md border 
            ${selected === "medium" ? "bg-blue-600 text-white" : "bg-white"}
          `}
        >
          Medium
        </button>

        <button
          onClick={() => onSelect("long")}
          className={`px-4 py-2 rounded-md border 
            ${selected === "long" ? "bg-blue-600 text-white" : "bg-white"}
          `}
        >
          Long
        </button>
      </div>
    </div>
  );
}
