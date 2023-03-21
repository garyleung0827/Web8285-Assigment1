/* Name: Kin Man Leung
Date: March 12, 2023
Section: CST 8285 section 313
Assignment: assigment 1
File: main.js */

/* course info */
const course = [
  { name: "Computer Essentials", level: "One", code: "CST8101", description: "The essentials of computer software, hardware, and laptop management form the foundation for building further technical programming skills." },
  { name: "Intro to Computer Programming", level: "One", code: "CST8116", description: "An introduction to the programming language Java" },
  { name: "Introduction to Database", level: "One", code: "CST8215", description: "	An introduction to databases and how they work" },
  { name: "Achieving Success in Changing Environments", level: "One", code: "CST8300", description: "	How to prepare yourself for different work environments and learning soft skills" },
  { name: "Database Systems", level: "Two", code: "CST2355", description: "Further experience in DBMS like Oracle and Microsoft SQL, and MySQL" },
  { name: "Operating Systems Fundamentals", level: "Two", code: "CST8102", description: "Exploring the fundamentals of operating systems with Linux" },
  { name: "Object Oriented Programming", level: "Two", code: "CST8284", description: "Further Java programming concepts with emphasis on object oriented programming" },
  { name: "Web Programming", level: "Two", code: "CST8285", description: "Web programming using HTML, CSS, and JavaScript" },
  { name: "Cooperative Education Readiness", level: "Two", code: "GEP1001", description: "Providing workshops on resumes, coverletters and interview techniques" }
]

/* search filter */
function search() {
  var tr, td, i, j, txtValue, temp = 0;
  var input = document.getElementById("search").value.toLowerCase();
  var table = document.getElementById("course");
  var tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    for (j = 1; j < 5; j++) {
      td = tr[i].getElementsByTagName("td")[j];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toLowerCase().indexOf(input) > -1) {
          temp = 1;
        }
      }
    }
    if (temp == 1) {
      tr[i].style.display = "";
    }
    else {
      tr[i].style.display = "none";
    }
    temp = 0;
  }
}

/* sort table by level*/
function sort_level() {
  var sort_order = document.getElementById("filter").dataset.sort;
  if (sort_order == "asc") {
    document.getElementById("filter").value = "desc";
    document.getElementById("up").style.display = "none";
    document.getElementById("down").style.display = "block";
    document.getElementById("filter").dataset.sort = "desc";
    sort_desc();
  }
  if (sort_order == "desc") {
    document.getElementById("filter").value = "asc";
    document.getElementById("up").style.display = "block";
    document.getElementById("down").style.display = "none";
    document.getElementById("filter").dataset.sort = "asc";
    sort_asc();
  }
}
/* sort asc function */
function sort_asc() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("course");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 0; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[2];
      x_1 = rows[i].getElementsByTagName("td")[3];
      y = rows[i + 1].getElementsByTagName("td")[2];
      y_1 = rows[i + 1].getElementsByTagName("td")[3];
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase() || (x.innerHTML.toLowerCase() == y.innerHTML.toLowerCase() && x_1.innerHTML.toLowerCase() > y_1.innerHTML.toLowerCase())) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
/* sort desc funtion */
function sort_desc() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("course");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 0; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[2];
      x_1 = rows[i].getElementsByTagName("td")[3];
      y = rows[i + 1].getElementsByTagName("td")[2];
      y_1 = rows[i + 1].getElementsByTagName("td")[3];
      if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase() || (x.innerHTML.toLowerCase() == y.innerHTML.toLowerCase() && x_1.innerHTML.toLowerCase() < y_1.innerHTML.toLowerCase())) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

/* course wrap creator */
function course_level(value) {
  if (value != "") {
    var new_course = course.filter(item => item.level === value);
    document.getElementById("up").style.display = "none";
    document.getElementById("down").style.display = "none";
    document.getElementById("filter").onclick = null;
    document.getElementById("filter").style.cursor = "auto";
    if (value == "One") {
      document.getElementById("lv1").style.backgroundColor = "#8A2245";
      document.getElementById("alv").style.backgroundColor = "";
      document.getElementById("lv2").style.backgroundColor = "";
    }
    else if (value == "Two") {
      document.getElementById("lv2").style.backgroundColor = "#8A2245";
      document.getElementById("alv").style.backgroundColor = "";
      document.getElementById("lv1").style.backgroundColor = "";
    }
  }
  else {
    var new_course = course;
    document.getElementById('filter').onclick = sort_level;
    document.getElementById("up").style.display = "block";
    document.getElementById("down").style.display = "none";
    document.getElementById("filter").style.cursor = "pointer";
    document.getElementById("alv").style.backgroundColor = "#8A2245";
    document.getElementById("lv1").style.backgroundColor = "";
    document.getElementById("lv2").style.backgroundColor = "";
  }
  const table = document.getElementById("course");
  table.innerHTML = ""
  new_course.map(data => {
    const row = document.createElement('tr');

    row.addEventListener("click", function (event) {
      course_wrap(data.code);
    });

    const object_td = document.createElement('td');
    const object = document.createElement('object');
    object.setAttribute("data", "img/icon/" + data.code.toLowerCase() + ".svg");
    const nameCell = document.createElement('td');
    const levelCell = document.createElement('td');
    const codeCell = document.createElement('td');
    const descriptionCell = document.createElement('td');

    object_td.appendChild(object);
    nameCell.appendChild(document.createTextNode(data.name));
    levelCell.appendChild(document.createTextNode(data.level));
    codeCell.appendChild(document.createTextNode(data.code));
    descriptionCell.appendChild(document.createTextNode(data.description));

    row.appendChild(object_td);
    row.appendChild(nameCell);
    row.appendChild(levelCell);
    row.appendChild(codeCell);
    row.appendChild(descriptionCell);

    table.appendChild(row);
  });
}
function alv() {
  course_level('');
}
function lv1() {
  course_level('One');
}
function lv2() {
  course_level('Two');
}

/* change details of course with image */
function course_wrap(value) {
  const new_course = course.filter(item => item.code === value);
  document.querySelector('h2').innerText = new_course[0].name;
  document.querySelector('#course_photo').setAttribute('src', 'img/' + new_course[0].code.toLowerCase() + '.jpeg');
  document.querySelector('#course_code').innerText = new_course[0].code;
  document.querySelector('#course_level').innerText = 'Level ' + new_course[0].level;
  document.querySelector('#course_des').innerText = new_course[0].description;
}

/* eventlisteners */
document.getElementById("alv").addEventListener("click", alv);

document.getElementById("lv1").addEventListener("click", lv1);

document.getElementById("lv2").addEventListener("click", lv2);

document.getElementById("search").addEventListener("keyup", search);

/* initialize the table and course_detail_div */
document.addEventListener("load", course_level(""));