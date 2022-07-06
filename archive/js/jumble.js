$(function() {
  $("#jumble_word_1 > input").not(":last").keyup(function(e) {
    if ($(this).val().length == 1) {
      $(this).next("input").focus();
    }
  });
});

$(function() {
  $("#jumble_word_2 > input").not(":last").keyup(function(e) {
    if ($(this).val().length == 1) {
      $(this).next("input").focus();
    }
  });
});

$(function() {
  $("#jumble_word_3 > input").not(":last").keyup(function(e) {
    if ($(this).val().length == 1) {
      $(this).next("input").focus();
    }
  });
});

$(function() {
  $("#jumble_word_4 > input").not(":last").keyup(function(e) {
    if ($(this).val().length == 1) {
      $(this).next("input").focus();
    }
  });
});

$(function() {
  $("#jumble_word_5 > input").not(":last").keyup(function(e) {
    if ($(this).val().length == 1) {
      $(this).next("input").focus();
    }
  });
});

function showImages() {
  var image_1 = document.getElementById("image_1");
  var image_2 = document.getElementById("image_2");
  var image_3 = document.getElementById("image_3");
  var image_4 = document.getElementById("image_4");
  var image_5 = document.getElementById("image_5");
  var image_6 = document.getElementById("image_6");
  var image_7 = document.getElementById("image_7");
  var image_8 = document.getElementById("image_8");
  var image_9 = document.getElementById("image_9");
  image_1.classList.toggle("w3-hide");
  image_2.classList.toggle("w3-hide");
  image_3.classList.toggle("w3-hide");
  image_4.classList.toggle("w3-hide");
  image_5.classList.toggle("w3-hide");
  image_6.classList.toggle("w3-hide");
  image_7.classList.toggle("w3-hide");
  image_8.classList.toggle("w3-hide");
  image_9.classList.toggle("w3-hide");
}

function resetForm1() {
  document.getElementById("jumble_word_1").reset();
  var letter1_1 = document.getElementById("letter1_1");
  var letter1_2 = document.getElementById("letter1_2");
  var letter1_3 = document.getElementById("letter1_3");
  var letter1_4 = document.getElementById("letter1_4");
  var letter1_5 = document.getElementById("letter1_5");
  var letter1_6 = document.getElementById("letter1_6");
  var letter1_7 = document.getElementById("letter1_7");
  var letter1_8 = document.getElementById("letter1_8");
  var letter1_9 = document.getElementById("letter1_9");
  var letter1_10 = document.getElementById("letter1_10");
  var letter1_11 = document.getElementById("letter1_11");
  var incorrect1 = document.getElementById("incorrect1");
  var checkAnswer1 = document.getElementById("checkAnswer1");
  var resetbutton1 = document.getElementById("resetbutton1");
  letter1_1.classList.remove("w3-border-highway-green", "w3-border-red");
  letter1_2.classList.remove("w3-border-highway-green", "w3-border-red");
  letter1_3.classList.remove("w3-border-highway-green", "w3-border-red");
  letter1_4.classList.remove("w3-border-highway-green", "w3-border-red");
  letter1_5.classList.remove("w3-border-highway-green", "w3-border-red");
  letter1_6.classList.remove("w3-border-highway-green", "w3-border-red");
  letter1_7.classList.remove("w3-border-highway-green", "w3-border-red");
  letter1_8.classList.remove("w3-border-highway-green", "w3-border-red");
  letter1_9.classList.remove("w3-border-highway-green", "w3-border-red");
  letter1_10.classList.remove("w3-border-highway-green", "w3-border-red");
  letter1_11.classList.remove("w3-border-highway-green", "w3-border-red");
  incorrect1.classList.remove("show");
  incorrect1.classList.add("hide");
  checkAnswer1.classList.remove("hide");
  checkAnswer1.classList.add("show");
  resetbutton1.classList.remove("hide");
  resetbutton1.classList.add("show");
};

