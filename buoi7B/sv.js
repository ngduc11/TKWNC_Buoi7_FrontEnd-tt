lst = [];
curItem = null;
$(function(){
  getStudens();
  $('#txtNgaySinh').datepicker({
    format: "dd/mm/yyyy"
  });
});
//get
function getStudens(){
  fetch("http://localhost:3000/students")
  .then(res=>{
    return res.json();
  })
  .then(data =>{
    lst = [];
    data.forEach((sv, i) => {
      sv.STT = i + 1;
      lst.push(sv);
    });
    if (lst.length>0)
    {
      $("#tbodySV").html("");
      $("#svTemplate").tmpl(lst).appendTo("#tbodySV");
    }
    else{
      str = "<caption>No data found</caption>";
      $("#tbodySV").html(str);
    }
  })
  .catch(err=>{
    str = "<caption>Error.....</caption>";
    $("#tbodySV").html(str);
  });
}
//thêm sv
function createSV()
{
  console.log("Create");
  gt = "Nam";
  gt = $('input[name="GioiTinh"]:checked').val();
  $.ajax({
    method: "POST",
    url: "http://localhost:3000/students",
    data: {
      "MaSV": $('#txtMSSV').val(),
      "HoTen": $('#txtHoTen').val(),
      "Lop": $('#txtLop').val(),
      "GioiTinh": gt,
      "NgaySinh": $('#txtNgaySinh').val()
    }
  }).done(function(res){
    console.log(res);
    if(res.success)
    {
      alert(res.msg);
      $('#modalSinhVien').modal('toggle');
      getStudens();
    }
    else
    {
      alert(res.msg);
    }
  }).fail(function (jqXHR, textStatus, errorThrown) {console.log(textStatus)});
}

//sửa - cập nhật
function setModal(type)
{
  if(type == "up")
  {
    $("#btnCreate").hide();
    $("#btnUpdate").show();
    $("#txtMSSV").attr("readonly", true);
  }
  else
  {
    $("#btnCreate").show(); 
    $("#btnUpdate").hide();
    $("#txtMSSV").attr("readonly", false);
  }
}

function upStudent(mssv){
  $('#modalSinhVien').modal('toggle');
  setModal("up");
  sv = lst.find(x=>x.MaSV == mssv)
  $("#txtMSSV").val(sv.MaSV);
  $("#txtHoTen").val(sv.HoTen);
  $("#txtLop").val(sv.Lop);
  if(sv.GioiTinh == "Nam")
      $('#radioNam').prop('checked',true);
  else
      $('#radioNu').prop('checked',true);
  $("#txtNgaySinh").val(sv.NgaySinh);
}

function updateSV()
{
  gt = "Nam";
  gt = $('input[name="GioiTinh"]:checked').val();
  $.ajax({
    method: "PUT",
    url: "http://localhost:3000/students",
    data: {
      "MaSV": $('#txtMSSV').val(),
      "HoTen": $('#txtHoTen').val(),
      "Lop": $('#txtLop').val(),
      "GioiTinh": gt,
      "NgaySinh": $('#txtNgaySinh').val()
    }
  }).done(function(res){
    console.log(res);
    if(res.success)
    {
      alert(res.msg);
      $('#modalSinhVien').modal('toggle');
      getStudens();
    }
    else
    {
      alert(res.msg);
    }
  }).fail(function (jqXHR, textStatus, errorThrown) {console.log(textStatus)});
}

//xóa
function delStudent(mssv)
{
  if(confirm("Bạn có muốn xóa?")){
    $.ajax({
      method: "DELETE",
      url: "http://localhost:3000/students",
      data: {
        "MaSV": mssv,
      }
    }).done(function(res){
      console.log(res);
      if(res.success)
      {
        alert(res.msg);
        getStudens();
      }
      else
      {
        alert(res.msg);
      }
    }).fail(function (jqXHR, textStatus, errorThrown) {console.log(textStatus)});
  }
}