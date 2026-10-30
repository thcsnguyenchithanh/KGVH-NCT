import React, { useState, useEffect } from "react";

export default function SchoolBookshelfModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  // Dữ liệu mẫu các đầu sách của trường THCS Nguyễn Chí Thanh
  const defaultBooks = [
    { id: 1, title: "Nhật ký trong tù", src: `${import.meta.env.BASE_URL}bookNct/1.jpg`, alt: "Nhật ký trong tù" }, //[cite: 11]
{ id: 2, title: "Hồi kí về Bác Hồ - Gần bên Bác và học ở Bác", src: `${import.meta.env.BASE_URL}bookNct/2.jpg`, alt: "Hồi kí về Bác Hồ" }, //[cite: 12]
{ id: 3, title: "Bác Hồ người Việt Nam đẹp nhất - Đạo đức", src: `${import.meta.env.BASE_URL}bookNct/3.jpg`, alt: "Bác Hồ người Việt Nam đẹp nhất - Đạo đức" }, //[cite: 13]
{ id: 4, title: "Báo chí Việt Nam - Những sự kiện đầu tiên và nhất", src: `${import.meta.env.BASE_URL}bookNct/4.jpg`, alt: "Báo chí Việt Nam những sự kiện đầu tiên và nhất" }, //[cite: 14]
{ id: 5, title: "Bác Hồ tấm gương tiết kiệm", src: `${import.meta.env.BASE_URL}bookNct/5.jpg`, alt: "Bác Hồ tấm gương tiết kiệm" }, //[cite: 15]
{ id: 6, title: "Thơ chúc tết mừng xuân của Bác Hồ và lời bình", src: `${import.meta.env.BASE_URL}bookNct/6.jpg`, alt: "Thơ chúc tết mừng xuân của Bác Hồ và lời bình" }, //[cite: 16]
{ id: 7, title: "Bác Hồ viết Tuyên ngôn độc lập", src: `${import.meta.env.BASE_URL}bookNct/7.jpg`, alt: "Bác Hồ viết Tuyên ngôn độc lập" }, //[cite: 17]
{ id: 8, title: "Bác Hồ người Việt Nam đẹp nhất - Đoàn kết - Trí tuệ", src: `${import.meta.env.BASE_URL}bookNct/8.jpg`, alt: "Bác Hồ người Việt Nam đẹp nhất - Đoàn kết - Trí tuệ" }, //[cite: 18]
{ id: 9, title: "Bác Hồ tấm gương sáng mãi", src: `${import.meta.env.BASE_URL}bookNct/9.jpg`, alt: "Bác Hồ tấm gương sáng mãi" }, //[cite: 19]
{ id: 10, title: "Bác Hồ sống mãi - Những truyện hay về Bác 5", src: `${import.meta.env.BASE_URL}bookNct/10.jpg`, alt: "Bác Hồ sống mãi - Những truyện hay về Bác" }, //[cite: 20]
{ id: 11, title: "Bác Hồ của chúng em", src: `${import.meta.env.BASE_URL}bookNct/11.jpg`, alt: "Bác Hồ của chúng em" },
{ id: 12, title: "Quê hương và gia thế Chủ tịch Hồ Chí Minh", src: `${import.meta.env.BASE_URL}bookNct/12.jpg`, alt: "Quê hương và gia thế Chủ tịch Hồ Chí Minh" },
{ id: 13, title: "Nguyễn Ái Quốc ở Quảng Châu (1924 - 1927)", src: `${import.meta.env.BASE_URL}bookNct/13.jpg`, alt: "Nguyễn Ái Quốc ở Quảng Châu (1924 - 1927)" },
{ id: 14, title: "Bác Hồ tấm gương đoàn kết", src: `${import.meta.env.BASE_URL}bookNct/14.jpg`, alt: "Bác Hồ tấm gương đoàn kết" },
{ id: 15, title: "Bác Hồ với các ngày lễ, kỷ niệm lớn trong năm", src: `${import.meta.env.BASE_URL}bookNct/15.jpg`, alt: "Bác Hồ với các ngày lễ, kỷ niệm lớn trong năm" },
{ id: 16, title: "Nhật ký trong tù", src: `${import.meta.env.BASE_URL}bookNct/16.jpg`, alt: "Nhật ký trong tù" },
{ id: 17, title: "Những tấm gương ham đọc sách và tự học thời đại Hồ Chí Minh", src: `${import.meta.env.BASE_URL}bookNct/17.jpg`, alt: "Những tấm gương ham đọc sách và tự học thời đại Hồ Chí Minh" },
{ id: 18, title: "Thư Bác gửi thiếu niên nhi đồng", src: `${import.meta.env.BASE_URL}bookNct/18.jpg`, alt: "Thư Bác gửi thiếu niên nhi đồng" },
{ id: 19, title: "Bác Hồ gương giản dị", src: `${import.meta.env.BASE_URL}bookNct/19.jpg`, alt: "Bác Hồ gương giản dị" },
{ id: 20, title: "Phong cách giao tiếp Hồ Chí Minh", src: `${import.meta.env.BASE_URL}bookNct/20.jpg`, alt: "Phong cách giao tiếp Hồ Chí Minh" }, //[cite: 31]
{ id: 21, title: "Thư gửi thanh niên", src: `${import.meta.env.BASE_URL}bookNct/21.jpg`, alt: "Thư gửi thanh niên" }, //[cite: 32]
{ id: 22, title: "Bác Hồ tấm gương sáng mãi", src: `${import.meta.env.BASE_URL}bookNct/22.jpg`, alt: "Bác Hồ tấm gương sáng mãi" }, //[cite: 33]
{ id: 23, title: "Sáng mãi tấm gương Bác Hồ giản dị", src: `${import.meta.env.BASE_URL}bookNct/23.jpg`, alt: "Sáng mãi tấm gương Bác Hồ giản dị" }, //[cite: 34]
{ id: 24, title: "Bác Hồ tấm gương về tinh thần yêu nước", src: `${import.meta.env.BASE_URL}bookNct/24.jpg`, alt: "Bác Hồ tấm gương về tinh thần yêu nước" }, //[cite: 35]
{ id: 25, title: "Bác Hồ với thiếu niên nhi đồng", src: `${import.meta.env.BASE_URL}bookNct/25.jpg`, alt: "Bác Hồ với thiếu niên nhi đồng" }, //[cite: 36]
{ id: 26, title: "Chuyện kể từ làng Sen", src: `${import.meta.env.BASE_URL}bookNct/26.jpg`, alt: "Chuyện kể từ làng Sen" }, //[cite: 37]
{ id: 27, title: "Hồ Chí Minh bàn về đạo đức", src: `${import.meta.env.BASE_URL}bookNct/27.jpg`, alt: "Hồ Chí Minh bàn về đạo đức" }, //[cite: 38]
{ id: 28, title: "Bác Hồ tấm gương đoàn kết", src: `${import.meta.env.BASE_URL}bookNct/28.jpg`, alt: "Bác Hồ tấm gương đoàn kết" }, //[cite: 39]
{ id: 29, title: "Bác Hồ sống mãi - Những truyện hay về Bác 4", src: `${import.meta.env.BASE_URL}bookNct/29.jpg`, alt: "Bác Hồ sống mãi - Những truyện hay về Bác" }, //[cite: 40]
{ id: 30, title: "Thư riêng của Bác Hồ", src: `${import.meta.env.BASE_URL}bookNct/30.jpg`, alt: "Thư riêng của Bác Hồ" },
{ id: 31, title: "Bác Hồ người Việt Nam đẹp nhất - Giản dị - Thật thà", src: `${import.meta.env.BASE_URL}bookNct/31.jpg`, alt: "Bác Hồ người Việt Nam đẹp nhất - Giản dị - Thật thà" },
{ id: 32, title: "Bác Hồ tấm gương yêu nước", src: `${import.meta.env.BASE_URL}bookNct/32.jpg`, alt: "Bác Hồ tấm gương yêu nước" },
{ id: 33, title: "Học Bác lòng ta trong sáng hơn", src: `${import.meta.env.BASE_URL}bookNct/33.jpg`, alt: "Học Bác lòng ta trong sáng hơn" },
{ id: 34, title: "Bác Hồ giữa trái tim trẻ thơ", src: `${import.meta.env.BASE_URL}bookNct/34.jpg`, alt: "Bác Hồ giữa trái tim trẻ thơ" },
{ id: 35, title: "Cảm ơn các bạn", src: `${import.meta.env.BASE_URL}bookNct/35.jpg`, alt: "Cảm ơn các bạn" },
{ id: 36, title: "Bác Hồ tấm gương giản dị", src: `${import.meta.env.BASE_URL}bookNct/36.jpg`, alt: "Bác Hồ tấm gương giản dị" },
{ id: 37, title: "Bác Hồ tấm gương đoàn kết", src: `${import.meta.env.BASE_URL}bookNct/37.jpg`, alt: "Bác Hồ tấm gương đoàn kết" },
{ id: 38, title: "Bác Hồ người Việt Nam đẹp nhất - Nghị lực", src: `${import.meta.env.BASE_URL}bookNct/38.jpg`, alt: "Bác Hồ người Việt Nam đẹp nhất - Nghị lực" },
{ id: 39, title: "Hồ Chí Minh bàn về phong cách", src: `${import.meta.env.BASE_URL}bookNct/39.jpg`, alt: "Hồ Chí Minh bàn về phong cách" },
{ id: 40, title: "Nhật ký trong tù", src: `${import.meta.env.BASE_URL}bookNct/40.jpg`, alt: "Nhật ký trong tù" },
{ id: 41, title: "Đến với tư tưởng Hồ Chí Minh", src: `${import.meta.env.BASE_URL}bookNct/41.jpg`, alt: "Đến với tư tưởng Hồ Chí Minh" },
{ id: 42, title: "Bác Hồ viết di chúc", src: `${import.meta.env.BASE_URL}bookNct/42.jpg`, alt: "Bác Hồ viết di chúc" },
{ id: 43, title: "Bác Hồ với miền Nam", src: `${import.meta.env.BASE_URL}bookNct/43.jpg`, alt: "Bác Hồ với miền Nam" },
{ id: 44, title: "Hồ Chí Minh bàn về phong cách", src: `${import.meta.env.BASE_URL}bookNct/44.jpg`, alt: "Hồ Chí Minh bàn về phong cách" },
{ id: 45, title: "Chúng tôi học làm ngoại giao với Bác Hồ", src: `${import.meta.env.BASE_URL}bookNct/45.jpg`, alt: "Chúng tôi học làm ngoại giao với Bác Hồ" },
{ id: 46, title: "Hồ Chí Minh bàn về đạo đức", src: `${import.meta.env.BASE_URL}bookNct/46.jpg`, alt: "Hồ Chí Minh bàn về đạo đức" },
{ id: 47, title: "Bác Hồ thời niên thiếu ở Huế", src: `${import.meta.env.BASE_URL}bookNct/47.jpg`, alt: "Bác Hồ thời niên thiếu ở Huế" },
{ id: 48, title: "Di chúc của Chủ tịch Hồ Chí Minh", src: `${import.meta.env.BASE_URL}bookNct/48.jpg`, alt: "Di chúc của Chủ tịch Hồ Chí Minh" },
{ id: 49, title: "Những chuyện kể về tấm gương trung thực, trách nhiệm, gắn bó với nhân dân của Chủ tịch Hồ Chí Minh", src: `${import.meta.env.BASE_URL}bookNct/49.jpg`, alt: "Những chuyện kể về tấm gương trung thực, trách nhiệm, gắn bó với nhân dân của Chủ tịch Hồ Chí Minh" },
{ id: 50, title: "Bác Hồ với miền Nam", src: `${import.meta.env.BASE_URL}bookNct/50.jpg`, alt: "Bác Hồ với miền Nam" },
{ id: 51, title: "Những thiếu nhi bên Bác ngày ấy", src: `${import.meta.env.BASE_URL}bookNct/51.jpg`, alt: "Những thiếu nhi bên Bác ngày ấy" },
{ id: 52, title: "Tuyển tập thơ văn Hồ Chí Minh", src: `${import.meta.env.BASE_URL}bookNct/52.jpg`, alt: "Tuyển tập thơ văn Hồ Chí Minh" },
{ id: 53, title: "Kể chuyện Bác Hồ - Tập tám", src: `${import.meta.env.BASE_URL}bookNct/53.jpg`, alt: "Kể chuyện Bác Hồ - Tập tám" },
{ id: 54, title: "Hồ Chí Minh Nhật ký trong tù", src: `${import.meta.env.BASE_URL}bookNct/54.jpg`, alt: "Hồ Chí Minh Nhật ký trong tù" },
{ id: 55, title: "Hồ Chí Minh Chân dung một tâm hồn và trí tuệ vĩ đại", src: `${import.meta.env.BASE_URL}bookNct/55.jpg`, alt: "Hồ Chí Minh Chân dung một tâm hồn và trí tuệ vĩ đại" },
{ id: 56, title: "Thư kí Bác Hồ - kể chuyện", src: `${import.meta.env.BASE_URL}bookNct/56.jpg`, alt: "Thư kí Bác Hồ - kể chuyện" },
{ id: 57, title: "Bác Hồ tấm gương yêu nước", src: `${import.meta.env.BASE_URL}bookNct/57.jpg`, alt: "Bác Hồ tấm gương yêu nước" },
{ id: 58, title: "Những thiếu nhi bên Bác ngày ấy", src: `${import.meta.env.BASE_URL}bookNct/58.jpg`, alt: "Những thiếu nhi bên Bác ngày ấy" },
{ id: 59, title: "Bác Hồ tấm gương đoàn kết", src: `${import.meta.env.BASE_URL}bookNct/59.jpg`, alt: "Bác Hồ tấm gương đoàn kết" },
{ id: 60, title: "Bác Hồ kính yêu", src: `${import.meta.env.BASE_URL}bookNct/60.jpg`, alt: "Bác Hồ kính yêu" },
{ id: 61, title: "Bác Hồ người Việt Nam đẹp nhất - Kiên cường - Dũng cảm", src: `${import.meta.env.BASE_URL}bookNct/61.jpg`, alt: "Bác Hồ người Việt Nam đẹp nhất - Kiên cường - Dũng cảm" },
{ id: 62, title: "Đường cách mệnh", src: `${import.meta.env.BASE_URL}bookNct/62.jpg`, alt: "Đường cách mệnh" },
{ id: 63, title: "Hồ Chí Minh một số tác phẩm chính luận tiêu biểu", src: `${import.meta.env.BASE_URL}bookNct/63.jpg`, alt: "Hồ Chí Minh một số tác phẩm chính luận tiêu biểu" },
{ id: 64, title: "Sửa đổi lối làm việc", src: `${import.meta.env.BASE_URL}bookNct/64.jpg`, alt: "Sửa đổi lối làm việc" },
{ id: 65, title: "Khắc sâu lời bác", src: `${import.meta.env.BASE_URL}bookNct/65.jpg`, alt: "Khắc sâu lời bác" },
{ id: 66, title: "Quê hương và gia thế Chủ tịch Hồ Chí Minh", src: `${import.meta.env.BASE_URL}bookNct/66.jpg`, alt: "Quê hương và gia thế Chủ tịch Hồ Chí Minh" },
{ id: 67, title: "Bác Hồ và Bác Tôn một tình bạn cao cả", src: `${import.meta.env.BASE_URL}bookNct/67.jpg`, alt: "Bác Hồ và Bác Tôn một tình bạn cao cả" },
{ id: 68, title: "Bác Hồ viết Tuyên ngôn độc lập", src: `${import.meta.env.BASE_URL}bookNct/68.jpg`, alt: "Bác Hồ viết Tuyên ngôn độc lập" },
{ id: 69, title: "Sáng mãi tấm gương Bác Hồ Nhân ái", src: `${import.meta.env.BASE_URL}bookNct/69.jpg`, alt: "Sáng mãi tấm gương Bác Hồ Nhân ái" },
{ id: 70, title: "Bác Hồ với miền Nam", src: `${import.meta.env.BASE_URL}bookNct/70.jpg`, alt: "Bác Hồ với miền Nam" },
{ id: 71, title: "Sự ra đời của bản di chúc lịch sử", src: `${import.meta.env.BASE_URL}bookNct/71.jpg`, alt: "Sự ra đời của bản di chúc lịch sử" },
{ id: 72, title: "Hồ Chí Minh và niềm tin tất thắng - Bắc Nam sum họp một nhà", src: `${import.meta.env.BASE_URL}bookNct/72.jpg`, alt: "Hồ Chí Minh và niềm tin tất thắng - Bắc Nam sum họp một nhà" },
{ id: 73, title: "Bác Hồ cây đại thụ", src: `${import.meta.env.BASE_URL}bookNct/73.jpg`, alt: "Bác Hồ cây đại thụ" },
{ id: 74, title: "Bác Hồ sống mãi - Những truyện hay về Bác 3", src: `${import.meta.env.BASE_URL}bookNct/74.jpg`, alt: "Bác Hồ sống mãi - Những truyện hay về Bác 3" },
{ id: 75, title: "Hồ Chí Minh con người của sự sống", src: `${import.meta.env.BASE_URL}bookNct/75.jpg`, alt: "Hồ Chí Minh con người của sự sống" },
{ id: 76, title: "Hồ Chí Minh nhà dự báo thiên tài", src: `${import.meta.env.BASE_URL}bookNct/76.jpg`, alt: "Hồ Chí Minh nhà dự báo thiên tài" },
{ id: 77, title: "Kể chuyện Bác Hồ - Tập chín", src: `${import.meta.env.BASE_URL}bookNct/77.jpg`, alt: "Kể chuyện Bác Hồ - Tập chín" },
{ id: 78, title: "Bác Hồ với mặt trận Việt Minh", src: `${import.meta.env.BASE_URL}bookNct/78.jpg`, alt: "Bác Hồ với mặt trận Việt Minh" },
{ id: 79, title: "Hồ Chí Minh Nhật kí trong tù và những bài thơ khác", src: `${import.meta.env.BASE_URL}bookNct/79.jpg`, alt: "Hồ Chí Minh Nhật kí trong tù và những bài thơ khác" },
{ id: 80, title: "Hồi kí về Bác Hồ - Mãi nhớ ơn Người", src: `${import.meta.env.BASE_URL}bookNct/80.jpg`, alt: "Hồi kí về Bác Hồ - Mãi nhớ ơn Người" },
{ id: 81, title: "Bác Hồ với Quốc hội Việt Nam", src: `${import.meta.env.BASE_URL}bookNct/81.jpg`, alt: "Bác Hồ với Quốc hội Việt Nam" },
{ id: 82, title: "Những tấm gương ham đọc sách và tự học thời đại Hồ Chí Minh", src: `${import.meta.env.BASE_URL}bookNct/82.jpg`, alt: "Những tấm gương ham đọc sách và tự học thời đại Hồ Chí Minh" },
  ];
