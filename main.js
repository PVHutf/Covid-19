async function getData() {
    const responseChart = await fetch("https://api.apify.com/v2/key-value-stores/Tksmptn5O41eHrT4d/records/LATEST");
    const responseData = await fetch("https://api.apify.com/v2/key-value-stores/ZsOpZgeg7dFS1rgfM/records/LATEST");
    const responseHcKey = await fetch("https://api.apify.com/v2/key-value-stores/p3nS2Q9TUn6kUOriJ/records/LATEST");
    const dataChart = await responseChart.json();
    const data = await responseData.json();
    const hcKey = await responseHcKey.json();
    return { dataChart, data, hcKey };
}

async function main() {
    const { canhiem, cakhoi, catuvong } = await (await getData()).dataChart;
    document.getElementById("treated").textContent = canhiem[6].quantity.toLocaleString("en-US");
    document.getElementById("nmoihqua").textContent = canhiem[5].quantity.toLocaleString("en-US");
    document.getElementById("cakhoimoi").textContent = cakhoi[6].quantity.toLocaleString("en-US");
    document.getElementById("cakhoihqua").textContent = cakhoi[5].quantity.toLocaleString("en-US");
    document.getElementById("chetmoi").textContent = catuvong[6].quantity.toLocaleString("en-US");
    document.getElementById("chethqua").textContent = catuvong[5].quantity.toLocaleString("en-US");
    if ((canhiem[6].quantity - canhiem[5].quantity) > 0) {
        document.getElementById("scnm").textContent = ("+") + (canhiem[6].quantity - canhiem[5].quantity);
    } else { document.getElementById("scnm").textContent = (canhiem[6].quantity - canhiem[5].quantity) };
    if ((cakhoi[6].quantity - cakhoi[5].quantity) > 0) {
        document.getElementById("sckm").textContent = ("+") + (cakhoi[6].quantity - cakhoi[5].quantity);
    } else { document.getElementById("sckm").textContent = (cakhoi[6].quantity - cakhoi[5].quantity) };
    if ((catuvong[6].quantity - catuvong[5].quantity) > 0) {
        document.getElementById("sccm").textContent = ("+") + (catuvong[6].quantity - catuvong[5].quantity);
    } else { document.getElementById("sccm").textContent = (catuvong[6].quantity - catuvong[5].quantity) };

    const { infected, treated, recovered, deceased, detail } = await (await getData()).data;
    createData(infected, treated, recovered, deceased);
    const { key } = await (await getData()).hcKey;
    createTable(detail, key);
    createChart(canhiem, "Số ca nhiễm bệnh", "rgb(201, 48, 44)", "nhiemChart");
    createChart(cakhoi, "Số ca hôm nay", "rgb(40, 167, 69)", "khoiChart");
    createChart(catuvong, "Số ca tử vong", "#666", "tuvongChart");
}

function createData(infected, treated, recovered, deceased) {
    document.getElementById("infected").textContent = infected.toLocaleString("en-US");
    document.getElementById("recovered").textContent = recovered.toLocaleString("en-US");
    document.getElementById("deceased").textContent = deceased.toLocaleString("en-US");
    var DataDate = new Date();
    document.querySelector(".name-date2").textContent = ((DataDate.getMonth() + 1) + "月" + (DataDate.getDate() - 1) + "日");
    document.querySelector(".name-date1").textContent = ((DataDate.getMonth() + 1) + "月" + (DataDate.getDate() - 1) + "日");
    document.querySelector(".name-date3").textContent = ((DataDate.getMonth() + 1) + "月" + (DataDate.getDate() - 1) + "日");
    document.querySelector(".name-date4").textContent = ((DataDate.getMonth() + 1) + "月" + (DataDate.getDate() - 1) + "日");
}



function createChart(data, name, color, idChart) {
    var labels = [];
    var dataset = [];
    for (let i = 0; i < data.length; i++) {
        labels.push(data[i].day);
        dataset.push(data[i].quantity);
    }

    var data = {
        labels: labels,
        datasets: [{
            label: name,
            backgroundColor: color,
            borderColor: color,
            data: dataset,
        }]
    };

    const config = {
        type: 'line',
        data,
        options: {
            tension: 0.3
        }
    };

    var myChart = new Chart(
        document.getElementById(idChart),
        config
    );
}

