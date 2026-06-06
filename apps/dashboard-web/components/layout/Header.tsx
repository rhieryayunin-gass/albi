"use client";

export default function Header() {
  return (
    <div
      className="
      bg-white
      border-b
      border-slate-200
      px-6
      py-4
      flex
      justify-between
      items-center
      "
    >
      <div>
        <h1
          className="
          text-2xl
          font-bold
          "
        >
          ALBI
        </h1>

        <p
          className="
          text-sm
          text-slate-500
          "
        >
          Autonomous Learning Broker Intelligence
        </p>
      </div>

      <div
        className="
        flex
        gap-3
        "
      >
        <Status
          title="AI"
        />

        <Status
          title="RISK"
        />

        <Status
          title="WS"
        />
      </div>
    </div>
  );
}

function Status({
  title,
}: {
  title: string;
}) {
  return (
    <div
      className="
      px-3
      py-2
      rounded-xl
      bg-green-50
      border
      border-green-200
      text-green-700
      text-sm
      "
    >
      🟢 {title}
    </div>
  );
}