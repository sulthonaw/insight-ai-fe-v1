import { MagnifyingGlassIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState();

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    setData();
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/ask?search=${searchValue}`);
      if (!response.ok) throw new Error("Gagal mengambil data");

      const data = await response.json();
      setData(data);
      console.log("Hasil pencarian:", data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
    console.log(isLoading);
  };

  return (
    <section className="min-h-screen flex container p-10 justify-center items-center">
      <div className="w-full">
        <h1 className="text-4xl text-center mb-10">Berita apa yang ingin kamu cari?</h1>
        <form onSubmit={onSubmit} className="bg-white sticky top-10 mb-10  border-b-4 border border-slate-200 flex max-w-xl justify-between py-2 pr-2 pl-4 gap-4 rounded-xl mx-auto">
          <input name="search" value={searchValue} onChange={handleChange} type="text" className="focus:outline-0 w-full" placeholder="Cari topik yang ingin kamu cari..." />
          <button type="submit" className="bg-slate-900 cursor-pointer text-white rounded-full p-2" disabled={isLoading}>
            <MagnifyingGlassIcon width={24} height={24} />
          </button>
        </form>
        {data && !isLoading && (
          <div className="max-w-2xl mx-auto w-full py-4 transition-all px-5 rounded-xl border-b-4 border border-slate-200">
            <>
              <h1 className="font-semibold text-xl mb-4">Rangkuman</h1>
              <hr className="border-slate-200 mb-4" />
              <ReactMarkdown className="mb-10" remarkPlugins={[remarkBreaks]}>
                {data?.answer}
              </ReactMarkdown>
              <h1 className="font-semibold text-xl">Links</h1>
              <p className="mb-4 italic text-slate-500">Sumber data: {data?.links.length}</p>
              <hr className="border-slate-200 mb-4" />
              <ul className="list-disc pl-5">
                {data?.links.map((item) => (
                  <li className="mb-1 text-blue-700 underline italic">
                    <a href={item} target="_blank">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          </div>
        )}
        {isLoading && (
          <div className="mx-auto w-max">
            <ArrowPathIcon width={24} height={24} className="animate-spin" />
          </div>
        )}
      </div>
    </section>
  );
}

export default App;
