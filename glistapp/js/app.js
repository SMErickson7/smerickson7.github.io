var config = {
    apiKey: "AIzaSyD-WoETx4P8BPtfxuKIVvr38tp0x0z7fVM",
    authDomain: "grocerylist-e012f.firebaseapp.com",
    databaseURL: "https://grocerylist-e012f-default-rtdb.firebaseio.com",
    projectId: "grocerylist-e012f",
    storageBucket: "grocerylist-e012f.appspot.com",
    messagingSenderId: "320470919045",
    appId: "1:320470919045:web:8a94b3e93c0290c1b546ec",
    measurementId: "G-6W4QL6Z2RS"
};
firebase.initializeApp(config);


var termTemplate = "<span class='ui-autocomplete-term'>%s</span>";
var groceryList = [];

function load() {
    firebase.database().ref('test').once('value').then(function(snapshot) {
            var gData = snapshot.val();
            var aisles = gData.Aisle;
            $(aisles).each(function(i, e) {
                if ((i % 4) == 0) {
                    container = $('<div class="row aisle-section"></div>');
                    $('#groceryAisles').append(container);
                }
                $('<div class="three columns"><div onclick="toggleList(' + (i + 1) + ', \'' + aisles[i].item.toLocaleLowerCase().replace(" & ", "_") + '-list' + '\')"><div class="icon"><i class="toggle" id="toggle' + (i + 1) + '"></i></div><div class="header"><h5 id="toggleSwitch">' + aisles[i].item + '</h5></div></div><div id="' + aisles[i].item.toLocaleLowerCase().replace(" & ", "_") + '-list' + '"></div></div>').appendTo(container);
            });
            for (var j = 0; j < aisles.length; j++) {
                let varCategory = aisles[j].item;
                var divAisle = varCategory.toLocaleLowerCase().replace(" & ", "_") + '-list';
                for (var i = 0; i < gData[varCategory].length; i++) {
                    food = $('<label class="container-checkbox">' + gData[varCategory][i].item + '<input onclick="addToList(\'' + gData[varCategory][i].item + '\')" id="' + gData[varCategory][i].item + '" value="' + gData[varCategory][i].item + '" type="checkbox"><span class="checkmark"></span></label>');
                    $('#' + divAisle).append(food);
                }
            };
            loadSavedList();
        },
        function(error) {
            console.log("Error: " + error.code);
        });

};

$("#tags").click(function() {
    firebase.database().ref('test').once('value').then(function(snapshot) {
            var gData = snapshot.val();
            var aisles = gData.Aisle;
            var gList = gData.gList;
            var groceryList = [];
            var aisleNames = [];
            var itemsRemaining = []
            for (x of aisles) {
                aisleNames.push(x.item);
            };
            for (x of aisleNames) {
                for (y of gData[x]) {
                    itemsRemaining.push(y.item);
                };
            };
            for (var i = 0; i < gList.length; i++) {
                const index = itemsRemaining.indexOf(gList[i]);
                groceryList.push(gList[i]);
                // copy array
                itemsRemaining.splice(index, 1);
                // sort alphabetical
                itemsRemaining = itemsRemaining.sort();
            };
            $(function() {
                function makeBold(needle, haystack) {
                    return haystack.replace(new RegExp("(" + needle + ")", "i"), "<span class='ui-autocomplete-term'>$1</span>");
                }
                $("#tags").autocomplete({
                    source: itemsRemaining,
                    select: function(event, ui) {
                        let addItem = ui.item.value;
                        console.log(addItem);
                        addToList(addItem);
                        $(this).val('');
                        return false;
                    }
                }).autocomplete("instance")._renderItem = function(ul, item) {
                    return $("<li>")
                        .append("<div>" + makeBold($("#tags").val(), item.label) + "</div>")
                        .appendTo(ul);
                };;
            });
        },
        function(error) {
            console.log("Error: " + error.code);
        });
});