// Lắng nghe sự kiện mở tủ sách từ không gian 3D
  useEffect(() => {
    const handleOpen = (e) => {
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
            <div 
              key={book.id} 
              style={styles.bookCard}
              // 🌟 Thêm sự kiện onClick để chọn cuốn sách khi bấm vào
              onClick={() => setSelectedBook(book)}
            >
              <img src={book.src} alt={book.alt} style={styles.bookImage} />
              <p style={styles.bookTitle}>{book.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 🌟 Modal phụ: Hiển thị ảnh phóng to khi người dùng bấm vào một cuốn sách */}
      {selectedBook && (
        <div style={styles.previewOverlay} onClick={() => setSelectedBook(null)}>
          <div style={styles.previewContent} onClick={(e) => e.stopPropagation()}>
            <button 
              style={styles.closePreviewBtn} 
              onClick={() => setSelectedBook(null)}
            >
              ✕
            </button>
            <img 
              src={selectedBook.src} 
              alt={selectedBook.alt} 
              style={styles.previewImage} 
            />
            <h3 style={styles.previewTitle}>{selectedBook.title}</h3>
          </div>
        </div>
      )}
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
    backgroundColor: "rgba(167, 176, 176, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10000,
  },
  modalContent: {
    width: "90%",
    maxWidth: "1100px",
    height: "85vh",
    backgroundColor: "#5a5656",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    padding: "25px",
    boxShadow: "0 8px 32px rgba(108, 132, 147, 0.6)",
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
    alignItems: "center", // Đã sửa lỗi chính tả từ alignItem thành alignItems
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    cursor: "pointer", // 🌟 Biến con trỏ thành hình bàn tay khi rê chuột vào sách
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
  // 🌟 CSS cho Modal xem ảnh lớn
  previewOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 11000,
  },
  previewContent: {
    position: "relative",
    backgroundColor: "#252525",
    padding: "20px",
    borderRadius: "12px",
    maxWidth: "500px",
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 10px 40px rgba(0,0,0,0.8)",
  },
  previewImage: {
    width: "100%",
    maxHeight: "65vh",
    objectFit: "contain",
    borderRadius: "8px",
  },
  previewTitle: {
    color: "#fff",
    fontSize: "16px",
    textAlign: "center",
    marginTop: "15px",
    fontWeight: "600",
  },
  closePreviewBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "#da251d",
    color: "#fff",
    border: "none",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    cursor: "pointer",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};