function checkAnswer1() {
  var letter1_1 = document.getElementsByName("letter1_1")[0].value;
  var letter1_2 = document.getElementsByName("letter1_2")[0].value;
  var letter1_3 = document.getElementsByName("letter1_3")[0].value;
  var letter1_4 = document.getElementsByName("letter1_4")[0].value;
  var letter1_5 = document.getElementsByName("letter1_5")[0].value;
  var letter1_6 = document.getElementsByName("letter1_6")[0].value;
  var letter1_7 = document.getElementsByName("letter1_7")[0].value;
  var letter1_8 = document.getElementsByName("letter1_8")[0].value;
  var letter1_9 = document.getElementsByName("letter1_9")[0].value;
  var letter1_10 = document.getElementsByName("letter1_10")[0].value;
  var letter1_11 = document.getElementsByName("letter1_11")[0].value;
  var firstSolution = letter1_1 + letter1_2 + letter1_3 + letter1_4 + letter1_5 + letter1_6 + letter1_7 + letter1_8 + letter1_9 + letter1_10 + letter1_11;
  firstSolution = firstSolution.toUpperCase();
  console.log(firstSolution);
  if (firstSolution == "ILRADICCHIO") {
    var letter1_1 = document.getElementById("letter1_1");
    var letter1_2 = document.getElementById("letter1_2");
    var letter1_3 = document.getElementById("letter1_3");
    var letter1_4 = document.getElementById("letter1_4");
    var letter1_5 = document.getElementById("letter1_5");
    var letter1_6 = document.getElementById("letter1_6");
    var letter1_7 = document.getElementById("letter1_7");
    var letter1_8 = document.getElementById("letter1_8");
    var letter1_9 = document.getElementById("letter1_9");
    var letter1_10 = document.getElementById("letter1_10");
    var letter1_11 = document.getElementById("letter1_11");
    var image_1 = document.getElementById("image_1");
    var image_6 = document.getElementById("image_6");
    var continue1 = document.getElementById("continue1");
    var checkAnswer1 = document.getElementById("checkAnswer1");
    var resetbutton1 = document.getElementById("resetbutton1");
    var progressbar1 = document.getElementById("progressbar1");
    var progressbar2 = document.getElementById("progressbar2");
    letter1_1.classList.add("w3-border-highway-green");
    letter1_2.classList.add("w3-border-highway-green");
    letter1_3.classList.add("w3-border-highway-green");
    letter1_4.classList.add("w3-border-highway-green");
    letter1_5.classList.add("w3-border-highway-green");
    letter1_6.classList.add("w3-border-highway-green");
    letter1_7.classList.add("w3-border-highway-green");
    letter1_8.classList.add("w3-border-highway-green");
    letter1_9.classList.add("w3-border-highway-green");
    letter1_10.classList.add("w3-border-highway-green");
    letter1_11.classList.add("w3-border-highway-green");
    image_1.classList.toggle("w3-hide");
    image_6.classList.toggle("w3-hide");
    continue1.classList.toggle("hide");
    checkAnswer1.classList.add("hide");
    resetbutton1.classList.add("hide");
    progressbar1.classList.toggle("w3-hide");
    progressbar2.classList.toggle("w3-hide");
  } else {
    var letter1_1 = document.getElementById("letter1_1");
    var letter1_2 = document.getElementById("letter1_2");
    var letter1_3 = document.getElementById("letter1_3");
    var letter1_4 = document.getElementById("letter1_4");
    var letter1_5 = document.getElementById("letter1_5");
    var letter1_6 = document.getElementById("letter1_6");
    var letter1_7 = document.getElementById("letter1_7");
    var letter1_8 = document.getElementById("letter1_8");
    var letter1_9 = document.getElementById("letter1_9");
    var letter1_10 = document.getElementById("letter1_10");
    var letter1_11 = document.getElementById("letter1_11");
    var incorrect1 = document.getElementById("incorrect1");
    var checkAnswer1 = document.getElementById("checkAnswer1");
    letter1_1.classList.add("w3-border-red");
    letter1_2.classList.add("w3-border-red");
    letter1_3.classList.add("w3-border-red");
    letter1_4.classList.add("w3-border-red");
    letter1_5.classList.add("w3-border-red");
    letter1_6.classList.add("w3-border-red");
    letter1_7.classList.add("w3-border-red");
    letter1_8.classList.add("w3-border-red");
    letter1_9.classList.add("w3-border-red");
    letter1_10.classList.add("w3-border-red");
    letter1_11.classList.add("w3-border-red");
    incorrect1.classList.add("show");
    incorrect1.classList.remove("hide");
    checkAnswer1.classList.remove("show")
    checkAnswer1.classList.add("hide");
  }
};