var state_specific = {
    VNM429: {
        name: "Quảng Ninh"
    },
    VNM444: {
        name: "Tây Ninh"
    },
    VNM450: {
        name: "Điện Biên"
    },
    VNM451: {
        name: "Bắc Kạn"
    },
    VNM452: {
        name: "Thái Nguyên"
    },
    VNM453: {
        name: "Lai Châu"
    },
    VNM454: {
        name: "Lạng Sơn"
    },
    VNM455: {
        name: "Sơn La"
    },
    VNM456: {
        name: "Thanh Hóa"
    },
    VNM457: {
        name: "Tuyên Quang"
    },
    VNM458: {
        name: "Yên Bái"
    },
    VNM459: {
        name: "Hòa Bình"
    },
    VNM460: {
        name: "Hải Dương"
    },
    VNM4600: {
        name: "Hải Phòng"
    },
    VNM461: {
        name: "Hưng Yên"
    },
    VNM462: {
        name: "Hà Nội"
    },
    VNM463: {
        name: "Bắc Ninh"
    },
    VNM464: {
        name: "Vĩnh Phúc"
    },
    VNM466: {
        name: "Ninh Bình"
    },
    VNM467: {
        name: "Hà Nam"
    },
    VNM468: {
        name: "Nam Định"
    },
    VNM469: {
        name: "Phú Thọ"
    },
    VNM470: {
        name: "Bắc Giang"
    },
    VNM471: {
        name: "Thái Bình"
    },
    VNM474: {
        name: "Hà Tĩnh"
    },
    VNM475: {
        name: "Nghệ An"
    },
    VNM476: {
        name: "Quảng Bình"
    },
    VNM477: {
        name: "Đắk Lắk"
    },
    VNM478: {
        name: "Gia Lai"
    },
    VNM479: {
        name: "Khánh Hòa"
    },
    VNM480: {
        name: "Lâm Đồng"
    },
    VNM481: {
        name: "Ninh Thuận"
    },
    VNM482: {
        name: "Phú Yên"
    },
    VNM483: {
        name: "Bình Dương"
    },
    VNM4834: {
        name: "Tiền Giang"
    },
    VNM4835: {
        name: "Đắk Nông"
    },
    VNM484: {
        name: "Bình Phước"
    },
    VNM485: {
        name: "Bình Định"
    },
    VNM486: {
        name: "Kon Tum"
    },
    VNM487: {
        name: "Quảng Nam"
    },
    VNM488: {
        name: "Quảng Ngãi"
    },
    VNM489: {
        name: "Quảng Trị"
    },
    VNM490: {
        name: "Thừa Thiên Huế"
    },
    VNM491: {
        name: "Đà Nẵng"
    },
    VNM495: {
        name: "Bà Rịa – Vũng Tàu"
    },
    VNM496: {
        name: "Bình Thuận"
    },
    VNM497: {
        name: "Đồng Nai"
    },
    VNM498: {
        name: "An Giang"
    },
    VNM499: {
        name: "Cần Thơ"
    },
    VNM500: {
        name: "Đồng Tháp"
    },
    VNM501: {
        name: "TP. Hồ Chí Minh",
    },
    VNM502: {
        name: "Kiên Giang"
    },
    VNM503: {
        name: "Long An"
    },
    VNM504: {
        name: "Bến Tre"
    },
    VNM505: {
        name: "Hậu Giang"
    },
    VNM506: {
        name: "Bạc Liêu"
    },
    VNM507: {
        name: "Cà Mau"
    },
    VNM508: {
        name: "Sóc Trăng"
    },
    VNM509: {
        name: "Trà Vinh"
    },
    VNM510: {
        name: "Vĩnh Long"
    },
    VNM511: {
        name: "Cao Bằng"
    },
    VNM512: {
        name: "Hà Giang"
    },
    VNM5483: {
        name: "Lào Cai"
    }
}

var colors = [
    "rgb(247, 247, 247)",
    "rgb(197, 197, 115)",
    "rgb(255, 156, 7)",
    "rgb(255, 121, 7)",
    "rgb(224, 28, 28)",
    "rgb(247, 2, 2)",
]

