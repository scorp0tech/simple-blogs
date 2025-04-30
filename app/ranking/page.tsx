'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Database } from '@/types/supabase';

type LeaderboardEntry = {
  author_name: string;
  total_likes: number;
  author_id: string;
};

type BlogWithAuthor = {
  likes_count: number;
  author: {
    username: string;
    id: string;
  };
};

export default function RankingPage() {
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // First check if user is authenticated
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError || !user) {
          router.push('/login');
          return;
        }

        const { data: blogs, error: queryError } = await supabase
          .from('blogs')
          .select(`
            likes_count,
            author:author_id (
              username,
              id
            )
          `)
          .eq('published', true);

        if (queryError) {
          throw new Error(queryError.message);
        }

        // Type assertion to handle the response
        const typedBlogs = blogs as unknown as BlogWithAuthor[];
        
        const leaderboard = typedBlogs.reduce((acc: Record<string, LeaderboardEntry>, blog) => {
          const username = blog.author.username;
          if (!acc[username]) {
            acc[username] = {
              author_name: username,
              total_likes: 0,
              author_id: blog.author.id
            };
          }
          acc[username].total_likes += blog.likes_count;
          return acc;
        }, {});

        const formatted = Object.values(leaderboard)
          .sort((a, b) => b.total_likes - a.total_likes);

        setData(formatted);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router, supabase]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 max-w-3xl mx-auto">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">🏆 Leaderboard</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Likes</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((entry, index) => (
              <tr 
                key={entry.author_id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => router.push(`/profile/${entry.author_id}`)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {entry.author_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {entry.total_likes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
