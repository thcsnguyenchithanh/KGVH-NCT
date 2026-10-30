import React, { useState, useEffect } from "react";

export default function SchoolBookshelfModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [books, setBooks] = useState([]);

  // Dữ liệu mẫu các đầu sách của trường THCS Nguyễn Chí Thanh
  const defaultBooks = [
    { id: 1, title: "Lịch sử Đia phương", src: `${import.meta.env.BASE_URL}bookNct/1.HEIC`, alt: "Sách lịch sử địa phương" },
    { id: 2, title: "Bác Hồ kính yêu", src: `${import.meta.env.BASE_URL}bookNct/2.HEIC`, alt: "Sách Bác Hồ" },
    { id: 3, title: "Truyền thống nhà trường", src: `${import.meta.env.BASE_URL}bookNct/3.HEIC`, alt: "Truyền thống trường" },
    // Bạn có thể dễ dàng thêm các cuốn sách khác vào đây
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