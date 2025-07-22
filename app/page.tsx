'use client'
import './globals.css'
import InputForm from "@/components/InputForm";

export default function App() {
  return (
  <section className="">
    <div className="container items-center p-4 bg-green-200 dark:bg-[#06402B]">
      <h1 className="justify-center flex mb-20 items-center text-3xl font-semibold">Enter Text to Analyze Sentiment</h1>
    <div className="flex justify-center items-center py-4">
      <InputForm />
    </div>
    <div className="bg-yellow-100 my-122">
      {/*Placeholder*/}
    </div>
    </div>
  </section>
  );
}


