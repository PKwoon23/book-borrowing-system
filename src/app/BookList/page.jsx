import { useState, useEffect } from "react";
import styles from "../../styles/BookList.module.css";
import { getBooks, saveBooks } from "../../data/books";

// ประกาศ component หลัก
export default function BookList() {

  // state สำหรับเก็บรายการหนังสือทั้งหมด
  const [books, setBooks] = useState([]);

  // state สำหรับเก็บข้อความค้นหา
  const [searchTerm, setSearchTerm] = useState("");

  // state สำหรับแสดง/ซ่อนฟอร์มเพิ่มหนังสือ
  const [showAddForm, setShowAddForm] = useState(false);

  // state สำหรับเก็บข้อมูลหนังสือใหม่ที่ต้องการเพิ่ม
  const [newBook, setNewBook] = useState({ id: "", title: "" });

  // state สำหรับเก็บ index ของหนังสือที่กำลังแก้ไขอยู่
  const [editIndex, setEditIndex] = useState(null);

  // state สำหรับเก็บข้อมูลหนังสือที่กำลังแก้ไข
  const [editBook, setEditBook] = useState({ id: "", title: "" });



  // โหลดข้อมูลหนังสือครั้งแรกตอนที่ component ถูก render
  useEffect(() => {
    setBooks(getBooks());  // ดึงข้อมูลหนังสือจาก storage หรือ mock data มาแสดง
  }, []);

  // อัพเดตค่า searchTerm เมื่อผู้ใช้พิมพ์ในช่องค้นหา
  const handleSearch = (e) => setSearchTerm(e.target.value);

  // filter รายการหนังสือ โดยใช้ searchTerm เปรียบเทียบทั้งชื่อหนังสือและรหัสหนังสือ
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.id.includes(searchTerm)
  );

  // จัดการการยืมหรือคืนหนังสือ เปลี่ยนสถานะของหนังสือระหว่าง "ว่าง" และ "มีผู้ยืมแล้ว"
  const handleBorrowReturn = (index) => {
    const updatedBooks = [...books];           // สร้างสำเนาข้อมูลหนังสือ
    const currentBook = updatedBooks[index];   // ดึงหนังสือที่เลือก

    // เปลี่ยนสถานะการยืม
    if (currentBook.status === "ว่าง") {
      currentBook.status = "มีผู้ยืมแล้ว";
    } else {
      currentBook.status = "ว่าง";
    }

    setBooks(updatedBooks);        // อัพเดต state
    saveBooks(updatedBooks);       // บันทึกข้อมูลใหม่
  };

  // จัดการลบหนังสือ
  const handleDelete = (index) => {
    const confirmDelete = window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบหนังสือเล่มนี้?"); // ยืนยันก่อนลบ
    if (!confirmDelete) return;

    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);   // ลบหนังสือตาม index ที่ระบุ

    setBooks(updatedBooks);          // อัพเดต state
    saveBooks(updatedBooks);         // บันทึกข้อมูลใหม่
  };

  // จัดการเมื่อผู้ใช้กดปุ่ม "แก้ไข" ตั้งค่าข้อมูลที่จะใช้แก้ไขในฟอร์ม
  const handleEdit = (index) => {
    setEditIndex(index);                               // ระบุ index ของหนังสือที่กำลังแก้ไข
    setEditBook({ id: books[index].id, title: books[index].title }); // เซ็ตค่าเดิมของหนังสือไปยัง editBook
  };

  // จัดการบันทึกข้อมูลที่แก้ไขแล้ว
  const handleSaveEdit = () => {
    const updatedBooks = [...books];
    updatedBooks[editIndex] = {
      ...updatedBooks[editIndex],            // เก็บค่าที่ไม่ได้แก้ไขไว้ (เช่น status)
      id: editBook.id,                       // อัพเดต id จากที่แก้ไข
      title: editBook.title,                 // อัพเดต title จากที่แก้ไข
    };

    setBooks(updatedBooks);                  // อัพเดต state
    saveBooks(updatedBooks);                 // บันทึกข้อมูลใหม่
    setEditIndex(null);                      // รีเซ็ตค่า editIndex (ยกเลิกโหมดแก้ไข)
    setEditBook({ id: "", title: "" });      // เคลียร์ข้อมูล editBook
  };

  // จัดการเพิ่มหนังสือใหม่
  const handleAddBook = () => {
    if (!newBook.id || !newBook.title) {     // เช็คว่ากรอกข้อมูลครบไหม
      alert("กรุณากรอกรหัสและชื่อหนังสือให้ครบถ้วน");
      return;
    }

    const updatedBooks = [
      ...books,                                 // เก็บรายการหนังสือเดิมไว้
      { id: newBook.id, title: newBook.title, status: "ว่าง" },  // เพิ่มรายการใหม่ โดยเริ่มต้นสถานะเป็น "ว่าง"
    ];

    setBooks(updatedBooks);                  // อัพเดต state
    saveBooks(updatedBooks);                 // บันทึกข้อมูลใหม่
    setNewBook({ id: "", title: "" });       // รีเซ็ตฟอร์มเพิ่มหนังสือ
    setShowAddForm(false);                   // ปิดฟอร์มเพิ่มหนังสือ
  };


  
  // ส่วนที่แสดงผล UI
  return (
    <div className={styles.container}>
      <h1 className="h1">ระบบจัดการหนังสือ</h1>

      {/* ส่วนค้นหาและปุ่มเพิ่มหนังสือ */}
      <div className={styles.topActions}>
        <input
          type="text"
          placeholder="ค้นหาโดยชื่อหนังสือหรือรหัสหนังสือ"
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchInput}
        />

        <button
          onClick={() => setShowAddForm(!showAddForm)} // เปิด/ปิดฟอร์มเพิ่มหนังสือ
          className={styles.addButton}
        >
          {showAddForm ? "ยกเลิก" : "เพิ่มหนังสือ"}
        </button>
      </div>

      {/* ฟอร์มเพิ่มหนังสือ */}
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

      {/* ตารางแสดงรายการหนังสือ */}
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
          {/* วนลูปแสดงรายการหนังสือตาม search filter */}
          {filteredBooks.map((book, index) => (
            <tr key={index}>
              <td>
                {/* ถ้าอยู่ในโหมดแก้ไข แสดง input */}
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
                {/* แสดงสถานะ */}
                {book.status === "ว่าง" ? "พร้อมให้ยืม" : "ถูกยืมอยู่"}
              </td>
              <td>
                {/* ถ้าอยู่ในโหมดแก้ไข แสดงปุ่มบันทึก */}
                {editIndex === index ? (
                  <button onClick={handleSaveEdit} className={styles.saveButton}>
                    บันทึก
                  </button>
                ) : (
                  <>
                    {/* ปุ่มยืม/คืน */}
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
                    {/* ปุ่มแก้ไข */}
                    <button
                      onClick={() => handleEdit(index)}
                      className={styles.editButton}
                    >
                      แก้ไข
                    </button>
                    {/* ปุ่มลบ */}
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