function goToQuestion2() {
  var question1 = document.getElementById("question1");
  var question2 = document.getElementById("question2");
  question1.classList.add("w3-hide");
  question2.classList.remove("w3-hide");
  question2.classList.add("w3-show");
};

function resetForm2() {
  document.getElementById("jumble_word_2").reset();
  var letter2_1 = document.getElementById("letter2_1");
  var letter2_2 = document.getElementById("letter2_2");
  var letter2_3 = document.getElementById("letter2_3");
  var letter2_4 = document.getElementById("letter2_4");
  var incorrect2 = document.getElementById("incorrect2");
  var checkAnswer2 = document.getElementById("checkAnswer2");
  var resetbutton2 = document.getElementById("resetbutton2");
  letter2_1.classList.remove("w3-border-highway-green", "w3-border-red");
  letter2_2.classList.remove("w3-border-highway-green", "w3-border-red");
  letter2_3.classList.remove("w3-border-highway-green", "w3-border-red");
  letter2_4.classList.remove("w3-border-highway-green", "w3-border-red");
  incorrect2.classList.remove("show");
  incorrect2.classList.add("hide");
  checkAnswer2.classList.remove("hide");
  checkAnswer2.classList.add("show");
  resetbutton2.classList.remove("hide");
  resetbutton2.classList.add("show");
};

function checkAnswer2() {
  var letter2_1 = document.getElementsByName("letter2_1")[0].value;
  var letter2_2 = document.getElementsByName("letter2_2")[0].value;
  var letter2_3 = document.getElementsByName("letter2_3")[0].value;
  var letter2_4 = document.getElementsByName("letter2_4")[0].value;
  var firstSolution = letter2_1 + letter2_2 + letter2_3 + letter2_4;
  firstSolution = firstSolution.toUpperCase();
  console.log(firstSolution);
  if (firstSolution == "TEAL") {
    var letter2_1 = document.getElementById("letter2_1");
    var letter2_2 = document.getElementById("letter2_2");
    var letter2_3 = document.getElementById("letter2_3");
    var letter2_4 = document.getElementById("letter2_4");
    var image_3 = document.getElementById("image_3");
    var image_8 = document.getElementById("image_8");
    var continue2 = document.getElementById("continue2");
    var checkAnswer2 = document.getElementById("checkAnswer2");
    var resetbutton2 = document.getElementById("resetbutton2");
    var progressbar2 = document.getElementById("progressbar2");
    var progressbar3 = document.getElementById("progressbar3");
    letter2_1.classList.add("w3-border-highway-green");
    letter2_2.classList.add("w3-border-highway-green");
    letter2_3.classList.add("w3-border-highway-green");
    letter2_4.classList.add("w3-border-highway-green");
    image_3.classList.toggle("w3-hide");
    image_8.classList.toggle("w3-hide");
    continue2.classList.toggle("hide");
    checkAnswer2.classList.add("hide");
    resetbutton2.classList.add("hide");
    progressbar2.classList.toggle("w3-hide");
    progressbar3.classList.toggle("w3-hide");
  } else {
    var letter2_1 = document.getElementById("letter2_1");
    var letter2_2 = document.getElementById("letter2_2");
    var letter2_3 = document.getElementById("letter2_3");
    var letter2_4 = document.getElementById("letter2_4");
    var incorrect2 = document.getElementById("incorrect2");
    var checkAnswer2 = document.getElementById("checkAnswer2");
    letter2_1.classList.add("w3-border-red");
    letter2_2.classList.add("w3-border-red");
    letter2_3.classList.add("w3-border-red");
    letter2_4.classList.add("w3-border-red");
    incorrect2.classList.add("show");
    incorrect2.classList.remove("hide");
    checkAnswer2.classList.remove("show")
    checkAnswer2.classList.add("hide");
  }
};

function goToQuestion3() {
  var question2 = document.getElementById("question2");
  var question3 = document.getElementById("question3");
  question2.classList.remove("w3-show");
  question2.classList.add("w3-hide");
  question3.classList.remove("w3-hide");
  question3.classList.add("w3-show");
};