function createTable(detail, key) {
    for (let i = 0; i < detail.length; i++) {
        if (i < 21) { var tr = document.createElement("tr"); }

        // color mau tinh trong maps
        for (const property in state_specific) {
            if (state_specific[property].name.toLowerCase() == detail[i].name.toLowerCase()) {
                state_specific[property].color = setColorMap(parseInt(detail[i].cases), colors);

                state_specific[property].description = `
                  <span>Số ca nhiễm: <badge>${detail[i].cases}</badge></span><br>
                  <span>Số ca khỏi: <badge>${detail[i].casesToday}</badge></span><br>
                  <span>Số ca tử vong: <badge>${detail[i].death}</badge></span>
                `
            }
        }
        //data bang so  luong nhiem 
        var tdName = document.createElement("td");
        if (i < 21) { tdName.textContent = detail[i].name; }

        var DataBackGround = document.createElement("td1");
        if (detail[i].cases > 10000) {
            DataBackGround.style.backgroundColor = "rgb(246, 81, 81)";
        } else if (3001 < detail[i].cases < 10001) {
            DataBackGround.style.backgroundColor = "rgb(255, 165, 0)";
        } else if (1001 < detail[i].cases < 3001) {
            DataBackGround.style.backgroundColor = "rgb(247, 188, 25)";
        } else if (301 < detail[i].cases < 1001) {
            DataBackGround.style.backgroundColor = "rgb(247, 244, 74)";
        } else if (detail[i].cases < 301) {
            DataBackGround.style.backgroundColor = "rgb(255, 255, 255)";
        }
        if (i < 21) { DataBackGround.style.width = ((detail[i].cases / detail[0].cases) * 150) + "px" };

        var DataNhiem = document.createElement("td2");
        if (i < 21) { DataNhiem.textContent = detail[i].cases; }

        if (i < 21) { tr.appendChild(tdName); }
        if (i < 21) { tr.appendChild(DataBackGround); }
        if (i < 21) { tr.appendChild(DataNhiem); }
        document.getElementById("table").appendChild(tr) // }
    }
    //bang 2 test 
    for (let i = 21; i < detail.length; i++) {
        if (i < 42) { var tr = document.createElement("tr"); }
        var tdName = document.createElement("td");
        if (i < 42) { tdName.textContent = detail[i].name; }

        var DataBackGround = document.createElement("td1");
        if (detail[i].cases > 10000) {
            DataBackGround.style.backgroundColor = "rgb(246, 81, 81)";
        } else if (3001 < detail[i].cases < 10001) {
            DataBackGround.style.backgroundColor = "rgb(255, 165, 0)";
        } else if (1001 < detail[i].cases < 3001) {
            DataBackGround.style.backgroundColor = "rgb(247, 188, 25)";
        } else if (301 < detail[i].cases < 1001) {
            DataBackGround.style.backgroundColor = "rgb(247, 244, 74)";
        } else if (detail[i].cases < 301) {
            DataBackGround.style.backgroundColor = "rgb(255, 255, 255)";
        }
        if (i < 42) { DataBackGround.style.width = ((detail[i].cases / detail[0].cases) * 150) + "px" };

        var DataNhiem = document.createElement("td2");
        if (i < 42) { DataNhiem.textContent = detail[i].cases; }

        if (i < 42) { tr.appendChild(tdName); }
        if (i < 42) { tr.appendChild(DataBackGround); }
        if (i < 42) { tr.appendChild(DataNhiem); }
        document.getElementById("table1").appendChild(tr) // }
    }
    //bang 3 test
    for (let i = 42; i < detail.length; i++) {
        var tr = document.createElement("tr");
        var tdName = document.createElement("td");
        tdName.textContent = detail[i].name;

        var DataBackGround = document.createElement("td1");
        if (detail[i].cases > 10000) {
            DataBackGround.style.backgroundColor = "rgb(246, 81, 81)";
        } else if (3001 < detail[i].cases < 10001) {
            DataBackGround.style.backgroundColor = "rgb(255, 165, 0)";
        } else if (1001 < detail[i].cases < 3001) {
            DataBackGround.style.backgroundColor = "rgb(247, 188, 25)";
        } else if (301 < detail[i].cases < 1001) {
            DataBackGround.style.backgroundColor = "rgb(247, 244, 74)";
        } else if (detail[i].cases < 301) {
            DataBackGround.style.backgroundColor = "rgb(255, 255, 255)";
        }
        DataBackGround.style.width = ((detail[i].cases / detail[0].cases) * 150) + "px";

        var DataNhiem = document.createElement("td2");
        DataNhiem.textContent = detail[i].cases;

        tr.appendChild(tdName);
        tr.appendChild(DataBackGround);
        tr.appendChild(DataNhiem);
        document.getElementById("table2").appendChild(tr)
    }
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function setColorMap(value) {
    if (value >= 0 && value <= 300) {
        return colors[0];
    } else if (value > 301 && value <= 1000) {
        return colors[1];
    } else if (value > 1001 && value <= 3000) {
        return colors[2]
    } else if (value > 3001 && value <= 10000) {
        return colors[3]
    } else if (value > 10000) {
        return colors[4]
    }
}