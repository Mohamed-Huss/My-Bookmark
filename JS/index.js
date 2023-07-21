var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var bookmark;
if (localStorage.getItem("bookmark")) {
  bookmark = JSON.parse(localStorage.getItem("bookmark"));
  // console.log("Has data")
  // console.log(bookmark)
  displayBookmark();
} else {
  // console.log("Empty")
  bookmark = [];
}
// Capitalize the first letter of the Site name
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
// Add Function
function addBookmark() {
  // bookmark=[]; Anothe valid position for intialization //
  var siteInfo = {
    name: capitalizeFirstLetter(siteName.value),
    url: siteUrl.value,
  };
  if (validation()) {
    bookmark.push(siteInfo);
    displayBookmark();
    localStorage.setItem("bookmark", JSON.stringify(bookmark));
    ClearFourm();
  } else {
    document
      .getElementById("invalidEntry")
      .classList.replace("d-none", "d-block");
  }
}
// Display Function
function displayBookmark() {
  var container = "";
  for (var i = 0; i < bookmark.length; i++) {
    container += `
<tr>
<td>${i + 1}</td>
<td>${bookmark[i].name}</td>
 <td> <button id="visitBtn" onclick="visitBtn(${i})"
class="btn btn_visit"><i class="fa-solid fa-eye pe-2"></i>Visit</td>
<td><button class="btn btn_delete" onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
</tr>`;
  }
  document.getElementById("tableContent").innerHTML = container;
}
// Delete function
function deleteBookmark(index) {
  bookmark.splice(index, 1);
  localStorage.setItem("bookmark", JSON.stringify(bookmark));
  displayBookmark();
}
// Clear Fourm
function ClearFourm() {
  siteName.value = "";
  siteUrl.value = "";
}

// console.log(siteName.value)

// validation function
function validation() {
  var validName = /^\w{3,}(\s+\w+)*$/;
  validName.test(siteName.value);
  //  console.log(validName.test(siteName.value));
  var validUrl = /^(https\:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
  validUrl.test(siteUrl.value);
  // console.log(validName.test(siteUrl.value));
  var x = validateUniqueSiteName();
  // console.log(x)
  if (
    validName.test(siteName.value) &&
    validUrl.test(siteUrl.value) &&
    x === true
  ) {
    return true;
  } else {
    return false;
  }
}
// validation of unique site name
function validateUniqueSiteName() {
  for (var i = 0; i < bookmark.length; i++) {
    // console.log(bookmark[i].name)
    if (bookmark[i].name.toLowerCase() === siteName.value.toLowerCase()) {
      // console.log(false)
      // console.log(bookmark[i].name)
      return false;
    }
  }
  return true;
}

// window Toggler
function closeBtn() {
  document
    .getElementById("invalidEntry")
    .classList.replace("d-block", "d-none");
}

// Visit Function
function visitBtn(index) {
  var httpsRegex = /^https?:\/\//;
  if (httpsRegex.test(bookmark[index].url)) {
    console.log(bookmark[index].url);
    window.open(bookmark[index].url);
  } else {
    window.open(`https://${bookmark[index].url}`);
    console.log(`https://${bookmark[index].url}`);
  }
}