function resetForm3() {
  document.getElementById("jumble_word_3").reset();
  var letter3_1 = document.getElementById("letter3_1");
  var letter3_2 = document.getElementById("letter3_2");
  var letter3_3 = document.getElementById("letter3_3");
  var letter3_4 = document.getElementById("letter3_4");
  var letter3_5 = document.getElementById("letter3_5");
  var letter3_6 = document.getElementById("letter3_6");
  var letter3_7 = document.getElementById("letter3_7");
  var letter3_8 = document.getElementById("letter3_8");
  var letter3_9 = document.getElementById("letter3_9");
  var incorrect3 = document.getElementById("incorrect3");
  var checkAnswer3 = document.getElementById("checkAnswer3");
  var resetbutton3 = document.getElementById("resetbutton3");
  letter3_1.classList.remove("w3-border-highway-green", "w3-border-red");
  letter3_2.classList.remove("w3-border-highway-green", "w3-border-red");
  letter3_3.classList.remove("w3-border-highway-green", "w3-border-red");
  letter3_4.classList.remove("w3-border-highway-green", "w3-border-red");
  letter3_5.classList.remove("w3-border-highway-green", "w3-border-red");
  letter3_6.classList.remove("w3-border-highway-green", "w3-border-red");
  letter3_7.classList.remove("w3-border-highway-green", "w3-border-red");
  letter3_8.classList.remove("w3-border-highway-green", "w3-border-red");
  letter3_9.classList.remove("w3-border-highway-green", "w3-border-red");
  incorrect3.classList.remove("show");
  incorrect3.classList.add("hide");
  checkAnswer3.classList.remove("hide");
  checkAnswer3.classList.add("show");
  resetbutton3.classList.remove("hide");
  resetbutton3.classList.add("show");
};

function checkAnswer3() {
  var letter3_1 = document.getElementsByName("letter3_1")[0].value;
  var letter3_2 = document.getElementsByName("letter3_2")[0].value;
  var letter3_3 = document.getElementsByName("letter3_3")[0].value;
  var letter3_4 = document.getElementsByName("letter3_4")[0].value;
  var letter3_5 = document.getElementsByName("letter3_5")[0].value;
  var letter3_6 = document.getElementsByName("letter3_6")[0].value;
  var letter3_7 = document.getElementsByName("letter3_7")[0].value;
  var letter3_8 = document.getElementsByName("letter3_8")[0].value;
  var letter3_9 = document.getElementsByName("letter3_9")[0].value;
  var firstSolution = letter3_1 + letter3_2 + letter3_3 + letter3_4 + letter3_5 + letter3_6 + letter3_7 + letter3_8 + letter3_9;
  firstSolution = firstSolution.toUpperCase();
  console.log(firstSolution);
  if (firstSolution == "WORCESTER") {
    var letter3_1 = document.getElementById("letter3_1");
    var letter3_2 = document.getElementById("letter3_2");
    var letter3_3 = document.getElementById("letter3_3");
    var letter3_4 = document.getElementById("letter3_4");
    var letter3_5 = document.getElementById("letter3_5");
    var letter3_6 = document.getElementById("letter3_6");
    var letter3_7 = document.getElementById("letter3_7");
    var letter3_8 = document.getElementById("letter3_8");
    var letter3_9 = document.getElementById("letter3_9");
    var image_4 = document.getElementById("image_4");
    var image_7 = document.getElementById("image_7");
    var continue3 = document.getElementById("continue3");
    var checkAnswer3 = document.getElementById("checkAnswer3");
    var resetbutton3 = document.getElementById("resetbutton3");
    var progressbar3 = document.getElementById("progressbar3");
    var progressbar4 = document.getElementById("progressbar4");
    letter3_1.classList.add("w3-border-highway-green");
    letter3_2.classList.add("w3-border-highway-green");
    letter3_3.classList.add("w3-border-highway-green");
    letter3_4.classList.add("w3-border-highway-green");
    letter3_5.classList.add("w3-border-highway-green");
    letter3_6.classList.add("w3-border-highway-green");
    letter3_7.classList.add("w3-border-highway-green");
    letter3_8.classList.add("w3-border-highway-green");
    letter3_9.classList.add("w3-border-highway-green");
    image_4.classList.toggle("w3-hide");
    image_7.classList.toggle("w3-hide");
    continue3.classList.toggle("hide");
    checkAnswer3.classList.add("hide");
    resetbutton3.classList.add("hide");
    progressbar3.classList.toggle("w3-hide");
    progressbar4.classList.toggle("w3-hide");
  } else {
    var letter3_1 = document.getElementById("letter3_1");
    var letter3_2 = document.getElementById("letter3_2");
    var letter3_3 = document.getElementById("letter3_3");
    var letter3_4 = document.getElementById("letter3_4");
    var letter3_5 = document.getElementById("letter3_5");
    var letter3_6 = document.getElementById("letter3_6");
    var letter3_7 = document.getElementById("letter3_7");
    var letter3_8 = document.getElementById("letter3_6");
    var letter3_9 = document.getElementById("letter3_7");
    var incorrect3 = document.getElementById("incorrect3");
    var checkAnswer3 = document.getElementById("checkAnswer3");
    letter3_1.classList.add("w3-border-red");
    letter3_2.classList.add("w3-border-red");
    letter3_3.classList.add("w3-border-red");
    letter3_4.classList.add("w3-border-red");
    letter3_5.classList.add("w3-border-red");
    letter3_6.classList.add("w3-border-red");
    letter3_7.classList.add("w3-border-red");
    letter3_8.classList.add("w3-border-red");
    letter3_9.classList.add("w3-border-red");
    incorrect3.classList.add("show");
    incorrect3.classList.remove("hide");
    checkAnswer3.classList.remove("show")
    checkAnswer3.classList.add("hide");
  }
};

