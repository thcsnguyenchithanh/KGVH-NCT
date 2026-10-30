import React, { useState, useEffect } from "react";

export default function SchoolBookshelfModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [books, setBooks] = useState([]);

  // Dữ liệu mẫu các đầu sách của trường THCS Nguyễn Chí Thanh
  const defaultBooks = [
    { id: 1, title: "Lịch sử Đia phương", src: `${import.meta.env.BASE_URL}bookNct/1.jpg`, alt: "Sách lịch sử địa phương" },
    { id: 2, title: "Bác Hồ kính yêu", src: `${import.meta.env.BASE_URL}bookNct/2.jpg`, alt: "Sách Bác Hồ" },
    { id: 3, title: "Truyền thống nhà trường", src: `${import.meta.env.BASE_URL}bookNct/3.jpg`, alt: "Truyền thống trường" },
    { id: 4, title: "Sách thư viện 4", src: `${import.meta.env.BASE_URL}bookNct/4.jpg`, alt: "Sách thư viện 4" },
{ id: 5, title: "Sách thư viện 5", src: `${import.meta.env.BASE_URL}bookNct/5.jpg`, alt: "Sách thư viện 5" },
{ id: 6, title: "Sách thư viện 6", src: `${import.meta.env.BASE_URL}bookNct/6.jpg`, alt: "Sách thư viện 6" },
{ id: 7, title: "Sách thư viện 7", src: `${import.meta.env.BASE_URL}bookNct/7.jpg`, alt: "Sách thư viện 7" },
{ id: 8, title: "Sách thư viện 8", src: `${import.meta.env.BASE_URL}bookNct/8.jpg`, alt: "Sách thư viện 8" },
{ id: 9, title: "Sách thư viện 9", src: `${import.meta.env.BASE_URL}bookNct/9.jpg`, alt: "Sách thư viện 9" },
{ id: 10, title: "Sách thư viện 10", src: `${import.meta.env.BASE_URL}bookNct/10.jpg`, alt: "Sách thư viện 10" },
{ id: 11, title: "Sách thư viện 11", src: `${import.meta.env.BASE_URL}bookNct/11.jpg`, alt: "Sách thư viện 11" },
{ id: 12, title: "Sách thư viện 12", src: `${import.meta.env.BASE_URL}bookNct/12.jpg`, alt: "Sách thư viện 12" },
{ id: 13, title: "Sách thư viện 13", src: `${import.meta.env.BASE_URL}bookNct/13.jpg`, alt: "Sách thư viện 13" },
{ id: 14, title: "Sách thư viện 14", src: `${import.meta.env.BASE_URL}bookNct/14.jpg`, alt: "Sách thư viện 14" },
{ id: 15, title: "Sách thư viện 15", src: `${import.meta.env.BASE_URL}bookNct/15.jpg`, alt: "Sách thư viện 15" },
{ id: 16, title: "Sách thư viện 16", src: `${import.meta.env.BASE_URL}bookNct/16.jpg`, alt: "Sách thư viện 16" },
{ id: 17, title: "Sách thư viện 17", src: `${import.meta.env.BASE_URL}bookNct/17.jpg`, alt: "Sách thư viện 17" },
{ id: 18, title: "Sách thư viện 18", src: `${import.meta.env.BASE_URL}bookNct/18.jpg`, alt: "Sách thư viện 18" },
{ id: 19, title: "Sách thư viện 19", src: `${import.meta.env.BASE_URL}bookNct/19.jpg`, alt: "Sách thư viện 19" },
{ id: 20, title: "Sách thư viện 20", src: `${import.meta.env.BASE_URL}bookNct/20.jpg`, alt: "Sách thư viện 20" },
{ id: 21, title: "Sách thư viện 21", src: `${import.meta.env.BASE_URL}bookNct/21.jpg`, alt: "Sách thư viện 21" },
{ id: 22, title: "Sách thư viện 22", src: `${import.meta.env.BASE_URL}bookNct/22.jpg`, alt: "Sách thư viện 22" },
{ id: 23, title: "Sách thư viện 23", src: `${import.meta.env.BASE_URL}bookNct/23.jpg`, alt: "Sách thư viện 23" },
{ id: 24, title: "Sách thư viện 24", src: `${import.meta.env.BASE_URL}bookNct/24.jpg`, alt: "Sách thư viện 24" },
{ id: 25, title: "Sách thư viện 25", src: `${import.meta.env.BASE_URL}bookNct/25.jpg`, alt: "Sách thư viện 25" },
{ id: 26, title: "Sách thư viện 26", src: `${import.meta.env.BASE_URL}bookNct/26.jpg`, alt: "Sách thư viện 26" },
{ id: 27, title: "Sách thư viện 27", src: `${import.meta.env.BASE_URL}bookNct/27.jpg`, alt: "Sách thư viện 27" },
{ id: 28, title: "Sách thư viện 28", src: `${import.meta.env.BASE_URL}bookNct/28.jpg`, alt: "Sách thư viện 28" },
{ id: 29, title: "Sách thư viện 29", src: `${import.meta.env.BASE_URL}bookNct/29.jpg`, alt: "Sách thư viện 29" },
{ id: 30, title: "Sách thư viện 30", src: `${import.meta.env.BASE_URL}bookNct/30.jpg`, alt: "Sách thư viện 30" },
{ id: 31, title: "Sách thư viện 31", src: `${import.meta.env.BASE_URL}bookNct/31.jpg`, alt: "Sách thư viện 31" },
{ id: 32, title: "Sách thư viện 32", src: `${import.meta.env.BASE_URL}bookNct/32.jpg`, alt: "Sách thư viện 32" },
{ id: 33, title: "Sách thư viện 33", src: `${import.meta.env.BASE_URL}bookNct/33.jpg`, alt: "Sách thư viện 33" },
{ id: 34, title: "Sách thư viện 34", src: `${import.meta.env.BASE_URL}bookNct/34.jpg`, alt: "Sách thư viện 34" },
{ id: 35, title: "Sách thư viện 35", src: `${import.meta.env.BASE_URL}bookNct/35.jpg`, alt: "Sách thư viện 35" },
{ id: 36, title: "Sách thư viện 36", src: `${import.meta.env.BASE_URL}bookNct/36.jpg`, alt: "Sách thư viện 36" },
{ id: 37, title: "Sách thư viện 37", src: `${import.meta.env.BASE_URL}bookNct/37.jpg`, alt: "Sách thư viện 37" },
{ id: 38, title: "Sách thư viện 38", src: `${import.meta.env.BASE_URL}bookNct/38.jpg`, alt: "Sách thư viện 38" },
{ id: 39, title: "Sách thư viện 39", src: `${import.meta.env.BASE_URL}bookNct/39.jpg`, alt: "Sách thư viện 39" },
{ id: 40, title: "Sách thư viện 40", src: `${import.meta.env.BASE_URL}bookNct/40.jpg`, alt: "Sách thư viện 40" },
{ id: 41, title: "Sách thư viện 41", src: `${import.meta.env.BASE_URL}bookNct/41.jpg`, alt: "Sách thư viện 41" },
{ id: 42, title: "Sách thư viện 42", src: `${import.meta.env.BASE_URL}bookNct/42.jpg`, alt: "Sách thư viện 42" },
{ id: 43, title: "Sách thư viện 43", src: `${import.meta.env.BASE_URL}bookNct/43.jpg`, alt: "Sách thư viện 43" },
{ id: 44, title: "Sách thư viện 44", src: `${import.meta.env.BASE_URL}bookNct/44.jpg`, alt: "Sách thư viện 44" },
{ id: 45, title: "Sách thư viện 45", src: `${import.meta.env.BASE_URL}bookNct/45.jpg`, alt: "Sách thư viện 45" },
{ id: 46, title: "Sách thư viện 46", src: `${import.meta.env.BASE_URL}bookNct/46.jpg`, alt: "Sách thư viện 46" },
{ id: 47, title: "Sách thư viện 47", src: `${import.meta.env.BASE_URL}bookNct/47.jpg`, alt: "Sách thư viện 47" },
{ id: 48, title: "Sách thư viện 48", src: `${import.meta.env.BASE_URL}bookNct/48.jpg`, alt: "Sách thư viện 48" },
{ id: 49, title: "Sách thư viện 49", src: `${import.meta.env.BASE_URL}bookNct/49.jpg`, alt: "Sách thư viện 49" },
{ id: 50, title: "Sách thư viện 50", src: `${import.meta.env.BASE_URL}bookNct/50.jpg`, alt: "Sách thư viện 50" },
{ id: 51, title: "Sách thư viện 51", src: `${import.meta.env.BASE_URL}bookNct/51.jpg`, alt: "Sách thư viện 51" },
{ id: 52, title: "Sách thư viện 52", src: `${import.meta.env.BASE_URL}bookNct/52.jpg`, alt: "Sách thư viện 52" },
{ id: 53, title: "Sách thư viện 53", src: `${import.meta.env.BASE_URL}bookNct/53.jpg`, alt: "Sách thư viện 53" },
{ id: 54, title: "Sách thư viện 54", src: `${import.meta.env.BASE_URL}bookNct/54.jpg`, alt: "Sách thư viện 54" },
{ id: 55, title: "Sách thư viện 55", src: `${import.meta.env.BASE_URL}bookNct/55.jpg`, alt: "Sách thư viện 55" },
{ id: 56, title: "Sách thư viện 56", src: `${import.meta.env.BASE_URL}bookNct/56.jpg`, alt: "Sách thư viện 56" },
{ id: 57, title: "Sách thư viện 57", src: `${import.meta.env.BASE_URL}bookNct/57.jpg`, alt: "Sách thư viện 57" },
{ id: 58, title: "Sách thư viện 58", src: `${import.meta.env.BASE_URL}bookNct/58.jpg`, alt: "Sách thư viện 58" },
{ id: 59, title: "Sách thư viện 59", src: `${import.meta.env.BASE_URL}bookNct/59.jpg`, alt: "Sách thư viện 59" },
{ id: 60, title: "Sách thư viện 60", src: `${import.meta.env.BASE_URL}bookNct/60.jpg`, alt: "Sách thư viện 60" },
{ id: 61, title: "Sách thư viện 61", src: `${import.meta.env.BASE_URL}bookNct/61.jpg`, alt: "Sách thư viện 61" },
{ id: 62, title: "Sách thư viện 62", src: `${import.meta.env.BASE_URL}bookNct/62.jpg`, alt: "Sách thư viện 62" },
{ id: 63, title: "Sách thư viện 63", src: `${import.meta.env.BASE_URL}bookNct/63.jpg`, alt: "Sách thư viện 63" },
{ id: 64, title: "Sách thư viện 64", src: `${import.meta.env.BASE_URL}bookNct/64.jpg`, alt: "Sách thư viện 64" },
{ id: 65, title: "Sách thư viện 65", src: `${import.meta.env.BASE_URL}bookNct/65.jpg`, alt: "Sách thư viện 65" },
{ id: 66, title: "Sách thư viện 66", src: `${import.meta.env.BASE_URL}bookNct/66.jpg`, alt: "Sách thư viện 66" },
{ id: 67, title: "Sách thư viện 67", src: `${import.meta.env.BASE_URL}bookNct/67.jpg`, alt: "Sách thư viện 67" },
{ id: 68, title: "Sách thư viện 68", src: `${import.meta.env.BASE_URL}bookNct/68.jpg`, alt: "Sách thư viện 68" },
{ id: 69, title: "Sách thư viện 69", src: `${import.meta.env.BASE_URL}bookNct/69.jpg`, alt: "Sách thư viện 69" },
{ id: 70, title: "Sách thư viện 70", src: `${import.meta.env.BASE_URL}bookNct/70.jpg`, alt: "Sách thư viện 70" },
{ id: 71, title: "Sách thư viện 71", src: `${import.meta.env.BASE_URL}bookNct/71.jpg`, alt: "Sách thư viện 71" },
{ id: 72, title: "Sách thư viện 72", src: `${import.meta.env.BASE_URL}bookNct/72.jpg`, alt: "Sách thư viện 72" },
{ id: 73, title: "Sách thư viện 73", src: `${import.meta.env.BASE_URL}bookNct/73.jpg`, alt: "Sách thư viện 73" },
{ id: 74, title: "Sách thư viện 74", src: `${import.meta.env.BASE_URL}bookNct/74.jpg`, alt: "Sách thư viện 74" },
{ id: 75, title: "Sách thư viện 75", src: `${import.meta.env.BASE_URL}bookNct/75.jpg`, alt: "Sách thư viện 75" },
{ id: 76, title: "Sách thư viện 76", src: `${import.meta.env.BASE_URL}bookNct/76.jpg`, alt: "Sách thư viện 76" },
{ id: 77, title: "Sách thư viện 77", src: `${import.meta.env.BASE_URL}bookNct/77.jpg`, alt: "Sách thư viện 77" },
{ id: 78, title: "Sách thư viện 78", src: `${import.meta.env.BASE_URL}bookNct/78.jpg`, alt: "Sách thư viện 78" },
{ id: 79, title: "Sách thư viện 79", src: `${import.meta.env.BASE_URL}bookNct/79.jpg`, alt: "Sách thư viện 79" },
{ id: 80, title: "Sách thư viện 80", src: `${import.meta.env.BASE_URL}bookNct/80.jpg`, alt: "Sách thư viện 80" },
{ id: 81, title: "Sách thư viện 81", src: `${import.meta.env.BASE_URL}bookNct/81.jpg`, alt: "Sách thư viện 81" },
{ id: 82, title: "Sách thư viện 82", src: `${import.meta.env.BASE_URL}bookNct/82.jpg`, alt: "Sách thư viện 82" },
  ];

  // Lắng nghe sự kiện mở tủ sách từ không gian 3D
  useEffect(() => {
    const handleOpen = (e) => {
      // Nếu sự kiện có truyền dữ liệu sách riêng thì dùng, không thì dùng danh sách mặc định
      setBooks(e.detail?.books || defaultBooks);
      setIsOpen(true);
    };

    window.addEventListener("open-school-bookshelf", handleOpen);
    return () => {
      window.removeEventListener("open-school-bookshelf", handleOpen);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modalContent}>
        {/* Tiêu đề và nút đóng */}
        <div style={styles.header}>
          <h2>📚 Tủ sách trường THCS Nguyễn Chí Thanh</h2>
          <button style={styles.closeBtn} onClick={() => setIsOpen(false)}>
            ✕ Đóng
          </button>
        </div>

        {/* Lưới hiển thị danh sách các đầu sách */}
        <div style={styles.gridContainer}>
          {books.map((book) => (
            <div key={book.id} style={styles.bookCard}>
              <img src={book.src} alt={book.alt} style={styles.bookImage} />
              <p style={styles.bookTitle}>{book.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Giao diện CSS Inline hiện đại, dễ nhìn
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10000,
  },
  modalContent: {
    width: "90%",
    maxWidth: "1100px",
    height: "85vh",
    backgroundColor: "#1e1e1e",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    padding: "25px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#fff",
    borderBottom: "1px solid #333",
    paddingBottom: "15px",
    marginBottom: "20px",
  },
  closeBtn: {
    backgroundColor: "#da251d",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  gridContainer: {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
    overflowY: "auto",
    paddingRight: "10px",
  },
  bookCard: {
    backgroundColor: "#2a2a2a",
    borderRadius: "8px",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    alignItem: "center",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    transition: "transform 0.2s ease",
  },
  bookImage: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "6px",
    marginBottom: "10px",
  },
  bookTitle: {
    color: "#fff",
    fontSize: "14px",
    fontWeight: "500",
    margin: "5px 0 0 0",
  },
};