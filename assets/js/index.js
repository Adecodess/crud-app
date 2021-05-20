$("#add_user").submit(function (event) {
  alert("Data Saved Successfully");
});

$("#update_user").submit(function (event) {
  event.preventDefault();

  var unindexed_array = $(this).serializeArray();
  var data = {};

  $.map(unindexed_array, function (n, i) {
    data[n["name"]] = n["value"];
  });
  console.log(data);

  var request = {
    url: `http://localhost:3000/api/users/${data.id}`,
    method: "PUT",
    data: data,
  };

  $.ajax(request).done(function (response) {
    alert("Data Updated Sucessfully");
  });
});

if (window.location.pathname == "/") {
  $onDelete = $(".table tbody td a.delete");
  $onDelete.click(function () {
    var id = $(this).attr("data-id");

    var request = {
      url: `http://localhost:3000/api/users/${id}`,
      method: "DELETE",
    };

    if (confirm("Are you sure want to delete this record")) {
      $.ajax(request).done(function (response) {
        alert("Data Deleted Sucessfully");
        location.reload();
      });
    }
  });
}