function goToQuestion4() {
  var question3 = document.getElementById("question3");
  var question4 = document.getElementById("question4");
  question3.classList.remove("w3-show");
  question3.classList.add("w3-hide");
  question4.classList.remove("w3-hide");
  question4.classList.add("w3-show");
};

function resetForm4() {
  document.getElementById("jumble_word_4").reset();
  var letter4_1 = document.getElementById("letter4_1");
  var letter4_2 = document.getElementById("letter4_2");
  var letter4_3 = document.getElementById("letter4_3");
  var letter4_4 = document.getElementById("letter4_4");
  var letter4_5 = document.getElementById("letter4_5");
  var letter4_6 = document.getElementById("letter4_6");
  var incorrect4 = document.getElementById("incorrect4");
  var checkAnswer4 = document.getElementById("checkAnswer4");
  var resetbutton4 = document.getElementById("resetbutton4");
  letter4_1.classList.remove("w3-border-highway-green", "w3-border-red");
  letter4_2.classList.remove("w3-border-highway-green", "w3-border-red");
  letter4_3.classList.remove("w3-border-highway-green", "w3-border-red");
  letter4_4.classList.remove("w3-border-highway-green", "w3-border-red");
  letter4_5.classList.remove("w3-border-highway-green", "w3-border-red");
  letter4_6.classList.remove("w3-border-highway-green", "w3-border-red");
  incorrect4.classList.remove("show");
  incorrect4.classList.add("hide");
  checkAnswer4.classList.remove("hide");
  checkAnswer4.classList.add("show");
  resetbutton4.classList.remove("hide");
  resetbutton4.classList.add("show");
};

