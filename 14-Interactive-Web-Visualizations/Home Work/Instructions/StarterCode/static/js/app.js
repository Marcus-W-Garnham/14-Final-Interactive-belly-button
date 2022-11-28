// console.log(d3)

// d3.json('./samples.json').then(data => {
//     console.log(data)
// })

// d3.json('./samples.json').then(data => {
//     console.log(data.names)
// })

// d3.json('./samples.json').then(({names}) => {
//     console.log(names)
// })

d3.json('./samples.json').then(({names}) => {
    names.forEach(id => {
        d3.select('select').append('option').text(id)
        id;
    });

    renderData();

});

function renderData() {
    let selection = d3.select('select').node().value;

    d3.json('./samples.json').then(({metadata,samples}) => {
        let meta = metadata.filter(obj => obj.id == selection)[0];
        let sample = samples.filter(obj => obj.id == selection)[0];

        Object.entries(meta).forEach(([key,val]) => {
            d3.select('.panel-body').append('h4').text(key+': '+val)
        })


        // console.log(sample);
        // console.log(meta.wfreq);

        // bar chart coding 
        // console.log(sample.otu_ids.slice(0,10));
        // console.log(sample.sample_values.slice(0,10));
        // console.log(sample.otu_ids.slice(0,10).map(LBAR =>"OTU "+ LBAR));

        var y_bar = sample.sample_values.slice(0,10)
        var x_bar = sample.otu_ids.slice(0,10)
        var otu_labels = sample.otu_ids.slice(0,10).map(LBAR =>"OTU "+ LBAR)

        var data = [{
            type: "bar",
            x : y_bar.reverse(),
            y : otu_labels.reverse(),
            //text : otu_labels,
            orientation:"h"
            }];
                var layout = {
                title:"Ten Highest OTUs"
            };
        
            Plotly.newPlot("bar",data, layout);

            var data = [{

                domain: { x: [0, 1], y: [0, 1] },
                value: meta.wfreq,
                title: { text: "Belly Button Washes Weekly" },
                type: "indicator",
                mode: "gauge+number+delta", 
                delta: { reference: 10 },
                gauge: {
                  axis: { range: [null, 10] },
                  steps: [
                    { range: [0, 5], color: "red" },
                    { range: [5, 9], color: "yellow" }
                  ],
                }

            }];
        
            var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
            Plotly.newPlot('gauge', data, layout);

});
   

};

function optionChanged() {
    d3.select('.panel-body').text("")
    renderData()
}

// console.log(sample[0].sample_values.slice(0,10));
//let samplez = samples.filter(obj => obj.id == selection)[10];