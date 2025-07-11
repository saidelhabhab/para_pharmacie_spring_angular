$(function () {
    "use strict";
  
    // Default
    $(".repeater-default").repeater();
  
    // Custom Show / Hide Configurations
    $(".file-repeater, .email-repeater").repeater({
      show: function () {
        $(this).slideDown();
      },
      hide: function (remove) {
        if (confirm("Are you sure you want to remove this item?")) {
          $(this).slideUp(remove);
        }
      },
    });
  });
  
  var room = 1;
  
  function education_fields() {
    room++;
    var objTo = document.getElementById("education_fields");
    var divtest = document.createElement("div");
    divtest.setAttribute("class", "mb-3 removeclass" + room);
    var rdiv = "removeclass" + room;
    divtest.innerHTML =
      '<form class="row"><div class="col-sm-3"><div class="form-group"><input type="text" class="form-control" id="Schoolname" name="Schoolname" placeholder="School Name"></div></div><div class="col-sm-2"> <div class="form-group"> <input type="text" class="form-control" id="Age" name="Age" placeholder="Age"> </div></div><div class="col-sm-2"> <div class="form-group"> <input type="text" class="form-control" id="Degree" name="Degree" placeholder="Degree"> </div></div><div class="col-sm-3"> <div class="form-group"> <select class="form-select" id="educationDate" name="educationDate"> <option>Date</option> <option value="2015">2015</option> <option value="2016">2016</option> <option value="2017">2017</option> <option value="2018">2018</option> </select> </div></div><div class="col-sm-2"> <div class="form-group"> <button class="btn btn-danger" type="button" onclick="remove_education_fields(' +
      room +
      ');"> <i class="ti ti-minus"></i> </button> </div></div></form>';
  
    objTo.appendChild(divtest);
  }
  
  function remove_education_fields(rid) {
    $(".removeclass" + rid).remove();
  }