function checkAnswer4() {
  var letter4_1 = document.getElementsByName("letter4_1")[0].value;
  var letter4_2 = document.getElementsByName("letter4_2")[0].value;
  var letter4_3 = document.getElementsByName("letter4_3")[0].value;
  var letter4_4 = document.getElementsByName("letter4_4")[0].value;
  var letter4_5 = document.getElementsByName("letter4_5")[0].value;
  var letter4_6 = document.getElementsByName("letter4_6")[0].value;
  var firstSolution = letter4_1 + letter4_2 + letter4_3 + letter4_4 + letter4_5 + letter4_6;
  firstSolution = firstSolution.toUpperCase();
  console.log(firstSolution);
  if (firstSolution == "SOCCER") {
    var letter4_1 = document.getElementById("letter4_1");
    var letter4_2 = document.getElementById("letter4_2");
    var letter4_3 = document.getElementById("letter4_3");
    var letter4_4 = document.getElementById("letter4_4");
    var letter4_5 = document.getElementById("letter4_5");
    var letter4_6 = document.getElementById("letter4_6");
    var image_2 = document.getElementById("image_2");
    var image_9 = document.getElementById("image_9");
    var continue4 = document.getElementById("continue4");
    var checkAnswer4 = document.getElementById("checkAnswer4");
    var resetbutton4 = document.getElementById("resetbutton4");
    var progressbar4 = document.getElementById("progressbar4");
    var progressbar5 = document.getElementById("progressbar5");
    letter4_1.classList.add("w3-border-highway-green");
    letter4_2.classList.add("w3-border-highway-green");
    letter4_3.classList.add("w3-border-highway-green");
    letter4_4.classList.add("w3-border-highway-green");
    letter4_5.classList.add("w3-border-highway-green");
    letter4_6.classList.add("w3-border-highway-green");
    image_2.classList.toggle("w3-hide");
    image_9.classList.toggle("w3-hide");
    continue4.classList.toggle("hide");
    checkAnswer4.classList.add("hide");
    resetbutton4.classList.add("hide");
    progressbar4.classList.toggle("w3-hide");
    progressbar5.classList.toggle("w3-hide");
  } else {
    var letter4_1 = document.getElementById("letter4_1");
    var letter4_2 = document.getElementById("letter4_2");
    var letter4_3 = document.getElementById("letter4_3");
    var letter4_4 = document.getElementById("letter4_4");
    var letter4_5 = document.getElementById("letter4_5");
    var letter4_6 = document.getElementById("letter4_6");
    var incorrect4 = document.getElementById("incorrect4");
    var checkAnswer4 = document.getElementById("checkAnswer4");
    letter4_1.classList.add("w3-border-red");
    letter4_2.classList.add("w3-border-red");
    letter4_3.classList.add("w3-border-red");
    letter4_4.classList.add("w3-border-red");
    letter4_5.classList.add("w3-border-red");
    letter4_6.classList.add("w3-border-red");
    incorrect4.classList.add("show");
    incorrect4.classList.remove("hide");
    checkAnswer4.classList.remove("show")
    checkAnswer4.classList.add("hide");
  }
};

function goToQuestion5() {
  var question4 = document.getElementById("question4");
  var question5 = document.getElementById("question5");
  question4.classList.remove("w3-show");
  question4.classList.add("w3-hide");
  question5.classList.remove("w3-hide");
  question5.classList.add("w3-show");
};

function resetForm5() {
  document.getElementById("jumble_word_5").reset();
  var letter5_1 = document.getElementById("letter5_1");
  var letter5_2 = document.getElementById("letter5_2");
  var letter5_3 = document.getElementById("letter5_3");
  var letter5_4 = document.getElementById("letter5_4");
  var letter5_5 = document.getElementById("letter5_5");
  var letter5_6 = document.getElementById("letter5_6");
  var letter5_7 = document.getElementById("letter5_7");
  var incorrect5 = document.getElementById("incorrect5");
  var checkAnswer5 = document.getElementById("checkAnswer5");
  var resetbutton5 = document.getElementById("resetbutton5");
  letter5_1.classList.remove("w3-border-highway-green", "w3-border-red");
  letter5_2.classList.remove("w3-border-highway-green", "w3-border-red");
  letter5_3.classList.remove("w3-border-highway-green", "w3-border-red");
  letter5_4.classList.remove("w3-border-highway-green", "w3-border-red");
  letter5_5.classList.remove("w3-border-highway-green", "w3-border-red");
  letter5_6.classList.remove("w3-border-highway-green", "w3-border-red");
  letter5_7.classList.remove("w3-border-highway-green", "w3-border-red");
  incorrect5.classList.remove("show");
  incorrect5.classList.add("hide");
  checkAnswer5.classList.remove("hide");
  checkAnswer5.classList.add("show");
  resetbutton5.classList.remove("hide");
  resetbutton5.classList.add("show");
};

