import { useState } from "react";
import { Student } from "../types";

interface StatusCertificateDialogProps {
  student: Partial<Student>;
  onClose: () => void;
}

const StatusCertificateDialog = ({
  student,
  onClose,
}: StatusCertificateDialogProps) => {
  const [purpose, setPurpose] = useState<string>("loan");
  const [otherPurpose, setOtherPurpose] = useState<string>("");
  const [validUntil, setValidUntil] = useState<string>(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  );

  const generateCertificateContent = () => {
    let purposeText = "";

    switch (purpose) {
      case "loan":
        purposeText = "Xác nhận đang học để vay vốn ngân hàng";
        break;
      case "military":
        purposeText = "Xác nhận làm thủ tục tạm hoãn nghĩa vụ quân sự";
        break;
      case "job":
        purposeText = "Xác nhận làm hồ sơ xin việc / thực tập";
        break;
      case "other":
        purposeText = `Xác nhận lý do khác: ${otherPurpose}`;
        break;
    }

    const currentDate = new Date().toLocaleDateString();

    return {
      studentName: student.full_name,
      studentId: student.student_id,
      dateOfBirth: new Date(student.date_of_birth ?? "").toLocaleDateString(),
      gender: student.gender,
      faculty: student.Faculty?.faculty_name || student.faculty_id,
      program: student.Program?.program_name || student.program_id,
      courseYear: student.course_year,
      status: student.Status?.status_name || student.status_id,
      purpose: purposeText,
      validUntil: new Date(validUntil).toLocaleDateString(),
      issuedDate: currentDate,
    };
  };
  const exportToMarkdown = () => {
    const data = generateCertificateContent();
    const markdownContent = `**TRƯỜNG ĐẠI HỌC KHOA HỌC TỰ NHIÊN**
    **PHÒNG ĐÀO TẠO**
    📍 Địa chỉ: 227 Nguyễn Văn Cừ, Quận 5, TP. Hồ Chí Minh
    📞 Điện thoại: (028) 62884499 | 📧 Email:  info@hcmus.edu.vn

    ---

    ### **GIẤY XÁC NHẬN TÌNH TRẠNG SINH VIÊN**

    Trường Đại học Khoa học Tự nhiên xác nhận:

    **1. Thông tin sinh viên:**
    - **Họ và tên:** ${data.studentName}
    - **Mã số sinh viên:** ${data.studentId}
    - **Ngày sinh:** ${data.dateOfBirth}
    - **Giới tính:** ${data.gender}
    - **Khoa:** ${data.faculty}
    - **Chương trình đào tạo:** ${data.program}
    - **Khóa:** ${data.courseYear}

    **2. Tình trạng sinh viên hiện tại:** ${data.status}

    **3. Mục đích xác nhận:**
    - ${data.purpose}

    **4. Thời gian cấp giấy:**
    - Giấy xác nhận có hiệu lực đến ngày: ${data.validUntil}

    📍 **Xác nhận của Trường Đại học Khoa học Tự nhiên**

    📅 Ngày cấp: ${data.issuedDate}

    🖋 **Trưởng Phòng Đào Tạo**
    (Ký, ghi rõ họ tên, đóng dấu)  `;

    const blob = new Blob([markdownContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `certificate_${data.studentId}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportToHTML = () => {
    const data = generateCertificateContent();

    const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Status Certificate</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        text-align: center;
        margin-bottom: 20px;
        border-bottom: 2px solid #333;
        padding-bottom: 10px;
      }
      .title {
        text-align: center;
        font-weight: bold;
        font-size: 18px;
        margin: 20px 0;
      }
      .section {
        margin-bottom: 15px;
      }
      .footer {
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
      }
      .signature {
        text-align: center;
        width: 200px;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <h2>TRƯỜNG ĐẠI HỌC KHOA HỌC TỰ NHIÊN</h2>
      <p>PHÒNG ĐÀO TẠO</p>
      <p>Địa chỉ: 227 Nguyễn Văn Cừ, Quận 5, TP.HCM</p>
      <p>Điện thoại: (028) 62884499 | Email: info@university.edu.vn</p>
    </div>

    <div class="title">
      GIẤY XÁC NHẬN TÌNH TRẠNG SINH VIÊN
    </div>

    <p>Trường Đại học Khoa học Tự nhiên xác nhận:</p>

    <div class="section">
      <h3>1. Thông tin sinh viên:</h3>
      <p><strong>Họ và tên:</strong> ${data.studentName}</p>
      <p><strong>Mã số sinh viên:</strong> ${data.studentId}</p>
      <p><strong>Ngày sinh:</strong> ${data.dateOfBirth}</p>
      <p><strong>Giới tính:</strong> ${data.gender}</p>
      <p><strong>Khoa:</strong> ${data.faculty}</p>
      <p><strong>Chương trình đào tạo:</strong> ${data.program}</p>
      <p><strong>Khóa:</strong> ${data.courseYear}</p>
    </div>

    <div class="section">
      <h3>2. Tình trạng sinh viên hiện tại:</h3>
      <p>${data.status}</p>
    </div>

    <div class="section">
      <h3>3. Mục đích xác nhận:</h3>
      <p>${data.purpose}</p>
    </div>

    <div class="section">
      <h3>4. Thời gian cấp giấy:</h3>
      <p>Giấy xác nhận có hiệu lực đến ngày: ${data.validUntil}</p>
    </div>

    <div class="footer">
      <div></div>
      <div class="signature">
        <p>Ngày cấp: ${data.issuedDate}</p>
        <p><strong>Trưởng Phòng Đào Tạo</strong></p>
        <p>(Ký, ghi rõ họ tên, đóng dấu)</p>
      </div>
    </div>
  </body>
  </html>
  `;
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `certificate_${data.studentId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-gray-400 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Status Certificate</h2>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            Student: {student.full_name} ({student.student_id})
          </p>
          <p className="text-sm text-gray-600">
            Current Status: {student.Status?.status_name || student.status_id}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Purpose of Certificate
          </label>
          <select
            className="w-full p-2 border rounded"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          >
            <option value="loan">Vay vốn ngân hàng</option>
            <option value="military">Tạm hoãn nghĩa vụ quân sự</option>
            <option value="job">Xin việc / thực tập</option>
            <option value="other">Lý do khác</option>
          </select>
        </div>

        {purpose === "other" && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Specify Other Purpose
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={otherPurpose}
              onChange={(e) => setOtherPurpose(e.target.value)}
              placeholder="Enter purpose"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Valid Until
          </label>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={validUntil}
            onChange={(e) => setValidUntil(e.target.value)}
          />
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={exportToMarkdown}
            className="px-4 py-2 bg-blue-500  rounded hover:bg-blue-600"
          >
            Export to Markdown
          </button>
          <button
            onClick={exportToHTML}
            className="px-4 py-2 bg-green-500  rounded hover:bg-green-600"
          >
            Export to HTML
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusCertificateDialog;
