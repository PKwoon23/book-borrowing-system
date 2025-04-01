"use client";

import BookList from "./BookList/page";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">📚 ระบบยืมคืนหนังสือ</h1>
      <BookList />
    </div>
  );
}
