'use client';

import { useEffect, useState } from 'react';
import Error from 'next/error';
import toast from 'react-hot-toast';
import { LiaSpinnerSolid } from "react-icons/lia";
import NewsContainer from '@/components/NewsContainer/NewsContainer';

interface NewsData {
    title: string;
    date: string;
    content: string;
    image?: string;
}

export default function NewsArticlePage({
    params,
}: { params: { newsId: string } }) {
    const [news, setNews] = useState<NewsData | null>(null);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        async function fetchNewsData() {
            try {
                const response = await fetch(`http://localhost:3000/news/${params.newsId}`);
                if (!response.ok) {
                    setError(true);
                    return;
                }
                const data = await response.json();
                setNews({
                    title: data.title,
                    date: data.date,
                    content: data.content,
                    image: data.image,
                });
            } catch (error) {
                toast.error('A network error occurred!');
                setError(true);
            }
        }
        fetchNewsData();
    }, [params.newsId]);

    if (error) {
        return <Error statusCode={404} />;
    }

    if (!news) {
        return (
            <div className="spinner-container">
                <LiaSpinnerSolid className="spinner" />
            </div>
        );
    }

    return (
        <NewsContainer
            title={news.title}
            date={news.date}
            content={news.content}
        />
    );
}
