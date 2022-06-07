function Staff(
  userName,
  fullName,
  mail,
  pass,
  workDay,
  salaryCB,
  type,
  workTime
) {
  this.userName = userName;
  this.fullName = fullName;
  this.mail = mail;
  this.pass = pass;
  this.workDay = workDay;
  this.salaryCB = salaryCB;
  this.type = type;
  this.workTime = workTime;
}
Staff.prototype.sumSalary = function () {
  var sumSalary = 0;
  switch (this.type) {
    case "Sếp":
      sumSalary = this.salaryCB * 3;
      break;
    case "Trưởng Phòng":
      sumSalary = this.salaryCB * 2;
      break;
    case "Nhân Viên":
      sumSalary = this.salaryCB;
      break;
    default:
      sumSalary;
      break;
  }
  return sumSalary;
};

Staff.prototype.rating = function () {
  var thongBao;
  if (this.workTime < 160) {
    thongBao = "Nhân Viên Trung Bình";
  } else if (this.workTime >= 160 && this.workTime < 176) {
    thongBao = "Nhân Viên Khá";
  } else if (this.workTime >= 176 && this.workTime < 192) {
    thongBao = "Nhân Viên Giỏi";
  } else {
    thongBao = "Nhân Viên Xuất Sắc";
  }
  return thongBao;
};
var staffs = [];
function getNV() {
  var userName = document.getElementById("tknv").value;
  var fullName = document.getElementById("name").value;
  var mail = document.getElementById("email").value;
  var pass = document.getElementById("password").value;
  var workDay = document.getElementById("datepicker").value;
  var salaryCB = document.getElementById("luongCB").value;
  var type = document.getElementById("chucvu").value;
  var workTime = document.getElementById("gioLam").value;

  var staff = new Staff(
    userName,
    fullName,
    mail,
    pass,
    workDay,
    salaryCB,
    type,
    workTime
  );
  return staff;
}

function display(staffs) {
  var tbodyEl = document.getElementById("tableDanhSach");
  var html = "";
  for (var i = 0; i < staffs.length; i++) {
    var staff = staffs[i];

    html += `
      <tr>
        <td>${staff.userName}</td>
        <td>${staff.fullName}</td>
        <td>${staff.mail}</td>
        <td>${staff.workDay}</td>
        <td>${staff.type}</td>
        <td>${staff.sumSalary()}</td>
        <td>${staff.rating()}</td>
        <td> 
        <button onclick="selectForm('${
          staff.userName
        }')" class="btn btn-success" data-toggle="modal"
        data-target="#myModal">
                Cập Nhât
              </button>
              <button onclick="deleteTable('${
                staff.userName
              }')" class="btn btn-danger">
                Xóa
              </button> 
        </td>


      </tr>
    `;
  }
  tbodyEl.innerHTML = html;
}

function addNV() {
  var staff = getNV();
  var isValid = validation();

  if (!isValid) {
    return;
  }
  staffs.push(staff);
  display(staffs);
  resetForm();
}

