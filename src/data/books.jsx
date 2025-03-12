// เก็บข้อมูลหนังสือเริ่มต้น
export const booksData = [
    { id: "01", title: "JavaScript Basics", status: "ว่าง" },
    { id: "02", title: "React", status: "ว่าง" },
    { id: "03", title: "Next.js", status: "ว่าง" },
    { id: "04", title: "Node.js", status: "ว่าง" },
    { id: "05", title: "CSS Mastery", status: "ว่าง" },
    { id: "06", title: "Vue.js Essentials", status: "ว่าง" },
    { id: "07", title: "GraphQL Guide", status: "ว่าง" },
    { id: "08", title: "Tailwind CSS", status: "ว่าง" },
    { id: "09", title: "TypeScript", status: "ว่าง" },
    { id: "10", title: "Fullstack Development", status: "ว่าง" },
  ];
  
  // ดึงข้อมูลหนังสือจาก localStorage ถ้ายังไม่มีจะเซ็ตค่าเริ่มต้นให้
  export function getBooks() {
    const savedBooks = localStorage.getItem("booksData");
    if (savedBooks) {
      return JSON.parse(savedBooks);
    }
    localStorage.setItem("booksData", JSON.stringify(booksData));
    return booksData;
  }
  
  // ฟังก์ชันสำหรับบันทึกข้อมูลใหม่ลง localStorage
  export function saveBooks(data) {
    localStorage.setItem("booksData", JSON.stringify(data));
  }