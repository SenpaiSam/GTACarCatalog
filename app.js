window.onload=()=> init2();
function init2() {
    console.log("init");
    loadCarList();
}
var dbdata;
function loadCarList() {
    $.getJSON( "data.json", function( data ) {  
        // console.dir("JSON Data: " + JSON.stringify(data));
        //init first car on load
        loadDetails(data[0]);
        $("#carimage").attr("src", data[0].img);
        dbdata = data;
        $.each( data, function( key, val ) {
            // console.dir(key.toString() + " | value: " + JSON.stringify(val));
            const div = document.createElement("div");
            const labeltitle = document.createElement("label");
            div.addEventListener('click', function () { OnItemClick(val) }, false);
            div.style.backgroundImage = `url(${val.img})`;
            div.id = val.name;
            labeltitle.classList.add("caritemtitle");
            labeltitle.innerText = val.name;
            div.append(labeltitle);
            $(".carlist").append(div);
        });
    });
}

function OnItemClick(caritem) {
    $("#carimage").attr("src", caritem.img);
    loadDetails(caritem);
    scrollnextitem(caritem.name);
}

function loadDetails(caritem) {
    $("#details-item-name").html(caritem.name);
    $("#details-item-catogary").html(caritem.category);
    $("#details-item-seats").html(`Sitze: ${caritem.details.seats}`);
    $("#details-item-price").html(`Preis: ${caritem.details.price}$`);
    SetProgressBar("progresssliderspeed",caritem.details.speed);
    SetProgressBar("progressslidertrunksize",caritem.details.trunksize);
}

function scrollnextitem(id) {
    document.getElementById(id).scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
    document.getElementsByClassName("carlist")[0].scrollBy(Math.floor(-1.96 * window.innerWidth/100), 0);
}

function gotocatogary(category) {
    if(dbdata == null) return;
    for (const key in dbdata) {
        if(dbdata[key].category == category) {
            scrollnextitem(dbdata[key].name);
            break;
        }
    }
}

function search(name) {
    let nomatch = true;
    if(dbdata == null) return;
    for (const key in dbdata) {
        if(dbdata[key].name.toLowerCase() == name.toLowerCase()) {
            scrollnextitem(dbdata[key].name);
            nomatch = false;
            break;
        }
    }
    if(!nomatch) return;
    for (const key in dbdata) {
        let itemname = dbdata[key].name.toString().toLowerCase();
        if(itemname.includes(name.toLowerCase())) {
            scrollnextitem(dbdata[key].name);
            break;
        }
    }
}


document.getElementById("search-form").addEventListener('submit', e => {
    CloseModal();
    search(e.currentTarget.nameinput.value);
    e.currentTarget.nameinput.value = "";
    e.preventDefault();
  });
