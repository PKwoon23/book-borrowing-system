// src/components/BookList.jsx
import { useState, useEffect } from "react";
import styles from "./BookList.module.css";
import { getBooks, saveBooks } from "../data/books";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBook, setNewBook] = useState({ id: "", title: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [editBook, setEditBook] = useState({ id: "", title: "" });

  useEffect(() => {
    setBooks(getBooks());
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.id.includes(searchTerm)
  );

  const handleBorrowReturn = (index) => {
    const updatedBooks = [...books];
    const currentBook = updatedBooks[index];

    if (currentBook.status === "ว่าง") {
      currentBook.status = "มีผู้ยืมแล้ว";
    } else {
      currentBook.status = "ว่าง";
    }

    setBooks(updatedBooks);
    saveBooks(updatedBooks);
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบหนังสือเล่มนี้?");
    if (!confirmDelete) return;

    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);

    setBooks(updatedBooks);
    saveBooks(updatedBooks);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditBook({ id: books[index].id, title: books[index].title });
  };

  const handleSaveEdit = () => {
    const updatedBooks = [...books];
    updatedBooks[editIndex] = {
      ...updatedBooks[editIndex],
      id: editBook.id,
      title: editBook.title,
    };

    setBooks(updatedBooks);
    saveBooks(updatedBooks);
    setEditIndex(null);
    setEditBook({ id: "", title: "" });
  };

  const handleAddBook = () => {
    if (!newBook.id || !newBook.title) {
      alert("กรุณากรอกรหัสและชื่อหนังสือให้ครบถ้วน");
      return;
    }

    const updatedBooks = [
      ...books,
      { id: newBook.id, title: newBook.title, status: "ว่าง" },
    ];

    setBooks(updatedBooks);
    saveBooks(updatedBooks);
    setNewBook({ id: "", title: "" });
    setShowAddForm(false);
  };

  return (
    <div className={styles.container}>
      <h1>ระบบจัดการหนังสือ</h1>

      <div className={styles.topActions}>
        <input
          type="text"
          placeholder="ค้นหาโดยชื่อหนังสือหรือรหัสหนังสือ"
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchInput}
        />

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className={styles.addButton}
        >
          {showAddForm ? "ยกเลิก" : "เพิ่มหนังสือ"}
        </button>
      </div>

      {showAddForm && (
        <div className={styles.addForm}>
          <input
            type="text"
            placeholder="รหัสหนังสือ"
            value={newBook.id}
            onChange={(e) => setNewBook({ ...newBook, id: e.target.value })}
          />
          <input
            type="text"
            placeholder="ชื่อหนังสือ"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          />
          <button onClick={handleAddBook}>เพิ่ม</button>
        </div>
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>รหัสหนังสือ</th>
            <th>ชื่อหนังสือ</th>
            <th>สถานะ</th>
            <th>การจัดการ</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book, index) => (
            <tr key={index}>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editBook.id}
                    onChange={(e) => setEditBook({ ...editBook, id: e.target.value })}
                  />
                ) : (
                  book.id
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editBook.title}
                    onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
                  />
                ) : (
                  book.title
                )}
              </td>
              <td
                className={
                  book.status === "ว่าง"
                    ? styles.statusAvailable
                    : styles.statusBorrowed
                }
              >
                {book.status === "ว่าง" ? "พร้อมให้ยืม" : "ถูกยืมอยู่"}
              </td>
              <td>
                {editIndex === index ? (
                  <button onClick={handleSaveEdit} className={styles.saveButton}>
                    บันทึก
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleBorrowReturn(index)}
                      className={
                        book.status === "ว่าง"
                          ? styles.borrowButton
                          : styles.returnButton
                      }
                    >
                      {book.status === "ว่าง" ? "ยืมหนังสือ" : "คืนหนังสือ"}
                    </button>
                    <button
                      onClick={() => handleEdit(index)}
                      className={styles.editButton}
                    >
                      แก้ไข
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className={styles.deleteButton}
                    >
                      ลบ
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}