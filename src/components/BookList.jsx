"use client";

import { useState, useEffect } from "react";
import { getBooks } from "../data/books";
import styles from "./ฺBookList.module.css";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const initialBooks = getBooks();
    setBooks(initialBooks);
  }, []);

  const toggleStatus = (id) => {
    const updatedBooks = books.map((book) =>
      book.id === id
        ? { ...book, status: book.status === "ว่าง" ? "มีผู้ยืมแล้ว" : "ว่าง" }
        : book
    );

    setBooks(updatedBooks);
    localStorage.setItem("booksData", JSON.stringify(updatedBooks));
  };

  const filteredBooks = books.filter(
    (book) =>
      book.id.includes(searchTerm) ||
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>รายการหนังสือ</h1>

      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="🔍 ค้นหาหนังสือ..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.input}
        />
      </div>

      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>รหัส</th>
            <th className={styles.th}>ชื่อหนังสือ</th>
            <th className={styles.th}>สถานะ</th>
            <th className={styles.th}>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.length === 0 ? (
            <tr>
              <td colSpan="4" className={styles.noBooks}>
                ไม่พบหนังสือที่ค้นหา
              </td>
            </tr>
          ) : (
            filteredBooks.map((book, index) => (
              <tr
                key={book.id}
                className={`${index % 2 === 1 ? styles.evenRow : ""} ${styles.hoverRow}`}
              >
                <td className={styles.td}>{book.id}</td>
                <td className={`${styles.td} ${styles.tdLeft}`}>{book.title}</td>
                <td
                  className={`${styles.td} ${
                    book.status === "ว่าง"
                      ? styles.statusAvailable
                      : styles.statusUnavailable
                  }`}
                >
                  {book.status}
                </td>
                <td className={styles.td}>
                  <button
                    onClick={() => toggleStatus(book.id)}
                    className={
                      book.status === "ว่าง"
                        ? styles.buttonAvailable
                        : styles.buttonUnavailable
                    }
                  >
                    {book.status === "ว่าง" ? "ยืม" : "คืน"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}