function resetForm() {
  document.getElementById("tknv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("datepicker").value = "";
  document.getElementById("luongCB").value = "";
  document.getElementById("chucvu").value = "";
  document.getElementById("gioLam").value = "";
  document.getElementById("tknv").disabled = false;
  document.getElementById("btnThemNV").disabled = false;
}

function deleteTable(stafftk) {
  var index = findNhanVien(stafftk);

  if (index !== -1) {
    staffs.splice(index, 1);
    display(staffs);
  }
}
function findNhanVien(stafftk) {
  var index = -1;
  for (var i = 0; i < staffs.length; i++) {
    if (staffs[i].userName === stafftk) {
      index = i;
      break;
    }
  }
  return index;
}
document.getElementById("btnTimNV").addEventListener("click", searchNhanVien);
document.getElementById("btnTimNV").style.cursor = "pointer";

function searchNhanVien() {
  var searchValue = document.getElementById("searchName").value;
  searchValue = searchValue.toLowerCase();
  var newStaffs = [];
  for (var i = 0; i < staffs.length; i++) {
    var staff = staffs[i];
    var staffrate = staff.rating().toLowerCase();
    if (staffrate.indexOf(searchValue) !== -1) {
      newStaffs.push(staff);
    }
  }

  display(newStaffs);
}

document.getElementById("btnCapNhat").addEventListener("click", updateNhanVien);
function updateNhanVien() {
  var staff = getNV();

  var index = findNhanVien(staff.userName);
  // Cập nhật
  staffs[index] = staff;
  var isValid = validation();

  if (!isValid) {
    return;
  }
  // Gọi hàm display để hiển thị kết quả mới nhất lên giao diện
  display(staffs);
  resetForm();
}
function selectForm(stafftk) {
  var index = findNhanVien(stafftk);
  var staff = staffs[index];
  document.getElementById("tknv").value = staff.userName;
  document.getElementById("name").value = staff.fullName;
  document.getElementById("email").value = staff.mail;
  document.getElementById("password").value = staff.pass;
  document.getElementById("datepicker").value = staff.workDay;
  document.getElementById("luongCB").value = staff.salaryCB;
  document.getElementById("chucvu").value = staff.type;
  document.getElementById("gioLam").value = staff.workTime;
  document.getElementById("tknv").disabled = true;
  document.getElementById("btnThemNV").disabled = true;
}

function validation() {
  var staff = getNV();
  var isValid = true;

  // MaSV không hợp lệ
  if (!isRequired(staff.userName)) {
    isValid = false;
    document.getElementById("tbTKNV").innerHTML =
      "tài khoản không được để trống";
  } else if (!minMaxLength(staff.userName, 4, 6)) {
    isValid = false;
    document.getElementById("tbTKNV").innerHTML =
      "tài khoản phải có từ 4 đến 6 ký tự";
  } else {
    document.getElementById("tbTKNV").innerHTML = "";
  }

  var letter =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]+$/;
  if (!isRequired(staff.fullName)) {
    isValid = false;
    document.getElementById("tbTen").innerHTML = "tên không được để trống";
  } else if (!letter.test(staff.fullName)) {
    isValid = false;
    document.getElementById("tbTen").innerHTML = "Họ tên chứa ký tự đặc biệt";
  } else {
    document.getElementById("tbTen").innerHTML = "";
  }

  var emailpattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!isRequired(staff.mail)) {
    isValid = false;
    document.getElementById("tbEmail").innerHTML = "Email không được để trống";
  } else if (!emailpattern.test(staff.mail)) {
    isValid = false;
    document.getElementById("tbEmail").innerHTML = "Email không hợp lệ";
  } else {
    document.getElementById("tbEmail").innerHTML = "";
  }

  var passwordpattern =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
  if (!isRequired(staff.pass)) {
    isValid = false;
    document.getElementById("tbMatKhau").innerHTML =
      "Password không được để trống";
  } else if (!passwordpattern.test(staff.pass)) {
    isValid = false;
    document.getElementById("tbMatKhau").innerHTML =
      "Password phải chứa  6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)";
  } else {
    document.getElementById("tbMatKhau").innerHTML = "";
  }

  var datepattern = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
  if (!isRequired(staff.workDay)) {
    isValid = false;
    document.getElementById("tbNgay").innerHTML = "Ngày không được để trống";
  } else if (!datepattern.test(staff.workDay)) {
    isValid = false;
    document.getElementById("tbNgay").innerHTML =
      "Ngày phải định dạng mm//dd//yy";
  } else {
    document.getElementById("tbNgay").innerHTML = "";
  }

  if (!isRequired(staff.salaryCB)) {
    isValid = false;
    document.getElementById("tbLuongCB").innerHTML =
      "*Lương cơ bản không được để trống";
  } else if (isNaN(staff.salaryCB)) {
    isValid = false;
    document.getElementById("tbLuongCB").innerHTML = "*Lương cơ bản phải là số";
  } else if (!minMaxLength(staff.salaryCB, 1000000, 20000000)) {
    isValid = false;
    document.getElementById("tbLuongCB").innerHTML =
      "*Lương không hợp lệ (chỉ nhận từ 1000000 -> 20000000)";
  } else {
    document.getElementById("tbLuongCB").innerHTML = "";
  }

  if (staff.type === "") {
    isValid = false;
    document.getElementById("tbChucVu").innerHTML =
      "Chức Vụ không được để trống";
  } else {
    document.getElementById("tbChucVu").innerHTML = "";
  }

  if (!isRequired(staff.workTime)) {
    isValid = false;
    document.getElementById("tbGiolam").innerHTML =
      "giờ làm không được để trống";
  } else if (isNaN(staff.workTime)) {
    isValid = false;
    document.getElementById("tbGiolam").innerHTML = "*giờ làm phải là số";
  } else if (!minMaxLength(staff.workTime, 80, 200)) {
    isValid = false;
    document.getElementById("tbGiolam").innerHTML =
      "giờ làm không hợp lệ (chỉ nhận từ 80 -> 200)";
  } else {
    document.getElementById("tbGiolam").innerHTML = "";
  }

  return isValid;
}

// Hàm kiểm tra input có rỗng hay không
function isRequired(value) {
  if (!value) {
    return false;
  }

  return true;
}
// Hàm kiểm tra độ dài
function minMaxLength(value, min, max) {
  if (value.length < min || value.length > max) {
    return false;
  }

  return true;
}
