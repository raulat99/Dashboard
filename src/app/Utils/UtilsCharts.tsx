const randomizeChart = () => {

    chart = chartRef.current;
  
    chart.data.datasets.forEach(dataset => {
      dataset.data = Utils.numbers({count: chart.data.labels.length, min: -100, max: 100});
    });
    chart.update();
  }
  
  const addDatasetChart = () => {
    console.log({chartRef })
  
    if(chartRef === null) return;
  
    const chart = chartRef.current;
  
    console.log({chart  })
  
    const data = chart.data;
    
        const dsColor = Utils.namedColor(chart.data.datasets.length);
        const newDataset = {
          label: 'Dataset ' + (data.datasets.length + 1),
          backgroundColor: Utils.transparentize(dsColor, 0.5),
          borderColor: dsColor,
          data: Utils.numbers({count: data.labels.length, min: -100, max: 100}),
        };
        chart.data.datasets.push(newDataset);
        chart.update();
  
  }
  
  const removeChart = (chart) => {
    chart.data.datasets.pop();
        chart.update();
  }
  
  const removeData = (chart) => {
    chart.data.labels.splice(-1, 1); // remove the label first
  
        chart.data.datasets.forEach(dataset => {
          dataset.data.pop();
        });
  
        chart.update();
  }
  