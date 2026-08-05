"use client";
import { useFields } from "../store/useFormStore";

export default function Home() {
  const fields = useFields();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <ul>
            {fields.map((field) => (
              <li key={field.id}>{field.label}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
