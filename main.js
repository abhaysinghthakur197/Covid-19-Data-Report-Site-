// data varible
const tr = document.querySelectorAll("#tr1");
const tablebody = document.getElementById("tableBody");

let totalcase;
let totalrecovered;
let totaldeaths;
let i = 0;
snumber = [];
states = [];
active = [];
confirmed = [];
deaths = [];
recovered = [];
lastUpd = [];


function apifetch() {
    fetch("https://data.covid19india.org/data.json")
        .then((apidata) => {
           return apidata.json();
        }).then((apidata) => {

            console.log(apidata);
            totalcase = apidata.statewise[0].active;
            totalrecovered = apidata.statewise[0].recovered;
            totaldeaths = apidata.statewise[0].deaths;

            console.log(totalcase);
            // Number Run Logic
            const numberRun = setInterval(numberMagic, 0.5);
            let count1 = 0;
            let count2 = 0;
            let count3 = 0;
            function numberMagic() {
                count1++;
                count2++;
                count3++;
                document.getElementById("total-case").innerHTML = count1;
                document.getElementById("recovered-case").innerHTML = count2;
                document.getElementById("deaths-case").innerHTML = count3;

                if (count1 == 500) {
                    clearInterval(numberRun);
                    document.getElementById("total-case").innerHTML = totalcase;
                    document.getElementById("recovered-case").innerHTML = totalrecovered;
                    document.getElementById("deaths-case").innerHTML = totaldeaths;

                }

            }
            // End Here

            // Adding Data To Array For Table
            apidata.statewise.forEach(element => {
                snumber.push(i);
                states.push(element.state);
                active.push(element.active);
                confirmed.push(element.confirmed);;
                deaths.push(element.deaths);
                recovered.push(element.recovered);

                lastUpd.push(element.lastupdatedtime);
                i++;
            });
            // End Here

            

            // Show Table
            const showData = () => {
                // console.log("got it!");

                for (let j = 0; j < snumber.length; j++) {
                    const element = document.createElement("tr");
                    tablebody.appendChild(element);
                    const Sno = document.createElement("td");
                    const statedata = document.createElement("td");
                    const activedata = document.createElement("td");
                    const confirmeddate = document.createElement("td");
                    const deathsdata = document.createElement("td");
                    const recovereddata = document.createElement("td");
                    const updatedata = document.createElement("td");

                    Sno.innerHTML = snumber[j];
                    statedata.innerHTML = states[j];
                    activedata.innerHTML = active[j];
                    confirmeddate.innerHTML = confirmed[j];
                    deathsdata.innerHTML = deaths[j];
                    recovereddata.innerHTML = recovered[j];
                    updatedata.innerHTML = lastUpd[j];

                    element.appendChild(Sno);
                    element.appendChild(statedata);
                    element.appendChild(activedata);
                    element.appendChild(confirmeddate);
                    element.appendChild(deathsdata);
                    element.appendChild(recovereddata);
                    element.appendChild(updatedata);

                }
            }
            showData();

            document.querySelector(".activeconfigdata").innerHTML = apidata.statewise[0].active;
            document.querySelector(".confirmconfigdata").innerHTML = apidata.statewise[0].confirmed;
            document.querySelector(".recoveredconfigdata").innerHTML = apidata.statewise[0].recovered;
            document.querySelector(".diedconfigdata").innerHTML = apidata.statewise[0].deaths;
            document.querySelector(".stateName").innerHTML = 'Total'
})

        
    // End Here

}

apifetch();//Calling the function

// 
$(document).ready(function () {
    $(".total-case").counterUp({ delay: 10, time: 1000 });
    // console.log(states);
    var covidChart = document.getElementById("covid-chart").getContext('2d');

    var chart = new Chart(covidChart, {
        type: 'line',
        data: {
            labels: states,
            datasets: [
                {
                    data: confirmed,
                    label: "confirmed",
                    backgroundColor: "#074632",
                    borderColor: '#78464d',
                    // backgroundColor: Utils.CHART_COLORS.blue,
                    // borderColor: Utils.CHART_COLORS.blue,
                    minBarLength: 100
                },
                {
                    label: "recovered",
                    data: recovered,
                    backgroundColor: '#0c9723',
                    borderColor: '#a41a2d',
                    minBarLength: 100
                },
                {
                    label: "deaths",
                    data: deaths,
                    backgroundColor: '#e53511',
                    borderColor: '#941b4c',
                    minBarLength: 100
                }]
        },
        options: {
            responsive: true,
            layout: {
                padding: {
                    top: 30,
                }
            },
            animation:
            {
                duration: 2500,

            },

        }
    }
    )
});

// Dark Mode
const checkbox = document.getElementById('checkbox');
checkbox.addEventListener('change', () => {
    document.body.classList.toggle('dark');
    // document.querySelectorAll("h1").classList.toggle('colorChange_Heading');
    // document.querySelector('.total_Case_Box').style.color = '#00aeef';
    // document.querySelector('.recovered_Case_Box').style.color = '#006600';
    // document.querySelector('.deaths_Case_Box').style.color = '#630000';
    document.querySelector('.heading h1').style.textShadow = '#ff0000 0 1px 0';
    
});
// End Here


// Map Data
const stateData = (statename) => {
    fetch('https://data.covid19india.org/data.json')
        .then((mapdata) => {
            return mapdata.json();
        }).then((mapdata) => {

            // const stateData = (statename) => {

            for (var i in mapdata.statewise) {
                if (mapdata.statewise[i].state == statename) {
                    document.querySelector(".stateName").innerHTML = mapdata.statewise[i].state;
                    document.querySelector(".activeconfigdata").innerHTML = mapdata.statewise[i].active;
                    document.querySelector(".confirmconfigdata").innerHTML = mapdata.statewise[i].confirmed;
                    document.querySelector(".recoveredconfigdata").innerHTML = mapdata.statewise[i].recovered;
                    document.querySelector(".diedconfigdata").innerHTML = mapdata.statewise[i].deaths;
                }
            }
            // }

        });

}
// End Here4
let statename;
stateData(statename);
//Calling the function