function loadSavedList() {
    firebase.database().ref('test').once('value').then(function(snapshot) {
            var gData = snapshot.val();
            var aisles = gData.Aisle;
            var gList = gData.gList;
            var groceryList = [];
            var aisleNames = [];
            var groceryStoreDB = []
            for (x of aisles) {
                aisleNames.push(x.item);
            };
            for (x of aisleNames) {
                for (y of gData[x]) {
                    groceryStoreDB.push(y.item);
                };
            };
            if (gList == null) {
                return
            } else {
                for (var i = 0; i < gList.length; i++) {
                    const index = groceryStoreDB.indexOf(gList[i]);
                    groceryList.push(gList[i]);
                    // copy array
                    groceryStoreDB.splice(index, 1);
                    groceryStoreDB = groceryStoreDB.sort();
                }
            };
            let nameList = "";
            if (gList != null) {
                for (var i = 0; i < gList.length; i++) {
                    document.getElementById("toggleSwitch").disabled = false;
                    document.getElementById(gList[i]).checked = true;
                    nameList += '<label class="container-checkbox">' + gList[i] + '<input onclick="addToList(\'' + gList[i] + '\')" type="checkbox" value="' + gList[i] + '" checked><span class= "checkmark"></span></label>';
                }
                $('#mydiv').append(nameList);
            }
        },
        function(error) {
            console.log("Error: " + error.code);
        });
};

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
            .register("serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
}
var container;

function addToList(x) {
    document.getElementById(x).checked = true;
    // download gList, copy gList to local array, if gList is null or doesn't contain X, add to glist; if gList has X, remove from gList
    firebase.database().ref('test').once('value').then(function(snapshot) {
            var gData = snapshot.val();
            var gList = gData.gList;
            var aisles = gData.Aisle;
            var aisleNames = [];
            var groceryStore = []
            for (g of aisles) {
                aisleNames.push(g.item);
            };
            for (h of aisleNames) {
                for (l of gData[h]) {
                    groceryStore.push(l.item);
                };
            };
            if (gList == null || !gList.includes(x)) {
                if (gList == null) {
                    gList = [];
                }
                gList.push(x)
                document.getElementById("toggleSwitch").disabled = false;
            } else {
                // remove from grocery list and add to items left list        
                gList.splice(gList.indexOf(x), 1);
                document.getElementById(x).checked = false;
            };
            console.table(gList);
            // figure out why this isnt' sorting correctly
            gList.sort(function(j, k) {
                console.log(j, k);
                return groceryStore.indexOf(j) - groceryStore.indexOf(k);
            });

            firebase.database().ref('test').child('gList').set(gList);
            document.getElementById("mydiv").innerHTML = "";
            for (var i = 0; i < gList.length; i++) {
                //console.log("Add to list");
                nameList = '<label class="container-checkbox">' + gList[i] + '<input onclick="addToList(\'' + gList[i] + '\')" type="checkbox" value="' + gList[i] + '" checked><span class= "checkmark"></span>';
                document.getElementById("mydiv").innerHTML += nameList;
            }
        },
        function(error) {
            console.log("Error: " + error.code);
        });
};

function toggleList(y, z) {
    const toggleHeader = document.getElementById("toggle" + y)
    toggleHeader.classList.toggle("is-active");
    if (y == 0) {
        var myList = document.getElementById("mydiv");
        if (myList.style.display === "none") {
            firebase.database().ref('test').once('value').then(function(snapshot) {
                    var gData = snapshot.val();
                    var gList = gData.gList;
                    if (gList == null) {
                        document.getElementById("mydiv").innerHTML = "No items have been added to the grocery list";

                    }
                    myList.style.display = "block";
                },
                function(error) {
                    console.log("Error: " + error.code);
                });
            return
        } else {
            myList.style.display = "none";
            return
        }
    } else {
        var aisleList = document.getElementById(z);
        if (aisleList.style.display === "none") {
            aisleList.style.display = "block";
            return
        } else {
            aisleList.style.display = "none";
            return
        }
    }
}

function toggleSearch(x) {
    x.classList.toggle("fa-toggle-off")
    x.classList.toggle("fa-toggle-on")
    let search = document.getElementById("search");
    search.classList.toggle("hide");
}

//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}