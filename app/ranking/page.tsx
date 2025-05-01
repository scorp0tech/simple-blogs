// "use client";

// import { useEffect, useState } from "react";
// import { useUser } from "@supabase/auth-helpers-react";
// import { createClient } from "../../lib/supabase/client"; // Import the existing createClient function

// const supabase = createClient(); // Initialize the Supabase client

// export default function RankingPage() {
//   const user = useUser(); // Get the authenticated user
//   const [ranking, setRanking] = useState([]); // State to store rankings
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState<string | null>(null); // Error state

//   // Fetch ranking data once the user is authenticated
//   useEffect(() => {
//     if (!user) return; // If no user is logged in, return

//     const fetchRanking = async () => {
//       try {
//         setLoading(true); // Set loading to true while fetching data
//         const { data, error } = await supabase
//           .from("blogs") // Table where blog data is stored
//           .select("user_id, users(username), likes(count)") // Select relevant data
//           .order("likes", { ascending: false }); // Sort by likes in descending order

//         if (error) throw error; // If there's an error, throw it

//         // Aggregate likes by user
//         const likeMap: {
//           [userId: string]: { username: string; totalLikes: number };
//         } = {};
//         data?.forEach((blog: any) => {
//           const uid = blog.user_id;
//           const uname = blog.users?.username || "Unknown"; // If no username, use "Unknown"
//           const blogLikes = blog.likes?.length || 0; // Get the number of likes

//           if (!likeMap[uid]) likeMap[uid] = { username: uname, totalLikes: 0 };
//           likeMap[uid].totalLikes += blogLikes; // Aggregate likes
//         });

//         // Convert the likeMap object to an array and sort it by totalLikes
//         const rankingArray = Object.entries(likeMap)
//         .map(([_, val]) => val)
//         .sort((a, b) => b.totalLikes - a.totalLikes);

//         setRanking(rankingArray); // Set the ranking state
//       } catch (err: any) {
//         setError(err.message || "Error loading ranking"); // Set the error if something goes wrong
//       } finally {
//         setLoading(false); // Set loading to false once fetching is done
//       }
//     };

//     fetchRanking(); // Call the function to fetch ranking data
//   }, [user]); // Only re-run the effect when `user` changes

//   // Render loading state, error, or the actual ranking
//   if (!user) {
//     return (
//       <div className="p-4 text-center">Please login to view the ranking.</div>
//     );
//   }

//   if (loading) {
//     return <div className="p-4 text-center">Loading leaderboard...</div>;
//   }

//   if (error) {
//     return <div className="p-4 text-red-500">Error: {error}</div>;
//   }

//   return (
//     <div className="max-w-2xl mx-auto mt-8 p-4">
//       <h1 className="text-2xl font-bold mb-4">Top Authors</h1>
//       <table className="table-auto w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border border-gray-300 px-4 py-2 text-left">Rank</th>
//             <th className="border border-gray-300 px-4 py-2 text-left">Username</th>
//             <th className="border border-gray-300 px-4 py-2 text-left">Total Likes</th>
//           </tr>
//         </thead>
//         <tbody>
//           {ranking.map((author, i) => (
//             <tr key={i} className="hover:bg-gray-50">
//               <td className="border border-gray-300 px-4 py-2">{i + 1}</td>
//               <td className="border border-gray-300 px-4 py-2">{author.username}</td>
//               <td className="border border-gray-300 px-4 py-2">{author.totalLikes}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// // "use client";

// // import { useEffect, useState } from "react";
// // import { useUser } from "@supabase/auth-helpers-react";
// // import { createClient } from "../../lib/supabase/client";

// // const supabase = createClient();

// // export default function RankingPage() {
// //   const user = useUser();
// //   const [ranking, setRanking] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     if (!user) return;

// //     const fetchRanking = async () => {
// //       try {
// //         setLoading(true);
// //         const { data, error } = await supabase
// //           .from("blogs")
// //           .select("user_id, users(username), likes(count)")
// //           .order("likes", { ascending: false });

// //         if (error) throw error;

// //         // Aggregate likes by user
// //         const likeMap: {
// //           [userId: string]: { username: string; totalLikes: number };
// //         } = {};
// //         data.forEach((blog: any) => {
// //           const uid = blog.user_id;
// //           const uname = blog.users?.username || "Unknown";
// //           const blogLikes = blog.likes?.length || 0;

// //           if (!likeMap[uid]) likeMap[uid] = { username: uname, totalLikes: 0 };
// //           likeMap[uid].totalLikes += blogLikes;
// //         });

// //         setRanking(rankingArray);
// //       } catch (err: any) {
// //         setError(err.message || "Error loading ranking");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchRanking();
// //   }, [user]);

// //   if (!user)
// //     return (
// //       <div className="p-4 text-center">Please login to view the ranking.</div>
// //     );
// //   if (loading)
// //     return <div className="p-4 text-center">Loading leaderboard...</div>;
// //   if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

// //   return (
// //     <div className="max-w-2xl mx-auto mt-8 p-4">
// //       <h1 className="text-2xl font-bold mb-4">Top Authors</h1>
// //       <ul className="space-y-2">
// //         {ranking.map((author, i) => (
// //           <li
// //             key={i}
// //             className="bg-white p-4 rounded shadow flex justify-between"
// //           >
// //             <span className="font-semibold">
// //               {i + 1}. {author.username}
// //             </span>
// //             <span className="text-sm text-gray-600">
// //               {author.totalLikes} likes
// //             </span>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase/client";
import { User } from "@supabase/supabase-js";

interface Blog {
  id: string;
  title: string;
  content: string;
  author_id: string;
  created_at: string;
  updated_at: string;
  published: boolean;
  likes_count: number;
  author: {
    username: string;
    avatar_url: string | null;
  };
}

export default function RankingPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const supabase = createClient();

        // Get current user
        const { data: userData } = await supabase.auth.getUser();
        setUser(userData?.user || null);

        // Get blogs ranked by likes, including author information
        const { data, error } = await supabase
          .from("blogs")
          .select(
            `
            *,
            author:users(username, avatar_url)
          `
          )
          .eq("published", true)
          .order("likes_count", { ascending: false })
          .limit(20);

        if (error) {
          throw error;
        }

        if (data) {
          setBlogs(data as Blog[]);
        }
      } catch (err) {
        console.error("Error fetching rankings:", err);
        setError("Failed to load rankings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Top Ranked Blogs</h1>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No published blogs found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blog
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Published
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Likes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {blogs.map((blog, index) => (
                <tr key={blog.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    #{index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {blog.title}
                    </div>
                    <div className="text-sm text-gray-500 truncate max-w-md">
                      {blog.content.length > 100
                        ? `${blog.content.substring(0, 100)}...`
                        : blog.content}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {blog.author?.avatar_url ? (
                        <img
                          src={blog.author.avatar_url}
                          alt={blog.author.username}
                          className="h-8 w-8 rounded-full mr-2"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gray-200 mr-2 flex items-center justify-center">
                          <span className="text-gray-500 text-sm">
                            {blog.author?.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div className="text-sm font-medium text-gray-900">
                        {blog.author?.username || "Unknown"}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(blog.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {blog.likes_count}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
