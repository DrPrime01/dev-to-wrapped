/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { fetchUserStats } from "./utils/helpers";
import Loader from "./components/Loader";

function App() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<StatsType>();

  const currentYear = new Date().getFullYear();

  const getStats = async () => {
    setIsLoading(true);
    try {
      const res = await fetchUserStats(username.toLowerCase());
      setStats(res);
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full">
      <div className="max-w-xl px-6 mx-auto">
        <div className="flex items-center gap-x-5">
          <img
            src="/practical-dev-logo.png"
            className="h-16 w-20 object-contain"
          />
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-600 py-10 rounded-lg">
            Dev.to Wrapped {currentYear}
          </h1>
        </div>
        <div className="flex items-center gap-x-5">
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="outline-none py-2 px-3 rounded-md border w-full flex-1"
          />
          <button
            disabled={isLoading || !username}
            onClick={getStats}
            className="bg-gray-900 rounded-md py-2 px-3 text-white text-sm font-semibold disabled:bg-opacity-50"
          >
            Get Stats
          </button>
        </div>
        <div>
          {isLoading ? (
            <div className="flex items-center justify-center mt-10">
              <Loader />
            </div>
          ) : (
            <div className="flex flex-col gap-y-10 mt-10">
              <div className="flex flex-col gap-y-5">
                <h3 className="text-2xl md:text-3xl font-semibold text">
                  {currentYear} Stats
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-200 rounded-lg p-5 flex flex-col gap-y-5">
                    <p className="text-slate-800 font-medium md:text-lg">
                      Total Articles
                    </p>
                    <p className="text-3xl md:text-4xl text-slate-900 font-semibold">
                      {stats?.totalArticlesThisYear || 0}
                    </p>
                  </div>
                  <div className="bg-slate-200 rounded-lg p-5 flex flex-col gap-y-5">
                    <p className="text-slate-800 font-medium md:text-lg">
                      Total Comments
                    </p>
                    <p className="text-3xl md:text-4xl text-slate-900 font-semibold">
                      {stats?.totalCommentsThisYear || 0}
                    </p>
                  </div>
                  <div className="bg-slate-200 rounded-lg p-5 flex flex-col gap-y-5">
                    <p className="text-slate-800 font-medium md:text-lg">
                      Total Reactions
                    </p>
                    <p className="text-3xl md:text-4xl text-slate-900 font-semibold">
                      {stats?.totalReactionsThisYear || 0}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-y-5">
                <h3 className="text-2xl md:text-3xl font-semibold text">
                  All Time Stats
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-200 rounded-lg p-5 flex flex-col gap-y-5">
                    <p className="text-slate-800 font-medium md:text-lg">
                      Total Articles
                    </p>
                    <p className="text-3xl md:text-4xl text-slate-900 font-semibold">
                      {stats?.totalArticles || 0}
                    </p>
                  </div>
                  <div className="bg-slate-200 rounded-lg p-5 flex flex-col gap-y-5">
                    <p className="text-slate-800 font-medium md:text-lg">
                      Total Comments
                    </p>
                    <p className="text-3xl md:text-4xl text-slate-900 font-semibold">
                      {stats?.totalComments || 0}
                    </p>
                  </div>
                  {/* <div className="bg-slate-200 rounded-lg p-5 flex flex-col gap-y-5">
                <p className="text-slate-800 font-medium md:text-lg">
                  Total Views
                </p>
                <p className="text-3xl md:text-4xl text-slate-900 font-semibold">
                  30
                </p>
              </div> */}
                  <div className="bg-slate-200 rounded-lg p-5 flex flex-col gap-y-5">
                    <p className="text-slate-800 font-medium md:text-lg">
                      Total Reactions
                    </p>
                    <p className="text-3xl md:text-4xl text-slate-900 font-semibold">
                      {stats?.totalReactions || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="pt-10 pb-5">
          <p className="text-center text-sm text-black font-medium">
            Made by{" "}
            <a
              href="https://github.com/DrPrime01"
              target="_blank"
              className="text-blue-700"
            >
              Dr Prime
            </a>{" "}
            with ❤️
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