function checkAnswer5() {
  var letter5_1 = document.getElementsByName("letter5_1")[0].value;
  var letter5_2 = document.getElementsByName("letter5_2")[0].value;
  var letter5_3 = document.getElementsByName("letter5_3")[0].value;
  var letter5_4 = document.getElementsByName("letter5_4")[0].value;
  var letter5_5 = document.getElementsByName("letter5_5")[0].value;
  var letter5_6 = document.getElementsByName("letter5_6")[0].value;
  var letter5_7 = document.getElementsByName("letter5_7")[0].value;
  var letter5_8 = document.getElementsByName("letter5_8")[0].value;
  var firstSolution = letter5_1 + letter5_2 + letter5_3 + letter5_4 + letter5_5 + letter5_6 + letter5_7 + letter5_8;
  firstSolution = firstSolution.toUpperCase();
  console.log(firstSolution);
  if (firstSolution == "ILOVEYOU") {
    var letter5_1 = document.getElementById("letter5_1");
    var letter5_2 = document.getElementById("letter5_2");
    var letter5_3 = document.getElementById("letter5_3");
    var letter5_4 = document.getElementById("letter5_4");
    var letter5_5 = document.getElementById("letter5_5");
    var letter5_6 = document.getElementById("letter5_6");
    var letter5_7 = document.getElementById("letter5_7");
    var letter5_8 = document.getElementById("letter5_8");
    var image_5 = document.getElementById("image_5");
    var continue5 = document.getElementById("continue5");
    var checkAnswer5 = document.getElementById("checkAnswer5");
    var resetbutton5 = document.getElementById("resetbutton5");
    var progressbar5 = document.getElementById("progressbar5");
    var progressbar6 = document.getElementById("progressbar6");
    letter5_1.classList.add("w3-border-highway-green");
    letter5_2.classList.add("w3-border-highway-green");
    letter5_3.classList.add("w3-border-highway-green");
    letter5_4.classList.add("w3-border-highway-green");
    letter5_5.classList.add("w3-border-highway-green");
    letter5_6.classList.add("w3-border-highway-green");
    letter5_7.classList.add("w3-border-highway-green");
    letter5_8.classList.add("w3-border-highway-green");
    image_5.classList.toggle("w3-hide");
    continue5.classList.remove("hide");
    continue5.classList.add("show");
    checkAnswer5.classList.add("hide");
    resetbutton5.classList.add("hide");
    progressbar5.classList.toggle("w3-hide");
    progressbar6.classList.toggle("w3-hide");
  } else {
    var letter5_1 = document.getElementById("letter5_1");
    var letter5_2 = document.getElementById("letter5_2");
    var letter5_3 = document.getElementById("letter5_3");
    var letter5_4 = document.getElementById("letter5_4");
    var letter5_5 = document.getElementById("letter5_5");
    var letter5_6 = document.getElementById("letter5_6");
    var letter5_7 = document.getElementById("letter5_7");
    var letter5_8 = document.getElementById("letter5_8");
    var incorrect5 = document.getElementById("incorrect5");
    var checkAnswer5 = document.getElementById("checkAnswer5");
    letter5_1.classList.add("w3-border-red");
    letter5_2.classList.add("w3-border-red");
    letter5_3.classList.add("w3-border-red");
    letter5_4.classList.add("w3-border-red");
    letter5_5.classList.add("w3-border-red");
    letter5_6.classList.add("w3-border-red");
    letter5_7.classList.add("w3-border-red");
    letter5_8.classList.add("w3-border-red");
    incorrect5.classList.add("show");
    incorrect5.classList.remove("hide");
    checkAnswer5.classList.remove("show")
    checkAnswer5.classList.add("hide");
  }
};

function goToSolution() {
  var question5 = document.getElementById("question5");
  var solution = document.getElementById("solution");
  var amiright = document.getElementById("amiright");
  var progressbar6 = document.getElementById("progressbar6");
  var progressbar7 = document.getElementById("progressbar7");
  progressbar6.classList.toggle("w3-hide");
  progressbar7.classList.toggle("w3-hide");
  amiright.classList.remove("hide");
  amiright.classList.add("show");
  question5.classList.remove("w3-show");
  question5.classList.add("w3-hide");
  solution.classList.remove("w3-hide");
  solution.classList.add("w3-show");
};

function amiright() {
  var solution1 = document.getElementsByName("solution1")[0].value;
  var solution2 = document.getElementsByName("solution2")[0].value;
  var solution3 = document.getElementsByName("solution3")[0].value;
  var solution4 = document.getElementsByName("solution4")[0].value;
  var solution5 = document.getElementsByName("solution5")[0].value;
  var solution6 = document.getElementsByName("solution6")[0].value;
  var solution7 = document.getElementsByName("solution7")[0].value;
  var solution8 = document.getElementsByName("solution8")[0].value;
  var final_solution = solution1 + solution2 + solution3 + solution4 + solution5 + solution6 + solution7 + solution8;
  final_solution = final_solution.toUpperCase();
  var solutionURL = "https://tinyurl.com/" + final_solution;
  console.log(solutionURL);
  window.open(solutionURL, "_blank")
};
